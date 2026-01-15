import React from 'react';
import { TrendingUp, Search, Bell, Sparkles, User, ChevronRight, BrainCircuit, Target, Award, BarChart3, ShieldAlert, Share2, Zap, LayoutDashboard, Binary } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// --- Screen: Reskilling Matrix ---
export const ReskillingMatrix: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-fade-in relative pb-4">

            {/* Header / Top Bar */}
            <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5">
                        <TrendingUp size={24} className="text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight">Reskilling Matrix</h2>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">Talent Opportunity Distribution</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center bg-surface-dark rounded-xl px-4 py-2 w-72 border border-glass-border focus-within:border-primary/50 transition-all shadow-inner">
                        <Search size={18} className="text-slate-500" />
                        <input
                            className="bg-transparent border-none text-sm text-white focus:ring-0 w-full placeholder:text-slate-600 font-medium ml-2"
                            placeholder="Buscar talentos..."
                            type="text"
                        />
                    </div>
                    <button className="size-10 rounded-xl bg-surface-dark border border-glass-border flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-surface-dark"></span>
                    </button>
                    <button className="px-6 py-2.5 bg-primary hover:bg-primary-glow text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
                        <Share2 size={14} /> Exportar
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                {/* AI Insight Card */}
                <div className="glass-panel rounded-2xl p-[1px] bg-gradient-to-r from-primary/40 via-purple-500/20 to-transparent">
                    <div className="bg-surface-dark/40 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 border border-white/5">
                        <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary shadow-glow">
                            <Sparkles size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-black text-[10px] uppercase tracking-widest mb-0.5">AI Strategic Insight</h3>
                            <p className="text-slate-400 text-sm font-medium">
                                Se han detectado <span className="text-primary font-black">42 candidatos</span> con alta auto-eficacia y un match técnico superior al 80%.
                            </p>
                        </div>
                        <ChevronRight size={20} className="text-slate-600 mr-2" />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
                    {/* Matrix Visualization */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col">
                        <div className="flex-1 glass-panel rounded-3xl p-8 flex flex-col border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-black text-white tracking-tight">Distribución de Readiness</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Performance vs. Long-term Potential</p>
                                </div>
                                <div className="flex lg:flex-row flex-col gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-glass-border">
                                        <div className="size-2 rounded-full bg-primary shadow-glow"></div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Engineering</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-glass-border">
                                        <div className="size-2 rounded-full bg-purple-500"></div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Product</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 relative bg-black/20 rounded-2xl border border-glass-border overflow-hidden">
                                {/* Matrix Grid Lines */}
                                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                                    <div className="border-r border-b border-dashed border-white/10 p-6 flex flex-col justify-between">
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">High Impact</span>
                                    </div>
                                    <div className="border-b border-dashed border-white/10 p-6 flex flex-col items-end justify-between bg-primary/5">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Prime Talent</span>
                                    </div>
                                    <div className="border-r border-dashed border-white/10 p-6 flex flex-col justify-end">
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Developing</span>
                                    </div>
                                    <div className="p-6 flex flex-col items-end justify-end">
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Quick Wins</span>
                                    </div>
                                </div>

                                {/* Placeholder Data Points */}
                                <div className="absolute left-[72%] bottom-[78%] group cursor-pointer">
                                    <div className="size-4 bg-primary rounded-full shadow-glow ring-4 ring-primary/20 transition-all group-hover:scale-150 relative z-10"></div>
                                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                        <p className="text-[10px] font-black text-white px-2">Sarah Jenkins (92%)</p>
                                    </div>
                                </div>
                                <div className="absolute left-[85%] bottom-[65%] group cursor-pointer">
                                    <div className="size-3.5 bg-primary/80 rounded-full shadow-glow transition-all group-hover:scale-150"></div>
                                </div>
                                <div className="absolute left-[65%] bottom-[85%] group cursor-pointer">
                                    <div className="size-3.5 bg-purple-500/80 rounded-full shadow-lg transition-all group-hover:scale-150"></div>
                                </div>
                                <div className="absolute left-[40%] bottom-[45%] group cursor-pointer">
                                    <div className="size-3 bg-slate-700 rounded-full transition-all group-hover:scale-150 hover:bg-slate-500"></div>
                                </div>
                                <div className="absolute left-[25%] bottom-[30%] group cursor-pointer">
                                    <div className="size-3 bg-slate-700 rounded-full transition-all group-hover:scale-150 hover:bg-slate-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side List */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col">
                        <div className="flex-1 glass-panel rounded-3xl flex flex-col border-white/5 shadow-2xl overflow-hidden">
                            <div className="p-6 border-b border-glass-border bg-black/20 flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                    <Award size={16} className="text-primary" />
                                    Prime Candidates
                                </h3>
                                <div className="px-2 py-1 bg-primary/10 rounded text-[10px] font-black text-primary border border-primary/20">TOP 12</div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                                {[
                                    { name: 'Sarah Jenkins', role: 'Senior QA Engineer', score: 92, img: 'https://i.pravatar.cc/150?u=sarah' },
                                    { name: 'Michael Chen', role: 'Fullstack Dev', score: 88, img: 'https://i.pravatar.cc/150?u=michael' },
                                    { name: 'Elena Rodriguez', role: 'Product Designer', score: 85, img: 'https://i.pravatar.cc/150?u=elena' },
                                    { name: 'David Smith', role: 'DevOps lead', score: 82, img: 'https://i.pravatar.cc/150?u=david' },
                                ].map((emp, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/30 transition-all group cursor-pointer shadow-lg active:scale-95">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="size-12 rounded-xl bg-center bg-cover border border-white/10 group-hover:border-primary/50 transition-colors shadow-xl" style={{ backgroundImage: `url(${emp.img})` }}></div>
                                                <div>
                                                    <h4 className="text-sm font-black text-white group-hover:text-primary transition-colors">{emp.name}</h4>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">{emp.role}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-black text-primary leading-none">{emp.score}%</div>
                                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Afinity</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="m-4 py-3 bg-white/5 border border-glass-border rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all">
                                Ver todos los candidatos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Screen: Skill Gap Analysis ---
export const SkillGapAnalysis: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-fade-in relative pb-4">
            {/* Header section moved inside the same structure as ReskillingMatrix for consistency */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5">
                            <Binary size={20} className="text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-black text-white tracking-tight">Organizational Skill Gap Analysis</h2>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Strategic Capability Roadmap</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center rounded-xl h-11 px-6 bg-surface-dark border border-glass-border text-white text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                        <Share2 size={16} className="mr-2 text-primary" /> Compartir Reporte
                    </button>
                    <button className="flex items-center justify-center rounded-xl h-11 px-6 bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-primary-glow transition-all shadow-xl shadow-primary/20">
                        <Zap size={16} className="mr-2" /> Ejecutar Análisis
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Overall Skill Readiness', value: '72%', trend: '+4% YoY', positive: true, icon: Target },
                        { label: 'Critical Skill Gaps', value: '14 Areas', trend: '+2 vs Q2', positive: false, icon: ShieldAlert },
                        { label: 'Learning Velocity', value: 'Fast', trend: 'Top 10%', positive: true, icon: BrainCircuit },
                    ].map((stat, i) => (
                        <div key={i} className="glass-panel rounded-2xl p-6 border-white/5 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <stat.icon size={48} className="text-primary" />
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{stat.label}</p>
                            <div className="flex items-end gap-3">
                                <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
                                <span className={`flex items-center text-[10px] font-black px-2 py-1 rounded-lg border ${stat.positive ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-primary bg-primary/10 border-primary/20'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 glass-panel rounded-3xl border-white/5 p-8 shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-black text-white tracking-tight">Heatmap de Brechas de Competencia</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Capacidad Actual vs. Requerimiento Estratégico</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest">Suficiente</div>
                                <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-[10px] font-black text-primary uppercase tracking-widest">Crítico</div>
                            </div>
                        </div>

                        <div className="w-full overflow-x-auto custom-scrollbar pb-4">
                            <div className="min-w-[600px]">
                                <div className="flex mb-4 items-center">
                                    <div className="w-40 flex-shrink-0 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Departamento</div>
                                    <div className="flex-1 grid grid-cols-4 gap-4 px-2 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        <div>Cloud Ops</div><div>GenAI / ML</div><div>Leadership</div><div>UX Design</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { name: 'Engineering', scores: [95, 42, 78, 81] },
                                        { name: 'Product', scores: [82, 88, 92, 45] },
                                        { name: 'Marketing', scores: [45, 62, 55, 94] },
                                        { name: 'Corporate', scores: [58, 35, 98, 42] },
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-center group">
                                            <div className="w-40 flex-shrink-0 text-xs font-black text-white group-hover:text-primary transition-colors">{row.name}</div>
                                            <div className="flex-1 grid grid-cols-4 gap-4 px-2 h-14">
                                                {row.scores.map((score, si) => (
                                                    <div
                                                        key={si}
                                                        className={`rounded-xl border flex items-center justify-center transition-all hover:scale-105 cursor-help shadow-lg ${score > 80 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                                            score > 50 ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                                                'bg-primary/20 border-primary/30 text-primary shadow-primary/10'
                                                            }`}
                                                    >
                                                        <span className="text-xs font-black">{score}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Insights Side Panel */}
                    <div className="space-y-6">
                        <div className="glass-panel rounded-3xl border-white/5 p-6 shadow-2xl bg-primary/5">
                            <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                                <ShieldAlert size={14} /> Critical Mitigation Needed
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl bg-surface-dark border border-primary/20 shadow-xl">
                                    <p className="text-xs font-black text-white mb-2">GenAI Adaptation Gap</p>
                                    <div className="flex justify-between items-end">
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Engineering Dept</div>
                                        <div className="text-xl font-black text-primary">42%</div>
                                    </div>
                                    <div className="mt-3 h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary shadow-glow" style={{ width: '42%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-6 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary-glow transition-all">
                                Ver Plan de Reskilling
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Screen: Retention Risk ---
export const RetentionRisk: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-fade-in relative pb-4">
            {/* Header Section */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5">
                        <ShieldAlert size={24} className="text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight">Predictive Retention Risk</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">AI-Driven Workforce Stability Analysis</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center rounded-xl h-11 px-6 bg-surface-dark border border-glass-border text-white text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                        <Share2 size={16} className="mr-2 text-primary" /> Export Data
                    </button>
                    <button className="px-6 py-2.5 bg-primary hover:bg-primary-glow text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
                        <LayoutDashboard size={14} /> Full Report
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
                {/* Stats Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'High Risk Employees', value: '32', trend: '+4 this week', status: 'critical', icon: User },
                        { label: 'Avg. Retention Probability', value: '84%', trend: '-2% vs LTM', status: 'warning', icon: Target },
                        { label: 'Projected Attrition (Q4)', value: '4.2%', trend: 'Within range', status: 'stable', icon: BarChart3 },
                        { label: 'Replacement Cost Est.', value: '$240k', trend: 'Focus area', status: 'critical', icon: Award },
                    ].map((stat, i) => (
                        <div key={i} className="glass-panel rounded-2xl p-6 border-white/5 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg bg-primary/10 text-primary border border-primary/20`}>
                                    <stat.icon size={20} />
                                </div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-2xl font-black text-white tracking-tighter">{stat.value}</h3>
                                <span className={`text-[10px] font-black ${stat.status === 'critical' ? 'text-primary' : stat.status === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Analytical Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[450px]">
                    <div className="lg:col-span-2 glass-panel rounded-3xl p-8 border-white/5 shadow-2xl flex flex-col relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-black text-white tracking-tight">Risk Distribution Matrix</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Engagement vs. Performance Correlation</p>
                            </div>
                        </div>

                        <div className="flex-1 relative bg-black/20 rounded-2xl border border-glass-border overflow-hidden">
                            {/* Matrix Grid overlay */}
                            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none opacity-20">
                                <div className="border-r border-b border-dashed border-white"></div>
                                <div className="border-b border-dashed border-white"></div>
                                <div className="border-r border-dashed border-white"></div>
                            </div>

                            {/* Risk Data Points */}
                            <div className="absolute top-[20%] right-[15%] group cursor-pointer">
                                <div className="size-5 rounded-full bg-primary shadow-glow ring-4 ring-primary/20 group-hover:scale-150 transition-all"></div>
                                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                    <p className="text-[10px] font-black text-white">Sarah Jenkins (94% Risk)</p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Senior QA Engineer</p>
                                </div>
                            </div>

                            <div className="absolute top-[40%] right-[35%] group cursor-pointer text-primary/60">
                                <div className="size-4 rounded-full bg-current shadow-lg group-hover:scale-150 transition-all"></div>
                            </div>
                            <div className="absolute top-[60%] left-[25%] group cursor-pointer text-emerald-500/40">
                                <div className="size-4 rounded-full bg-current shadow-lg group-hover:scale-150 transition-all"></div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel rounded-3xl p-8 border-white/5 shadow-2xl flex flex-col">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Top Attrition Drivers (AI Model)</h3>
                        <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                            {[
                                { driver: 'Compensation Stagnation', impact: 42, icon: Award },
                                { driver: 'Lack of Role Clarity', impact: 28, icon: Target },
                                { driver: 'Burnout Indicator', impact: 18, icon: Zap },
                                { driver: 'Competitor Headhunting', impact: 12, icon: Search },
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-center text-xs mb-3">
                                        <div className="flex items-center gap-2">
                                            <item.icon size={14} className="text-primary opacity-60" />
                                            <span className="font-black text-white opacity-80 group-hover:opacity-100 transition-opacity">{item.driver}</span>
                                        </div>
                                        <span className="text-primary font-black">{item.impact}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="h-full bg-primary shadow-glow transition-all duration-1000"
                                            style={{ width: `${item.impact}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 bg-white/5 border border-glass-border text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-xl hover:bg-white/10 hover:text-white transition-all">
                            Retain Strategy Plan
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};