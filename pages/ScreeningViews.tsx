import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';

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

// --- Screen: Candidate Screening (Video) ---
export const CandidateScreening: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [activeTab, setActiveTab] = useState<'transcription' | 'analysis'>('analysis');
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
        setActiveTab('analysis');

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

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-dark text-white">
            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark relative">
                <header className="w-full border-b border-border-dark bg-background-dark sticky top-0 z-20 px-8 py-4 flex justify-between items-center">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
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

                        {/* Divider */}
                        <div className="hidden md:block h-8 w-px bg-border-dark"></div>

                        <div>
                            <h1 className="text-white text-2xl font-black leading-tight">{t("screening.title")}</h1>
                            <p className="text-text-secondary text-sm">{t("screening.subtitle")}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                            <span className="material-symbols-outlined text-[14px]">auto_awesome</span> {t("screening.gemini")}
                        </span>
                    </div>
                </header>

                <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px] mx-auto w-full">

                    {/* Left Column: Video Interface */}
                    <div className="flex flex-col gap-4">
                        <div className="relative bg-black rounded-2xl overflow-hidden aspect-video border border-border-dark shadow-2xl flex items-center justify-center group">
                            {isRecording ? (
                                <video ref={videoPreviewRef} autoPlay muted className="w-full h-full object-cover transform scale-x-[-1]" />
                            ) : (
                                <div className="absolute inset-0 bg-surface-dark/50 flex flex-col items-center justify-center">
                                    {!analysisComplete ? (
                                        <div className="text-center p-6">
                                            <div className="size-20 rounded-full bg-surface-dark border-2 border-dashed border-text-secondary flex items-center justify-center mb-4 mx-auto">
                                                <span className="material-symbols-outlined text-4xl text-text-secondary">videocam_off</span>
                                            </div>
                                            <p className="text-text-secondary mb-4">{t("screening.no_video")}</p>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-cover bg-center opacity-50" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop")' }}></div>
                                    )}
                                </div>
                            )}

                            {/* Recording Indicator */}
                            {isRecording && (
                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                    <div className="size-2 rounded-full bg-white"></div> REC
                                </div>
                            )}

                            {/* Controls Overlay */}
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20">
                                <button
                                    onClick={handleRecordToggle}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 ${isRecording
                                            ? "bg-red-500 hover:bg-red-600 text-white"
                                            : "bg-primary hover:bg-blue-600 text-white"
                                        }`}
                                >
                                    <span className="material-symbols-outlined">
                                        {isRecording ? "stop_circle" : "fiber_manual_record"}
                                    </span>
                                    {isRecording ? t("screening.stop") : t("screening.start")}
                                </button>
                                {!isRecording && (
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-dark hover:bg-surface-dark-lighter border border-border-dark text-white font-bold transition-all">
                                        <span className="material-symbols-outlined">upload</span>
                                        {t("screening.upload")}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Processing Status */}
                        {isProcessing && (
                            <div className="bg-surface-dark rounded-xl border border-border-dark p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="material-symbols-outlined text-primary animate-spin">sync</span>
                                    <h3 className="font-bold text-white">{t("screening.processing")}</h3>
                                </div>
                                <div className="space-y-2">
                                    {thinkingProcess.map((step, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs text-text-secondary animate-pulse">
                                            <span className="size-1.5 rounded-full bg-primary"></span>
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Analysis Dashboard */}
                    <div className="flex flex-col h-full bg-surface-dark border border-border-dark rounded-2xl overflow-hidden">
                        <div className="flex border-b border-border-dark">
                            <button
                                onClick={() => setActiveTab('analysis')}
                                className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'analysis' ? 'border-primary text-white' : 'border-transparent text-text-secondary hover:text-white'}`}
                            >
                                {t("screening.tab.analysis")}
                            </button>
                            <button
                                onClick={() => setActiveTab('transcription')}
                                className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'transcription' ? 'border-primary text-white' : 'border-transparent text-text-secondary hover:text-white'}`}
                            >
                                {t("screening.tab.transcript")}
                            </button>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar relative">
                            {!analysisComplete && !isProcessing ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-text-secondary opacity-50">
                                    <span className="material-symbols-outlined text-6xl mb-4">analytics</span>
                                    <p>Record a session to generate insights</p>
                                </div>
                            ) : (
                                <>
                                    {activeTab === 'analysis' ? (
                                        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                            {/* Overall Score */}
                                            <div className="p-5 rounded-xl bg-gradient-to-r from-background-dark to-card-dark border border-border-dark flex items-center justify-between">
                                                <div>
                                                    <p className="text-text-secondary text-xs uppercase tracking-wider font-bold mb-1">{t("screening.fit")}</p>
                                                    <h2 className="text-3xl font-black text-white">88<span className="text-lg text-text-secondary font-normal">/100</span></h2>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">{t("screening.fit.label")}</span>
                                                </div>
                                            </div>

                                            {/* Thinking Mode Output */}
                                            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                                                    <h4 className="text-sm font-bold text-white">{t("screening.thought")}</h4>
                                                </div>
                                                <p className="text-xs text-text-secondary leading-relaxed italic">
                                                    "Candidate demonstrates high technical aptitude when discussing React patterns (Timestamp 0:45). However, slight hesitation detected when asked about conflict resolution. Tone analysis indicates 92% confidence. Recommending for Senior Frontend role."
                                                </p>
                                            </div>

                                            {/* Tone & Sentiment Analysis */}
                                            {toneAnalysis && (
                                                <div className="bg-surface-dark border border-border-dark rounded-xl p-5">
                                                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-primary">record_voice_over</span>
                                                        {t("screening.tone")}
                                                    </h4>

                                                    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                                                        <div className="relative size-24 shrink-0">
                                                            {/* Circular Progress for Sentiment Score */}
                                                            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                                                <path className="text-surface-dark-lighter" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                                                <path className="text-primary" strokeDasharray={`${toneAnalysis.overallSentiment}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                                            </svg>
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                                <span className="text-2xl font-bold text-white">{toneAnalysis.overallSentiment}</span>
                                                                <span className="text-[10px] text-text-secondary uppercase">{t("screening.tone.score")}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-1 text-center md:text-left">
                                                            <h5 className="text-lg font-bold text-white">{toneAnalysis.toneLabel}</h5>
                                                            <p className="text-sm text-text-secondary leading-relaxed">
                                                                {toneAnalysis.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        {toneAnalysis.emotionalAttributes.map((attr, idx) => (
                                                            <div key={idx}>
                                                                <div className="flex justify-between text-xs mb-1.5">
                                                                    <span className="text-white font-bold">{attr.attribute}</span>
                                                                    <span className="text-text-secondary font-mono">{attr.score}%</span>
                                                                </div>
                                                                <div className="w-full bg-surface-dark-lighter rounded-full h-2">
                                                                    <div
                                                                        className={`h-2 rounded-full transition-all duration-1000 ${attr.color}`}
                                                                        style={{ width: `${attr.score}%` }}
                                                                    ></div>
                                                                </div>
                                                                <p className="text-[10px] text-text-secondary mt-1.5 italic opacity-80">{attr.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Keywords / Competencies */}
                                            <div>
                                                <h4 className="text-white font-bold mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-text-secondary">fact_check</span> {t("screening.keywords")}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {["Strategic Thinking", "React.js", "Team Leadership", "Agile", "Mentorship"].map((tag, i) => (
                                                        <span key={i} className="px-3 py-1.5 rounded-lg bg-surface-dark-lighter border border-border-dark text-xs text-white font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
                                            <h4 className="text-white font-bold flex items-center gap-2 pb-4 border-b border-border-dark">
                                                <span className="material-symbols-outlined text-text-secondary">description</span>
                                                {t("screening.flash")}
                                            </h4>
                                            <div className="space-y-6">
                                                {transcriptionData.map((segment, index) => (
                                                    <div key={index} className="flex gap-4 group">
                                                        <div className="flex-shrink-0 w-14 pt-1">
                                                            <span className="text-xs font-mono text-text-secondary opacity-60 group-hover:opacity-100 transition-opacity bg-background-dark px-1 rounded">{segment.time}</span>
                                                        </div>
                                                        <div className="flex-1 space-y-1">
                                                            <p className={`text-sm font-bold uppercase tracking-wider ${segment.speaker === 'Interviewer' ? 'text-primary' : 'text-white/90'}`}>
                                                                {segment.speaker}
                                                            </p>
                                                            <p className="text-sm text-gray-300 leading-relaxed">
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
            </main>
        </div>
    );
};