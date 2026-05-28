import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLanguage } from '../contexts/LanguageContext';
import { CampaignDashboard } from './CampaignDashboard';

type TranscriptSegment = {
    speaker: 'Interviewer' | 'Candidate';
    time: string;
    text: string;
};

type ToneAnalysisData = {
    overallSentiment: number;
    toneLabel: string;
    description: string;
    emotionalAttributes: {
        attribute: string;
        score: number;
        description: string;
        color: string;
    }[];
};

export const CandidateScreening: React.FC = () => {
    const [cameraActive, setCameraActive] = useState(false); // Explicit camera state
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [activeTab, setActiveTab] = useState<'setup' | 'transcription' | 'analysis' | 'campaign'>('setup');
    const [thinkingProcess, setThinkingProcess] = useState<string[]>([]);
    const [interviewObjective, setInterviewObjective] = useState('');
    const [agentConfig, setAgentConfig] = useState({
        name: 'Magui',
        profile: 'corporate'
    });
    const [transcriptionData, setTranscriptionData] = useState<TranscriptSegment[]>([]);
    const [toneAnalysis, setToneAnalysis] = useState<ToneAnalysisData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
    const [showAnalysisBanner, setShowAnalysisBanner] = useState(false);
    const { t } = useLanguage();

    const questions = [
        "Cuéntanos sobre tu experiencia liderando proyectos técnicos complejos.",
        "¿Cómo manejas el feedback crítico de un equipo o stakeholder?",
        "Describe una situación donde tuviste que aprender una tecnología nueva bajo presión.",
        "¿Qué impacto esperas generar en una organización impulsada por IA?"
    ];

    // Mock references for video elements
    const videoPreviewRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    // --- Gemini Integration Logic ---
    const startCamera = async () => {
        try {
            setCameraActive(true); // Enable video element immediately
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoPreviewRef.current) {
                videoPreviewRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing camera", err);
            setCameraActive(false); // Revert if failed
        }
    };

    // Robustness: Re-attach stream to video element if component re-renders
    useEffect(() => {
        if (videoPreviewRef.current && stream && cameraActive) {
            videoPreviewRef.current.srcObject = stream;
        }
    }, [stream, cameraActive, activeTab]); // Re-run when view state changes

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setCameraActive(false); // Explicitly disable video element
    };

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

    const handleRecordToggle = async () => {
        if (!isRecording) {
            startCamera();
            setIsRecording(true);
            setAnalysisComplete(false);
            setThinkingProcess([]);
            setTranscriptionData([]);
            setToneAnalysis(null);
            setCurrentQuestionIndex(0);
        } else {
            // Next question or finish
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                completeInterview();
            }
        }
    };

    const completeInterview = async () => {
        // Validate connection before analysis
        const connected = await checkApiKey();
        if (!connected) {
            stopCamera();
            setIsRecording(false);
            alert(t("api.error"));
            return;
        }

        // Do NOT stop camera here - keep it running for analysis
        // stopCamera(); 
        // setIsRecording(false);
        setCurrentQuestionIndex(-1);

        // Show immediate analysis banner
        setShowAnalysisBanner(true);
        setActiveTab('analysis');

        // Wait a bit for the banner to be read before starting simulation
        setTimeout(() => {
            analyzeVideo();
        }, 2000);
    };

    // Simulate the Gemini Analysis Process
    const analyzeVideo = async () => {
        setIsProcessing(true);
        setShowAnalysisBanner(false);
        // Force switch to analysis tab if not already there
        if (activeTab === 'campaign' || activeTab === 'setup') setActiveTab('analysis');

        // ... rest of logic
        setIsProcessing(true);


        // REAL API KEY CHECK REMOVED FOR STABILITY
        // (Previously caused crashes if config was missing)
        /* 
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
            const ai = new GoogleGenerativeAI(apiKey);
            const genModel = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
            await genModel.countTokens('test');
        } catch (e) {
            console.error("API Key Validation Failed", e);
        }
        */

        try {
            // SIMULATED THINKING PROCESS FOR UI
            const steps = [
                "Uploading video chunks...",
                "Gemini Flash: Extracting audio waveform...",
                "Gemini Flash: Generating transcription...",
                "Gemini Pro: Analyzing vocal pitch and cadence...",
                "Gemini Pro: Entering Thinking Mode (Budget: 32k tokens)...",
                "Gemini Pro: Evaluating emotional congruence...",
                "Gemini Pro: Cross-referencing speech patterns with competency map...",
                "Finalizing Candidate Profile..."
            ];

            for (let i = 0; i < steps.length; i++) {
                await new Promise(r => setTimeout(r, 800)); // Simulate latency
                setThinkingProcess(prev => [...prev, steps[i]]);
            }

            setTranscriptionData([
                { speaker: 'Interviewer', time: '00:05', text: questions[0] },
                { speaker: 'Candidate', time: '00:12', text: "Lideré un equipo de 12 desarrolladores en la migración de un sistema legacy a microservicios. Implementamos una arquitectura dirigida por eventos que redujo la latencia en un 40%." },
                { speaker: 'Interviewer', time: '00:45', text: questions[1] },
                { speaker: 'Candidate', time: '00:50', text: "Lo veo como una oportunidad de crecimiento. Siempre busco datos objetivos para entender la raíz del problema y ajustar el rumbo proactivamente." },
                { speaker: 'Interviewer', time: '01:02', text: questions[2] },
                { speaker: 'Candidate', time: '01:08', text: "Sucedió con Rust. Tuvimos que optimizar un worker crítico en dos semanas. Me sumergí en la documentación oficial y logramos la entrega a tiempo con cero errores de memoria." }
            ]);

            setToneAnalysis({
                overallSentiment: 92,
                toneLabel: "Professional & Composed",
                description: "Audio analysis indicates a steady, well-paced delivery with positive inflection. Candidate maintains calm vocal fry even during complex explanations.",
                emotionalAttributes: [
                    { attribute: "Confidence", score: 94, description: "Strong projection, minimal hesitation markers.", color: "bg-green-500" },
                    { attribute: "Empathy", score: 85, description: "Warm tone when discussing team impact.", color: "bg-blue-400" },
                    { attribute: "Stress/Anxiety", score: 12, description: "Low indicators of vocal tension or jitter.", color: "bg-red-400" }
                ]
            });

            setAnalysisComplete(true);
            setThinkingProcess([]); // Clear steps to remove overlay
        } catch (error) {
            console.error("Analysis Failed", error);
            alert("Error durante la simulación de análisis. Revisa la consola.");
        } finally {
            // Only stop camera when we are absolutely done and showing results
            stopCamera();
            setIsRecording(false);
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]); // Added dependency to ensure stream closure check runs

    // Layout Optimization: 
    // Constrain height to viewport minus headers to prevent global scroll.
    // Dimensions approximate: 100vh - (Header ~80px) - (Internal Tabs ~60px)
    return (
        <div className="flex flex-col w-full h-[calc(100vh-140px)] min-h-[600px] overflow-hidden">

            {/* Top Internal Navigation Tabs */}
            <div className="flex border-b border-white/5 bg-black/20 mb-4 rounded-t-3xl overflow-hidden shrink-0">
                <button
                    onClick={() => setActiveTab('setup')}
                    className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'setup' ? 'border-primary text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'}`}
                >
                    <span className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">settings_suggest</span>
                        Configuración
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('analysis')}
                    className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'analysis' ? 'border-primary text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'}`}
                >
                    {t("screening.tab.analysis")}
                </button>
                <button
                    onClick={() => setActiveTab('transcription')}
                    className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'transcription' ? 'border-primary text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'}`}
                >
                    {t("screening.tab.transcript")}
                </button>
                <button
                    onClick={() => setActiveTab('campaign')}
                    className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'campaign' ? 'border-primary text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'}`}
                >
                    <span className="flex items-center justify-center gap-2">
                        Campaign
                        <span className="bg-accent-orange text-[9px] px-1.5 py-0.5 rounded text-black font-bold">CORE</span>
                    </span>
                </button>
            </div>

            {/* Content Area - Scrollable internally */}
            <div className="flex-1 min-h-0 relative overflow-hidden">

                {activeTab === 'campaign' ? (
                    <CampaignDashboard />
                ) : activeTab === 'setup' ? (
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full p-1">
                        {/* Agent Config Column */}
                        <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 bg-black/40 flex flex-col gap-8">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="size-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-glow">
                                    <span className="material-symbols-outlined text-[28px]">smart_toy</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white tracking-tight">Modelo de Agente</h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Configuración de IA Reclutadora</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Nombre del Agente</label>
                                    <input
                                        type="text"
                                        value={agentConfig.name}
                                        onChange={(e) => setAgentConfig({ ...agentConfig, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-700"
                                        placeholder="Nombre de la IA..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Perfil de Personalidad</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { id: 'corporate', label: 'Corporativo', icon: 'business_center' },
                                            { id: 'innovation', label: 'Innovación', icon: 'lightbulb' },
                                            { id: 'technical', label: 'Técnico', icon: 'terminal' },
                                            { id: 'soft', label: 'Empático', icon: 'volunteer_activism' }
                                        ].map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() => setAgentConfig({ ...agentConfig, profile: p.id })}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${agentConfig.profile === p.id ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'}`}
                                            >
                                                <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                                                <span className="text-xs font-bold">{p.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="material-symbols-outlined text-primary text-sm">info</span>
                                        <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">Capacidades del Agente</h4>
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                        Este agente utilizará <strong>Gemini 1.5 Pro</strong> para analizar biometría, tono de voz y coherencia argumental durante la entrevista.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interview Objective Column */}
                        <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 bg-black/40 flex flex-col gap-6">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="size-12 rounded-2xl bg-accent-orange/20 flex items-center justify-center text-accent-orange shadow-[0_0_20px_rgba(255,152,0,0.2)]">
                                    <span className="material-symbols-outlined text-[28px]">target</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white tracking-tight">Objetivo de la Entrevista</h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Definición de Meta y Enfoque</p>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-4">
                                <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Planteamiento del Objetivo</label>
                                <textarea
                                    value={interviewObjective}
                                    onChange={(e) => setInterviewObjective(e.target.value)}
                                    className="flex-1 w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm leading-relaxed focus:outline-none focus:border-accent-orange/50 transition-all resize-none placeholder:text-slate-700 custom-scrollbar"
                                    placeholder="Describe qué esperas obtener de esta entrevista, qué competencias críticas buscas validar y cuál es el contexto del rol..."
                                />
                            </div>

                            <button className="w-full py-4 bg-accent-orange text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-accent-orange/80 transition-all shadow-xl shadow-accent-orange/20 flex items-center justify-center gap-3">
                                <span className="material-symbols-outlined">check_circle</span>
                                Fijar Estrategia
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full overflow-y-auto lg:overflow-hidden p-1">

                        {/* Left Column: Video Interface */}
                        {/* On desktop, we want this centered vertically if possible, or just scrolling with content. 
                            For "Above the fold" look, we keep it fixed in height. */}
                        <div className="flex flex-col gap-4 items-center justify-center h-full overflow-y-auto custom-scrollbar">
                            <div className="relative bg-black rounded-[2.5rem] overflow-hidden aspect-[9/16] w-full max-w-[360px] border-[8px] border-black shadow-2xl flex items-center justify-center group glass-panel ring-1 ring-white/10 shrink-0">
                                {cameraActive ? (
                                    <video ref={videoPreviewRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
                                        {/* Background: Robust Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-black/80 z-0"></div>

                                        {/* Decorative Pattern */}
                                        <div className="absolute inset-0 opacity-30 z-0"
                                            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                                        </div>

                                        {/* Content Overlay - Forced Z-Index High */}
                                        <div className="relative z-50 text-center p-6 backdrop-blur-md rounded-3xl border border-white/20 bg-white/5 shadow-2xl transform transition-all hover:scale-105">
                                            <div
                                                className="size-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 mx-auto shadow-glow cursor-pointer hover:bg-white/20 transition-all"
                                                onClick={handleRecordToggle}
                                            >
                                                <span className="material-symbols-outlined text-4xl text-white">
                                                    {analysisComplete ? "restart_alt" : "videocam"}
                                                </span>
                                            </div>
                                            <p className="text-white font-black uppercase tracking-widest text-xs mb-1 drop-shadow-md">
                                                {analysisComplete ? "Perfil Analizado" : t("screening.no_video")}
                                            </p>
                                            <p className="text-slate-300 text-[10px] uppercase tracking-wider font-bold">
                                                {analysisComplete ? "Reiniciar Entrevista" : "Listo para Conectar"}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {isRecording && (
                                    <>
                                        <div className="absolute top-6 right-6 flex items-center gap-3 bg-red-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse border border-white/20 shadow-xl z-30">
                                            <div className="size-2 rounded-full bg-white shadow-glow"></div> REC
                                        </div>

                                        {/* Question Overlay */}
                                        <div className="absolute inset-x-4 top-20 z-30 animate-in slide-in-from-top-4 duration-500">
                                            <div className="glass-panel p-6 rounded-3xl border-primary/30 bg-primary/20 backdrop-blur-xl shadow-2xl">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Pregunta {currentQuestionIndex + 1}/{questions.length}</span>
                                                </div>
                                                <p className="text-white font-black text-sm leading-tight drop-shadow-md italic">
                                                    "{questions[currentQuestionIndex]}"
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Controls Overlay - Hidden during processing */}
                                {!isProcessing && (
                                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20 px-4">
                                        <button
                                            onClick={handleRecordToggle}
                                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${isRecording
                                                ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30"
                                                : "bg-primary hover:bg-primary-glow text-white shadow-primary/30"
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-base">
                                                {isRecording && !isProcessing
                                                    ? (currentQuestionIndex === questions.length - 1 ? "check_circle" : "arrow_forward")
                                                    : "fiber_manual_record"
                                                }
                                            </span>
                                            {isRecording && !isProcessing
                                                ? (currentQuestionIndex === questions.length - 1 ? "Finalizar y Analizar" : "Siguiente Pregunta")
                                                : t("screening.start")
                                            }
                                        </button>
                                        {!isRecording && (
                                            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest transition-all backdrop-blur-md">
                                                <span className="material-symbols-outlined text-base">upload</span>
                                                {t("screening.upload")}
                                            </button>
                                        )}
                                    </div>
                                )}


                                {/* Unified Analysis & Processing Overlay */}
                                {(showAnalysisBanner || isProcessing) && (
                                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                                        <div className="glass-panel rounded-3xl border-primary/40 p-6 w-full h-full bg-black/40 backdrop-blur-md text-center shadow-[0_0_50px_rgba(37,106,244,0.3)] ring-2 ring-primary/20 flex flex-col items-center justify-center overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-50"></div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 shadow-glow animate-bounce">
                                                    <span className="material-symbols-outlined text-5xl">
                                                        {showAnalysisBanner ? "analytics" : "psychology"}
                                                    </span>
                                                </div>

                                                <h3 className="font-black text-white text-xl uppercase tracking-[0.2em] mb-3">
                                                    {showAnalysisBanner ? "Iniciando Análisis" : "Magui Pensando"}
                                                </h3>

                                                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest max-w-[240px] leading-relaxed mb-8">
                                                    {showAnalysisBanner
                                                        ? "Entrevista completada. Procesando perfil psicométrico..."
                                                        : "Conectando con Gemini 1.5 Pro..."}
                                                </p>

                                                {isProcessing && (
                                                    <div className="space-y-2 w-full max-w-[280px]">
                                                        {thinkingProcess.slice(-3).map((step, idx) => (
                                                            <div key={idx} className="flex items-center gap-3 text-[9px] text-primary font-bold uppercase tracking-wider animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both">
                                                                <span className="shrink-0 size-1 rounded-full bg-primary animate-ping"></span>
                                                                {step}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="mt-8 flex gap-2">
                                                    {[0, 1, 2].map((i) => (
                                                        <div key={i} className="size-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Processing Status */}
                            {isProcessing && (
                                <div className="glass-panel rounded-2xl border-primary/20 p-6 animate-fade-in relative overflow-hidden w-full max-w-[360px] shadow-2xl bg-black/40 ring-1 ring-white/5">
                                    <div className="absolute top-0 right-0 size-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 animate-pulse-slow"></div>
                                    <div className="flex items-center gap-4 mb-4 relative z-10">
                                        <div className="relative">
                                            <span className="material-symbols-outlined text-primary animate-spin text-2xl">sync</span>
                                            <div className="absolute inset-0 size-full bg-primary/30 blur-xl rounded-full animate-pulse"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-black text-white text-[11px] uppercase tracking-[0.2em]">{t("screening.processing")}</h3>
                                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                                                <span className="size-1 rounded-full bg-primary animate-ping"></span>
                                                Gemini 1.5 Pro Active
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2.5 relative z-10 pl-1 border-l border-white/5 ml-3 mt-4">
                                        {thinkingProcess.map((step, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both">
                                                <span className="shrink-0 size-1 rounded-full bg-primary/40 shadow-glow"></span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Right Column: Analysis Content */}
                        <div className="flex flex-col h-full glass-panel border-white/5 rounded-3xl overflow-hidden shadow-2xl bg-black/20">
                            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative">
                                {!analysisComplete && !isProcessing ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 opacity-50">
                                        <span className="material-symbols-outlined text-7xl mb-6">analytics</span>
                                        <p className="font-bold uppercase tracking-widest text-xs">Record sessions to generate AI insights</p>
                                    </div>
                                ) : (
                                    <>
                                        {activeTab === 'analysis' ? (
                                            <div className="flex flex-col gap-8">
                                                {/* Overall Score */}
                                                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-between group hover:border-primary/30 transition-colors">
                                                    <div>
                                                        <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black mb-2">{t("screening.fit")}</p>
                                                        <h2 className="text-5xl font-black text-white tracking-tighter group-hover:text-glow transition-all">88<span className="text-xl text-slate-500 font-bold align-top ml-1">/100</span></h2>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="px-4 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-black border border-emerald-500/20 uppercase tracking-wider shadow-glow shadow-emerald-500/5">{t("screening.fit.label")}</span>
                                                    </div>
                                                </div>

                                                {/* Thinking Mode Output */}
                                                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 size-20 bg-primary/10 rounded-full blur-2xl"></div>
                                                    <div className="flex items-center gap-3 mb-4 relative z-10">
                                                        <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                                                        </div>
                                                        <h4 className="text-xs font-black text-white uppercase tracking-widest">{t("screening.thought")}</h4>
                                                    </div>
                                                    <p className="text-sm text-slate-300 leading-relaxed italic font-medium relative z-10 border-l-2 border-primary/30 pl-4">
                                                        "El candidato muestra una aptitud técnica sobresaliente y una comunicación asertiva. Su capacidad para manejar la presión tecnológica es notable, especialmente en la migración a microservicios. Recomendado para roles de liderazgo técnico."
                                                    </p>
                                                </div>

                                                {/* Keyword Tags - Moved up for better balance */}
                                                <div>
                                                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-slate-400">fact_check</span> {t("screening.keywords")}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {["Strategic Thinking", "React.js", "Team Leadership", "Agile", "Mentorship"].map((tag, i) => (
                                                            <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all cursor-default">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Tone & Sentiment Analysis */}
                                                {toneAnalysis && (
                                                    <div className="glass-card rounded-2xl p-6 border border-white/5">
                                                        <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-3">
                                                            <span className="material-symbols-outlined text-accent-orange">record_voice_over</span>
                                                            {t("screening.tone")}
                                                        </h4>

                                                        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                                                            <div className="relative size-32 shrink-0 group">
                                                                {/* Circular Progress for Sentiment Score */}
                                                                <svg className="size-full -rotate-90 drop-shadow-2xl" viewBox="0 0 36 36">
                                                                    <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                                                    <path className="text-accent-orange group-hover:brightness-125 transition-all" strokeDasharray={`${toneAnalysis.overallSentiment}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                                                </svg>
                                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                                    <span className="text-3xl font-black text-white tracking-tighter">{toneAnalysis.overallSentiment}</span>
                                                                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{t("screening.tone.score")}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-2 text-center md:text-left">
                                                                <h5 className="text-xl font-black text-white tracking-tight">{toneAnalysis.toneLabel}</h5>
                                                                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                                                    {toneAnalysis.description}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-5">
                                                            {toneAnalysis.emotionalAttributes.map((attr, idx) => (
                                                                <div key={idx} className="group/item">
                                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-wider mb-2">
                                                                        <span className="text-white">{attr.attribute}</span>
                                                                        <span className="text-slate-400 group-hover/item:text-white transition-colors">{attr.score}%</span>
                                                                    </div>
                                                                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                                                        <div
                                                                            className={`h-full rounded-full transition-all duration-1000 shadow-glow ${attr.color}`}
                                                                            style={{ width: `${attr.score}%` }}
                                                                        ></div>
                                                                    </div>
                                                                    <p className="text-[10px] text-slate-500 mt-1.5 font-medium opacity-0 group-hover/item:opacity-100 transition-opacity transform translate-y-2 group-hover/item:translate-y-0 duration-300">{attr.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
                                                <h4 className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-3 pb-6 border-b border-white/5">
                                                    <span className="material-symbols-outlined text-slate-400">description</span>
                                                    {t("screening.flash")}
                                                </h4>
                                                <div className="space-y-8">
                                                    {transcriptionData.map((segment, index) => (
                                                        <div key={index} className="flex gap-6 group">
                                                            <div className="flex-shrink-0 pt-1">
                                                                <span className="text-[10px] font-mono text-slate-600 group-hover:text-primary transition-colors bg-white/5 px-2 py-1 rounded inline-block">{segment.time}</span>
                                                            </div>
                                                            <div className="flex-1 space-y-2">
                                                                <p className={`text-xs font-black uppercase tracking-widest ${segment.speaker === 'Interviewer' ? 'text-primary' : 'text-white'}`}>
                                                                    {segment.speaker}
                                                                </p>
                                                                <p className="text-sm text-slate-300 leading-relaxed font-medium group-hover:text-white transition-colors">
                                                                    {segment.text}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};
