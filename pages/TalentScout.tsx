import React from 'react';
import { CandidateScreening } from '../components/CandidateScreening';
import { useLanguage } from '../contexts/LanguageContext';

const TalentScout = () => {
  const { t } = useLanguage();

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col relative pb-4 max-w-[1920px] mx-auto w-full px-4 md:px-8">
      {/* Header Bar with Tabs - Simplified to Single Title/Tab */}
      <div className="glass-panel rounded-3xl p-2 flex flex-col md:flex-row justify-between items-center gap-6 mb-8 mt-6 border border-white/5 bg-background-dark/80 backdrop-blur-2xl">
        <div className="flex p-1.5 bg-black/40 rounded-2xl border border-white/5 relative">
          <button
            className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative z-10 flex items-center gap-3 text-white shadow-lg"
          >
            <div className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-xl -z-10 shadow-glow animate-fade-in"></div>
            <span className="material-symbols-outlined text-lg">videocam</span>
            Interview
          </button>
        </div>
      </div>

      <CandidateScreening />
    </div>
  );
};

export default TalentScout;