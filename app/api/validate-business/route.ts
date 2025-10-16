import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ValidationResponse {
  score: number;
  hasWhat: boolean;
  hasWhom: boolean;
  hasWhere: boolean;
  missing: string[];
  analysis: {
    what: string | null;
    whom: string | null;
    where: string | null;
  };
  suggestions: string[];
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 50; // 50 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

function getRateLimitKey(request: NextRequest): string {
  // Get IP from various possible headers (Vercel/proxy-safe)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIp || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(ip);

  if (!rateLimitData || now > rateLimitData.resetTime) {
    // New window or expired window
    const resetTime = now + RATE_LIMIT_WINDOW;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetTime };
  }

  if (rateLimitData.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetTime: rateLimitData.resetTime };
  }

  rateLimitData.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - rateLimitData.count,
    resetTime: rateLimitData.resetTime
  };
}

export async function POST(request: NextRequest) {
  try {
    // API Key Authentication
    const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
    const validApiKey = process.env.BIZCHECKR_API_KEY;

    if (!validApiKey) {
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required. Pass it via X-API-Key header or Authorization: Bearer header.' },
        { status: 401 }
      );
    }

    if (apiKey !== validApiKey) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 403 }
      );
    }

    // Rate limiting check
    const ip = getRateLimitKey(request);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      const retryAfter = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': MAX_REQUESTS_PER_WINDOW.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
            'Retry-After': retryAfter.toString(),
          }
        }
      );
    }

    const { description } = await request.json();

    // Input validation
    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Business description is required' },
        { status: 400 }
      );
    }

    // Prevent excessively long inputs
    if (description.length > 1000) {
      return NextResponse.json(
        { error: 'Business description is too long. Maximum 1000 characters.' },
        { status: 400 }
      );
    }

    // Prevent empty or whitespace-only inputs
    if (description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Business description cannot be empty' },
        { status: 400 }
      );
    }

    const prompt = `You are a STRICT business description validator. Only mark information as present if it is EXPLICITLY stated in the description. DO NOT infer or assume information that isn't directly mentioned.

Analyze this business description:
"${description}"

For each category, return the EXACT information if explicitly stated, otherwise return null:

1. WHAT: Only if they explicitly mention the service/product (e.g., "web development", "plumbing", "marketing"). Just saying "I make websites" counts as WHAT.

2. WHOM: Only if they explicitly mention target customers/clients (e.g., "for small businesses", "homeowners", "tech startups"). DO NOT infer this - it must be directly stated.

3. WHERE: Only if they explicitly mention location/geographic area (e.g., "in Austin", "Texas", "Bay Area", "nationwide"). DO NOT infer this - it must be directly stated.

IMPORTANT: Be extremely strict. If something is not explicitly mentioned, return null.

Respond ONLY with valid JSON:
{
  "what": "exact service/product mentioned or null",
  "whom": "exact target customer mentioned or null",
  "where": "exact location mentioned or null"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a business analyst. Respond only with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 200,
    });

    const content = completion.choices[0].message.content?.trim() || '{}';
    const analysis = JSON.parse(content);

    const hasWhat = analysis.what !== null && analysis.what !== '';
    const hasWhom = analysis.whom !== null && analysis.whom !== '';
    const hasWhere = analysis.where !== null && analysis.where !== '';

    const missing: string[] = [];
    if (!hasWhat) missing.push('what');
    if (!hasWhom) missing.push('whom');
    if (!hasWhere) missing.push('where');

    const score = Math.round(
      ((hasWhat ? 1 : 0) + (hasWhom ? 1 : 0) + (hasWhere ? 1 : 0)) / 3 * 100
    );

    // Generate suggestions for missing information
    const suggestions: string[] = [];
    if (!hasWhat) {
      suggestions.push('Please specify WHAT services or products your business provides (e.g., "web development", "plumbing services", "consulting")');
    }
    if (!hasWhom) {
      suggestions.push('Please specify WHO your target customers are (e.g., "small businesses", "homeowners", "tech startups")');
    }
    if (!hasWhere) {
      suggestions.push('Please specify WHERE you operate (e.g., "Austin, Texas", "nationwide", "San Francisco Bay Area")');
    }

    const response: ValidationResponse = {
      score,
      hasWhat,
      hasWhom,
      hasWhere,
      missing,
      analysis: {
        what: analysis.what || null,
        whom: analysis.whom || null,
        where: analysis.where || null,
      },
      suggestions,
    };

    return NextResponse.json(response, {
      headers: {
        'X-RateLimit-Limit': MAX_REQUESTS_PER_WINDOW.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString(),
      }
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate business description' },
      { status: 500 }
    );
  }
}
