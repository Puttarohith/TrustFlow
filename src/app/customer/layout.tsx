import Link from 'next/link';
import { MessageCircle, Ticket, LogOut, User } from 'lucide-react';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-72 flex-shrink-0 border-r border-border bg-surface flex flex-col h-full">
        {/* Profile Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="text-xl font-bold text-primary">SJ</span>
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Sarah Jenkins</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-medium">Platinum Member</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-text-secondary">Member since Sept 2024</p>
        </div>

        {/* Navigation */}
        <div className="p-4 flex-grow overflow-y-auto">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2">Navigation</h3>
          <nav className="space-y-1">
            <Link href="/customer/chat" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium transition-colors">
              <MessageCircle className="w-5 h-5" />
              Active Chat
            </Link>
            <Link href="/customer/tickets" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-colors">
              <Ticket className="w-5 h-5" />
              My Tickets
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-colors">
              <User className="w-5 h-5" />
              Account Settings
            </Link>
          </nav>

          {/* Recent Tickets Preview (Static for now) */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2">Recent Tickets</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border border-border bg-background cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-status-success">Resolved</span>
                  <span className="text-xs text-text-secondary">2d ago</span>
                </div>
                <p className="text-sm font-medium truncate">Return request for order #4510</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-background cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-status-success">Resolved</span>
                  <span className="text-xs text-text-secondary">5d ago</span>
                </div>
                <p className="text-sm font-medium truncate">Payment failed on checkout</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-full relative">
        {children}
      </div>
    </div>
  );
}
