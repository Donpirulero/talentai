import React, { useMemo, useState } from 'react';
import {
    ArrowRight, BookOpen, Star, Briefcase, LayoutGrid, Award,
    Loader2, CheckCircle2, XCircle, BrainCircuit, TrendingUp,
    Map, Target, ShieldCheck, Zap, Users
} from 'lucide-react';
import { EMPLOYEES } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { RoleRecommendation, Employee } from '../types';
import { QuestionGenerator, Question } from '../services/agents/QuestionGenerator';
import { defaultAIService } from '../services/aiService';

const TalentBridge: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'ranking' | 'matching' | 'roadmap'>('matching');
    const [selectedRole, setSelectedRole] = useState<RoleRecommendation | null>(null);

    // Generator State for Roadmap
    const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
    const [generatedRoadmap, setGeneratedRoadmap] = useState<string[] | null>(null);

    // Find first employee for context (Demo focus)
    const employee = EMPLOYEES[0];

    // Ranking Logic (Centaur Priority: Synergy > Base Skill)
    const topTalents = useMemo(() => {
        return [...EMPLOYEES]
            .sort((a, b) => {
                // Prioritize those with high IA Boost (kappa - theta) or overall synergy
                const aBoost = (a.overallScore || 0) * 1.2; // Mocked weighting for synergy
                const bBoost = (b.overallScore || 0) * 1.2;
                return bBoost - aBoost;
            })
            .slice(0, 5);
    }, []);

    const handleGenerateRoadmap = () => {
        setIsGeneratingRoadmap(true);
        // Mock generation delay
        setTimeout(() => {
            setGeneratedRoadmap([
                "Phase 1: Advanced Prompt Engineering & RAG Architectures",
                "Phase 2: Cognitive Bias Mitigation in AI Teams",
                "Phase 3: Strategic Leadership for Hybrid Workforce",
                "Phase 4: Data Governance & Ethical AI Certification"
            ]);
            setIsGeneratingRoadmap(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full space-y-8 animate-fade-in pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-4">
                        <div className="size-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                            <Zap size={28} />
                        </div>
                        Talent Bridge & Matching
                    </h1>
                    <p className="text-slate-400 font-medium mt-2">
                        Ranking inteligente, algoritmos de matching y generación de hojas de ruta de carrera.
                    </p>
                </div>

                <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/5">
                    <button
                        onClick={() => setActiveTab('ranking')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'ranking' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        Ranking General
                    </button>
                    <button
                        onClick={() => setActiveTab('matching')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'matching' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        Matching
                    </button>
                    <button
                        onClick={() => setActiveTab('roadmap')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'roadmap' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        Hoja de Ruta
                    </button>
                </div>
            </div>

            {/* TAB CONTENT: RANKING */}
            {activeTab === 'ranking' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-900/50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                        <th className="px-8 py-5">Posición / Talento</th>
                                        <th className="px-8 py-5 text-center">Centaur Score (κ)</th>
                                        <th className="px-8 py-5 text-center">IA Boost</th>
                                        <th className="px-8 py-5 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {topTalents.map((emp, idx) => (
                                        <tr key={emp.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xl font-black text-slate-700 group-hover:text-emerald-500 transition-colors">#{idx + 1}</span>
                                                    <img src={emp.avatar} alt={emp.name} className="size-10 rounded-xl" />
                                                    <div>
                                                        <div className="text-white font-bold">{emp.name}</div>
                                                        <div className="text-slate-500 text-xs">{emp.currentRole}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg font-black text-sm">
                                                    {emp.overallScore}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center text-slate-300 font-bold">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-emerald-400 font-black">+{15 + idx * 2}%</span>
                                                    <span className="text-[8px] text-slate-500 uppercase">Synergy gain</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="p-2 text-slate-500 hover:text-emerald-400 transition-colors">
                                                    <ArrowRight size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col gap-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <TrendingUp className="text-emerald-500" />
                                Talent Growth Insights
                            </h3>
                            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                    Detectamos un incremento del <strong>12% en agilidad de aprendizaje</strong> en el departamento de Ingeniería este mes.
                                </p>
                                <button className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                                    Ver Reporte Detallado
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: MATCHING */}
            {activeTab === 'matching' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Role Sidebar */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-2">Roles Sugeridos</h3>
                        {employee.recommendations.map((role, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedRole(role)}
                                className={`w-full text-left p-5 rounded-2xl border transition-all flex justify-between items-center group ${selectedRole?.title === role.title ? 'bg-emerald-600 border-emerald-500 shadow-xl shadow-emerald-500/10' : 'bg-slate-900/50 border-white/5 hover:border-white/10'}`}
                            >
                                <div>
                                    <div className={`font-bold transition-colors ${selectedRole?.title === role.title ? 'text-white' : 'text-slate-200'}`}>{role.title}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1 opacity-60">Match Score</div>
                                </div>
                                <div className={`text-2xl font-black ${selectedRole?.title === role.title ? 'text-white' : 'text-emerald-500'}`}>{role.matchScore}%</div>
                            </button>
                        ))}
                    </div>

                    {/* Matching Detail */}
                    <div className="lg:col-span-2">
                        {selectedRole ? (
                            <div className="glass-panel p-10 rounded-3xl border border-white/5 space-y-10 animate-fade-in">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-6">
                                        <div className="size-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                            <Briefcase size={40} />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-white">{selectedRole.title}</h2>
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                                                    <Zap size={10} className="text-primary" />
                                                    <span className="text-[10px] font-black text-primary uppercase">Centaur Match</span>
                                                </div>
                                                <span className="text-emerald-400 font-bold">Sinergia: {selectedRole.matchScore}%</span>
                                                <span className="text-slate-600">|</span>
                                                <span className="text-slate-400 italic text-xs">High Theory of Mind (ToM) Detected</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-white text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-400 hover:text-white transition-all shadow-xl">
                                        Confirmar Movimiento
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <ShieldCheck size={14} className="text-emerald-500" />
                                            Skills Desarrolladas
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {employee.skills.slice(0, 5).map(s => (
                                                <span key={s.name} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-bold text-slate-300">
                                                    {s.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <Target size={14} className="text-orange-500" />
                                            Gaps de Competencia
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedRole.skillGaps.map(gap => (
                                                <span key={gap} className="px-3 py-1.5 bg-orange-500/5 border border-orange-500/20 rounded-lg text-xs font-bold text-orange-400">
                                                    {gap}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-slate-600 gap-6 p-20">
                                <Users size={64} opacity={0.1} />
                                <div className="text-center">
                                    <h4 className="text-xl font-bold text-slate-400 mb-2">Selecciona un rol para ver el análisis</h4>
                                    <p className="max-w-xs text-sm">Compara el perfil del colaborador con las vacantes o roles de crecimiento estratégico.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* TAB CONTENT: ROADMAP */}
            {activeTab === 'roadmap' && (
                <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
                    <div className="glass-panel p-12 rounded-3xl border border-white/5 text-center space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px]"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px]"></div>

                        <div className="flex flex-col items-center gap-6 relative z-10">
                            <div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <Map size={40} />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-4xl font-black text-white">Generador de Hoja de Ruta</h2>
                                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                                    Creamos un plan de carrera personalizado basado en Gaps de Skills y proyecciones de BioStack.
                                </p>
                            </div>
                            <button
                                onClick={handleGenerateRoadmap}
                                disabled={isGeneratingRoadmap}
                                className="px-12 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl transition-all disabled:opacity-50"
                            >
                                {isGeneratingRoadmap ? (
                                    <span className="flex items-center gap-3">
                                        <Loader2 className="animate-spin" /> Procesando BioData...
                                    </span>
                                ) : 'Generar Mi Ruta 2026'}
                            </button>
                        </div>

                        {generatedRoadmap && (
                            <div className="mt-12 text-left space-y-6 animate-slide-up relative z-10">
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 text-center">Plan Estratégico de Evolución</h4>
                                {generatedRoadmap.map((step, idx) => (
                                    <div key={idx} className="flex gap-6 group">
                                        <div className="flex flex-col items-center">
                                            <div className="size-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-emerald-500/20 relative z-10">
                                                {idx + 1}
                                            </div>
                                            {idx < generatedRoadmap.length - 1 && <div className="w-0.5 h-full bg-slate-800 -mt-1 group-hover:bg-emerald-500/30 transition-colors"></div>}
                                        </div>
                                        <div className="pb-10 pt-1 flex-1">
                                            <div className="p-6 bg-slate-900 border border-white/5 rounded-2xl group-hover:border-emerald-500/20 transition-all group-hover:translate-x-2">
                                                <p className="text-white font-bold leading-relaxed">{step}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TalentBridge;