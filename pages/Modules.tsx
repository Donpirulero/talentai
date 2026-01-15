import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    return (
        <div className="min-h-screen bg-background-dark overflow-x-hidden font-display">

            {/* Header / Logo Area */}
            <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center">
                {/* Logo Area Removed per user request */}
                <div></div>

                {/* Home Page Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 bg-surface-dark/80 backdrop-blur-md border border-border-dark rounded-full text-white text-xs font-bold hover:bg-surface-dark-lighter transition-colors"
                >
                    <span className="material-symbols-outlined text-[16px]">translate</span>
                    {language === 'en' ? 'Español' : 'English'}
                </button>
            </nav>

            {/* Hero Section */}
            <div id="tour-hero" className="relative min-h-[90vh] flex items-center border-b border-white/5 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                        alt="Cyber background"
                        className="w-full h-full object-cover opacity-20 scale-110 animate-pulse-slow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background-dark/80 to-background-dark"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 pt-20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="max-w-4xl animate-fade-in stagger-1">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="px-4 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-primary/5 backdrop-blur-md">{t("hero.tagline")}</span>
                                <div className="h-px w-8 bg-slate-700"></div>
                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">{t("hero.type")}</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-10 leading-[1.05] tracking-tighter">
                                Infinite <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300 text-glow">Intelligence.</span>
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl border-l-[3px] border-primary/40 pl-8 font-medium italic">
                                {t("hero.desc")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Floating scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                    <span className="material-symbols-outlined text-white">expand_more</span>
                </div>
            </div>

            {/* Modules Grid - Structured by User Flow */}
            <div id="tour-modules" className="px-8 md:px-12 py-32 max-w-7xl mx-auto space-y-32">

                {/* Phase 1: Diagnosis */}
                <div className="relative animate-fade-in stagger-2">
                    <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/20 to-transparent"></div>
                    <div className="flex items-center gap-6 mb-12">
                        <span className="flex items-center justify-center size-14 rounded-2xl bg-primary/20 text-primary text-2xl font-black border border-primary/30 shadow-glow">01</span>
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tight">{t("phase.1")}</h2>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1 opacity-60">Discovery & Data Ingestion</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Hero Card for Phase 1 */}
                        <Link to="/talent/ingestion" className="md:col-span-2 group relative overflow-hidden rounded-4xl glass-card min-h-[25rem] flex flex-col justify-end">
                            <div className="absolute inset-0">
                                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" alt="HR Manager" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B101B] via-[#0B101B]/40 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 p-10 z-10 w-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="size-1 rounded-full bg-primary shadow-glow animate-pulse"></div>
                                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{t("card.launcher.title")}</span>
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:translate-x-1 transition-transform">{t("card.launcher.title")}</h3>
                                <p className="text-slate-400 max-w-md text-lg leading-relaxed">{t("card.launcher.desc")}</p>
                            </div>
                        </Link>

                        <div className="flex flex-col gap-8">
                            <Link to="/talent/competency" className="flex-1 group p-8 rounded-4xl glass-card relative overflow-hidden flex flex-col justify-end">
                                <h3 className="text-xl font-black text-white mb-2 group-hover:text-primary transition-colors tracking-tight">{t("card.competency.title")}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{t("card.competency.desc")}</p>
                            </Link>
                            <Link to="/screening" className="flex-1 group p-8 rounded-4xl glass-card relative overflow-hidden flex flex-col justify-end">
                                <h3 className="text-xl font-black text-white mb-2 group-hover:text-primary transition-colors tracking-tight">{t("card.screening.title")}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{t("card.screening.desc")}</p>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Phase 2: Analysis (BioStack) */}
                <div className="relative animate-fade-in stagger-3">
                    <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-purple via-accent-purple/20 to-transparent"></div>
                    <div className="flex items-center gap-6 mb-12">
                        <span className="flex items-center justify-center size-14 rounded-2xl bg-accent-purple/20 text-accent-purple text-2xl font-black border border-accent-purple/30 shadow-[0_0_20px_rgba(168,85,247,0.4)]">02</span>
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tight">{t("phase.2")}</h2>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1 opacity-60">Deep Talent Analytics</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link to="/skill-gap" className="group p-10 rounded-4xl glass-card flex flex-col justify-between min-h-[22rem]">
                            <div className="size-16 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-purple mb-6 group-hover:bg-accent-purple group-hover:text-white transition-all duration-500 shadow-xl">
                                <span className="material-symbols-outlined text-4xl">grid_on</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{t("card.skillgap.title")}</h3>
                                <p className="text-slate-400 leading-relaxed">{t("card.skillgap.desc")}</p>
                            </div>
                        </Link>

                        {/* Hero Card for Phase 2 */}
                        <Link to="/biostack/dashboard" className="md:col-span-2 group relative overflow-hidden rounded-4xl glass-card min-h-[22rem] flex flex-col justify-end">
                            <div className="absolute inset-0">
                                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" alt="Data Analytics" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B101B] via-[#0B101B]/40 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 p-10 z-10">
                                <div className="size-16 rounded-2xl bg-accent-purple flex items-center justify-center text-white mb-6 shadow-2xl shadow-purple-900/50 group-hover:scale-110 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-4xl">donut_large</span>
                                </div>
                                <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{t("card.dashboard.title")}</h3>
                                <p className="text-slate-400 max-w-md text-lg leading-relaxed">{t("card.dashboard.desc")}</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Phase 3: Action (TalentBridge) */}
                <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 via-emerald-500/20 to-transparent"></div>
                    <div className="flex items-center gap-6 mb-12">
                        <span className="flex items-center justify-center size-14 rounded-2xl bg-emerald-500/20 text-emerald-400 text-2xl font-black border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.4)]">03</span>
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tight">{t("phase.3")}</h2>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1 opacity-60">Strategic Integration</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Link to="/talent-bridge/learning-path" className="group p-8 rounded-4xl glass-card flex flex-col min-h-[18rem] relative overflow-hidden justify-between hover:border-emerald-500/40">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" className="w-full h-full object-cover" alt="Learning" />
                            </div>
                            <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 mb-auto relative z-10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-lg">
                                <span className="material-symbols-outlined text-3xl">school</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-black text-white mb-2 tracking-tight">{t("card.paths.title")}</h3>
                                <p className="text-slate-500 font-medium leading-tight">{t("card.paths.desc")}</p>
                            </div>
                        </Link>

                        <Link to="/talent-bridge/retention-risk" className="group p-8 rounded-4xl glass-card flex flex-col min-h-[18rem] justify-between hover:border-rose-500/40">
                            <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center text-rose-400 mb-auto group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 shadow-lg">
                                <span className="material-symbols-outlined text-3xl">person_remove</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white mb-2 tracking-tight">{t("card.retention.title")}</h3>
                                <p className="text-slate-500 font-medium leading-tight">{t("card.retention.desc")}</p>
                            </div>
                        </Link>

                        <Link to="/collaboration" className="group p-8 rounded-4xl glass-card flex flex-col min-h-[18rem] justify-between hover:border-blue-500/40">
                            <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 mb-auto group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-lg">
                                <span className="material-symbols-outlined text-3xl">hub</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white mb-2 tracking-tight">{t("card.network.title")}</h3>
                                <p className="text-slate-500 font-medium leading-tight">{t("card.network.desc")}</p>
                            </div>
                        </Link>

                        <Link to="/cognitive" className="group p-8 rounded-4xl glass-card flex flex-col min-h-[18rem] justify-between hover:border-amber-500/40">
                            <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center text-amber-400 mb-auto group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-lg">
                                <span className="material-symbols-outlined text-3xl">psychology</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white mb-2 tracking-tight">{t("card.cognitive.title")}</h3>
                                <p className="text-slate-500 font-medium leading-tight">{t("card.cognitive.desc")}</p>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default HomePage;