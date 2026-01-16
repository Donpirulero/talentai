import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
    BrainCircuit, Target, Zap, Activity, Database,
    Share2, Heart, TrendingUp, BookOpen, Fingerprint,
    Sparkles, Upload, FileText
} from 'lucide-react';
import { COMPETENCIES_CATALOG } from '../services/db';

// --- Screen: Profile Ingestion (Admin Core Module) ---
export const ProfileIngestion: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profiles' | 'competencies' | 'roles'>('profiles');
    const [step, setStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const { t } = useLanguage();

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) setFile(droppedFile);
    };

    const getIcon = (name: string) => {
        if (name.includes('Crítico')) return <Target className="text-amber-400" size={24} />;
        if (name.includes('Teoría')) return <BrainCircuit className="text-emerald-400" size={24} />;
        if (name.includes('Creatividad')) return <Sparkles className="text-primary" size={24} />;
        if (name.includes('Adaptabilidad')) return <Activity className="text-blue-400" size={24} />;
        if (name.includes('Ingeniería')) return <Database className="text-purple-400" size={24} />;
        if (name.includes('Colaboración')) return <Share2 className="text-indigo-400" size={24} />;
        if (name.includes('Inteligencia')) return <Heart className="text-rose-400" size={24} />;
        if (name.includes('Anticipatorio')) return <TrendingUp className="text-orange-400" size={24} />;
        if (name.includes('Alfabetización')) return <BookOpen className="text-cyan-400" size={24} />;
        if (name.includes('Locus')) return <Fingerprint className="text-primary" size={24} />;
        return <Zap className="text-primary" size={24} />;
    };

    return (
        <div className="flex h-screen w-full bg-background-dark text-white font-display">
            {/* Sidebar removed to move to a more minimalist tab-based layout */}

            <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
                {/* Dynamic Header with Tabs */}
                <header className="flex-none px-8 py-6 border-b border-border-dark bg-background-dark z-10">
                    <div className="max-w-6xl mx-auto w-full">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-white text-3xl font-black leading-tight tracking-tight">
                                    {activeTab === 'profiles' ? t("ingest.header.title") : activeTab === 'competencies' ? 'Gestión de Competencias' : 'Gestión de Roles'}
                                </h1>
                                <p className="text-text-secondary text-sm">
                                    {activeTab === 'profiles' ? `Paso ${step} de 3: ${step === 1 ? t("ingest.step.1") : step === 2 ? t("ingest.step.2") : t("ingest.step.3")}` :
                                        activeTab === 'competencies' ? 'Catálogo Dinámico BioStack' : 'Explora nuevos perfiles y roles emergentes para la organización'}
                                </p>
                            </div>

                            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                                <button
                                    onClick={() => setActiveTab('profiles')}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'profiles' ? 'bg-primary text-white shadow-glow' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                    Importar
                                </button>
                                <button
                                    onClick={() => setActiveTab('competencies')}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'competencies' ? 'bg-primary text-white shadow-glow' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">list_alt</span>
                                    Competencias
                                </button>
                                <button
                                    onClick={() => setActiveTab('roles')}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'roles' ? 'bg-primary text-white shadow-glow' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">engineering</span>
                                    Roles
                                </button>
                            </div>
                        </div>

                        {activeTab === 'profiles' && (
                            <div className="flex items-center gap-2">
                                <span className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary shadow-[0_0_10px_rgba(37,106,244,0.5)]' : 'bg-white/5'}`}></span>
                                <span className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary shadow-[0_0_10px_rgba(37,106,244,0.5)]' : 'bg-white/5'}`}></span>
                                <span className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-primary shadow-[0_0_10px_rgba(37,106,244,0.5)]' : 'bg-white/5'}`}></span>
                            </div>
                        )}
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {activeTab === 'profiles' ? (
                        <div className="max-w-5xl mx-auto w-full">
                            {/* Step 1: Upload */}
                            {step === 1 && (
                                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-surface-dark border border-border-dark rounded-xl p-8 text-center border-dashed hover:border-primary transition-colors"
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleFileDrop}
                                    >
                                        <div className="size-16 bg-surface-dark-lighter rounded-full flex items-center justify-center mx-auto mb-4 text-text-secondary">
                                            <span className="material-symbols-outlined text-3xl">csv</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{t("ingest.upload.title")}</h3>
                                        <p className="text-text-secondary mb-6 max-w-md mx-auto">
                                            {t("ingest.upload.desc")}
                                            <span className="text-white font-mono bg-surface-dark-lighter px-1 rounded ml-1">ID</span>,
                                            <span className="text-white font-mono bg-surface-dark-lighter px-1 rounded ml-1">Name</span>,
                                            <span className="text-white font-mono bg-surface-dark-lighter px-1 rounded ml-1">Last Name</span>,
                                            <span className="text-white font-mono bg-surface-dark-lighter px-1 rounded ml-1">Email</span>,
                                            <span className="text-white font-mono bg-surface-dark-lighter px-1 rounded ml-1">Phone</span>,
                                            <span className="text-white font-mono bg-surface-dark-lighter px-1 rounded ml-1">Current Position</span>.
                                        </p>
                                        <button
                                            onClick={() => { setFile(new File([""], "dummy.csv")); setStep(2); }}
                                            className="px-6 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
                                        >
                                            {t("ingest.upload.btn")}
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm text-primary">
                                        <span className="material-symbols-outlined">info</span>
                                        <span>{t("ingest.tip")}</span>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Verify Data Table */}
                            {step === 2 && (
                                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
                                        <div className="p-4 border-b border-border-dark flex justify-between items-center">
                                            <h3 className="font-bold text-white flex items-center gap-2">
                                                <span className="material-symbols-outlined text-green-500">check_circle</span>
                                                {t("ingest.verify.title")} (5 Employees Found)
                                            </h3>
                                            <button onClick={() => setStep(1)} className="text-xs text-text-secondary hover:text-white">{t("ingest.verify.replace")}</button>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-surface-dark-lighter text-xs text-text-secondary uppercase tracking-wider">
                                                        <th className="p-4 border-b border-border-dark">ID</th>
                                                        <th className="p-4 border-b border-border-dark">Name</th>
                                                        <th className="p-4 border-b border-border-dark">Role</th>
                                                        <th className="p-4 border-b border-border-dark">Phone (WhatsApp)</th>
                                                        <th className="p-4 border-b border-border-dark">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm text-gray-300">
                                                    {[
                                                        { id: "EMP001", name: "Sarah Jenkins", role: "Sr. Data Scientist", phone: "+1 555-0123", status: "Ready" },
                                                        { id: "EMP002", name: "Marcus Chen", role: "Product Owner", phone: "+1 555-0124", status: "Ready" },
                                                        { id: "EMP003", name: "Elena Rodriguez", role: "UX Designer", phone: "+1 555-0125", status: "Ready" },
                                                        { id: "EMP004", name: "David Kim", role: "Backend Dev", phone: "+1 555-0126", status: "Ready" },
                                                        { id: "EMP005", name: "Priya Patel", role: "HR Manager", phone: "+1 555-0127", status: "Ready" },
                                                    ].map((row, i) => (
                                                        <tr key={i} className="border-b border-border-dark/50 hover:bg-white/5">
                                                            <td className="p-4 font-mono text-xs opacity-70">{row.id}</td>
                                                            <td className="p-4 font-bold text-white">{row.name}</td>
                                                            <td className="p-4">{row.role}</td>
                                                            <td className="p-4 font-mono">{row.phone}</td>
                                                            <td className="p-4"><span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs font-bold">{row.status}</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => setStep(1)} className="px-6 py-3 text-text-secondary hover:text-white font-bold transition-colors">{t("ingest.btn.back")}</button>
                                        <button onClick={() => setStep(3)} className="px-6 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors">{t("ingest.btn.continue")}</button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Configure Campaign (TalentScout AI) */}
                            {step === 3 && (
                                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-white mb-4">{t("ingest.config.comp")}</h3>
                                            <div className="space-y-3">
                                                {["Critical Thinking", "Adaptability", "Leadership", "Communication", "Technical Proficiency"].map((comp, i) => (
                                                    <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border-dark hover:bg-surface-dark-lighter cursor-pointer group">
                                                        <input type="checkbox" defaultChecked className="rounded border-border-dark bg-background-dark text-primary focus:ring-offset-background-dark" />
                                                        <span className="text-white group-hover:text-white transition-colors">{comp}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-white mb-4">{t("ingest.config.bot")}</h3>
                                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="material-symbols-outlined text-green-500">whatsapp</span>
                                                    <span className="font-bold text-green-400">{t("ingest.config.preview")}</span>
                                                </div>
                                                <p className="text-sm text-gray-300 italic">
                                                    {t("ingest.config.msg")}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <label className="text-xs font-bold text-text-secondary uppercase mb-1 block">{t("ingest.config.deadline")}</label>
                                                    <input type="date" className="w-full bg-background-dark border border-border-dark rounded-lg p-2 text-white text-sm" />
                                                </div>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" className="rounded bg-background-dark border-border-dark text-primary" defaultChecked />
                                                    <span className="text-sm text-text-secondary">{t("ingest.config.voice")}</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4 border-t border-border-dark">
                                        <button onClick={() => setStep(2)} className="px-6 py-3 text-text-secondary hover:text-white font-bold transition-colors">{t("ingest.btn.back")}</button>
                                        <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-green-900/20">
                                            <span className="material-symbols-outlined">rocket_launch</span>
                                            {t("ingest.btn.launch")}
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    ) : activeTab === 'competencies' ? (
                        <div className="max-w-6xl mx-auto w-full animate-fade-in space-y-8">
                            {/* Upload Section */}
                            <div className="glass-panel p-8 rounded-2xl border border-dashed border-white/20 hover:border-primary/50 transition-colors group">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="text-primary" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Importar Catálogo de Competencias</h3>
                                    <p className="text-text-secondary mt-2 max-w-lg">
                                        Arrastra y suelta tu documento (PDF, DOCX) o pega un enlace de Google Doc para actualizar el catálogo BioStack.
                                    </p>
                                    <div className="mt-6 flex gap-3">
                                        <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-primary/20 hover:text-primary transition-colors text-sm font-bold">
                                            <FileText size={18} />
                                            Seleccionar PDF / Word
                                        </button>
                                        <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-colors text-sm font-bold">
                                            <span className="material-symbols-outlined text-[18px]">link</span>
                                            Google Doc Link
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Catalog Grid (Copied from BioStackCatalog) */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {COMPETENCIES_CATALOG.map((comp, idx) => (
                                    <div
                                        key={idx}
                                        className="relative glass-card bg-surface-dark/40 rounded-xl p-6 border border-white/5 hover:border-primary/30 transition-all hover:translate-y-[-2px] overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-5">
                                            <span className="text-6xl font-black text-white italic">{idx + 1}</span>
                                        </div>
                                        <div className="flex gap-4 relative z-10">
                                            <div className="size-12 rounded-lg bg-surface-dark border border-white/10 flex items-center justify-center shrink-0">
                                                {getIcon(comp.name)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base font-bold text-white text-ellipsis overflow-hidden whitespace-nowrap">{comp.name}</h3>
                                                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{comp.definition}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: 'AI Ethicist', desc: 'Asegura que los sistemas de IA se desarrollen de manera responsable y ética.', icon: 'policy', color: 'text-amber-400' },
                                    { title: 'Prompt Engineer', desc: 'Optimiza la interacción con grandes modelos de lenguaje (LLMs) para máxima eficiencia.', icon: 'psychology', color: 'text-emerald-400' },
                                    { title: 'Data Storyteller', desc: 'Traduce insights complejos de datos en narrativas estratégicas para el negocio.', icon: 'auto_graph', color: 'text-primary' },
                                    { title: 'Sustainability Analyst', desc: 'Mide y optimiza el impacto ambiental y social de las operaciones corporativas.', icon: 'eco', color: 'text-blue-400' }
                                ].map((role, i) => (
                                    <div key={i} className="bg-surface-dark border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group relative overflow-hidden">
                                        <div className="flex items-start gap-4">
                                            <div className={`size-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${role.color}`}>
                                                <span className="material-symbols-outlined">{role.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{role.title}</h3>
                                                <p className="text-sm text-slate-400 leading-relaxed">{role.desc}</p>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <Link to="/scout/interview" className="text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-2">
                                                Definir Perfil
                                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// --- Screen: Collaboration Index (Existing) ---
export const CollaborationIndex: React.FC = () => {
    return (
        <div className="bg-background-dark text-white font-display overflow-hidden h-screen flex">
            <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
                <div className="flex items-center gap-3 mb-8">
                    <div className="size-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <span className="material-symbols-outlined text-white text-[20px]">analytics</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-white text-[18px] tracking-tight">
                            Talent<span className="text-cyan-400">AI</span>
                        </span>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Teamwork & Collaboration Index</h2>
                            <p className="text-text-secondary max-w-2xl">Analyze organizational connectivity, identify high-performing networks.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-surface-dark rounded-xl p-5 border border-border-dark hover:border-primary/50 transition-colors group">
                            <div className="flex items-start justify-between mb-2">
                                <p className="text-text-secondary text-sm font-medium">Collaboration Health</p>
                                <span className="material-symbols-outlined text-text-secondary group-hover:text-primary">ecg_heart</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-bold text-white">78<span className="text-lg text-text-secondary font-normal">/100</span></h3>
                                <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-500 flex items-center"><span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span>+5%</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[500px]">
                        <div className="xl:col-span-2 bg-surface-dark rounded-xl border border-border-dark p-6 relative flex flex-col">
                            <div className="flex justify-between items-start mb-4 z-10">
                                <div>
                                    <h3 className="text-lg font-bold text-white">Organizational Network Analysis</h3>
                                </div>
                            </div>
                            <div className="flex-1 relative w-full h-full overflow-hidden rounded-lg bg-surface-dark-lighter/50">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <defs>
                                        <linearGradient id="line-grad" x1="0%" x2="100%" y1="0%" y2="0%">
                                            <stop offset="0%" style={{ stopColor: '#256af4', stopOpacity: 0.6 }}></stop>
                                            <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 0.2 }}></stop>
                                        </linearGradient>
                                    </defs>
                                    <line stroke="url(#line-grad)" strokeWidth="1.5" x1="50%" x2="30%" y1="50%" y2="30%"></line>
                                    <line stroke="url(#line-grad)" strokeWidth="1.5" x1="50%" x2="70%" y1="50%" y2="25%"></line>
                                    <line stroke="url(#line-grad)" strokeWidth="1.5" x1="50%" x2="75%" y1="50%" y2="65%"></line>
                                    <line stroke="url(#line-grad)" strokeWidth="1.5" x1="50%" x2="35%" y1="50%" y2="70%"></line>
                                    <line stroke="url(#line-grad)" strokeWidth="1.5" x1="50%" x2="20%" y1="50%" y2="45%"></line>
                                </svg>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary shadow-[0_0_30px_rgba(37,106,244,0.3)] flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined">rocket_launch</span>
                                    </div>
                                    <span className="mt-2 text-xs font-semibold text-white bg-surface-dark px-2 py-1 rounded shadow border border-border-dark">Product</span>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-1 bg-surface-dark rounded-xl border border-border-dark p-6 flex flex-col">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-yellow-500">lightbulb</span>
                                <h3 className="text-lg font-bold text-white">AI Insights & Alerts</h3>
                            </div>
                            <div className="bg-surface-dark-lighter/50 p-4 rounded-lg border-l-4 border-red-500 relative mb-4">
                                <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-1">High Risk Silo</p>
                                <p className="text-sm text-white mb-2">Human Resources is 85% disconnected from the Product loop.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Screen: Community Hub (Existing) ---
export const CommunityHub: React.FC = () => {
    return (
        <div className="bg-background-dark text-white font-display overflow-x-hidden min-h-screen flex flex-col">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-dark bg-surface-dark px-6 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <span className="material-symbols-outlined text-white text-[20px]">analytics</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-white text-[18px] tracking-tight">
                                Talent<span className="text-cyan-400">AI</span>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <div className="flex-1 flex justify-center w-full px-4 lg:px-8 py-6">
                <div className="max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr_320px] gap-6">
                    <main className="flex flex-col gap-6 min-w-0">
                        <h1 className="text-2xl font-bold leading-tight">Community Feed</h1>
                        <div className="bg-surface-dark rounded-xl border border-border-dark shadow-sm overflow-hidden">
                            <div className="p-4 flex gap-3">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqk7F7RmlFWpv-9SogdxbSQHz08RVnpL3E8XdEc0EpFcLkdI1N9Eo_HPyegRoJLGwMU9K3gQIHlGgmurGSCXEhJpbCP2lHUVPFTXL_iNKB0M_9E6SMyWb5Ww76BsZlwVru13ORb4gaUcsSAlZV5zq_OaoSgQeBKWolu3nfiqhRlS_gSNURImfgQvm0gZCpmndQnRNIJk6Nz3U2IsYzhkxa0IRy7AzDTnmLxOjXt7YQHdzV3bu-qBl84hKwzJ9cJIg6jr1ykzOrSJMV")' }}></div>
                                <div className="flex-1">
                                    <textarea className="w-full bg-background-dark border border-border-dark rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none min-h-[100px]" placeholder="Share a learning milestone..."></textarea>
                                </div>
                            </div>
                            <div className="px-4 pb-4 flex justify-between items-center">
                                <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-md shadow-primary/20">Post Update</button>
                            </div>
                        </div>
                        <article className="bg-surface-dark rounded-xl border border-border-dark shadow-sm">
                            <div className="p-4 flex items-start gap-4">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBeDqB4t4DYZfl2PAQdIduyziNI8aN9RkGs4dhK5g9MveAcfV6EvDztfXIeCKlz45KzkNynuEZ6-alpRI_wCxtK1PfrLqCGlChfHSVN8Alap8ukDwQ426WhrXvWJpOwsAXFsaIrejy2w66WUgqntl1g9lK4184UQNOdQX-t1zbtc61SdV8TH82H9slXTYaTsWL4l_ta3Qti6x9dj-fp6q12Jt_e9yrdUezMhE2Aeb7UwKfzTCohQxYX9o1_rVjBm8roP2j-D2y9aBqS")' }}></div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-base">Marcus Chen</h3>
                                    <p className="text-xs text-text-secondary">Director of Engineering • 2h ago</p>
                                    <div className="mt-3">
                                        <p className="text-sm leading-relaxed mb-3">Just finished reading a fantastic article on <strong>Strategic Leadership in the AI Era</strong>.</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </main>
                </div>
            </div>
        </div>
    );
};