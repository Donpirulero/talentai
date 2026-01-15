import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BrainCircuit, Target, Zap, Activity, Database,
    Share2, Heart, TrendingUp, BookOpen, Fingerprint,
    ArrowLeft, Award, Sparkles
} from 'lucide-react';
import { COMPETENCIES_CATALOG } from '../services/db';

const BioStackCatalog: React.FC = () => {
    const navigate = useNavigate();

    const getIcon = (name: string) => {
        if (name.includes('Crítico')) return <Target className="text-amber-400" />;
        if (name.includes('Teoría')) return <BrainCircuit className="text-emerald-400" />;
        if (name.includes('Creatividad')) return <Sparkles className="text-primary" />;
        if (name.includes('Adaptabilidad')) return <Activity className="text-blue-400" />;
        if (name.includes('Ingeniería')) return <Database className="text-purple-400" />;
        if (name.includes('Colaboración')) return <Share2 className="text-indigo-400" />;
        if (name.includes('Inteligencia')) return <Heart className="text-rose-400" />;
        if (name.includes('Anticipatorio')) return <TrendingUp className="text-orange-400" />;
        if (name.includes('Alfabetización')) return <BookOpen className="text-cyan-400" />;
        if (name.includes('Locus')) return <Fingerprint className="text-primary" />;
        return <Zap className="text-primary" />;
    };

    return (
        <div className="min-h-screen bg-background-dark p-8 animate-fade-in relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <button
                            onClick={() => navigate('/talent')}
                            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-4 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Directory
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/10">
                                <Award size={32} className="text-primary" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
                                    BioStack Catalog <span className="text-primary font-medium text-xl ml-2 tracking-widest">Industria 5.0</span>
                                </h1>
                                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">
                                    Strategic Competencies for the AI Agentic Era (2025-2030)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel px-6 py-4 rounded-2xl border-white/10 flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Curator</p>
                            <p className="text-sm font-bold text-white">CTO Psychology & Cognitive Science</p>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <Sparkles className="text-primary animate-pulse" />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {COMPETENCIES_CATALOG.map((comp, idx) => (
                        <div
                            key={idx}
                            className="group relative glass-panel rounded-3xl p-8 border-white/5 hover:border-primary/30 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/5 cursor-default overflow-hidden"
                        >
                            {/* Number Badge */}
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="text-8xl font-black text-white italic">{idx + 1}</span>
                            </div>

                            <div className="relative z-10 flex gap-6">
                                <div className="size-16 rounded-2xl bg-surface-dark border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-500 shadow-xl">
                                    {getIcon(comp.name)}
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-black text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                                            {comp.name}
                                        </h3>
                                        <div className="h-1 w-12 bg-primary/30 rounded-full mt-2 group-hover:w-full transition-all duration-700"></div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <div className="size-1 bg-primary rounded-full"></div>
                                                Definition
                                            </h4>
                                            <p className="text-slate-300 text-sm font-medium leading-relaxed">
                                                {comp.definition}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                                            <div>
                                                <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Cognitive Relevance</h4>
                                                <p className="text-slate-400 text-[11px] font-bold leading-normal">
                                                    {comp.relevanceCognitive}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Talent AI Application</h4>
                                                <p className="text-slate-400 text-[11px] font-bold leading-normal italic">
                                                    {comp.applicationTalentAi}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Proficiency Model Footer */}
                <div className="glass-panel rounded-3xl p-10 border-white/5 bg-gradient-to-br from-primary/5 to-transparent shadow-2xl">
                    <div className="flex items-center gap-3 mb-8">
                        <Database className="text-primary" />
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Structured Proficiency Model</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { level: 'Novato (N)', desc: 'Sigue reglas fijas, alta dependencia de la IA sin validación.', exp: '< 1 año' },
                            { level: 'Competente (C)', desc: 'Vea las acciones en términos de metas; usa la IA como copiloto estratégico.', exp: '2-3 años' },
                            { level: 'Experto (E)', desc: 'Visión intuitiva y fluida; orquesta sistemas de IA y audita la realidad con precisión.', exp: '4-5+ años' }
                        ].map((lvl, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-surface-dark/50 border border-white/5 space-y-3">
                                <h4 className="text-lg font-black text-white">{lvl.level}</h4>
                                <p className="text-slate-400 text-xs font-bold leading-relaxed">{lvl.desc}</p>
                                <div className="pt-2">
                                    <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg font-black text-[10px] uppercase">
                                        {lvl.exp} experiencia
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center pb-10">
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
                        Industrial 5.0 Framework • Talent AI Platform • 2025
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BioStackCatalog;
