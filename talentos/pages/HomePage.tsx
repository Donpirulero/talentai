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
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <span className="material-symbols-outlined text-white text-[24px]">analytics</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-white text-[20px] tracking-tight">
                            Talent<span className="text-cyan-400">AI</span>
                        </span>
                    </div>
                </div>

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
            <div id="tour-hero" className="relative min-h-[80vh] flex items-center border-b border-border-dark overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                        alt="Team collaboration"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/90 to-transparent"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background-dark to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/10 backdrop-blur-md">{t("hero.tagline")}</span>
                                <span className="px-4 py-1.5 rounded-full bg-surface-dark/80 text-text-secondary border border-border-dark text-xs font-bold uppercase tracking-widest backdrop-blur-md">{t("hero.type")}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                Data-Driven <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]">Talent Restructuring</span>
                            </h1>
                            <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl border-l-4 border-primary/30 pl-6">
                                {t("hero.desc")}
                            </p>

                            {/* Primary Call to Action */}
                            <div id="tour-actions" className="flex flex-col sm:flex-row gap-5">
                                <button
                                    onClick={() => navigate('/ingestion')}
                                    className="flex items-center justify-center gap-3 px-8 py-5 bg-[#3b82f6] hover:bg-blue-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-900/30 transition-all hover:-translate-y-1 group"
                                >
                                    <div className="p-1 bg-white/20 rounded-full">
                                        <span className="material-symbols-outlined text-[20px]">upload_file</span>
                                    </div>
                                    <span>{t("btn.upload")}</span>
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                                <button
                                    onClick={() => navigate('/reskilling')}
                                    className="flex items-center justify-center gap-3 px-8 py-5 bg-surface-dark hover:bg-surface-dark-lighter border border-border-dark text-white rounded-xl font-bold text-lg transition-all hover:border-primary/50"
                                >
                                    <span className="material-symbols-outlined text-[24px] text-text-secondary">analytics</span>
                                    <span>{t("btn.dashboard")}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules Grid - Structured by User Flow */}
            <div id="tour-modules" className="px-6 md:px-12 py-20 max-w-7xl mx-auto space-y-24">

                {/* Phase 1: Diagnosis */}
                <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent opacity-30"></div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="flex items-center justify-center size-12 rounded-2xl bg-primary/20 text-primary text-xl font-bold border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">1</span>
                        <h2 className="text-3xl font-black text-white">{t("phase.1")}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Hero Card for Phase 1 */}
                        <Link to="/ingestion" className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-surface-dark border border-border-dark hover:border-primary/50 transition-all shadow-2xl h-80">
                            <div className="absolute inset-0">
                                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="HR Manager" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 p-8 z-10">
                                <div className="size-14 rounded-2xl bg-primary flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-900/50">
                                    <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{t("card.launcher.title")}</h3>
                                <p className="text-text-secondary max-w-md">{t("card.launcher.desc")}</p>
                            </div>
                        </Link>

                        <div className="flex flex-col gap-6">
                            <Link to="/competency" className="flex-1 group p-6 rounded-3xl bg-surface-dark border border-border-dark hover:border-primary/50 transition-all relative overflow-hidden flex flex-col justify-end">
                                <div className="absolute top-6 right-6 p-2 bg-surface-dark-lighter rounded-lg text-text-secondary"><span className="material-symbols-outlined">list_alt</span></div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{t("card.competency.title")}</h3>
                                <p className="text-sm text-text-secondary">{t("card.competency.desc")}</p>
                            </Link>
                            <Link to="/screening" className="flex-1 group p-6 rounded-3xl bg-surface-dark border border-border-dark hover:border-primary/50 transition-all relative overflow-hidden flex flex-col justify-end">
                                <div className="absolute top-6 right-6 p-2 bg-surface-dark-lighter rounded-lg text-text-secondary"><span className="material-symbols-outlined">videocam</span></div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{t("card.screening.title")}</h3>
                                <p className="text-sm text-text-secondary">{t("card.screening.desc")}</p>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Phase 2: Analysis (BioStack) */}
                <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-transparent opacity-30"></div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="flex items-center justify-center size-12 rounded-2xl bg-purple-500/20 text-purple-400 text-xl font-bold border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">2</span>
                        <h2 className="text-3xl font-black text-white">{t("phase.2")}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link to="/skill-gap" className="group p-8 rounded-3xl bg-surface-dark border border-border-dark hover:border-purple-500/50 transition-all flex flex-col justify-between h-80">
                            <div className="size-14 rounded-2xl bg-surface-dark-lighter flex items-center justify-center text-purple-400 mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">grid_on</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{t("card.skillgap.title")}</h3>
                                <p className="text-text-secondary">{t("card.skillgap.desc")}</p>
                            </div>
                        </Link>

                        {/* Hero Card for Phase 2 */}
                        <Link to="/reskilling" className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-surface-dark border border-border-dark hover:border-purple-500/50 transition-all shadow-2xl h-80">
                            <div className="absolute inset-0">
                                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Data Analytics" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 p-8 z-10">
                                <div className="size-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-900/50">
                                    <span className="material-symbols-outlined text-3xl">donut_large</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{t("card.dashboard.title")}</h3>
                                <p className="text-text-secondary max-w-md">{t("card.dashboard.desc")}</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Phase 3: Action (TalentBridge) */}
                <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-transparent opacity-30"></div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="flex items-center justify-center size-12 rounded-2xl bg-green-500/20 text-green-400 text-xl font-bold border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]">3</span>
                        <h2 className="text-3xl font-black text-white">{t("phase.3")}</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link to="/learning-path" className="group p-6 rounded-3xl bg-surface-dark border border-border-dark hover:border-green-500/50 transition-all flex flex-col h-64 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" className="w-full h-full object-cover" alt="Learning" />
                            </div>
                            <div className="size-12 rounded-xl bg-surface-dark-lighter flex items-center justify-center text-green-400 mb-auto relative z-10">
                                <span className="material-symbols-outlined">school</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-white mb-2">{t("card.paths.title")}</h3>
                                <p className="text-sm text-text-secondary leading-tight">{t("card.paths.desc")}</p>
                            </div>
                        </Link>

                        <Link to="/retention" className="group p-6 rounded-3xl bg-surface-dark border border-border-dark hover:border-green-500/50 transition-all flex flex-col h-64">
                            <div className="size-12 rounded-xl bg-surface-dark-lighter flex items-center justify-center text-red-400 mb-auto">
                                <span className="material-symbols-outlined">person_remove</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">{t("card.retention.title")}</h3>
                                <p className="text-sm text-text-secondary leading-tight">{t("card.retention.desc")}</p>
                            </div>
                        </Link>

                        <Link to="/collaboration" className="group p-6 rounded-3xl bg-surface-dark border border-border-dark hover:border-green-500/50 transition-all flex flex-col h-64">
                            <div className="size-12 rounded-xl bg-surface-dark-lighter flex items-center justify-center text-blue-400 mb-auto">
                                <span className="material-symbols-outlined">hub</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">{t("card.network.title")}</h3>
                                <p className="text-sm text-text-secondary leading-tight">{t("card.network.desc")}</p>
                            </div>
                        </Link>

                        <Link to="/cognitive" className="group p-6 rounded-3xl bg-surface-dark border border-border-dark hover:border-green-500/50 transition-all flex flex-col h-64">
                            <div className="size-12 rounded-xl bg-surface-dark-lighter flex items-center justify-center text-yellow-400 mb-auto">
                                <span className="material-symbols-outlined">psychology</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">{t("card.cognitive.title")}</h3>
                                <p className="text-sm text-text-secondary leading-tight">{t("card.cognitive.desc")}</p>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomePage;