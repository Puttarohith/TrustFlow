import Link from 'next/link';
import { MessageCircle, Headphones, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F1A] via-[#1A1A2E] to-[#0F0F1A] z-0"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            TrustFlow Support
          </h1>
          <p className="text-xl md:text-2xl text-text-primary mb-4 font-semibold">
            AI-Powered Support That Actually Understands
          </p>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Resolves 80% of issues automatically. Hands off the rest with full context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Customer Portal */}
          <div className="glass-card rounded-xl p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Get Help Now</h3>
            <p className="text-text-secondary mb-6 flex-grow">
              Chat with our AI support agent. Get instant help with orders, billing, and more.
            </p>
            <div className="w-full">
              <Link href="/auth/login" className="block w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Start Chat
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-status-success font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
              </span>
              Available 24/7
            </div>
          </div>

          {/* Agent Portal */}
          <div className="glass-card rounded-xl p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
              <Headphones className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Agent Portal</h3>
            <p className="text-text-secondary mb-6 flex-grow">
              Manage tickets, handle escalations, and assist customers with full AI context.
            </p>
            <div className="w-full">
              <Link href="/auth/login" className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Agent Login
              </Link>
            </div>
            <div className="mt-4 text-sm text-purple-400 font-medium">
              12 Active Tickets
            </div>
          </div>

          {/* Analytics Portal */}
          <div className="glass-card rounded-xl p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-status-info" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Analytics</h3>
            <p className="text-text-secondary mb-6 flex-grow">
              Monitor support performance, track sentiment trends, and identify risks.
            </p>
            <div className="w-full">
              <Link href="/auth/login" className="block w-full bg-status-info hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                View Dashboard
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-status-info font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-info opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-status-info"></span>
              </span>
              Live Data
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-text-secondary font-medium">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">2,847</span> Issues Resolved
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">94%</span> AI Resolution
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">&lt; 2 min</span> Response Time
          </div>
        </div>
      </div>
    </div>
  );
}
