import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BrainCircuit, ChevronRight, Activity, Users, ShieldCheck,
  ArrowRight, Sparkles, Zap, Target, BarChart3, Globe
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-display selection:bg-cyan-500/30 overflow-x-hidden">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="relative size-10 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <BrainCircuit className="text-white" size={24} />
            </div>
            <span className="font-black text-2xl tracking-tighter text-white">Talent<span className="text-cyan-400">AI</span></span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
              <a href="#vision" className="hover:text-cyan-400 transition-colors">Vision</a>
              <a href="#enterprise" className="hover:text-cyan-400 transition-colors">Enterprise</a>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2.5 bg-white text-slate-950 rounded-full font-bold text-sm hover:bg-cyan-400 hover:text-white transition-all active:scale-95 shadow-lg shadow-white/5"
            >
              Log In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-black text-cyan-400 uppercase tracking-widest mb-8 animate-bounce">
            <Sparkles size={14} />
            Next-Gen HCM Infrastructure
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 max-w-5xl">
            AI-DRIVEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">TALENT EVOLUTION</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl leading-relaxed font-medium">
            The world's first autonomous platform for large-scale organizational restructuring.
            Bridge the gap between potential and peak performance with deep-layer cognitive analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button
              onClick={() => navigate('/login')}
              className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white rounded-2xl text-xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-cyan-500/20 flex items-center gap-3 group"
            >
              Enter Platform
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-xl font-black uppercase tracking-widest transition-all backdrop-blur-md">
              Watch Demo
            </button>
          </div>

          {/* App Mockup Preview */}
          <div className="w-full max-w-6xl mx-auto rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-md overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.1)] p-4 group">
            <div className="rounded-2xl overflow-hidden border border-white/5 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                alt="Dashboard Preview"
                className="w-full h-auto opacity-50 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute bottom-10 left-10 z-20 text-left">
                <div className="text-cyan-400 font-black uppercase tracking-widest text-xs mb-2">Live Analytics</div>
                <div className="text-3xl font-black text-white">Dynamic BioStack Dashboard</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section id="features" className="relative z-10 py-24 px-6 bg-slate-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 group">
              <div className="size-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-lg shadow-cyan-500/5">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-black tracking-tight tracking-tight uppercase">Cognitive Profiling</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Move beyond resumes. Our BioStack engine assesses behavioral DNA, cognitive resilience, and adaptability markers in real-time.
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="size-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-lg shadow-purple-500/5">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase">Autonomous Scout</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Deploy intelligent agents to conduct multi-round interviews. Identify top 1% talent using biometric-aware AI validation.
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="size-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg shadow-blue-500/5">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase">Precision Matching</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Automated talent bridge mapping. Match existing team members to future roles based on skill-gap simulations and AI predictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Proof */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <div className="text-5xl font-black text-white mb-2">98%</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Match Accuracy</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">12k+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Talents Screened</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">4.5x</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">ROI Multiplier</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">5min</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Setup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 pt-20 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <BrainCircuit className="text-cyan-500" size={24} />
              <span className="font-black text-xl text-white">TalentAI</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm">
              Redefining human capital iteration for the exponential age.
              Part of the Zenta ecosystem.
            </p>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Product</span>
              <a href="#" className="text-sm text-slate-500 hover:text-white">Platform</a>
              <a href="#" className="text-sm text-slate-500 hover:text-white">Analytics</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Company</span>
              <a href="#" className="text-sm text-slate-500 hover:text-white">About</a>
              <a href="#" className="text-sm text-slate-500 hover:text-white">Security</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center text-slate-600 text-xs">
          &copy; 2026 TalentAI Architecture. All rights reserved. Powered by Advanced Agentic Coding.
        </div>
      </footer>
    </div>
  );
};

export default Home;