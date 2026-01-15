import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, icon: Icon, trend }) => {
  return (
    <div className="glass-card rounded-3xl p-6 hover:border-primary/40 transition-all duration-500 group relative overflow-hidden">
      {/* Background glow on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3.5 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
            <Icon size={24} className="text-primary group-hover:text-white transition-colors" />
          </div>
          {change && (
            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-glow shadow-emerald-500/5' :
              trend === 'down' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-700/50 text-slate-300 border border-white/5'
              }`}>
              {change}
            </span>
          )}
        </div>
        <h3 className="text-slate-500 text-[10px] font-black mb-1.5 tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">{label}</h3>
        <p className="text-3xl font-black text-white tracking-tighter group-hover:text-glow transition-all">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;