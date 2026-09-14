import { Users, Search } from 'lucide-react';

export default function CustomersPage() {
  return (
    <div className="p-8 h-full overflow-y-auto bg-background">
      <h1 className="text-2xl font-bold text-white mb-6">Customer Directory</h1>
      <div className="bg-surface border border-border rounded-xl p-1 overflow-hidden">
        <table className="w-full text-left text-sm text-text-secondary">
          <thead className="bg-white/5 text-white">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Tier</th>
              <th className="px-4 py-3 font-medium">LTV</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">Sarah Jenkins</td>
              <td className="px-4 py-3">sarah@example.com</td>
              <td className="px-4 py-3"><span className="text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold uppercase">Platinum</span></td>
              <td className="px-4 py-3">$2,400.00</td>
            </tr>
            <tr className="border-t border-border hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">Michael Chen</td>
              <td className="px-4 py-3">michael.chen@example.com</td>
              <td className="px-4 py-3"><span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded font-bold uppercase">Gold</span></td>
              <td className="px-4 py-3">$1,240.00</td>
            </tr>
            <tr className="border-t border-border hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">Emma Watson</td>
              <td className="px-4 py-3">emma.w@example.com</td>
              <td className="px-4 py-3"><span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-bold uppercase">Standard</span></td>
              <td className="px-4 py-3">$120.00</td>
            </tr>
            <tr className="border-t border-border hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">David Smith</td>
              <td className="px-4 py-3">david.smith@example.com</td>
              <td className="px-4 py-3"><span className="text-xs bg-gray-400/20 text-gray-400 px-2 py-0.5 rounded font-bold uppercase">Silver</span></td>
              <td className="px-4 py-3">$450.00</td>
            </tr>
            <tr className="border-t border-border hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">Priya Patel</td>
              <td className="px-4 py-3">priya.p@example.com</td>
              <td className="px-4 py-3"><span className="text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold uppercase">Platinum</span></td>
              <td className="px-4 py-3">$3,100.50</td>
            </tr>
            <tr className="border-t border-border hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">James Wilson</td>
              <td className="px-4 py-3">j.wilson@example.com</td>
              <td className="px-4 py-3"><span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded font-bold uppercase">Gold</span></td>
              <td className="px-4 py-3">$890.00</td>
            </tr>
            <tr className="border-t border-border hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-white">Sophia Martinez</td>
              <td className="px-4 py-3">smartinez@example.com</td>
              <td className="px-4 py-3"><span className="text-xs bg-gray-400/20 text-gray-400 px-2 py-0.5 rounded font-bold uppercase">Silver</span></td>
              <td className="px-4 py-3">$340.25</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
