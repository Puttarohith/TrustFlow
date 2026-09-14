'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Box, Shield, CreditCard, Wrench, MoreVertical, Star, MessageCircle, CheckCircle, MapPin, Package, Truck, Check, Wallet, Coins } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Types
type Message = {
  id: string;
  sender: 'customer' | 'ai' | 'human';
  agentType?: 'orders' | 'billing' | 'technical' | 'account' | 'human';
  content: string;
  timestamp: string;
  analysis?: {
    intent: string;
    urgency: string;
    sentiment: string;
    routingReason: string;
  };
};

import { useTickets } from '@/hooks/use-tickets';

export default function CustomerChatPage() {
  const { tickets, updateTicket } = useTickets();
  const ticket = tickets.find(t => t.id === '1') || tickets[0];
  const messages = ticket?.messages || [];

  const [inputValue, setInputValue] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isEscalated = ticket?.status === 'escalated';
  const isResolved = ticket?.status === 'resolved';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!ticket) {
    return <div className="p-8 text-white">Connecting to chat...</div>;
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputValue.trim() && !attachmentName) || !ticket || isResolved || isEscalated) return;

    const finalContent = attachmentName 
      ? `${inputValue}\n\n[Attached: ${attachmentName}]`
      : inputValue;

    // Add user message
    const userMessage: any = {
      id: Date.now().toString(),
      sender: 'customer',
      content: finalContent.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    updateTicket(ticket.id, { messages: [...messages, userMessage] });
    setInputValue('');
    setAttachmentName('');
    setIsTyping(true);

    try {
      // Call the API
      const response = await fetch('/api/chat/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputValue,
          ticketId: 1, // Mock ticket ID
          customerId: 1, // Mock customer ID
          agentType: 'orders_agent'
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setIsTyping(false);

      if (data.reply) {
        const aiResponse: any = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          agentType: 'orders',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          widget: data.widget,
          analysis: {
            intent: 'orders',
            urgency: 'high',
            sentiment: inputValue.toLowerCase().includes('angry') || inputValue.toLowerCase().includes('human') ? 'frustrated' : 'neutral',
            routingReason: 'Routed based on semantic similarity to order delay queries.'
          }
        };

        const updates: any = {
          messages: [...messages, userMessage, aiResponse],
          status: data.escalated ? 'escalated' : ticket.status,
          time: 'Just now'
        };

        if (data.briefing) {
          updates.briefing = data.briefing;
        }

        updateTicket(ticket.id, updates);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsTyping(false);
      // Fallback message
      const fallbackMsg: any = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        agentType: 'orders',
        content: "I'm sorry, I'm having trouble connecting right now. Let me transfer you to a human agent.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      updateTicket(ticket.id, { messages: [...messages, userMessage, fallbackMsg] });
    }
  };

  const getAgentIcon = (type?: string) => {
    switch(type) {
      case 'orders': return <Box className="w-5 h-5" />;
      case 'billing': return <CreditCard className="w-5 h-5" />;
      case 'technical': return <Wrench className="w-5 h-5" />;
      case 'account': return <Shield className="w-5 h-5" />;
      default: return <MessageCircle className="w-5 h-5" />;
    }
  };

  const getAgentColor = (type?: string) => {
    switch(type) {
      case 'orders': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'billing': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'technical': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'account': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'human': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-md flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border", getAgentColor('orders'))}>
            {getAgentIcon('orders')}
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">Orders Specialist</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-status-success animate-pulse"></div>
              <span className="text-xs text-text-secondary">Online • AI Agent</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-2.5 py-1 rounded border border-status-info/30 bg-status-info/10 text-status-info text-xs font-semibold">
            TICKET OPEN
          </span>
          <button className="text-text-secondary hover:text-white transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Resolved Banner */}
      {isResolved && (
        <div className="bg-status-success/10 border-b border-status-success/30 p-4 flex flex-col items-center justify-center text-center animate-in slide-in-from-top duration-300">
          <h3 className="text-status-success font-bold text-sm flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4" />
            Ticket Resolved
          </h3>
          <p className="text-xs text-text-secondary max-w-md">
            This conversation has been marked as resolved. If you need further assistance, please open a new ticket.
          </p>
        </div>
      )}

      {/* Escalation Banner */}
      {isEscalated && !isResolved && (
        <div className="bg-status-danger/10 border-b border-status-danger/30 p-4 flex flex-col items-center justify-center text-center animate-in slide-in-from-top duration-300">
          <h3 className="text-status-danger font-bold text-sm flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4" />
            Escalated to Human Agent
          </h3>
          <p className="text-xs text-text-secondary max-w-md">
            A human agent has been notified and will join shortly. Average wait time is currently 3-5 minutes.
          </p>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex w-full", msg.sender === 'customer' ? 'justify-end' : 'justify-start')}>
            <div className={cn(
              "max-w-[70%] rounded-2xl p-4 shadow-sm",
              msg.sender === 'customer' 
                ? "bg-primary text-white rounded-br-none" 
                : "bg-surface border border-border rounded-bl-none"
            )}>
              {/* Agent Badge (if AI/Human) */}
              {msg.sender !== 'customer' && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                  <div className={cn("w-5 h-5 rounded-sm flex items-center justify-center", getAgentColor(msg.agentType))}>
                    {getAgentIcon(msg.agentType)}
                  </div>
                  <span className="text-xs font-bold text-text-secondary">
                    {msg.agentType === 'human' ? 'Human Agent' : 'AI Specialist'}
                  </span>
                  <span className="text-xs text-text-secondary ml-auto">{msg.timestamp}</span>
                </div>
              )}
              
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>

              {/* Generative UI Widgets */}
              {msg.widget === 'order_tracking' && (
                <div className="mt-4 p-4 bg-background border border-border rounded-xl">
                  <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2"><Package className="w-4 h-4 text-primary" /> Live Tracking: #9021</h4>
                  <div className="relative pl-4 space-y-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-border">
                    <div className="relative flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-primary z-10 ring-4 ring-background"></div>
                      <div><p className="text-xs font-bold text-white">Shipped</p><p className="text-[10px] text-text-secondary">Sept 10, 10:00 AM</p></div>
                    </div>
                    <div className="relative flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse z-10 ring-4 ring-background"></div>
                      <div><p className="text-xs font-bold text-white">Out for Delivery</p><p className="text-[10px] text-primary">Today, 8:30 AM</p></div>
                    </div>
                    <div className="relative flex items-center gap-3 opacity-50">
                      <div className="w-3 h-3 rounded-full bg-surface border border-border z-10 ring-4 ring-background"></div>
                      <div><p className="text-xs font-bold text-white">Delivered</p><p className="text-[10px] text-text-secondary">Pending</p></div>
                    </div>
                  </div>
                </div>
              )}

              {msg.widget === 'refund_selector' && (
                <div className="mt-4 flex flex-col gap-2">
                  <button className="flex items-center justify-between p-3 bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors text-left group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-md text-primary"><Coins className="w-4 h-4" /></div>
                      <div><p className="text-xs font-bold text-white group-hover:text-primary transition-colors">Store Credit (+10% Bonus)</p><p className="text-[10px] text-primary/70">Instant • $382.80 Total</p></div>
                    </div>
                  </button>
                  <button className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg hover:border-white/20 transition-colors text-left group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-md text-text-secondary group-hover:text-white transition-colors"><Wallet className="w-4 h-4" /></div>
                      <div><p className="text-xs font-bold text-white">Original Payment Method</p><p className="text-[10px] text-text-secondary">3-5 Business Days • $348.00</p></div>
                    </div>
                  </button>
                </div>
              )}

              {/* AI Analysis Dropdown (Mocked Expansion) */}
              {msg.analysis && (
                <details className="mt-3 pt-3 border-t border-white/10 text-xs">
                  <summary className="cursor-pointer text-text-secondary hover:text-white transition-colors font-medium">
                    📊 Why this response?
                  </summary>
                  <div className="mt-2 space-y-1.5 p-2 bg-background/50 rounded-md">
                    <p><span className="text-text-secondary">Intent:</span> <span className="text-indigo-400">{msg.analysis.intent}</span></p>
                    <p><span className="text-text-secondary">Urgency:</span> <span className="text-status-warning">{msg.analysis.urgency}</span></p>
                    <p><span className="text-text-secondary">Sentiment:</span> <span className="text-status-danger">{msg.analysis.sentiment}</span></p>
                    <p className="text-text-secondary italic mt-1 border-t border-white/5 pt-1">
                      "{msg.analysis.routingReason}"
                    </p>
                  </div>
                </details>
              )}

              {msg.sender === 'customer' && (
                <div className="text-[10px] text-white/70 text-right mt-1">{msg.timestamp}</div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex w-full justify-start animate-in fade-in">
            <div className="bg-surface border border-border rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></span>
              </div>
              <span className="text-xs text-text-secondary ml-2">Orders Agent is typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface border-t border-border">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto flex items-end gap-2">
          <input 
            type="file" 
            id="customer-file-upload" 
            className="hidden" 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setAttachmentName(e.target.files[0].name);
              }
            }}
          />
          <button 
            type="button" 
            disabled={isResolved || isEscalated}
            onClick={() => document.getElementById('customer-file-upload')?.click()}
            className="p-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors flex-shrink-0 disabled:opacity-50"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-grow flex flex-col gap-2">
            {attachmentName && (
              <div className="self-start inline-flex items-center gap-2 bg-white/10 text-white text-xs px-3 py-1.5 rounded-full mt-2 ml-2">
                <Paperclip className="w-3 h-3" />
                {attachmentName}
                <button type="button" onClick={() => setAttachmentName('')} className="hover:text-status-danger ml-1">✕</button>
              </div>
            )}
            <div className="relative flex-grow bg-background border border-border rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isResolved || isEscalated}
                placeholder={isResolved ? "This ticket has been resolved." : isEscalated ? "Waiting for a human agent..." : "Describe your issue... (e.g. 'My order #4521 hasn't arrived yet')"}
                className="w-full bg-transparent p-4 text-sm text-white resize-none outline-none max-h-32 min-h-[56px] custom-scrollbar disabled:opacity-50"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={(!inputValue.trim() && !attachmentName) || isTyping || isResolved || isEscalated}
            className="p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="text-center mt-3 text-xs text-text-secondary flex items-center justify-center gap-1.5">
          <Shield className="w-3 h-3" />
          Powered by TrustFlow AI • Secure & Private
        </div>
      </div>
    </div>
  );
}
