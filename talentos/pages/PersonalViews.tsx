import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

// --- Screen: Competency & Skill Mapping ---
export const CompetencyMap: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-screen flex flex-col">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-border-dark bg-background-dark px-6 py-3 shrink-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 text-white">
                        {/* Logo Replacement */}
                        <div className="flex items-center gap-3">
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
                    </div>
                    <div className="flex items-center gap-6 hidden md:flex">
                        <a className="text-text-secondary hover:text-white transition-colors text-sm font-medium leading-normal" href="#">Dashboard</a>
                        <a className="text-white text-sm font-medium leading-normal border-b-2 border-primary py-4" href="#">Skill Map</a>
                        <a className="text-text-secondary hover:text-white transition-colors text-sm font-medium leading-normal" href="#">Succession</a>
                        <a className="text-text-secondary hover:text-white transition-colors text-sm font-medium leading-normal" href="#">Learning</a>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-6">
                    <label className="flex flex-col min-w-40 h-10 max-w-64 hidden lg:flex">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-card-dark border border-border-dark focus-within:border-primary transition-colors">
                            <div className="text-text-secondary flex items-center justify-center pl-3">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input className="flex w-full min-w-0 flex-1 bg-transparent text-white focus:outline-0 border-none h-full placeholder:text-text-secondary px-3 text-sm" placeholder="Search skills or employees..." />
                        </div>
                    </label>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center size-10 rounded-lg hover:bg-border-dark text-text-secondary hover:text-white transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-border-dark" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC07YsxAvLc-FQtT4THWJpZJHk9cNkCoKaMBEqB92fdTg-2sI-02qaueqbjykMUP1tKo8NovEFAK4e4k2K_DBxC5ceR4rREl7gCli7Xc9nGzsQal6pTdze6XqlTqXGXjpWTSxyJvoC4SCRGEbOhnR-EfP8wRcwS4pLBt61ANakSN7EKxHNA-lQ8KDVFfDgZNtSs2M3ji0DO-u4i3IggLCDOD14ZuIhpqbOOxdwkMnt065MZxyLJMTVvLKtV19w-SEeOlWYZRt07u9QW")' }}></div>
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden relative">
                <main className="flex-1 relative flex flex-col bg-background-dark">
                    <div className="absolute top-0 left-0 w-full z-10 p-6 bg-gradient-to-b from-background-dark via-background-dark/80 to-transparent pointer-events-none">
                        <div className="max-w-[1200px] flex flex-wrap justify-between items-start gap-4 pointer-events-auto">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-white text-3xl font-bold tracking-tight">Sarah Jenkins</h1>
                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary border border-primary/30">Senior Data Scientist</span>
                                </div>
                                <p className="text-text-secondary text-sm">Visualizing skill adjacency and AI-driven growth opportunities.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col px-4 py-2 rounded-lg bg-card-dark/50 border border-border-dark backdrop-blur-sm">
                                    <span className="text-2xl font-bold text-white">24</span>
                                    <span className="text-xs text-text-secondary uppercase tracking-wider">Total Skills</span>
                                </div>
                                <div className="flex flex-col px-4 py-2 rounded-lg bg-card-dark/50 border border-border-dark backdrop-blur-sm">
                                    <span className="text-2xl font-bold text-green-400">+12%</span>
                                    <span className="text-xs text-text-secondary uppercase tracking-wider">Velocity YoY</span>
                                </div>
                                <div className="flex flex-col px-4 py-2 rounded-lg bg-card-dark/50 border border-border-dark backdrop-blur-sm">
                                    <span className="text-2xl font-bold text-primary">94</span>
                                    <span className="text-xs text-text-secondary uppercase tracking-wider">Health Score</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative overflow-hidden w-full h-full cursor-grab active:cursor-grabbing group" id="galaxy-canvas">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#222f49 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute inset-0 flex items-center justify-center transform scale-90 md:scale-100 transition-transform origin-center">
                            <svg className="absolute w-full h-full pointer-events-none z-0 overflow-visible">
                                <line stroke="#314368" strokeWidth="2" x1="50%" x2="65%" y1="50%" y2="35%"></line>
                                <line stroke="#314368" strokeWidth="2" x1="50%" x2="35%" y1="50%" y2="60%"></line>
                                <line stroke="#314368" strokeDasharray="5,5" strokeWidth="1" x1="50%" x2="30%" y1="50%" y2="30%"></line>
                                <line opacity="0.6" stroke="#256af4" strokeWidth="1" x1="65%" x2="80%" y1="35%" y2="40%"></line>
                                <line stroke="#314368" strokeWidth="1" x1="65%" x2="70%" y1="35%" y2="15%"></line>
                            </svg>
                            <div className="absolute z-10 size-20 rounded-full border-4 border-card-dark shadow-2xl overflow-hidden" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpncK92BlOuH8RWPsTDXIg_ed2OizQanNr8I7-D27R6cSgBU2cqfJMt37G_UPfGSLcw7MUNosp874o3tlXrX81xyqQBv3r7yIjSRqprZ0PRygOc_NMrMaoTV0SCKFRtx3yIbujnLKxCnwIdjD94QZL3gFBEx-UN3f-78KiLC_MKUZMgUDhEdxLP6Imh0abrKTbQY8cfDXwNYLwsJ3z72KslZemj30tkl0KxlyvmB5lEy9Nez2WSIRfGSqrd2dcazOE-Pd4-UJHY56V")' }}></div>
                            </div>
                            <div className="absolute z-20 flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-110" style={{ top: '35%', left: '65%', transform: 'translate(-50%, -50%)' }}>
                                <div className="size-16 rounded-full bg-card-dark border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(37,106,244,0.4)] node-active">
                                    <img alt="Python Logo" className="size-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3-JPaEGB2DhHcS3cK5v6HtOwxDLyTVgBdJ31QnimwtqpcFDju1OAF2aJHyzIMVpozxqQ4KrDMzBLwkIuy48nInOARy4LldAuOrxLGgKIyDtFBrSZWCXZhHE7mT7TQt6cp1CT4hu_T7UHvyGCOZaV4TpOB-OxllpIkfvLoJCuJnkyXQlwH93Ujq1nWFEzJrS6T72Gt_2t3vp8Eaad8g1rs4quHJgwPkmNN9TdVtxfh4Q9kqT4VYafZzQLC5F5unuTvNgcb0PRDL06w" />
                                </div>
                                <span className="px-2 py-1 bg-card-dark/80 rounded text-xs font-bold text-white backdrop-blur-sm border border-border-dark">Python</span>
                            </div>
                            <div className="absolute z-10 flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-110 opacity-80 hover:opacity-100" style={{ top: '60%', left: '35%', transform: 'translate(-50%, -50%)' }}>
                                <div className="size-12 rounded-full bg-card-dark border border-white/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white">groups</span>
                                </div>
                                <span className="px-2 py-1 bg-card-dark/80 rounded text-xs font-medium text-text-secondary backdrop-blur-sm border border-border-dark">Team Lead</span>
                            </div>
                            <div className="absolute z-10 flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-110 opacity-80 hover:opacity-100" style={{ top: '30%', left: '30%', transform: 'translate(-50%, -50%)' }}>
                                <div className="size-10 rounded-full bg-card-dark border border-white/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white">monitoring</span>
                                </div>
                                <span className="px-2 py-1 bg-card-dark/80 rounded text-xs font-medium text-text-secondary backdrop-blur-sm border border-border-dark">Data Viz</span>
                            </div>
                            <div className="absolute z-10 flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-110 group/node" style={{ top: '40%', left: '80%', transform: 'translate(-50%, -50%)' }}>
                                <div className="relative size-14 rounded-full bg-card-dark border border-dashed border-primary flex items-center justify-center group-hover/node:bg-primary/10 transition-colors">
                                    <div className="absolute -top-1 -right-1 size-4 bg-primary rounded-full flex items-center justify-center text-[10px] text-white font-bold animate-bounce">AI</div>
                                    <span className="material-symbols-outlined text-primary">psychology</span>
                                </div>
                                <span className="px-2 py-1 bg-card-dark/80 rounded text-xs font-bold text-primary backdrop-blur-sm border border-primary/30">Machine Learning</span>
                            </div>
                            <div className="absolute z-10 flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-110 opacity-60 hover:opacity-100" style={{ top: '15%', left: '70%', transform: 'translate(-50%, -50%)' }}>
                                <div className="size-8 rounded-full bg-card-dark border border-white/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-text-secondary text-sm">cloud</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 p-2 rounded-xl bg-card-dark/90 border border-border-dark backdrop-blur-md shadow-xl z-30 max-w-[90%] overflow-x-auto no-scrollbar">
                            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary text-white px-4 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">hub</span>
                                <span className="text-sm font-medium">Galaxy View</span>
                            </button>
                            <div className="w-px h-6 bg-border-dark mx-1"></div>
                            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg hover:bg-white/5 px-3 transition-colors group">
                                <span className="material-symbols-outlined text-text-secondary group-hover:text-white text-[18px]">visibility_off</span>
                                <span className="text-text-secondary group-hover:text-white text-sm font-medium">Hide Gaps</span>
                            </button>
                            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg hover:bg-white/5 px-3 transition-colors group">
                                <span className="material-symbols-outlined text-text-secondary group-hover:text-white text-[18px]">trending_up</span>
                                <span className="text-text-secondary group-hover:text-white text-sm font-medium">Market Demand</span>
                            </button>
                        </div>
                        <div className="absolute bottom-8 right-8 p-3 rounded-lg bg-card-dark/80 border border-border-dark backdrop-blur-sm hidden md:block z-20">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full bg-primary border border-primary"></div>
                                    <span className="text-xs text-text-secondary">Mastered / Core</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full bg-card-dark border border-white/20"></div>
                                    <span className="text-xs text-text-secondary">Developing</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full bg-card-dark border border-dashed border-primary"></div>
                                    <span className="text-xs text-text-secondary">Adjacent Opportunity</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <aside className="w-96 bg-card-dark border-l border-border-dark flex flex-col z-20 shrink-0 overflow-y-auto">
                    <div className="p-6 border-b border-border-dark flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-[#26334d] rounded-md">
                                    <img alt="Python Logo" className="size-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-WHMqyxBV18LY4GoFJnQPJIjG7j5zIOv32-F_VIlZdwBL6_dWSKERfbyeQtMZ5lZJen87-z5NINUAQA-OC4WN7tkd6jKKe768-q9_WbcBiKLIGa0Fl9prnExQJDVYTptcBf5851tRDc857Q5s1jTK9wAa_A3syexkU8EB4IhfgukmT64GQqjggfL6onqQDbOU3_0tRsyXHuvM24kuOJZmFHPqMBcac7addg7Fe0YVD4yYtx45VvuDln1gir9IcV_5gGV4GEmnNP9e" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Python</h3>
                            </div>
                            <p className="text-sm text-text-secondary">Programming Language</p>
                        </div>
                        <button className="text-text-secondary hover:text-white">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div className="flex-1 p-6 flex flex-col gap-6">
                        <div className="p-4 rounded-xl bg-background-dark border border-border-dark">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-text-secondary">Proficiency Level</span>
                                <span className="text-sm font-bold text-primary">Expert (4/5)</span>
                            </div>
                            <div className="flex gap-1 h-2 mb-2">
                                <div className="flex-1 rounded-sm bg-primary"></div>
                                <div className="flex-1 rounded-sm bg-primary"></div>
                                <div className="flex-1 rounded-sm bg-primary"></div>
                                <div className="flex-1 rounded-sm bg-primary"></div>
                                <div className="flex-1 rounded-sm bg-[#222f49]"></div>
                            </div>
                            <p className="text-xs text-text-secondary mt-2">Verified via Assessment on Oct 24, 2023</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider">AI Insight</h4>
                            </div>
                            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                                    Based on Sarah's mastery of Python, she has a <strong className="text-white">85% compatibility</strong> with Machine Learning roles.
                                </p>
                                <div className="flex items-start gap-3 p-3 bg-background-dark/50 rounded-lg border border-border-dark/50">
                                    <span className="material-symbols-outlined text-yellow-500 text-[20px] mt-0.5">lightbulb</span>
                                    <div className="text-xs text-text-secondary">
                                        <span className="text-white font-medium block mb-1">Retention Impact</span>
                                        Developing this adjacent skill is projected to increase retention probability by 20% over 12 months.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Connected Opportunities</h4>
                            <div className="flex flex-col gap-2">
                                <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-[#222f49] cursor-pointer transition-colors border border-transparent hover:border-border-dark">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-background-dark flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-[18px]">psychology</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Machine Learning</p>
                                            <p className="text-xs text-text-secondary">High Demand</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-text-secondary text-[18px] group-hover:text-primary">chevron_right</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-border-dark bg-background-dark">
                        <button className="flex w-full items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-[0_4px_14px_0_rgba(37,106,244,0.39)]">
                            <span className="material-symbols-outlined">school</span>
                            Enroll in Advanced Course
                        </button>
                        <button className="flex w-full items-center justify-center gap-2 mt-3 bg-transparent hover:bg-[#222f49] text-text-secondary hover:text-white font-medium py-2 px-4 rounded-lg transition-colors border border-border-dark">
                            Find a Mentor
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

// --- Screen: Cognitive Restructuring ---
export const CognitiveRestructuring: React.FC = () => {
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
            if (!(await checkApiKey())) return; // Validate connection before starting

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
                
                // Gemini API Call
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
                    // Fallback for demo if API fails
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
        <div className="bg-background-dark text-white font-display min-h-screen flex flex-col overflow-x-hidden">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-border-dark bg-background-dark px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-4 text-white">
                    {/* Logo Replacement */}
                    <div className="flex items-center gap-3">
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
                </div>
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-border-dark" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQX5Kay9_wjaQi86AioPofZEYqgvUsw18adUE53F9NgnTOt_kLzmBoOZa3Hhw5Ud3zKFQr-CuNEb24M_8f7ebLja6rHmkM202Kq1Sa2XZuBxTbm1t9ieWuuJPrpFRlULU9ccyNzSFiQ7Z6N4Pc9M0l7dZdy9PZjgIK3nG-2gxaOxMORNbco6lqHsGhRTHnbdwh2B-UM4SJJXKiVcgL5iO_nPGiWF-NhBMQpve9C4JhUxThHkGQfLxL-l7cY184NKEv05l116u5UHWi")' }}></div>
            </header>
            <div className="flex flex-1 justify-center py-8 px-4 md:px-8">
                <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 gap-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div className="flex flex-col gap-2 max-w-2xl">
                                <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Cognitive Reframing</h1>
                                <p className="text-text-secondary text-base md:text-lg font-normal leading-relaxed">
                                    Challenge limiting beliefs and build mental resilience.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 bg-surface-dark border border-border-dark rounded-xl p-4 min-w-[200px]">
                                <div className="bg-primary/20 p-3 rounded-full text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined">local_fire_department</span>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Current Streak</p>
                                    <p className="text-white text-2xl font-bold">12 Days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 flex flex-col gap-8">
                            <div className="bg-surface-dark border border-border-dark rounded-xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">edit_note</span>
                                        <h3 className="text-white text-xl font-bold">Journal your thought</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                         {isTranscribing && (
                                            <span className="flex items-center gap-1.5 text-xs font-medium text-text-secondary animate-pulse px-2 py-1 bg-surface-dark-lighter rounded">
                                                <span className="material-symbols-outlined text-sm animate-spin">sync</span> 
                                                Gemini Transcribing...
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="relative">
                                    <textarea 
                                        value={journalEntry}
                                        onChange={(e) => setJournalEntry(e.target.value)}
                                        className="w-full bg-background-dark border border-border-dark rounded-lg p-4 text-white placeholder:text-text-secondary/50 min-h-[160px] focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-shadow text-base leading-relaxed" 
                                        placeholder="Type or record your thoughts... e.g., 'I feel like everyone else understands this data faster than I do...'"
                                    ></textarea>
                                    <div className="absolute bottom-3 right-3 z-10">
                                         <button 
                                            onClick={handleMicClick}
                                            className={`flex items-center justify-center size-10 rounded-full transition-all shadow-lg backdrop-blur-sm ${
                                                isRecording 
                                                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse ring-4 ring-red-500/20' 
                                                : 'bg-surface-dark-lighter/80 hover:bg-primary text-white border border-border-dark hover:border-primary'
                                            }`}
                                            title={isRecording ? "Stop Recording" : "Start Voice Input"}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {isRecording ? 'stop' : 'mic'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <button className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2">
                                        <span className="material-symbols-outlined">auto_awesome</span> Reframe Thought
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-gradient-to-br from-primary/20 to-surface-dark border border-primary/20 rounded-xl p-6 relative overflow-hidden">
                                <p className="text-primary text-xs font-bold uppercase tracking-wider mb-3">Daily Mantra</p>
                                <blockquote className="text-white text-lg font-serif italic mb-4">
                                    "Growth is uncomfortable because you’ve never been here before."
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Screen: Mantra Creator ---
export const MantraCreator: React.FC = () => {
    return (
        <div className="bg-background-dark text-white font-display overflow-hidden flex h-screen w-full">
            <main className="flex-1 overflow-y-auto no-scrollbar relative bg-background-dark">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-surface-dark to-transparent pointer-events-none z-0"></div>
                <div className="layout-container flex flex-col max-w-[1200px] mx-auto px-6 py-8 relative z-10 h-full">
                    <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
                        <div className="flex flex-col gap-2 max-w-2xl">
                            <p className="text-primary font-bold text-sm tracking-widest uppercase mb-1">Empowerment Tool</p>
                            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">My North Star</h1>
                        </div>
                        <div className="flex items-center gap-4 bg-surface-dark/50 backdrop-blur-sm border border-border-dark rounded-xl p-3 pr-5 shadow-lg">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary"><span className="material-symbols-outlined">center_focus_strong</span></div>
                            <div className="flex flex-col mr-2"><span className="text-white text-sm font-bold">Focus Mode</span></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full pb-10">
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 md:p-10 shadow-xl flex flex-col gap-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                                <div className="flex items-center justify-between">
                                    <label className="text-white text-lg font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">edit_note</span> Your Daily Mantra
                                    </label>
                                </div>
                                <textarea className="w-full bg-transparent border-none text-white text-3xl md:text-4xl font-bold placeholder:text-text-secondary/30 focus:ring-0 p-0 min-h-[180px] resize-none leading-tight tracking-tight" placeholder="What drives you today? Define your intent..."></textarea>
                                <div className="h-px w-full bg-border-dark"></div>
                                <button className="group flex items-center justify-center gap-2 h-11 px-6 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/25 active:scale-95 w-fit">
                                    <span className="material-symbols-outlined group-hover:animate-pulse">save</span> Save Mantra
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Screen: Learning Path ---
export const LearningPath: React.FC = () => {
    return (
        <div className="bg-background-dark text-white font-display overflow-x-hidden min-h-screen">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-dark bg-background-dark px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-white">
                        {/* Logo Replacement */}
                        <div className="flex items-center gap-3">
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
                    </div>
                </div>
            </header>
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
                    <div className="layout-content-container flex flex-col max-w-[1000px] flex-1 gap-6">
                        <div className="flex flex-wrap justify-between gap-6 p-4 pb-0">
                            <div className="flex min-w-72 flex-col gap-3">
                                <div className="flex items-center gap-2 mb-1"><span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">VP Readiness Track</span></div>
                                <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Strategic Leadership Pathway</h1>
                            </div>
                        </div>
                        <div className="px-4 pb-20">
                            <div className="relative flex flex-col gap-0">
                                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border-dark z-0"></div>
                                <div className="relative flex gap-6 pb-10 group">
                                    <div className="flex flex-col items-center z-10">
                                        <div className="size-12 rounded-full bg-background-dark border-2 border-green-500 flex items-center justify-center text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                            <span className="material-symbols-outlined">check_circle</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row rounded-xl border border-border-dark bg-surface-dark/50 p-5 gap-5">
                                            <div className="h-full min-h-[100px] w-full md:w-32 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBq6RnG341LcAIZgjvc5Nt02429ufabD516LdBJwDLXzpwZETF5OmpIpHUANPtp_r4Upbb55yk9IPltrSY1zMewcfNP2OwH2yrrujp8E2SW-ZG_OtJMpFTVU8uyh9rvppMq6HyZ68DjHsy4CNQAE9RJvZxKlY3kfZqEHDVkxzBT2m9JnlQP7jL9IjHI8hhElwjHfLXVjCsdXVPOZ1r0mmLBmb68EPGaO-Yo3l1VrZpaG3mnuE0kEDrcXX8XXUA5THcWt6NBV-Rhp-mZ")' }}></div>
                                            <div>
                                                <h3 className="text-white text-lg font-bold">Advanced Financial Modeling for Executives</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex gap-6 pb-10">
                                    <div className="flex flex-col items-center z-10">
                                        <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,106,244,0.4)] ring-4 ring-background-dark">
                                            <span className="material-symbols-outlined filled">play_arrow</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row rounded-xl border border-primary/40 bg-surface-dark p-1 gap-0 shadow-lg relative overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-10 rounded-l-xl"></div>
                                            <div className="flex flex-col md:flex-row w-full p-4 gap-5 z-20">
                                                <div className="h-full min-h-[120px] w-full md:w-32 rounded-lg bg-cover bg-center shrink-0 border border-surface-dark-lighter" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJMDPA3zxAUYvDR_gP9_DpcFxgoZWm-tKSVYBJwXOmO7Fy4IAQonU9Y53NuQG5BdZr-LdKBleS7PABXj5ol6ldRqh1CD0Kx43REREFesjYDcxCT3bFUDyQmxkx7y651N8xas8Dl-Lr-pYyOG2SZAoiiQB2zZr7S0ej1nVsl5DeqRQl78CRvkitNuwrFyfn9kta9Grn1uMqimpPv-tIHbkBW13cq8c-8mxmcFaVvDYRRggBincplQJZ8_jCNpzTH4UyqzDFMoZDdBu8")' }}></div>
                                                <div className="flex flex-col justify-between flex-1 gap-2">
                                                    <div>
                                                        <h3 className="text-white text-xl font-bold">Cross-Departmental Synergy Audit</h3>
                                                    </div>
                                                    <button className="w-full h-10 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm transition-all flex items-center justify-center gap-2">Continue <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                                                </div>
                                            </div>
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