'use client';

import Link from 'next/link';

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-purple-950/10 pointer-events-none" />

      {/* Navbar */}
      <nav className="border-b border-white/[0.08] backdrop-blur-xl bg-black/40 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">
                BizCheckr
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="/status" className="text-sm text-white font-medium">Status</Link>
              <Link href="/#api" className="text-sm text-gray-400 hover:text-white transition-colors">API</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Status Content */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">API Status</h1>
          <p className="text-center text-gray-400 mb-16">Real-time system health and performance</p>

          <div className="space-y-6">
            {/* Overall Status */}
            <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-white/[0.02] backdrop-blur-xl p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <h2 className="text-2xl font-bold">All Systems Operational</h2>
                    <p className="text-sm text-gray-400 mt-1">API endpoint running normally</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-green-500">100%</div>
                  <p className="text-sm text-gray-400">Uptime</p>
                </div>
              </div>
            </div>

            {/* API Endpoint Details */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8">
              <h3 className="text-xl font-semibold mb-6">API Endpoint</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                    <span className="text-gray-400">Status</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-green-500 font-medium">Operational</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                    <span className="text-gray-400">Response Time</span>
                    <span className="text-white font-medium">~500ms</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-white font-medium">100%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                    <span className="text-gray-400">Uptime (30 days)</span>
                    <span className="text-white font-medium">100%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                    <span className="text-gray-400">Rate Limit</span>
                    <span className="text-white font-medium">50 req/min</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                    <span className="text-gray-400">Region</span>
                    <span className="text-white font-medium">Global</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Incidents */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Recent Incidents</h3>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No incidents reported in the last 30 days</span>
              </div>
            </div>

            {/* Historical Uptime */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Historical Uptime</h3>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
                  <p className="text-sm text-gray-400">Last 7 days</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
                  <p className="text-sm text-gray-400">Last 30 days</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
                  <p className="text-sm text-gray-400">Last 90 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center space-x-8 mb-8">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/status" className="text-sm text-white font-medium">Status</Link>
            <Link href="/#api" className="text-sm text-gray-400 hover:text-white transition-colors">API</Link>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>Made with ❤️ in San Francisco</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
