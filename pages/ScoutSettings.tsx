import React, { useState } from 'react';
import { Bot, ChevronLeft, Plus, Trash2, GripVertical, Settings2, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const ScoutSettings: React.FC = () => {
    const { t, language } = useLanguage();

    // AI Agent settings
    const [aiSettings, setAiSettings] = useState(() => {
        const saved = localStorage.getItem('talentai_scout_settings');
        return saved ? JSON.parse(saved) : {
            name: 'Magui',
            profile: 'corporate',
            focus: ''
        };
    });

    // Rounds configuration
    const [rounds, setRounds] = useState(() => {
        const saved = localStorage.getItem('talentai_scout_rounds');
        return saved ? JSON.parse(saved) : [
            { id: '1', name: 'Technical Screening', type: 'technical', duration: 30, weight: 40 },
            { id: '2', name: 'Cultural Fit', type: 'soft', duration: 45, weight: 60 }
        ];
    });

    const handleSaveSettings = () => {
        localStorage.setItem('talentai_scout_settings', JSON.stringify(aiSettings));
        localStorage.setItem('talentai_scout_rounds', JSON.stringify(rounds));
        alert(language === 'es' ? 'Configuración guardada exitosamente' : 'Settings saved successfully');
    };

    const addRound = () => {
        const newRound = {
            id: Date.now().toString(),
            name: 'New Round',
            type: 'technical',
            duration: 30,
            weight: 0
        };
        setRounds([...rounds, newRound]);
    };

    const removeRound = (id: string) => {
        setRounds(rounds.filter((r: any) => r.id !== id));
    };

    const updateRound = (id: string, updates: any) => {
        setRounds(rounds.map((r: any) => r.id === id ? { ...r, ...updates } : r));
    };

    return (
        <div className="space-y-10 max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <Link to="/scout/interview" className="hover:text-white transition-colors flex items-center gap-1 font-bold text-xs uppercase tracking-widest">
                            <ChevronLeft size={14} />
                            Entrevista
                        </Link>
                        <span className="text-slate-800">/</span>
                        <span className="text-slate-200 font-bold text-xs uppercase tracking-widest">Configuración</span>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
                        <div className="size-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-cyan-500/20">
                            <Settings2 size={28} />
                        </div>
                        Configuración de Talent Scout
                    </h1>
                    <p className="text-slate-400 font-medium mt-2">
                        Define la personalidad de tu reclutador IA y estructura las etapas del proceso de selección.
                    </p>
                </div>
                <button
                    onClick={handleSaveSettings}
                    className="px-8 py-4 bg-white text-slate-950 hover:bg-cyan-400 hover:text-white active:scale-95 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-white/5"
                >
                    Guardar Configuración
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* AI Agent Personality */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <Bot className="text-cyan-400" />
                            Personalidad del Agente
                        </h3>

                        <div className="space-y-6">
                            <div className="group">
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 group-focus-within:text-cyan-400 transition-colors">
                                    Nombre del Agente
                                </label>
                                <input
                                    type="text"
                                    value={aiSettings.name}
                                    onChange={(e) => setAiSettings({ ...aiSettings, name: e.target.value })}
                                    className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder:text-slate-700 font-bold"
                                    placeholder="Magui"
                                />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 group-focus-within:text-cyan-400 transition-colors">
                                    Perfil Base
                                </label>
                                <select
                                    value={aiSettings.profile}
                                    onChange={(e) => setAiSettings({ ...aiSettings, profile: e.target.value })}
                                    className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all cursor-pointer font-bold"
                                >
                                    <option value="corporate">Corporativo / Formal</option>
                                    <option value="innovation">Innovación / Startupero</option>
                                    <option value="technical">Técnico Directo</option>
                                    <option value="soft">Empático / Soft Skills</option>
                                </select>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 group-focus-within:text-cyan-400 transition-colors">
                                    Instrucciones Específicas
                                </label>
                                <textarea
                                    value={aiSettings.focus}
                                    onChange={(e) => setAiSettings({ ...aiSettings, focus: e.target.value })}
                                    className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all h-60 resize-none placeholder:text-slate-700 text-sm leading-relaxed"
                                    placeholder="Define el enfoque de las preguntas, el tono de voz o aspectos específicos a indagar..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rounds Management */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl h-full flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <Target className="text-purple-400" />
                                Estructura de Rondas
                            </h3>
                            <button
                                onClick={addRound}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-purple-500/20"
                            >
                                <Plus size={14} />
                                Añadir Ronda
                            </button>
                        </div>

                        <div className="flex-1 space-y-4">
                            {rounds.map((round: any, index: number) => (
                                <div
                                    key={round.id}
                                    className="group p-5 bg-black/40 border border-white/5 hover:border-white/10 rounded-2xl transition-all flex items-center gap-6"
                                >
                                    <div className="text-slate-700 group-hover:text-slate-500 transition-colors">
                                        <GripVertical size={20} />
                                    </div>
                                    <div className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 font-black text-sm">
                                        {index + 1}
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                        <div className="md:col-span-5">
                                            <input
                                                type="text"
                                                value={round.name}
                                                onChange={(e) => updateRound(round.id, { name: e.target.value })}
                                                className="w-full bg-transparent border-none text-white font-bold p-0 focus:ring-0 placeholder:text-slate-700"
                                                placeholder="Nombre de la ronda"
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <select
                                                value={round.type}
                                                onChange={(e) => updateRound(round.id, { type: e.target.value })}
                                                className="w-full bg-slate-800/50 border-none text-slate-400 text-xs font-bold rounded-lg py-1 px-2 focus:ring-0"
                                            >
                                                <option value="technical">Technical</option>
                                                <option value="soft">Soft Skills</option>
                                                <option value="leadership">Leadership</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2 flex items-center gap-2 text-slate-500">
                                            <Clock size={14} />
                                            <input
                                                type="number"
                                                value={round.duration}
                                                onChange={(e) => updateRound(round.id, { duration: parseInt(e.target.value) })}
                                                className="w-12 bg-transparent border-none text-white font-bold text-xs p-0 focus:ring-0"
                                            />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">min</span>
                                        </div>
                                        <div className="md:col-span-2 flex items-center gap-2">
                                            <input
                                                type="number"
                                                value={round.weight}
                                                onChange={(e) => updateRound(round.id, { weight: parseInt(e.target.value) })}
                                                className="w-12 bg-slate-800/50 border-none text-cyan-400 font-black text-center text-xs rounded-lg py-1 px-2 focus:ring-0"
                                            />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">%</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeRound(round.id)}
                                        className="text-slate-700 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}

                            {rounds.length === 0 && (
                                <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-slate-600 gap-4">
                                    <Target size={32} opacity={0.2} />
                                    <p className="font-bold text-sm tracking-widest uppercase">No has definido rondas todavía</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Peso Total:</span>
                                <span className={`font-black text-xl ${rounds.reduce((acc: number, r: any) => acc + (r.weight || 0), 0) === 100 ? 'text-green-500' : 'text-orange-500'}`}>
                                    {rounds.reduce((acc: number, r: any) => acc + (r.weight || 0), 0)}%
                                </span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-600 max-w-[200px] text-right uppercase tracking-widest">
                                * El peso total debe sumar 100% para un cálculo óptimo del ranking.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ScoutSettings;
