'use client';

import { useState } from 'react';
import { Shield, Box, Send, Paperclip, CheckCircle, AlertTriangle, FileText, Bot, Clock, CreditCard } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { useTickets } from '@/hooks/use-tickets';

export default function AgentTicketDetailPage({ params }: { params: { id: string } }) {
  const { tickets, updateTicket } = useTickets();
  const ticket = tickets.find(t => t.id === params.id) || tickets[0];
  const messages = ticket?.messages || [];

  const [internalNote, setInternalNote] = useState('');
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [showInvestigation, setShowInvestigation] = useState(false);

  const [humanReply, setHumanReply] = useState('');

  if (!ticket) {
    return <div className="p-8 text-white">Loading ticket details...</div>;
  }

  const handleSendReply = () => {
    if (!humanReply.trim() || !ticket) return;
    
    updateTicket(ticket.id, {
      messages: [...messages, {
        id: Date.now().toString(),
        sender: 'human',
        agentType: 'Human Agent',
        content: humanReply,
        timestamp: 'Just now'
      }]
    });
    setHumanReply('');
  };

  const handleResolve = () => {
    if (!ticket) return;
    updateTicket(ticket.id, {
      status: 'resolved',
      messages: [...messages, {
        id: Date.now().toString(),
        sender: 'human',
        agentType: 'System',
        content: 'This ticket has been marked as resolved.',
        timestamp: 'Just now'
      }]
    });
  };

  const runInvestigation = () => {
    setIsInvestigating(true);
    setTimeout(() => {
      setIsInvestigating(false);
      setShowInvestigation(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      
      {/* Left Panel: Customer Context (320px) */}
      <div className="w-full lg:w-80 flex-shrink-0 border-r border-border bg-surface flex flex-col h-full overflow-y-auto custom-scrollbar p-5">
        
        {/* Customer Profile Card */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-yellow-500/30 bg-yellow-500/10 flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-yellow-500">{ticket.customer.split(' ').map((n: string) => n[0]).join('')}</span>
          </div>
          <h2 className="text-lg font-bold text-white">{ticket.customer}</h2>
          <p className="text-sm text-text-secondary mb-2">{ticket.customer.toLowerCase().replace(' ', '.')}@example.com</p>
          <span className="bg-yellow-500/20 text-yellow-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-4">
            {ticket.tier} Tier
          </span>
          
          <div className="w-full grid grid-cols-2 gap-2 text-left bg-background p-3 rounded-lg border border-border">
            <div>
              <p className="text-[10px] text-text-secondary uppercase">Lifetime Value</p>
              <p className="text-sm font-bold text-white">$1,240.00</p>
            </div>
            <div>
              <p className="text-[10px] text-text-secondary uppercase">Total Orders</p>
              <p className="text-sm font-bold text-white">12 Orders</p>
            </div>
          </div>
        </div>

        {/* Churn Risk Badge */}
        <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-lg mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-orange-500 uppercase tracking-wider">High Churn Risk</h4>
            <p className="text-xs text-text-secondary mt-1">Customer has expressed high frustration in recent interactions.</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Recent Orders</h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-white">#9021</span>
                <span className="text-[10px] text-status-success font-bold bg-status-success/10 px-1.5 py-0.5 rounded">Delivered</span>
              </div>
              <p className="text-xs text-text-secondary truncate">Sony WH-1000XM5 Headphones</p>
              <p className="text-xs font-medium text-white mt-1">$348.00 • Sept 10</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-white">#8842</span>
                <span className="text-[10px] text-status-success font-bold bg-status-success/10 px-1.5 py-0.5 rounded">Delivered</span>
              </div>
              <p className="text-xs text-text-secondary truncate">Logitech MX Master 3S</p>
              <p className="text-xs font-medium text-white mt-1">$99.00 • Aug 22</p>
            </div>
          </div>
        </div>
      </div>


      {/* Middle Panel: Conversation */}
      <div className="flex-grow flex flex-col h-full bg-background border-r border-border min-w-0">
        
        {/* Header */}
        <div className="h-16 flex-shrink-0 border-b border-border p-4 flex items-center justify-between bg-surface/50">
          <div>
            <h2 className="font-bold text-white flex items-center gap-2">
              {ticket.subject}
              {ticket.status === 'escalated' && (
                <span className="bg-status-danger/20 text-status-danger text-[10px] px-2 py-0.5 rounded uppercase font-bold border border-status-danger/30">
                  Escalated
                </span>
              )}
              {ticket.status === 'resolved' && (
                <span className="bg-status-success/20 text-status-success text-[10px] px-2 py-0.5 rounded uppercase font-bold border border-status-success/30">
                  Resolved
                </span>
              )}
            </h2>
            <p className="text-xs text-text-secondary">Ticket #{ticket.id} • Assigned to: Human Queue</p>
          </div>
          <div className="flex gap-2">
            {ticket.status !== 'resolved' && (
              <button 
                onClick={handleResolve}
                className="px-3 py-1.5 bg-status-success/10 text-status-success border border-status-success/30 rounded text-xs font-bold hover:bg-status-success/20 transition-colors"
              >
                Resolve Ticket
              </button>
            )}
          </div>
        </div>

        {/* Escalation Briefing */}
        {ticket.briefing && (
          <div className="bg-status-danger/10 border-b border-status-danger/30 p-4 animate-in slide-in-from-top duration-300">
            <h3 className="text-status-danger font-bold text-sm flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4" />
              ESCALATION BRIEFING — Generated by AI
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface/50 rounded p-3 border border-status-danger/20">
                <h4 className="text-[10px] font-bold text-status-danger uppercase mb-1">Customer Summary</h4>
                <p className="text-xs text-text-secondary">{ticket.briefing.customer_summary}</p>
              </div>
              <div className="bg-surface/50 rounded p-3 border border-status-danger/20">
                <h4 className="text-[10px] font-bold text-status-danger uppercase mb-1">Issue Summary</h4>
                <p className="text-xs text-text-secondary">{ticket.briefing.issue_summary}</p>
              </div>
              <div className="bg-surface/50 rounded p-3 border border-status-danger/20">
                <h4 className="text-[10px] font-bold text-status-danger uppercase mb-1">What AI Tried</h4>
                <p className="text-xs text-text-secondary">{ticket.briefing.what_ai_tried}</p>
              </div>
              <div className="bg-surface/50 rounded p-3 border border-status-danger/20">
                <h4 className="text-[10px] font-bold text-status-danger uppercase mb-1">Recommended Approach</h4>
                <p className="text-xs text-text-secondary">{ticket.briefing.recommended_approach}</p>
              </div>
            </div>
          </div>
        )}

        {/* Chat History */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex w-full", msg.sender === 'customer' ? "justify-start" : "justify-end")}>
              {msg.sender === 'customer' ? (
                <div className="max-w-[80%] bg-surface border border-border rounded-2xl rounded-bl-none p-4">
                  <p className="text-sm text-white leading-relaxed mb-3 whitespace-pre-wrap">
                    {msg.content}
                  </p>
                  
                  {/* Agent AI Analysis Box (Only for the first message) */}
                  {msg.id === '1' && (
                    <div className="bg-background/80 rounded border border-border p-3 text-xs">
                      <div className="flex items-center gap-2 mb-2 text-text-secondary font-semibold">
                        <Bot className="w-3 h-3" /> AI Analysis
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-text-secondary text-[10px] uppercase block">Intent</span>
                          <span className="text-purple-400 font-medium">Billing</span>
                        </div>
                        <div>
                          <span className="text-text-secondary text-[10px] uppercase block">Urgency</span>
                          <span className="text-status-danger font-medium">Critical (95)</span>
                        </div>
                        <div>
                          <span className="text-text-secondary text-[10px] uppercase block">Sentiment</span>
                          <span className="text-status-danger font-medium">Angry</span>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-border">
                        <span className="text-text-secondary text-[10px] uppercase block">Routing Reason</span>
                        <span className="text-text-secondary italic">"Customer reporting duplicate charge with threat of chargeback."</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={cn(
                  "max-w-[70%] border rounded-2xl rounded-br-none p-4",
                  msg.sender === 'ai' ? "bg-purple-500/10 border-purple-500/20" : "bg-primary/20 border-primary/30"
                )}>
                  <div className={cn(
                    "flex items-center gap-2 mb-2 pb-2 border-b",
                    msg.sender === 'ai' ? "border-purple-500/10" : "border-primary/20"
                  )}>
                    {msg.sender === 'ai' ? (
                      <CreditCard className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Shield className="w-4 h-4 text-primary" />
                    )}
                    <span className={cn(
                      "text-xs font-bold",
                      msg.sender === 'ai' ? "text-purple-400" : "text-primary"
                    )}>{msg.agentType}</span>
                    <span className="text-[10px] text-text-secondary ml-auto">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Human Reply Area */}
        <div className="flex-shrink-0 p-4 border-t border-border bg-surface">
          <div className="bg-background border border-border rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all p-3">
            <textarea 
              value={humanReply}
              onChange={(e) => setHumanReply(e.target.value)}
              placeholder="Type your response as Human Agent..."
              className="w-full bg-transparent text-sm text-white resize-none outline-none min-h-[80px] custom-scrollbar"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendReply();
                }
              }}
            />
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
              <div className="flex gap-2">
                <button className="p-1.5 text-text-secondary hover:text-white rounded transition-colors"><Paperclip className="w-4 h-4" /></button>
                <button className="text-xs font-medium text-text-secondary hover:text-white px-2 py-1 rounded border border-border bg-surface">Use Template</button>
              </div>
              <button 
                onClick={handleSendReply}
                disabled={!humanReply.trim()}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded flex items-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" /> Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Right Panel: Intelligence (320px) */}
      <div className="w-full lg:w-80 flex-shrink-0 bg-surface flex flex-col h-full overflow-y-auto custom-scrollbar p-5">
        
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Root Cause Investigation
        </h3>

        {!showInvestigation && !isInvestigating && (
          <div className="bg-background border border-border border-dashed rounded-lg p-6 text-center">
            <p className="text-sm text-text-secondary mb-4">Run an AI-powered deep dive across systems to find the root cause.</p>
            <button 
              onClick={runInvestigation}
              className="w-full py-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded font-semibold text-sm hover:bg-blue-500/20 transition-colors"
            >
              Run Investigation
            </button>
          </div>
        )}

        {isInvestigating && (
          <div className="bg-background border border-border rounded-lg p-6 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-sm font-semibold text-blue-400 mb-1">Analyzing Data Silos...</p>
            <p className="text-xs text-text-secondary">Checking Stripe logs, application telemetry, and billing webhooks.</p>
          </div>
        )}

        {showInvestigation && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-status-danger/10 border border-status-danger/30 rounded-lg p-4">
              <h4 className="text-[10px] font-bold text-status-danger uppercase mb-1">Root Cause</h4>
              <p className="text-sm text-white font-medium">Race condition in payment webhook receiver causing duplicate auth captures during a database failover event at 14:32 UTC.</p>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="text-[10px] font-bold text-text-secondary uppercase mb-2">Evidence Found</h4>
              <ul className="space-y-2 text-xs text-white">
                <li className="flex gap-2"><span className="text-blue-400">•</span> Stripe Log: `req_8fHx` shows capture success.</li>
                <li className="flex gap-2"><span className="text-blue-400">•</span> App Log: HTTP 504 Gateway Timeout on first webhook.</li>
                <li className="flex gap-2"><span className="text-blue-400">•</span> DB Log: Retry webhook inserted a duplicate ledger entry that was later purged, but auth remained captured.</li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="text-[10px] font-bold text-text-secondary uppercase mb-2">Recommended Actions</h4>
              <div className="space-y-2">
                <label className="flex items-start gap-2 text-xs text-white cursor-pointer group">
                  <input type="checkbox" className="mt-0.5 rounded border-border bg-surface text-primary" />
                  <span className="group-hover:text-primary transition-colors">Issue $348.00 refund via Stripe API</span>
                </label>
                <label className="flex items-start gap-2 text-xs text-white cursor-pointer group">
                  <input type="checkbox" className="mt-0.5 rounded border-border bg-surface text-primary" />
                  <span className="group-hover:text-primary transition-colors">Apply $50 courtesy credit to account</span>
                </label>
              </div>
            </div>
          </div>
        )}

        <hr className="border-border my-6" />

        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" /> AI Audit Trail
        </h3>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-4 h-4 rounded-full border border-border bg-surface text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-background p-3 rounded border border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-primary uppercase">Classification</span>
                <span className="text-[10px] text-text-secondary">15m ago</span>
              </div>
              <p className="text-xs text-white">Routed to Billing. Confidence: 99%</p>
            </div>
          </div>
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-4 h-4 rounded-full border border-status-danger bg-status-danger/20 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-status-danger/10 p-3 rounded border border-status-danger/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-status-danger uppercase">Escalation</span>
                <span className="text-[10px] text-text-secondary">15m ago</span>
              </div>
              <p className="text-xs text-white">Triggered by threat keywords & high tier.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
