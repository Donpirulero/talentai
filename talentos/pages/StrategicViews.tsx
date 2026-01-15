import React from 'react';

// --- Screen: Reskilling Matrix ---
export const ReskillingMatrix: React.FC = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-dark text-white">
            <aside className="hidden lg:flex w-64 flex-col border-r border-border-dark bg-background-dark flex-shrink-0 z-20">
                <div className="flex h-full flex-col justify-between p-4">
                    <div className="flex flex-col gap-6">
                        {/* Logo Replacement */}
                        <div className="flex items-center gap-3 px-2">
                             <div className="size-8 rounded-full border-[3px] border-[#3b82f6] flex-shrink-0 bg-transparent"></div>
                             <div className="flex flex-col">
                                <span className="font-display font-bold text-white text-[10px] tracking-[0.1em] uppercase leading-none">
                                    ACELERADORA
                                </span>
                                <span className="font-display font-bold text-[#3b82f6] text-[10px] tracking-[0.1em] uppercase leading-none">
                                    TECNOLÓGICA
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-dark-lighter transition-colors text-text-secondary hover:text-white group" href="#">
                                <span aria-hidden="true" className="material-symbols-outlined text-[24px]">dashboard</span>
                                <span className="text-sm font-medium">Dashboard</span>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary group border-l-2 border-primary" href="#">
                                <span aria-hidden="true" className="material-symbols-outlined text-[24px] fill-current">trending_up</span>
                                <span className="text-sm font-bold">Reskilling</span>
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex flex-1 flex-col h-full overflow-hidden bg-background-dark relative">
                <header className="flex flex-shrink-0 items-center justify-between border-b border-border-dark px-8 py-4 bg-background-dark/95 backdrop-blur-sm z-10">
                    <h2 className="text-white text-xl font-bold leading-tight tracking-tight">Reskilling Opportunity Matrix</h2>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center bg-surface-dark-lighter rounded-lg px-3 py-2 w-64 border border-transparent focus-within:border-primary/50 transition-colors">
                            <span className="material-symbols-outlined text-text-secondary text-[20px]">search</span>
                            <input className="bg-transparent border-none text-sm text-white focus:ring-0 w-full placeholder:text-text-secondary" placeholder="Search employees..." type="text" />
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center size-10 rounded-lg hover:bg-surface-dark-lighter text-white transition-colors relative">
                                <span className="material-symbols-outlined text-[22px]">notifications</span>
                                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-background-dark"></span>
                            </button>
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
                        <div className="rounded-xl p-[1px] bg-gradient-to-r from-primary/60 via-purple-500/40 to-transparent">
                            <div className="bg-surface-dark rounded-xl p-4 flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-sm mb-1">AI Recommendation</h3>
                                    <p className="text-text-secondary text-sm">
                                        Based on the latest assessment data, <span className="text-white font-semibold">42 candidates</span> show high self-efficacy and an 80%+ skill match.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-6 h-full min-h-[600px]">
                            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                                <div className="flex-1 bg-surface-dark rounded-xl border border-border-dark p-6 relative flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-white font-bold text-lg">Talent Readiness Distribution</h3>
                                        <div className="flex gap-4 text-xs">
                                            <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-primary"></span><span className="text-text-secondary">Engineering</span></div>
                                            <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-teal-400"></span><span className="text-text-secondary">Product</span></div>
                                        </div>
                                    </div>
                                    <div className="relative flex-1 w-full min-h-[450px] bg-surface-dark-lighter/30 rounded-lg border border-border-dark overflow-hidden mt-2">
                                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                                            <div className="border-r border-b border-dashed border-white/10 p-3 flex flex-col justify-between"><span className="text-xs font-bold text-text-secondary/50 uppercase">Long-Term Potential</span></div>
                                            <div className="border-b border-dashed border-white/10 p-3 flex flex-col items-end justify-between bg-primary/5"><span className="text-xs font-bold text-primary uppercase">Prime Candidates</span></div>
                                            <div className="border-r border-dashed border-white/10 p-3 flex flex-col justify-end"><span className="text-xs font-bold text-text-secondary/50 uppercase">Monitor</span></div>
                                            <div className="p-3 flex flex-col items-end justify-end"><span className="text-xs font-bold text-text-secondary/50 uppercase">Quick Wins</span></div>
                                        </div>
                                        <div className="absolute left-[75%] bottom-[80%] group cursor-pointer">
                                            <div className="size-3.5 bg-primary rounded-full shadow-[0_0_10px_rgba(37,106,244,0.6)] ring-2 ring-white/20 transition-transform group-hover:scale-150"></div>
                                        </div>
                                        <div className="absolute left-[82%] bottom-[70%] group cursor-pointer"><div className="size-3 bg-primary rounded-full opacity-90 transition-transform group-hover:scale-150"></div></div>
                                        <div className="absolute left-[68%] bottom-[85%] group cursor-pointer"><div className="size-3 bg-purple-400 rounded-full opacity-90 transition-transform group-hover:scale-150"></div></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                                <div className="bg-surface-dark rounded-xl border border-border-dark flex flex-col flex-1 overflow-hidden">
                                    <div className="p-4 border-b border-border-dark flex justify-between items-center bg-surface-dark-lighter/20">
                                        <h3 className="text-white font-bold text-sm">Top "Prime" Candidates</h3>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                                        <div className="p-3 rounded-lg hover:bg-surface-dark-lighter transition-colors group cursor-pointer border border-transparent hover:border-border-dark">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 bg-gray-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIF510i4paiM63e8cSOBsceT_wV8gZoidWAbZDzhkh8lXbJsxJnwlmQH1UiUwzBO5dEbYGD0X5AUJ-YL7s6Nhg9bMlxtxJ8nFYvqfof3AGbQCcdQO6y88XJVcs5QK-eyQ29OXyZmwMUACObH7ofs3Orsk7m9uzmDHXNTvcWebo5BjZOwk_3l0q_PinMISKzR3QiavRym9O8KpGRsaigVXcRVmC8AkKSh7DWvciJTyAK4s9ZkVuiStgCQLzgkibLJfSI-TNYWqCsdox")' }}></div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-white leading-none">Sarah Jenkins</h4>
                                                        <p className="text-xs text-text-secondary mt-1">Senior QA Engineer</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-lg font-bold text-green-400 leading-none">92%</span>
                                                    <span className="text-[10px] text-text-secondary uppercase">Match</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Screen: Skill Gap Analysis ---
export const SkillGapAnalysis: React.FC = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-dark text-white">
            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark relative">
                <header className="w-full border-b border-border-dark bg-background-dark sticky top-0 z-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 p-6 pb-4">
                        <div className="flex flex-col gap-2">
                            {/* Logo Row */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="size-6 rounded-full border-[2px] border-[#3b82f6] flex-shrink-0 bg-transparent"></div>
                                <div className="flex flex-col">
                                    <span className="font-display font-bold text-white text-[8px] tracking-[0.1em] uppercase leading-none">
                                        ACELERADORA
                                    </span>
                                    <span className="font-display font-bold text-[#3b82f6] text-[8px] tracking-[0.1em] uppercase leading-none">
                                        TECNOLÓGICA
                                    </span>
                                </div>
                            </div>
                            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Organizational Skill Gap Analysis</h1>
                            <p className="text-text-secondary text-sm md:text-base font-normal">Strategic overview of current capabilities versus future requirements.</p>
                        </div>
                        <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
                            <span className="material-symbols-outlined mr-2 !text-[18px]">share</span> Share
                        </button>
                    </div>
                </header>
                <div className="p-6 space-y-6 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1 rounded-xl p-5 border border-border-dark bg-surface-dark shadow-sm">
                            <p className="text-text-secondary text-sm font-medium">Overall Skill Readiness</p>
                            <div className="flex items-end gap-3 mt-2">
                                <p className="text-white text-3xl font-bold leading-none">72%</p>
                                <span className="flex items-center text-success text-sm font-medium bg-success/10 px-1.5 py-0.5 rounded">+4% YoY</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 rounded-xl p-5 border border-border-dark bg-surface-dark shadow-sm">
                            <p className="text-text-secondary text-sm font-medium">Critical Gaps</p>
                            <div className="flex items-end gap-3 mt-2">
                                <p className="text-white text-3xl font-bold leading-none">14 Areas</p>
                                <span className="flex items-center text-danger text-sm font-medium bg-danger/10 px-1.5 py-0.5 rounded">+2 vs Q2</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 rounded-xl border border-border-dark bg-surface-dark p-6 shadow-sm flex flex-col">
                            <h3 className="text-white text-lg font-bold mb-6">Skill Gap Heatmap</h3>
                            <div className="flex flex-col w-full overflow-x-auto">
                                <div className="flex mb-2 min-w-[500px]">
                                    <div className="w-32 flex-shrink-0"></div>
                                    <div className="flex-1 grid grid-cols-4 gap-2 text-center text-xs font-semibold text-text-secondary uppercase">
                                        <div>Cloud</div><div>AI / ML</div><div>Lead</div><div>UX</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 min-w-[500px]">
                                    <div className="flex items-center h-12">
                                        <div className="w-32 flex-shrink-0 text-sm font-medium text-white">Engineering</div>
                                        <div className="flex-1 grid grid-cols-4 gap-2 h-full">
                                            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded flex items-center justify-center text-emerald-400 font-bold">95%</div>
                                            <div className="bg-red-500/20 border border-red-500/30 rounded flex items-center justify-center text-red-400 font-bold">42%</div>
                                            <div className="bg-blue-500/20 border border-blue-500/30 rounded flex items-center justify-center text-blue-400 font-bold">78%</div>
                                            <div className="bg-blue-500/20 border border-blue-500/30 rounded flex items-center justify-center text-blue-400 font-bold">81%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Screen: Retention Risk ---
export const RetentionRisk: React.FC = () => {
    return (
        <div className="relative flex h-screen w-full bg-background-dark text-white">
            <div className="flex flex-col flex-1 h-full overflow-hidden">
                <header className="flex items-center justify-between border-b border-border-dark px-6 py-4 bg-background-dark z-10">
                    <div className="hidden lg:flex flex-col gap-2">
                        {/* Logo Row */}
                        <div className="flex items-center gap-3">
                             <div className="size-6 rounded-full border-[2px] border-[#3b82f6] flex-shrink-0 bg-transparent"></div>
                             <div className="flex flex-col">
                                <span className="font-display font-bold text-white text-[8px] tracking-[0.1em] uppercase leading-none">
                                    ACELERADORA
                                </span>
                                <span className="font-display font-bold text-[#3b82f6] text-[8px] tracking-[0.1em] uppercase leading-none">
                                    TECNOLÓGICA
                                </span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold leading-tight">Predictive Retention Risk</h2>
                            <p className="text-sm text-text-secondary">AI-driven analysis of workforce stability.</p>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto flex flex-col gap-8">
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-5 rounded-xl border border-border-dark bg-surface-dark shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-danger/10 text-danger"><span className="material-symbols-outlined">person_alert</span></div>
                                    <p className="text-sm font-medium text-text-secondary">High Risk Employees</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold">32</h3>
                                    <span className="text-sm font-medium text-danger">+4 this week</span>
                                </div>
                            </div>
                        </section>
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 p-6 rounded-xl border border-border-dark bg-surface-dark shadow-sm flex flex-col h-96">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold">Risk Distribution</h3>
                                </div>
                                <div className="relative flex-1 w-full rounded-lg bg-background-dark border border-dashed border-border-dark p-4 overflow-hidden">
                                    <div className="absolute top-[20%] right-[15%] group cursor-pointer">
                                        <div className="size-4 rounded-full bg-danger border-2 border-surface-dark shadow-lg ring-4 ring-danger/20"></div>
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Sarah Jenkins (94%)</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl border border-border-dark bg-surface-dark shadow-sm flex flex-col">
                                <h3 className="text-lg font-bold mb-4">Top Attrition Drivers</h3>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1.5"><span className="font-medium text-text-secondary">Compensation Stagnation</span><span className="text-danger font-bold">42%</span></div>
                                        <div className="h-2 w-full bg-background-dark rounded-full overflow-hidden"><div className="h-full bg-danger rounded-full" style={{ width: '42%' }}></div></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};