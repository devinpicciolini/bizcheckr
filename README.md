# Business Validator API

A blazing fast Next.js API that validates business descriptions using OpenAI's GPT-4o-mini model.

## Features

- Uses GPT-4o-mini for near-instant responses
- Validates if business description includes:
  - **WHAT**: What does the business do?
  - **WHOM**: Who do they serve?
  - **WHERE**: Where do they operate?
- Returns a score (0-100) and detailed analysis
- Optimized for Vercel deployment

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=sk-...
```

4. Run development server:
```bash
npm run dev
```

## API Usage

**Endpoint**: `POST /api/validate-business`

**Request Body**:
```json
{
  "description": "We provide web development services for small businesses in Austin, Texas"
}
```

**Response**:
```json
{
  "score": 100,
  "hasWhat": true,
  "hasWhom": true,
  "hasWhere": true,
  "missing": [],
  "analysis": {
    "what": "web development services",
    "whom": "small businesses",
    "where": "Austin, Texas"
  }
}
```

**Example with missing info**:
```json
{
  "description": "We build websites"
}
```

Response:
```json
{
  "score": 33,
  "hasWhat": true,
  "hasWhom": false,
  "hasWhere": false,
  "missing": ["whom", "where"],
  "analysis": {
    "what": "website building services",
    "whom": null,
    "where": null
  }
}
```

## Deploy to Vercel

```bash
vercel
```

Make sure to add `OPENAI_API_KEY` to your Vercel environment variables.

## Testing Locally

```bash
curl -X POST http://localhost:3000/api/validate-business \
  -H "Content-Type: application/json" \
  -d '{"description": "We provide web development services for small businesses in Austin, Texas"}'
```

## Performance

- Uses GPT-4o-mini (fastest OpenAI model)
- Max tokens limited to 200 for speed
- Low temperature (0.3) for consistent results
- Average response time: 300-800ms
