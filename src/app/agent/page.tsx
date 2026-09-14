'use client';

import { Search, Filter, Box, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

// Mock Kanban Data
const mockTickets = [
  { id: '1', customer: 'Sarah Jenkins', tier: 'Platinum', subject: 'Missing Order #4521', intent: 'Orders', sentiment: 'Frustrated', urgency: 'High', score: 72, time: '2m ago', agent: 'Orders AI', status: 'escalated' },
  { id: '2', customer: 'Michael Chen', tier: 'Gold', subject: 'Double charged on invoice', intent: 'Billing', sentiment: 'Angry', urgency: 'Critical', score: 95, time: '15m ago', agent: 'Billing AI', status: 'open' },
  { id: '3', customer: 'Emma Watson', tier: 'Standard', subject: 'How to reset password?', intent: 'Account', sentiment: 'Neutral', urgency: 'Low', score: 10, time: '1h ago', agent: 'Account AI', status: 'resolved' },
  { id: '4', customer: 'David Smith', tier: 'Silver', subject: 'Defective product received', intent: 'Orders', sentiment: 'Frustrated', urgency: 'Medium', score: 45, time: '5m ago', agent: 'Orders AI', status: 'in_progress' }
];

export default function AgentQueuePage() {
  const renderCard = (ticket: any) => (
    <Link href={`/agent/ticket/${ticket.id}`} key={ticket.id} className="block group">
      <div className={`glass-card p-4 rounded-xl border-l-4 mb-3 cursor-pointer ${
        ticket.status === 'escalated' ? 'border-l-status-danger shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse-glow' : 
        ticket.urgency === 'Critical' ? 'border-l-urgency-critical' :
        ticket.urgency === 'High' ? 'border-l-urgency-high' :
        ticket.urgency === 'Medium' ? 'border-l-urgency-medium' :
        'border-l-urgency-low'
      }`}>
        {ticket.status === 'escalated' && (
          <div className="bg-status-danger/20 text-status-danger text-[10px] font-bold uppercase px-2 py-0.5 rounded-full inline-flex items-center gap-1 mb-2">
            <AlertTriangle className="w-3 h-3" />
            Escalated
          </div>
        )}
        
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-sm text-white group-hover:text-primary transition-colors line-clamp-1">{ticket.subject}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-text-secondary">{ticket.customer}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                ticket.tier === 'Platinum' ? 'bg-slate-300 text-slate-800' :
                ticket.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-500' :
                ticket.tier === 'Silver' ? 'bg-gray-400/20 text-gray-400' :
                'bg-slate-700 text-slate-300'
              }`}>{ticket.tier}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3 mt-3">
          <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
            <Box className="w-3 h-3" /> {ticket.intent}
          </span>
          <span className={`border text-[10px] px-2 py-0.5 rounded ${
            ticket.sentiment === 'Angry' ? 'bg-sentiment-angry/10 border-sentiment-angry/20 text-sentiment-angry' :
            ticket.sentiment === 'Frustrated' ? 'bg-sentiment-frustrated/10 border-sentiment-frustrated/20 text-sentiment-frustrated' :
            ticket.sentiment === 'Positive' ? 'bg-sentiment-positive/10 border-sentiment-positive/20 text-sentiment-positive' :
            'bg-sentiment-neutral/10 border-sentiment-neutral/20 text-sentiment-neutral'
          }`}>
            {ticket.sentiment}
          </span>
          <span className="bg-surfaceLight border border-border text-text-secondary text-[10px] px-2 py-0.5 rounded">
            Score: {ticket.score}
          </span>
        </div>

        <div className="flex justify-between items-center text-[10px] text-text-secondary border-t border-border pt-2">
          <span>{ticket.agent}</span>
          <span>{ticket.time}</span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top Stats Bar */}
      <div className="flex-shrink-0 grid grid-cols-4 gap-4 p-6 border-b border-border bg-surface/30">
        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary font-medium mb-1">Total Active</p>
            <p className="text-2xl font-bold text-status-info">12</p>
          </div>
        </div>
        <div className="bg-surface border border-status-danger/30 p-4 rounded-xl flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-status-danger/10 rounded-bl-full"></div>
          <div>
            <p className="text-xs text-status-danger font-medium mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-status-danger animate-pulse"></span>
              Escalated
            </p>
            <p className="text-2xl font-bold text-white">3</p>
          </div>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary font-medium mb-1">Resolved Today</p>
            <p className="text-2xl font-bold text-status-success">148</p>
          </div>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary font-medium mb-1">Avg Response</p>
            <p className="text-2xl font-bold text-purple-400">1m 42s</p>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex-shrink-0 p-4 border-b border-border flex items-center justify-between bg-background">
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search tickets..." 
            className="w-full bg-surface border border-border rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-secondary hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-grow p-6 overflow-x-auto">
        <div className="flex gap-6 min-w-max h-full">
          {/* Column: Open */}
          <div className="w-80 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-status-info"></span>
                Open
              </h3>
              <span className="text-xs text-text-secondary bg-surface px-2 py-0.5 rounded-full">1</span>
            </div>
            <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
              {mockTickets.filter(t => t.status === 'open').map(renderCard)}
            </div>
          </div>

          {/* Column: In Progress */}
          <div className="w-80 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                In Progress
              </h3>
              <span className="text-xs text-text-secondary bg-surface px-2 py-0.5 rounded-full">1</span>
            </div>
            <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
              {mockTickets.filter(t => t.status === 'in_progress').map(renderCard)}
            </div>
          </div>

          {/* Column: Escalated */}
          <div className="w-80 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-semibold text-sm text-status-danger flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-status-danger animate-pulse"></span>
                Escalated
              </h3>
              <span className="text-xs text-status-danger bg-status-danger/10 px-2 py-0.5 rounded-full">1</span>
            </div>
            <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
              {mockTickets.filter(t => t.status === 'escalated').map(renderCard)}
            </div>
          </div>

          {/* Column: Resolved */}
          <div className="w-80 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-semibold text-sm text-status-success flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-status-success"></span>
                Resolved
              </h3>
              <span className="text-xs text-text-secondary bg-surface px-2 py-0.5 rounded-full">1</span>
            </div>
            <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 opacity-60 hover:opacity-100 transition-opacity">
              {mockTickets.filter(t => t.status === 'resolved').map(renderCard)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
