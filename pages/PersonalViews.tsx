import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import {
    BrainCircuit, Search, Share2, Zap, BarChart3, Target, Binary, ShieldAlert,
    TrendingUp, Sparkles, Award, Mic, StopCircle, RefreshCw, Flame, Edit3,
    ChevronRight, CheckCircle2, Play, ArrowRight, LayoutDashboard, MessageSquare,
    EyeOff
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// --- Screen: Competency & Skill Mapping ---
// --- Screen: Competency & Skill Mapping ---
export const CompetencyMap: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-fade-in relative pb-4">
            {/* Header Section */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5">
                        <BrainCircuit size={24} className="text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight">Competency & Skill Mapping</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Visualizing Skill Adjacency & Growth</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center bg-surface-dark rounded-xl px-4 py-2 w-72 border border-glass-border focus-within:border-primary/50 transition-all shadow-inner">
                        <Search size={18} className="text-slate-500" />
                        <input
                            className="bg-transparent border-none text-sm text-white focus:ring-0 w-full placeholder:text-slate-600 font-medium ml-2"
                            placeholder="Buscar talentos..."
                            type="text"
                        />
                    </div>
                    <button className="px-6 py-2.5 bg-primary hover:bg-primary-glow text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
                        <Share2 size={14} /> Exportar Galaxy
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
                {/* Main Galaxy / Visualization Area */}
                <div className="flex-1 glass-panel rounded-3xl border-white/5 relative overflow-hidden group">
                    {/* Background Galaxy Effect */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(236, 91, 19, 0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>

                    {/* Overlay User Info */}
                    <div className="absolute top-8 left-8 z-10 p-6 glass-panel border-white/10 rounded-2xl backdrop-blur-md shadow-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="size-14 rounded-2xl bg-cover bg-center border-2 border-primary/50" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?u=sarah")' }}></div>
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight leading-none">Sarah Jenkins</h3>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Senior Data Scientist</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            {[
                                { label: 'Skills', value: '24' },
                                { label: 'Velocity', value: '+12%', color: 'text-emerald-400' },
                                { label: 'Health', value: '94', color: 'text-primary' }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-0.5">{stat.label}</p>
                                    <p className={`text-lg font-black ${stat.color || 'text-white'}`}>{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Galaxy Logic Rendering (Placeholder Nodes for UI) */}
                    <div className="absolute inset-0 flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-1000">
                        {/* Central Node */}
                        <div className="relative size-24 rounded-full border-4 border-primary shadow-glow p-1 bg-surface-dark z-20">
                            <div className="w-full h-full bg-cover bg-center rounded-full" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?u=sarah")' }}></div>
                        </div>

                        {/* Skill Nodes (Hardcoded layout for visual parity) */}
                        <div className="absolute top-[30%] left-[65%] group cursor-pointer z-20">
                            <div className="flex flex-col items-center gap-2">
                                <div className="size-16 rounded-3xl bg-surface-dark border-2 border-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-all">
                                    <Zap size={24} className="text-primary" />
                                </div>
                                <span className="px-3 py-1 glass-panel text-[10px] font-black text-white uppercase tracking-widest">Python</span>
                            </div>
                        </div>

                        <div className="absolute top-[60%] left-[30%] group cursor-pointer z-10 opacity-60 hover:opacity-100 transition-all">
                            <div className="flex flex-col items-center gap-2">
                                <div className="size-12 rounded-2xl bg-surface-dark border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                                    <BarChart3 size={18} className="text-slate-400 group-hover:text-primary" />
                                </div>
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Data Viz</span>
                            </div>
                        </div>

                        <div className="absolute top-[25%] left-[35%] group cursor-pointer z-10 opacity-60 hover:opacity-100 transition-all">
                            <div className="flex flex-col items-center gap-2">
                                <div className="size-12 rounded-2xl bg-surface-dark border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                                    <Target size={18} className="text-slate-400 group-hover:text-primary" />
                                </div>
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">AI Strategy</span>
                            </div>
                        </div>
                    </div>

                    {/* Controls Bar */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 glass-panel border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl z-30">
                        <button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary text-white px-5 text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20">
                            <Binary size={18} /> Galaxy View
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-2"></div>
                        <button className="flex h-10 items-center justify-center gap-2 rounded-xl hover:bg-white/5 px-4 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                            <ShieldAlert size={16} /> Hide Gaps
                        </button>
                        <button className="flex h-10 items-center justify-center gap-2 rounded-xl hover:bg-white/5 px-4 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                            <TrendingUp size={16} /> Market Trends
                        </button>
                    </div>
                </div>

                {/* Right Panel / Detail View */}
                <aside className="w-full lg:w-96 glass-panel rounded-3xl border-white/5 flex flex-col shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-glass-border">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-glow">
                                    <Zap size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white tracking-tight">Python</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Primary Capability</p>
                                </div>
                            </div>
                            <button className="size-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-500 transition-colors">
                                <Share2 size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto space-y-8 custom-scrollbar">
                        <div className="p-6 rounded-2xl bg-surface-dark border border-white/5 shadow-xl">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proficiency Mastery</span>
                                <span className="text-sm font-black text-primary">EXPERT (4/5)</span>
                            </div>
                            <div className="flex gap-1.5 h-2.5 mb-3">
                                {[1, 2, 3, 4, 5].map((idx) => (
                                    <div key={idx} className={`flex-1 rounded-full ${idx <= 4 ? 'bg-primary shadow-glow' : 'bg-white/5'}`}></div>
                                ))}
                            </div>
                            <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest">Verificado: Oct 24, 2023</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary">
                                <Sparkles size={16} className="animate-pulse" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest">AI Strategic Insight</h4>
                            </div>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 shadow-xl">
                                <p className="text-sm text-slate-300 font-medium leading-relaxed mb-4">
                                    High mastery correlation: Developing <span className="text-white font-black">GenAI integration</span> with Python projected to increase retention score by 24% YoY.
                                </p>
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                                        <Award size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Recommendation</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-medium">Adjacent skill detected: TensorFlow / PyTorch</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-t border-glass-border space-y-3">
                        <button className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary-glow transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                            <Zap size={16} /> Enroll in Track
                        </button>
                        <button className="w-full py-3 bg-white/5 border border-glass-border text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
                            Mentorship Search
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

// --- Screen: Cognitive Restructuring ---
export const CognitiveRestructuring: React.FC = () => {
    const { t } = useLanguage();
    const [journalEntry, setJournalEntry] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const checkApiKey = async () => {
        if ((window as any).aistudio) {
            const hasKey = await (window as any).aistudio.hasSelectedApiKey();
            if (!hasKey) {
                await (window as any).aistudio.openSelectKey();
                return false;
            }
        }
        return true;
    };

    const handleMicClick = async () => {
        if (!isRecording) {
            if (!(await checkApiKey())) return;

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                audioChunksRef.current = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };

                mediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    await transcribeAudio(audioBlob);
                    stream.getTracks().forEach(track => track.stop());
                };

                mediaRecorder.start();
                setIsRecording(true);
            } catch (err) {
                console.error("Error accessing microphone:", err);
            }
        } else {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        }
    };

    const transcribeAudio = async (audioBlob: Blob) => {
        setIsTranscribing(true);
        try {
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
                const base64Audio = (reader.result as string).split(',')[1];

                try {
                    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                    const response = await ai.models.generateContent({
                        model: 'gemini-3-flash-preview',
                        contents: {
                            parts: [
                                { inlineData: { mimeType: 'audio/webm', data: base64Audio } },
                                { text: "Transcribe this audio exactly as spoken." }
                            ]
                        }
                    });

                    if (response.text) {
                        setJournalEntry(prev => (prev ? prev + " " : "") + response.text);
                    }
                } catch (apiError) {
                    console.error("API Error", apiError);
                    setJournalEntry(prev => (prev ? prev + " " : "") + "[Transcription simulation: I feel overwhelmed by the velocity of changes...]");
                }

                setIsTranscribing(false);
            };
        } catch (error) {
            console.error("Transcription error:", error);
            setIsTranscribing(false);
        }
    };

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-fade-in relative pb-4">
            {/* Header Section */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5">
                            <BrainCircuit size={20} className="text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-black text-white tracking-tight">Cognitive Reframing</h2>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Build Mental Resilience & Adaptability</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-surface-dark border border-glass-border rounded-2xl px-6 py-3 shadow-xl">
                    <div className="bg-primary/20 p-2.5 rounded-xl text-primary shadow-glow">
                        <Flame size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">Current Streak</p>
                        <p className="text-xl font-black text-white leading-none">12 Days</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="glass-panel rounded-3xl p-8 border-white/5 shadow-2xl flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="size-8 rounded-lg bg-white/5 border border-glass-border flex items-center justify-center">
                                        <Edit3 size={18} className="text-primary" />
                                    </div>
                                    <h3 className="text-lg font-black tracking-tight">Challenge your Thoughts</h3>
                                </div>
                                {isTranscribing && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg animate-pulse">
                                        <RefreshCw size={14} className="text-primary animate-spin" />
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">IA Transcribing...</span>
                                    </div>
                                )}
                            </div>

                            <div className="relative group/input">
                                <textarea
                                    value={journalEntry}
                                    onChange={(e) => setJournalEntry(e.target.value)}
                                    className="w-full bg-black/40 border border-glass-border rounded-2xl p-6 text-white placeholder:text-slate-600 min-h-[220px] focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base font-medium leading-relaxed"
                                    placeholder="Type or record your thoughts... e.g., 'I feel like I'm not moving fast enough with the AI transition...'"
                                ></textarea>

                                <div className="absolute bottom-4 right-4 flex gap-3">
                                    <button
                                        onClick={handleMicClick}
                                        className={`size-12 rounded-2xl flex items-center justify-center transition-all shadow-xl ${isRecording
                                            ? 'bg-red-500 scale-110 shadow-red-500/40 text-white'
                                            : 'bg-surface-dark border border-glass-border text-slate-400 hover:text-white hover:border-primary'
                                            }`}
                                    >
                                        {isRecording ? <StopCircle size={22} /> : <Mic size={22} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button className="px-8 py-3.5 bg-primary hover:bg-primary-glow text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-primary/20 flex items-center gap-3">
                                    <Sparkles size={16} /> Reframe with MagUI
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="glass-panel rounded-3xl p-8 border-white/5 shadow-2xl bg-primary/5 relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 size-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-1000"></div>
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Target size={14} /> Daily Intent
                            </h4>
                            <blockquote className="text-xl font-black text-white leading-tight italic">
                                "Growth is uncomfortable because you’ve never been here before."
                            </blockquote>
                            <div className="mt-8 pt-6 border-t border-primary/10">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Reframing Context</p>
                                <p className="text-xs text-slate-400 font-medium">Focus on Agile Learning and Theory of Mind.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Screen: Mantra Management ---
export const MantraCreator: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-fade-in relative pb-4">
            {/* Header Section */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5">
                        <Flame size={24} className="text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight">Mantra & Habit Creation</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Automated Coaching for Mental Performance</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-6 py-2.5 bg-primary hover:bg-primary-glow text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
                        <Sparkles size={14} /> AI Generate
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Active Mantras */}
                    <div className="lg:col-span-8 flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Award size={16} className="text-primary" /> Active Habits
                            </h3>
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">3 OF 5 SLOTS USED</span>
                        </div>

                        {[
                            { title: 'Theory of Mind Exercise', category: 'EMOTIONAL INTELLIGENCE', color: 'primary', icon: BrainCircuit },
                            { title: 'Growth Mindset Affirmation', category: 'RESILIENCE', color: 'emerald-400', icon: Zap },
                            { title: 'Strategic Adaptation Loop', category: 'STRATEGY', color: 'purple-500', icon: Target },
                        ].map((mantra, i) => (
                            <div key={i} className="p-6 glass-panel rounded-2xl border-white/5 hover:border-primary/30 transition-all group flex items-center justify-between shadow-xl">
                                <div className="flex items-center gap-6">
                                    <div className={`size-14 rounded-2xl bg-surface-dark border border-glass-border flex items-center justify-center text-${mantra.color} group-hover:scale-110 transition-transform`}>
                                        <mantra.icon size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{mantra.category}</p>
                                        <h4 className="text-lg font-black text-white tracking-tight">{mantra.title}</h4>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="size-10 rounded-xl hover:bg-white/5 border border-glass-border flex items-center justify-center text-slate-500 hover:text-white transition-all">
                                        <MessageSquare size={18} />
                                    </button>
                                    <button className="size-10 rounded-xl hover:bg-white/5 border border-glass-border flex items-center justify-center text-slate-500 hover:text-red-400 transition-all">
                                        <EyeOff size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats & Controls */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="glass-panel rounded-3xl p-8 border-white/5 shadow-2xl flex flex-col gap-8">
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Mantra Performance</h4>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold text-white">Adoption Rate</span>
                                            <span className="text-xs font-black text-primary">84%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary shadow-glow w-[84%]"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold text-white">Cognitive Load</span>
                                            <span className="text-xs font-black text-emerald-400">OPTIMAL</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-400 w-[62%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Screen: Custom Learning Path Timeline ---
export const LearningPath: React.FC = () => {
    const { t } = useLanguage();
    const [activeSession, setActiveSession] = useState<{ id: number, title: string } | null>(null);
    const [tutorReady, setTutorReady] = useState(false);
    const [serviceDown, setServiceDown] = useState(false);

    const checkService = async (retriesOrEvent: any = 3) => {
        const retries = typeof retriesOrEvent === 'number' ? retriesOrEvent : 3;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
            // Check Backend API using env var or default to localhost
            const apiUrl = import.meta.env.VITE_DEEPTUTOR_API_URL || 'http://localhost:8001/api/v1';
            await fetch(`${apiUrl}/knowledge/health`, { mode: 'no-cors', signal: controller.signal });
            clearTimeout(timeoutId);
            setTutorReady(true);
            setServiceDown(false);
        } catch (err) {
            if (retries > 0) {
                // Retry after 1.5 second
                setTimeout(() => checkService(retries - 1), 1500);
            } else {
                setServiceDown(true);
                setTutorReady(true);
            }
        }
    };

    const handleStartSession = (step: any, id: number) => {
        if (step.status === 'completed') return;
        setActiveSession({ id, title: step.title });
        setTutorReady(false);
        setServiceDown(false);
        // Ping service after a short delay
        setTimeout(checkService, 1500);
    };

    if (activeSession) {
        return (
            <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-fade-in relative pb-4">
                {/* Session Header */}
                <div className="glass-panel rounded-2xl p-6 flex justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => { setActiveSession(null); setTutorReady(false); }}
                            className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all"
                        >
                            <ChevronRight size={24} className="rotate-180" />
                        </button>
                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5">
                            <BrainCircuit size={24} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white tracking-tight">{activeSession.title}</h2>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">DeepTutor Interactive Session • Active</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-dark border border-glass-border">
                            <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tutor Online</span>
                        </div>
                    </div>
                </div>

                {/* Tutor Interface Wrapper */}
                <div className="flex-1 glass-panel rounded-3xl border-white/5 overflow-hidden relative group bg-black/40">
                    {!tutorReady ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <RefreshCw size={48} className="text-primary animate-spin" />
                            <div className="text-center">
                                <p className="text-white font-bold tracking-tight">Initializing DeepTutor Bridge...</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Checking connection @ localhost:3782</p>
                            </div>
                        </div>
                    ) : serviceDown ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-red-500/5">
                            <div className="size-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                                <ShieldAlert size={40} className="text-red-500" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2 leading-tight">DeepTutor Service Not Detected</h3>
                            <p className="max-w-md text-slate-400 font-medium mb-8">
                                Please ensure you have followed the setup instructions in <code className="text-primary px-2 py-1 bg-primary/10 rounded">DEEPTUTOR_SETUP.md</code> and that the services are running on port 3782.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={checkService}
                                    className="px-8 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2"
                                >
                                    <RefreshCw size={16} /> Retry Connection
                                </button>
                                <button
                                    onClick={() => setActiveSession(null)}
                                    className="px-8 py-3 bg-white/5 border border-glass-border text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                                >
                                    Return to Roadmap
                                </button>
                            </div>
                        </div>
                    ) : (
                        <iframe
                            src={`${import.meta.env.VITE_DEEPTUTOR_URL || 'http://localhost:3782'}/guide`}
                            className="w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity"
                            title="DeepTutor Interface"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-fade-in relative pb-4">
            {/* Header Section */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/5">
                        <ArrowRight size={24} className="text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight">Personalized Growth Path</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Strategic Leadership Evolution @ TalentAI</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="size-10 rounded-xl border-2 border-surface-dark bg-cover bg-center" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${i + 10})` }}></div>
                        ))}
                    </div>
                    <button className="px-6 py-2.5 bg-primary hover:bg-primary-glow text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20">
                        Edit Schedule
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-12 custom-scrollbar p-6">
                {/* Timeline Visualization */}
                <div className="relative">
                    {/* Vertical Rail */}
                    <div className="absolute left-10 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-white/5 hidden md:block"></div>

                    {[
                        { day: 'Día 1', title: 'Self-Awareness & Intro to AI Ethics', status: 'completed', icon: CheckCircle2 },
                        { day: 'Día 12', title: 'Emotional Regulation in High-Velocity Teams', status: 'current', icon: Play },
                        { day: 'Día 30', title: 'Advanced Theory of Mind & Strategic Delegation', status: 'future', icon: ArrowRight },
                        { day: 'Día 60', title: 'AI-Enhanced Leadership Final Project', status: 'future', icon: Sparkles },
                    ].map((step, i) => (
                        <div key={i} className="relative pl-0 md:pl-24 pb-12 last:pb-0 group">
                            {/* Desktop Marker */}
                            <div className={`absolute left-8 top-1.5 size-4 rounded-full border-2 border-surface-dark z-20 hidden md:block transition-all group-hover:scale-125 ${step.status === 'completed' ? 'bg-primary shadow-glow' :
                                step.status === 'current' ? 'bg-white shadow-lg animate-pulse' : 'bg-white/5'
                                }`}></div>

                            <div className={`glass-panel rounded-3xl p-8 border-white/5 hover:border-primary/30 transition-all shadow-2xl flex flex-col md:flex-row gap-8 items-start md:items-center ${step.status === 'future' ? 'opacity-50' : ''
                                }`}>
                                <div className="size-16 rounded-2xl bg-surface-dark border border-glass-border flex items-center justify-center text-primary shadow-xl">
                                    <step.icon size={32} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{step.day}</span>
                                        {step.status === 'completed' && <span className="text-[8px] font-black bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded uppercase tracking-wider">Verified</span>}
                                        {step.status === 'current' && <span className="text-[8px] font-black bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2 py-0.5 rounded uppercase tracking-wider">In Progress</span>}
                                    </div>
                                    <h4 className="text-xl font-black text-white tracking-tight">{step.title}</h4>
                                    <div className="flex items-center gap-6 mt-4">
                                        <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                                            <Sparkles size={14} className="text-primary" /> 2 AI COACHING CREDITS
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleStartSession(step, i)}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${step.status === 'completed' ? 'bg-white/5 text-slate-400' : 'bg-primary text-white shadow-glow hover:bg-primary-glow'
                                        }`}>
                                    {step.status === 'completed' ? 'Review Content' : 'Start Session'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};