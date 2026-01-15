import React, { useState } from 'react';
import { Users, Mail, Send, Calendar, PieChart, Video, FileText, CheckSquare, BarChart3, AlertCircle } from 'lucide-react';

export const CampaignDashboard: React.FC = () => {
    const [selectedAudience, setSelectedAudience] = useState<string>('');
    const [campaignType, setCampaignType] = useState<'interview' | 'test' | 'survey'>('interview');
    const [step, setStep] = useState<number>(1);

    const audiences = [
        { id: 'fe_devs', name: 'Frontend Developers', count: 142, tags: ['React', 'Mid-Senior'] },
        { id: 'sales_team', name: 'Sales Associates', count: 89, tags: ['Sales', 'Junior'] },
        { id: 'managers', name: 'Product Managers', count: 34, tags: ['Product', 'Senior'] },
    ];

    return (
        <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">

            {/* Header / Wizard Progress */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                        <Mail className="text-accent-orange" />
                        Campaign Studio
                    </h2>
                    <p className="text-slate-400 text-xs mt-1">Design and dispatch assessment campaigns to your talent pool.</p>
                </div>
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= s ? 'bg-accent-orange shadow-glow' : 'bg-white/10'}`}></div>
                    ))}
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">

                {/* Left Column: Configuration */}
                <div className="lg:col-span-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">

                    {/* Audience Segment Selection */}
                    <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Users size={120} />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Users size={16} className="text-primary" /> 1. Select Audience
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {audiences.map((aud) => (
                                <button
                                    key={aud.id}
                                    onClick={() => setSelectedAudience(aud.id)}
                                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${selectedAudience === aud.id
                                        ? 'bg-primary/20 border-primary text-white shadow-glow'
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'}`}
                                >
                                    <h4 className="font-bold text-sm mb-1">{aud.name}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs bg-black/30 px-2 py-0.5 rounded text-slate-300">{aud.count} Candidates</span>
                                        {selectedAudience === aud.id && <div className="size-2 bg-primary rounded-full shadow-glow animate-pulse"></div>}
                                    </div>
                                </button>
                            ))}
                            <button className="p-4 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all gap-2">
                                <span className="material-symbols-outlined text-2xl">add_circle</span>
                                <span className="text-xs font-bold uppercase tracking-wide">New Segment</span>
                            </button>
                        </div>
                    </div>

                    {/* Campaign Type Selection */}
                    <div className="glass-panel p-6 rounded-3xl border border-white/5">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                            <PieChart size={16} className="text-accent-pink" /> 2. Assessment Type
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: 'interview', icon: Video, label: 'AI Interview', color: 'text-blue-400' },
                                { id: 'test', icon: FileText, label: 'Graphic Test', color: 'text-purple-400' },
                                { id: 'survey', icon: CheckSquare, label: 'Survey', color: 'text-emerald-400' }
                            ].map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setCampaignType(type.id as any)}
                                    className={`h-24 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${campaignType === type.id
                                        ? 'bg-white/10 border-white/30 shadow-lg scale-105'
                                        : 'bg-black/20 border-white/5 hover:bg-white/5 opacity-60 hover:opacity-100'}`}
                                >
                                    <type.icon className={type.color} size={28} />
                                    <span className={`text-xs font-black uppercase tracking-wider ${campaignType === type.id ? 'text-white' : 'text-slate-500'}`}>{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Campaign Details / Schedule */}
                    <div className="glass-panel p-6 rounded-3xl border border-white/5">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Calendar size={16} className="text-accent-orange" /> 3. Configuration
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Campaign Name</label>
                                <input type="text" placeholder="e.g., Q1 Frontend Hiring Drive" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-orange/50 transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Instructions</label>
                                <input type="text" placeholder="Subject line for email..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-orange/50 transition-colors" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Preview & Launch */}
                <div className="lg:col-span-4 flex flex-col h-full glass-panel border-white/5 rounded-3xl p-6 relative bg-gradient-to-b from-white/5 to-black/40">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Summary</h3>

                    <div className="space-y-6 flex-1">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">Target Audience</span>
                            <span className="text-xs font-bold text-white uppercase">{selectedAudience ? audiences.find(a => a.id === selectedAudience)?.name : 'Not Selected'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">Campaign Type</span>
                            <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                                {campaignType === 'interview' && <Video size={12} className="text-blue-400" />}
                                {campaignType === 'test' && <FileText size={12} className="text-purple-400" />}
                                {campaignType === 'survey' && <CheckSquare size={12} className="text-emerald-400" />}
                                {campaignType.replace('-', ' ')}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">Est. Reach</span>
                            <span className="text-xs font-bold text-white uppercase">{selectedAudience ? audiences.find(a => a.id === selectedAudience)?.count : 0} Candidates</span>
                        </div>

                        <div className="bg-accent-orange/10 border border-accent-orange/20 rounded-xl p-4 mt-8">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={16} className="text-accent-orange shrink-0 mt-0.5" />
                                <p className="text-[10px] text-accent-orange/80 leading-relaxed font-medium">
                                    Campaigns will be sent immediately. Candidates will receive a magic link to access the {campaignType} platform.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-white text-black rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all shadow-xl flex items-center justify-center gap-3 mt-6 group">
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        Launch Campaign
                    </button>
                </div>
            </div>
        </div>
    );
};
