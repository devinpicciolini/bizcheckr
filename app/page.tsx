'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ValidationResult {
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

export default function Home() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  const examples = [
    "We provide web development services for small businesses in Austin, Texas",
    "We build websites",
    "Marketing consulting for tech startups in San Francisco",
  ];

  const handleValidate = async () => {
    if (!description.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/validate-business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_BIZCHECKR_API_KEY || '',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setDescription(example);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-purple-950/10 pointer-events-none" />

      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-3 px-4 text-center text-sm font-medium fixed w-full z-50 top-0">
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Now powered by the fastest AI models from OpenAI and Anthropic • Lightning-fast validation in under 1 second</span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="border-b border-white/[0.08] backdrop-blur-xl bg-black/40 fixed w-full z-50 mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">
                BizCheckr
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#api" className="text-sm text-gray-400 hover:text-white transition-colors">API</a>
            </div>

            <button
              className="md:hidden text-gray-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-white/[0.08]">
              <a href="#features" className="block text-sm text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="block text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#api" className="block text-sm text-gray-400 hover:text-white transition-colors">API</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                BizCheckr
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Validate business descriptions instantly with AI-powered precision
            </p>
            <div className="mt-6 inline-flex items-center px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
              <span className="text-xs text-gray-400 font-medium">Powered by GPT-4o mini</span>
            </div>
          </div>

          {/* Interactive Playground */}
          <div className="grid lg:grid-cols-2 gap-6 mt-16 max-w-6xl mx-auto">
            {/* Left: Input Form */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8">
                <h3 className="text-xl font-semibold mb-2">Try it now</h3>
                <p className="text-sm text-gray-400 mb-6">Enter a business description to validate</p>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your business description..."
                  className="w-full h-32 bg-black/40 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 resize-none transition-all"
                />

                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-500 font-medium mb-3">Quick examples</p>
                  {examples.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExampleClick(example)}
                      className="block w-full text-left text-xs text-gray-400 bg-black/20 hover:bg-black/40 border border-white/[0.06] hover:border-white/[0.12] rounded-lg px-3 py-2.5 transition-all"
                    >
                      {example}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleValidate}
                  disabled={loading || !description.trim()}
                  className="mt-6 w-full bg-white hover:bg-gray-100 disabled:bg-white/10 disabled:text-gray-600 text-black font-medium text-sm py-3 px-6 rounded-xl transition-all disabled:cursor-not-allowed"
                >
                  {loading ? 'Validating...' : 'Validate Description'}
                </button>
              </div>
            </div>

            {/* Right: Results */}
            <div className="space-y-4">
              {result ? (
                <>
                  {/* Score Display */}
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8">
                    <h3 className="text-xl font-semibold mb-6">Results</h3>
                    <div className="text-center mb-8">
                      <div
                        className="text-6xl font-bold mb-2"
                        style={{
                          backgroundImage: result.score === 100
                            ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                            : result.score >= 66
                            ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
                            : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {result.score}%
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Completeness Score</p>
                    </div>

                    {/* Status Indicators */}
                    <div className="space-y-3">
                      <div className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        result.hasWhat
                          ? 'border-white/[0.12] bg-white/[0.04]'
                          : 'border-white/[0.06] bg-white/[0.01]'
                      }`}>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">WHAT</span>
                          <span className="text-xs text-gray-500">Service/Product</span>
                        </div>
                        <span className={`text-lg ${result.hasWhat ? 'text-green-500' : 'text-red-500'}`}>
                          {result.hasWhat ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        result.hasWhom
                          ? 'border-white/[0.12] bg-white/[0.04]'
                          : 'border-white/[0.06] bg-white/[0.01]'
                      }`}>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">WHOM</span>
                          <span className="text-xs text-gray-500">Target Customers</span>
                        </div>
                        <span className={`text-lg ${result.hasWhom ? 'text-green-500' : 'text-red-500'}`}>
                          {result.hasWhom ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        result.hasWhere
                          ? 'border-white/[0.12] bg-white/[0.04]'
                          : 'border-white/[0.06] bg-white/[0.01]'
                      }`}>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">WHERE</span>
                          <span className="text-xs text-gray-500">Location</span>
                        </div>
                        <span className={`text-lg ${result.hasWhere ? 'text-green-500' : 'text-red-500'}`}>
                          {result.hasWhere ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>

                    {/* Analysis */}
                    {(result.analysis.what || result.analysis.whom || result.analysis.where) && (
                      <div className="mt-6 pt-6 border-t border-white/[0.08]">
                        <h4 className="text-sm font-semibold mb-3">Analysis</h4>
                        <div className="space-y-2 text-xs text-gray-400">
                          {result.analysis.what && (
                            <p><span className="text-gray-500">What:</span> {result.analysis.what}</p>
                          )}
                          {result.analysis.whom && (
                            <p><span className="text-gray-500">Whom:</span> {result.analysis.whom}</p>
                          )}
                          {result.analysis.where && (
                            <p><span className="text-gray-500">Where:</span> {result.analysis.where}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Suggestions */}
                  {result.suggestions.length > 0 && (
                    <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 backdrop-blur-xl p-6">
                      <h4 className="text-sm font-semibold mb-3">Suggestions</h4>
                      <ul className="space-y-2">
                        {result.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-xs text-gray-400 flex items-start">
                            <span className="text-orange-500 mr-2 flex-shrink-0">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm">Your validation results will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Example Section */}
      <section className="py-24 px-6 lg:px-8 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Real-time validation feedback</h2>
              <p className="text-lg text-gray-400 mb-8">
                Just like password strength indicators, BizCheckr provides instant feedback as users type their business descriptions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-500 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Instant Feedback</h3>
                    <p className="text-sm text-gray-400">Users see validation results as they type, improving form completion rates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-500 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Clear Requirements</h3>
                    <p className="text-sm text-gray-400">Shows exactly what&apos;s missing from their description</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-500 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Better Data Quality</h3>
                    <p className="text-sm text-gray-400">Ensure complete business descriptions before submission</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: UI Mockup */}
            <div>
              <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 pointer-events-none">Business Description</label>
                    <div className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white pointer-events-none select-none">
                      We create beautiful websites
                    </div>
                  </div>

                  <div className="space-y-2 pointer-events-none select-none">
                    <p className="text-sm font-medium text-gray-400 mb-3">DESCRIPTION MUST CONTAIN:</p>

                    <div className="flex items-center gap-3">
                      <span className="text-green-500 text-lg">✓</span>
                      <span className="text-sm text-green-500">WHAT you do (service/product)</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-red-500 text-lg">✗</span>
                      <span className="text-sm text-red-500">WHO you serve (target customers)</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-red-500 text-lg">✗</span>
                      <span className="text-sm text-red-500">WHERE you operate (location)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 lg:px-8 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include full API access.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Tier */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 hover:border-white/[0.12] transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-gray-400">Perfect for testing and small projects</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">10,000 requests/month</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">50 requests/minute</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">Full API access</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">Community support</span>
                </div>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-white/[0.02] backdrop-blur-xl p-8 hover:border-blue-500/50 transition-all relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                POPULAR
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">$20</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-gray-400">For growing businesses and startups</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">100,000 requests/month</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">200 requests/minute</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">Full API access</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">Priority email support</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">Usage analytics</span>
                </div>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 hover:border-white/[0.12] transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">$100</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-gray-400">For large-scale applications</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">1,000,000 requests/month</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">500 requests/minute</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">Full API access</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">24/7 priority support</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">Custom integrations</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">SLA guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-24 px-6 lg:px-8 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Why BizCheckr?</h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Save your compliance team hundreds of hours with instant AI-powered validation
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Blazing Fast',
                description: 'Get results in 300-800ms using GPT-4o mini',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z'
              },
              {
                title: 'Smart Validation',
                description: 'Automatically checks WHAT, WHO, and WHERE',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              },
              {
                title: 'Save Time',
                description: 'Reduce manual review time by 90%',
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              },
              {
                title: 'Smart Suggestions',
                description: 'Get actionable feedback on what\'s missing',
                icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
              },
              {
                title: 'Simple API',
                description: 'RESTful JSON API for seamless integration',
                icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
              },
              {
                title: 'Improve Quality',
                description: 'Get 50% more complete business profiles',
                icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
              }
            ].map((feature, idx) => (
              <div key={idx} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 hover:border-white/[0.12] transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section id="api" className="py-24 px-6 lg:px-8 border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">API Documentation</h2>
          <p className="text-center text-gray-400 mb-8">Simple REST API for business validation</p>

          {/* Postman Collection Download */}
          <div className="flex justify-center mb-12">
            <a
              href="/BizCheckr_API.postman_collection.json"
              download="BizCheckr_API.postman_collection.json"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white hover:bg-gray-100 text-black font-medium text-sm rounded-xl transition-all shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z"/>
              </svg>
              Download Postman Collection
            </a>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
            <button
              onClick={() => setDocsOpen(!docsOpen)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
            >
              <h3 className="text-lg font-semibold">POST /api/validate-business</h3>
              <svg
                className={`w-5 h-5 transition-transform ${docsOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {docsOpen && (
              <div className="px-6 pb-6 space-y-6 border-t border-white/[0.08]">
                <div className="pt-6">
                  <h4 className="text-sm font-semibold mb-3">Authentication</h4>
                  <p className="text-xs text-gray-400 mb-3">
                    All API requests require an API key. Pass it via the <code className="text-cyan-400 bg-black/40 px-1.5 py-0.5 rounded">X-API-Key</code> header.
                  </p>
                  <pre className="bg-black/40 border border-white/[0.08] rounded-lg p-4 overflow-x-auto">
                    <code className="text-xs text-gray-300">X-API-Key: YOUR_API_KEY_HERE</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Request Body</h4>
                  <pre className="bg-black/40 border border-white/[0.08] rounded-lg p-4 overflow-x-auto">
                    <code className="text-xs text-gray-300">{`{
  "description": "We provide web development services for small businesses in Austin, Texas"
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Response</h4>
                  <pre className="bg-black/40 border border-white/[0.08] rounded-lg p-4 overflow-x-auto">
                    <code className="text-xs text-gray-300">{`{
  "score": 100,
  "hasWhat": true,
  "hasWhom": true,
  "hasWhere": true,
  "missing": [],
  "analysis": {
    "what": "web development services",
    "whom": "small businesses",
    "where": "Austin, Texas"
  },
  "suggestions": []
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">cURL Example</h4>
                  <pre className="bg-black/40 border border-white/[0.08] rounded-lg p-4 overflow-x-auto">
                    <code className="text-xs text-gray-300">{`curl -X POST https://www.bizcheckr.dev/api/validate-business \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: YOUR_API_KEY_HERE" \\
  -d '{"description": "Your business description here"}'`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Rate Limits</h4>
                  <p className="text-xs text-gray-400">
                    50 requests per minute per IP address. Rate limit headers are included in all responses.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center space-x-8 mb-8">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Home</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="#api" className="text-sm text-gray-400 hover:text-white transition-colors">API</a>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>Made with ❤️ in San Francisco</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
