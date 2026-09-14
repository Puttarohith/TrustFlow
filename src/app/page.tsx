import Link from 'next/link';
import { MessageCircle, Headphones, BarChart3, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-8 stagger-1">
          <Sparkles className="w-3 h-3" />
          <span>V2.0 is now live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 stagger-2 leading-tight">
          Resolve tickets <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">before</span><br/> they escalate.
        </h1>
        
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 stagger-3">
          TrustFlow uses true agentic AI to autonomously resolve customer issues, investigate root causes, and synchronize seamlessly with human agents.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl stagger-4">
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center group relative overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Customer Portal</h2>
            <p className="text-text-secondary text-sm mb-6 text-center">Test the generative AI chat experience.</p>
            <Link href="/auth/login" className="w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all btn-glow relative z-10">
              Start Chat
            </Link>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col items-center group relative overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
              <Headphones className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Agent Dashboard</h2>
            <p className="text-text-secondary text-sm mb-6 text-center">Manage escalations and run root cause analysis.</p>
            <Link href="/auth/login" className="w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all relative z-10 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)]">
              Agent Login
            </Link>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col items-center group relative overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Analytics</h2>
            <p className="text-text-secondary text-sm mb-6 text-center">View AI resolution rates and sentiment.</p>
            <Link href="/auth/login" className="w-full text-center bg-status-info hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all relative z-10 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]">
              View Analytics
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
