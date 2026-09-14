'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Clock, AlertTriangle, MessageCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const ticketVolumeData: any = {
  '7d': [
    { name: 'Mon', total: 40, resolved: 38 },
    { name: 'Tue', total: 45, resolved: 42 },
    { name: 'Wed', total: 30, resolved: 29 },
    { name: 'Thu', total: 60, resolved: 55 },
    { name: 'Fri', total: 55, resolved: 52 },
    { name: 'Sat', total: 20, resolved: 19 },
    { name: 'Sun', total: 25, resolved: 24 },
  ],
  '30d': [
    { name: 'Week 1', total: 400, resolved: 380 },
    { name: 'Week 2', total: 450, resolved: 420 },
    { name: 'Week 3', total: 300, resolved: 290 },
    { name: 'Week 4', total: 600, resolved: 550 },
  ],
  '90d': [
    { name: 'Month 1', total: 1600, resolved: 1520 },
    { name: 'Month 2', total: 1850, resolved: 1750 },
    { name: 'Month 3', total: 2100, resolved: 1980 },
  ]
};

const categoryData = [
  { name: 'Orders', count: 1240 },
  { name: 'Billing', count: 850 },
  { name: 'Technical', count: 420 },
  { name: 'Account', count: 210 },
];

const statusData = [
  { name: 'Open', value: 45, color: '#3B82F6' },
  { name: 'In Progress', value: 85, color: '#4F46E5' },
  { name: 'Escalated', value: 12, color: '#EF4444' },
  { name: 'Resolved', value: 1240, color: '#10B981' },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="min-h-screen bg-background p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Customer Experience Analytics</h1>
            <p className="text-text-secondary">Track performance, AI resolution rates, and customer sentiment.</p>
          </div>
          <div className="flex gap-2 bg-surface border border-border p-1 rounded-lg">
            <button onClick={() => setTimeframe('7d')} className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${timeframe === '7d' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-text-secondary'}`}>Last 7d</button>
            <button onClick={() => setTimeframe('30d')} className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${timeframe === '30d' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-text-secondary'}`}>30d</button>
            <button onClick={() => setTimeframe('90d')} className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${timeframe === '90d' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-text-secondary'}`}>90d</button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><MessageCircle className="w-5 h-5" /></div>
              <h3 className="text-sm text-text-secondary font-medium">Total Tickets</h3>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-white">2,847</p>
              <span className="text-xs text-status-success flex items-center"><ArrowUpRight className="w-3 h-3"/> 12%</span>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 text-green-400 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
              <h3 className="text-sm text-text-secondary font-medium">Resolution Rate</h3>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-white">98.2%</p>
              <span className="text-xs text-status-success flex items-center"><ArrowUpRight className="w-3 h-3"/> 1.1%</span>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg"><BarChart3 className="w-5 h-5" /></div>
              <h3 className="text-sm text-text-secondary font-medium">AI Resolution</h3>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-white">78.5%</p>
              <span className="text-xs text-status-success flex items-center"><ArrowUpRight className="w-3 h-3"/> 4.3%</span>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><Clock className="w-5 h-5" /></div>
              <h3 className="text-sm text-text-secondary font-medium">Avg Response</h3>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-white">1m 42s</p>
              <span className="text-xs text-status-success flex items-center"><ArrowDownRight className="w-3 h-3"/> 12s</span>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border-status-danger/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-status-danger/5 rounded-bl-full"></div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-status-danger/20 text-status-danger rounded-lg relative">
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-status-danger animate-pulse"></span>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-sm text-status-danger font-medium">Active Escalations</h3>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-white">12</p>
              <span className="text-xs text-status-success flex items-center"><ArrowDownRight className="w-3 h-3"/> 3</span>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg"><Users className="w-5 h-5" /></div>
              <h3 className="text-sm text-text-secondary font-medium">Churn Risk</h3>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-white">45</p>
              <span className="text-xs text-status-danger flex items-center"><ArrowUpRight className="w-3 h-3"/> 8</span>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2 glass-card p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-white">Ticket Volume & Resolution</h3>
              <button 
                onClick={(e) => {
                  const btn = e.currentTarget;
                  btn.textContent = 'Exported!';
                  setTimeout(() => btn.textContent = 'Export CSV', 2000);
                }}
                className="text-xs text-primary hover:text-primary-dark transition-colors"
              >
                Export CSV
              </button>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ticketVolumeData[timeframe]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D2D44" vertical={false} />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A2E', borderColor: '#2D2D44', borderRadius: '8px' }}
                    itemStyle={{ color: '#F1F5F9' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                  <Area type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-6">Tickets by Category</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D2D44" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <Tooltip 
                    cursor={{ fill: '#ffffff0a' }}
                    contentStyle={{ backgroundColor: '#1A1A2E', borderColor: '#2D2D44', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" fill="#4F46E5" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Churn Risk Table */}
        <div className="glass-card p-6 rounded-xl border border-orange-500/20">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">⚠️</span>
            <h3 className="text-lg font-bold text-white">Customers at Risk of Leaving</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-text-secondary uppercase border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Tier</th>
                  <th className="px-4 py-3 font-medium">Churn Score</th>
                  <th className="px-4 py-3 font-medium">Recent Issue</th>
                  <th className="px-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 font-medium text-white">Sarah Jenkins</td>
                  <td className="px-4 py-4"><span className="bg-slate-200 text-slate-800 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Platinum</span></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-status-danger w-[85%]"></div>
                      </div>
                      <span className="text-status-danger font-bold text-xs">85/100</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-text-secondary truncate max-w-[200px]">Order delayed 12 days, 3 previous complaints</td>
                  <td className="px-4 py-4 text-right">
                    <button className="text-primary hover:text-white text-xs font-bold transition-colors">Reach Out</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 font-medium text-white">Michael Chen</td>
                  <td className="px-4 py-4"><span className="bg-yellow-500/20 text-yellow-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Gold</span></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[72%]"></div>
                      </div>
                      <span className="text-orange-500 font-bold text-xs">72/100</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-text-secondary truncate max-w-[200px]">Double billed on invoice #9021</td>
                  <td className="px-4 py-4 text-right">
                    <button className="text-primary hover:text-white text-xs font-bold transition-colors">Reach Out</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
