'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, AlertTriangle, Search, BookOpen, Users, BarChart2, Settings, LogOut } from 'lucide-react';
import { useTickets } from '@/hooks/use-tickets';

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  const { tickets } = useTickets();
  const pathname = usePathname();

  const openTicketsCount = tickets.filter(t => t.status !== 'resolved').length;
  const escalatedCount = tickets.filter(t => t.status === 'escalated').length;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-border bg-surface flex flex-col h-full z-20 shadow-xl">
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
            S
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-white">TrustFlow</h1>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">Support Center</p>
          </div>
        </div>

        {/* Agent Profile */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <span className="text-sm font-bold text-purple-400">AT</span>
            </div>
            <div>
              <h2 className="font-semibold text-sm text-white">Agent Team</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                <span className="text-xs text-text-secondary">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-3 flex-grow overflow-y-auto">
          <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2 px-3">Navigation</div>
          <nav className="space-y-1">
            <Link href="/agent" className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${pathname === '/agent' ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-white/5 hover:text-white'}`}>
              <div className="flex items-center gap-3 text-sm">
                <LayoutDashboard className="w-4 h-4" />
                Ticket Queue
              </div>
              <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">{openTicketsCount}</span>
            </Link>
            
            <Link href="/agent/escalations" className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${pathname === '/agent/escalations' ? 'bg-white/5 text-white' : 'text-text-secondary hover:bg-white/5 hover:text-white'}`}>
              <div className="flex items-center gap-3 text-sm">
                <AlertTriangle className="w-4 h-4" />
                Escalations
              </div>
              {escalatedCount > 0 && (
                <span className="bg-status-danger text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">{escalatedCount}</span>
              )}
            </Link>
            
            <Link href="/agent/investigations" className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-colors text-sm">
              <Search className="w-4 h-4" />
              Investigations
            </Link>
            
            <Link href="/agent/knowledge" className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-colors text-sm">
              <BookOpen className="w-4 h-4" />
              Knowledge Base
            </Link>
            
            <Link href="/agent/customers" className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-colors text-sm">
              <Users className="w-4 h-4" />
              Customers
            </Link>
            
            <Link href="/analytics" className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-colors text-sm">
              <BarChart2 className="w-4 h-4" />
              Analytics
            </Link>
          </nav>
        </div>

        {/* Footer Settings */}
        <div className="p-3 border-t border-border space-y-1">
          <Link href="/agent/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-colors text-sm">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-colors text-sm">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
          <div className="mt-4 text-center text-[10px] text-text-secondary">
            Powered by TrustFlow AI
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-full bg-background relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
