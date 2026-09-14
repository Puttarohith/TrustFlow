'use client';

import { useState } from 'react';
import { Mail, Lock, LogIn, KeySquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('TrustFlow@123');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login routing logic based on email
    setTimeout(() => {
      if (email.includes('admin')) {
        router.push('/analytics');
      } else if (email.includes('agent')) {
        router.push('/agent');
      } else {
        router.push('/customer/chat');
      }
      setIsLoading(false);
    }, 1000);
  };

  const fillDemo = (role: 'customer' | 'agent' | 'admin') => {
    if (role === 'customer') setEmail('sarah@example.com');
    if (role === 'agent') setEmail('agent@trustflow.com');
    if (role === 'admin') setEmail('admin@trustflow.com');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Marketing/Stats */}
      <div className="hidden lg:flex w-[60%] relative overflow-hidden bg-gradient-to-br from-[#0F0F1A] via-[#1A1A2E] to-primary/20 items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Join 10,000+ customers getting <span className="text-primary">instant support</span>
          </h1>
          <p className="text-xl text-text-secondary mb-12">
            Experience the future of customer service with our AI-powered platform.
          </p>
          
          <div className="flex flex-col gap-6 items-center">
            <div className="glass-card rounded-xl p-6 max-w-md animate-[slideUp_1s_ease-out]">
              <div className="flex text-status-warning mb-2">★★★★★</div>
              <p className="text-left italic">"The AI agent resolved my missing order issue in 30 seconds. Incredible experience!"</p>
              <p className="text-left text-sm text-text-secondary mt-4">— Sarah J., Platinum Member</p>
            </div>
            
            <div className="glass-card rounded-xl p-6 max-w-md animate-[slideUp_1s_ease-out_0.2s_both] ml-12">
              <div className="flex text-status-warning mb-2">★★★★★</div>
              <p className="text-left italic">"As an agent, having the AI provide full context and briefings before I even join the chat is a game changer."</p>
              <p className="text-left text-sm text-text-secondary mt-4">— Marcus T., Support Specialist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <Link href="/" className="inline-block text-2xl font-bold text-primary mb-2">TrustFlow</Link>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-text-secondary">Enter your details to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-text-secondary" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-text-secondary" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border bg-surface text-primary focus:ring-primary" />
                <span className="text-text-secondary">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:text-primary-dark transition-colors">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !email}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-text-secondary">
            New customer? <a href="#" className="text-primary hover:text-white transition-colors font-medium">Sign up</a>
          </div>

          {/* Demo Credentials */}
          <div className="mt-12 border border-border rounded-xl bg-surface p-4">
            <div className="flex items-center gap-2 mb-4 text-white font-medium">
              <KeySquare className="w-5 h-5 text-status-warning" />
              Demo Credentials
            </div>
            <div className="space-y-3 text-sm">
              <button onClick={() => fillDemo('customer')} className="w-full flex justify-between p-2 rounded hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors text-left">
                <span><span className="text-primary">Customer</span> (sarah@example.com)</span>
                <span className="text-text-secondary font-mono">TrustFlow@123</span>
              </button>
              <button onClick={() => fillDemo('agent')} className="w-full flex justify-between p-2 rounded hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors text-left">
                <span><span className="text-purple-400">Agent</span> (agent@trustflow.com)</span>
                <span className="text-text-secondary font-mono">TrustFlow@123</span>
              </button>
              <button onClick={() => fillDemo('admin')} className="w-full flex justify-between p-2 rounded hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors text-left">
                <span><span className="text-status-info">Admin</span> (admin@trustflow.com)</span>
                <span className="text-text-secondary font-mono">TrustFlow@123</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
