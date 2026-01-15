import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
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
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [activeTab, setActiveTab] = useState<'transcription' | 'analysis' | 'campaign'>('analysis');
    const [thinkingProcess, setThinkingProcess] = useState<string[]>([]);
    const [transcriptionData, setTranscriptionData] = useState<TranscriptSegment[]>([]);
    const [toneAnalysis, setToneAnalysis] = useState<ToneAnalysisData | null>(null);
    const { t } = useLanguage();

    // Mock references for video elements
    const videoPreviewRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    // --- Gemini Integration Logic ---
    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoPreviewRef.current) {
                videoPreviewRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing camera", err);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
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
        } else {
            // Validate connection before analysis
            const connected = await checkApiKey();
            if (!connected) {
                // If user didn't select key or closed dialog, keep recording or handle error
                // For now, we stop camera but don't analyze
                stopCamera();
                setIsRecording(false);
                alert(t("api.error"));
                return;
            }

            stopCamera();
            setIsRecording(false);
            analyzeVideo();
        }
    };

    // Simulate the Gemini Analysis Process
    const analyzeVideo = async () => {
        setIsProcessing(true);
        // Force switch to analysis tab if not already there
        if (activeTab === 'campaign') setActiveTab('analysis');

        // ... rest of logic
        setIsProcessing(true);


        // REAL API KEY CHECK (even if simulation follows)
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            // Lightweight validation call to ensure key is active
            await ai.models.countTokens({ model: 'gemini-3-flash-preview', contents: 'test' });
        } catch (e) {
            console.error("API Key Validation Failed", e);
            // In a real app we might show error, but here we proceed with simulation for demo continuity
            // or we could halt: 
            // setIsProcessing(false); alert("Invalid API Key"); return;
        }

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
            { speaker: 'Interviewer', time: '00:05', text: "Can you describe a time you had to manage a difficult stakeholder?" },
            { speaker: 'Candidate', time: '00:12', text: "Absolutely. In my last role at TechCorp, we had a product manager who insisted on a feature that wasn't feasible within the sprint timeline. Instead of saying no immediately, I gathered data on our current velocity and presented three alternative options. This allowed us to compromise on a MVP approach that satisfied the client requirements without burning out the engineering team." },
            { speaker: 'Interviewer', time: '00:45', text: "How did that impact the team culture?" },
            { speaker: 'Candidate', time: '00:50', text: "It was very positive. The team felt protected, and it established a precedent for data-driven pushback." },
            { speaker: 'Interviewer', time: '01:02', text: "That sounds effective. Can you tell me about your experience with React patterns?" },
            { speaker: 'Candidate', time: '01:08', text: "I've been using React for about 5 years now. I'm a big proponent of composition over inheritance. I frequently use custom hooks to abstract logic and keeping components presentational. Recently I've been really into Server Components for the performance benefits." }
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

        setIsProcessing(false);
        setAnalysisComplete(true);
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    // Layout Optimization: 
    // Constrain height to viewport minus headers to prevent global scroll.
    // Dimensions approximate: 100vh - (Header ~80px) - (Internal Tabs ~60px)
    return (
        <div className="flex flex-col w-full animate-fade-in h-[calc(100vh-140px)] min-h-[600px]">

            {/* Top Internal Navigation Tabs */}
            <div className="flex border-b border-white/5 bg-black/20 mb-4 rounded-t-3xl overflow-hidden shrink-0">
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
                        <span className="bg-accent-orange text-[9px] px-1.5 py-0.5 rounded text-black font-bold">NEW</span>
                    </span>
                </button>
            </div>

            {/* Content Area - Scrollable internally */}
            <div className="flex-1 min-h-0 relative overflow-hidden">

                {activeTab === 'campaign' ? (
                    <CampaignDashboard />
                ) : (
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full overflow-y-auto lg:overflow-hidden p-1">

                        {/* Left Column: Video Interface */}
                        {/* On desktop, we want this centered vertically if possible, or just scrolling with content. 
                            For "Above the fold" look, we keep it fixed in height. */}
                        <div className="flex flex-col gap-4 items-center justify-center h-full overflow-y-auto custom-scrollbar">
                            <div className="relative bg-black rounded-[2.5rem] overflow-hidden aspect-[9/16] w-full max-w-[360px] border-[8px] border-black shadow-2xl flex items-center justify-center group glass-panel ring-1 ring-white/10 shrink-0">
                                {isRecording ? (
                                    <video ref={videoPreviewRef} autoPlay muted className="w-full h-full object-cover transform scale-x-[-1]" />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pb-20">
                                        {/* Background Image - Simulating Interview Context */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-top transition-all duration-700 hover:scale-105"
                                            style={{
                                                backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80")',
                                                filter: 'brightness(0.6)'
                                            }}
                                        ></div>

                                        {/* Content Overlay */}
                                        <div className="relative z-10 text-center p-6 backdrop-blur-sm rounded-3xl border border-white/5 bg-black/20 transform transition-all hover:bg-black/40">
                                            <div
                                                className="size-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 mx-auto shadow-glow cursor-pointer hover:bg-white/20 transition-all hover:scale-110"
                                                onClick={handleRecordToggle}
                                            >
                                                <span className="material-symbols-outlined text-4xl text-white">videocam</span>
                                            </div>
                                            <p className="text-white font-black uppercase tracking-widest text-xs mb-1 drop-shadow-lg">{t("screening.no_video")}</p>
                                            <p className="text-slate-300 text-[10px] uppercase tracking-wider font-bold">Ready to Connect</p>
                                        </div>
                                    </div>
                                )}

                                {/* Recording Indicator */}
                                {isRecording && (
                                    <div className="absolute top-6 right-6 flex items-center gap-3 bg-red-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse border border-white/20 shadow-xl">
                                        <div className="size-2 rounded-full bg-white shadow-glow"></div> REC
                                    </div>
                                )}

                                {/* Controls Overlay */}
                                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20 px-4">
                                    <button
                                        onClick={handleRecordToggle}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${isRecording
                                            ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30"
                                            : "bg-primary hover:bg-primary-glow text-white shadow-primary/30"
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-base">
                                            {isRecording ? "stop_circle" : "fiber_manual_record"}
                                        </span>
                                        {isRecording ? t("screening.stop") : t("screening.start")}
                                    </button>
                                    {!isRecording && (
                                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest transition-all backdrop-blur-md">
                                            <span className="material-symbols-outlined text-base">upload</span>
                                            {t("screening.upload")}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Processing Status - Below the video on mobile, or overlay? Keeping it handy nearby */}
                            {isProcessing && (
                                <div className="glass-panel rounded-2xl border-primary/20 p-6 animate-fade-in relative overflow-hidden w-full max-w-[360px]">
                                    <div className="absolute top-0 right-0 size-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                                    <div className="flex items-center gap-4 mb-4 relative z-10">
                                        <span className="material-symbols-outlined text-primary animate-spin text-2xl">sync</span>
                                        <div>
                                            <h3 className="font-black text-white text-sm uppercase tracking-wider">{t("screening.processing")}</h3>
                                            <p className="text-[10px] text-primary font-bold">Gemini 1.5 Pro Analysis</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 relative z-10">
                                        {thinkingProcess.map((step, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-[10px] text-slate-300 font-bold uppercase tracking-wide animate-pulse">
                                                <span className="size-1.5 rounded-full bg-primary shadow-glow"></span>
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
                                            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                                                        "Candidate demonstrates high technical aptitude when discussing React patterns (Timestamp 0:45). However, slight hesitation detected when asked about conflict resolution. Tone analysis indicates 92% confidence. Recommending for Senior Frontend role."
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
