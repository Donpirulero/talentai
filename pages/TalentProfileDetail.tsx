import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Mail, MoreHorizontal, TrendingUp, Activity,
    Download, BrainCircuit, User, X
} from 'lucide-react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import { dbService, COMPETENCIES_CATALOG } from '../services/db';
import { Employee } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface TalentProfileDetailProps {
    employeeId?: string;
    onClose?: () => void;
}

const TalentProfileDetail: React.FC<TalentProfileDetailProps> = ({ employeeId, onClose }) => {
    useLanguage();
    const { id } = useParams<{ id: string }>();
    const activeId = employeeId || id;

    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (activeId) {
                const employees = await dbService.getEmployees();
                const found = employees.find(e => e.id === activeId);
                setEmployee(found || null);
            }
            setLoading(false);
        };
        load();
    }, [activeId]);

    // Competency Data for Chart
    const radarData = useMemo(() => {
        if (!employee) return [];
        // Map actual skills or mock them with theta/kappa logic
        return [
            { subject: 'Liderazgo', theta: 70, kappa: 85, fullMark: 100 },
            { subject: 'Estrategia', theta: 65, kappa: 90, fullMark: 100 },
            { subject: 'Técnica', theta: 85, kappa: 95, fullMark: 100 },
            { subject: 'Gestión', theta: 60, kappa: 75, fullMark: 100 },
            { subject: 'Innovación', theta: 75, kappa: 92, fullMark: 100 },
            { subject: 'Comunicación', theta: 80, kappa: 88, fullMark: 100 },
        ];
    }, [employee]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-background-dark text-white">Loading...</div>;
    if (!employee) return <div className="min-h-screen flex items-center justify-center bg-background-dark text-white">Profile not found</div>;

    return (
        <div className="min-h-screen bg-background-dark p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Profile Header Card */}
                <div className="glass-card rounded-2xl p-8 relative overflow-hidden group border border-white/10 bg-surface-dark">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div
                                    className="size-32 rounded-full bg-cover bg-center border-4 border-[#1a1f2e] shadow-2xl"
                                    style={{ backgroundImage: `url('${employee.avatar}')` }}
                                ></div>
                                <div className="absolute bottom-1 right-1 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-[#1a1f2e]">ACTIVE</div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white tracking-tight">{employee.name}</h1>
                                <p className="text-primary font-bold text-xl mt-1">{employee.currentRole}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {employee.potentialScore > 80 && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2"></span>
                                            High Potential
                                        </span>
                                    )}
                                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
                                        {employee.department}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="mb-2 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            )}
                            <div className="flex gap-3">
                                <button onClick={() => window.location.href = `mailto:${employee.email}`} className="flex-1 md:flex-none items-center justify-center gap-2 px-6 py-3 rounded-xl border border-glass-border bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-colors flex uppercase tracking-wider">
                                    <Mail size={18} />
                                    Mensaje
                                </button>
                                <button className="flex-1 md:flex-none items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary hover:bg-blue-600 text-white text-sm font-black shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex uppercase tracking-wider">
                                    <Download size={18} />
                                    Reporte Completo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Col 1: Radar Chart (Competencies) */}
                    <div className="lg:col-span-1 glass-card rounded-3xl p-6 flex flex-col hover-lift border border-white/5 bg-surface-dark">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-black text-lg">Mapa de Competencias</h3>
                            <button className="text-slate-500 hover:text-white"><MoreHorizontal size={20} /></button>
                        </div>
                        <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
                            <ResponsiveContainer width="100%" height={280}>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                    <Radar
                                        name="Individual (θ)"
                                        dataKey="theta"
                                        stroke="#94a3b8"
                                        fill="#94a3b8"
                                        fillOpacity={0.1}
                                        strokeDasharray="4 4"
                                    />
                                    <Radar
                                        name="Sinergia (κ)"
                                        dataKey="kappa"
                                        stroke="#256af4"
                                        fill="#256af4"
                                        fillOpacity={0.4}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 flex justify-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary border border-primary/50"></div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Actual</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-600 border border-slate-500"></div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Benchmark</span>
                            </div>
                        </div>
                    </div>

                    {/* Col 2 & 3: Detailed Breakdown & AI Insights */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* AI Insights Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Insight Card 1 */}
                            <div className="glass-card p-6 rounded-2xl hover-lift bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 bg-surface-dark">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-green-500/20 text-green-400 shadow-glow shadow-green-500/10">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black text-sm uppercase tracking-wider">Crecimiento Acelerado</h4>
                                        <p className="text-slate-400 text-xs mt-2 leading-relaxed font-medium">Ha superado el benchmark de liderazgo un 15% más rápido que el promedio.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Insight Card 2 */}
                            <div className="glass-card p-6 rounded-2xl hover-lift bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 bg-surface-dark">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 shadow-glow shadow-purple-500/10">
                                        <Activity size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black text-sm uppercase tracking-wider">Alta Adaptabilidad</h4>
                                        <p className="text-slate-400 text-xs mt-2 leading-relaxed font-medium">Puntuación perfecta en las últimas evaluaciones de cambio organizacional.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BioStack Competencies */}
                        <div className="glass-card rounded-3xl p-8 flex-1 border border-white/5 bg-surface-dark">
                            <div className="flex items-center justify-between mb-8 border-b border-glass-border pb-4">
                                <div className="flex items-center gap-3">
                                    <BrainCircuit size={20} className="text-primary" />
                                    <h3 className="text-white font-black text-sm uppercase tracking-widest">BioStack: Hibridación Centauro</h3>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Theory of Mind</span>
                                        <span className="text-xs font-black text-primary">0.88 AQ</span>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Industria 5.0 Diagnostic</span>
                                </div>
                            </div>

                            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {COMPETENCIES_CATALOG.slice(0, 5).map((comp, idx) => {
                                    const score = (employee.potentialScore + idx * 7) % 100;
                                    return (
                                        <div key={idx} className="group">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-xs font-bold text-slate-300 group-hover:text-primary transition-colors uppercase tracking-wide">{comp.name}</span>
                                                <span className="text-xs font-black text-white">{score}%</span>
                                            </div>
                                            <div className="w-full bg-black/40 rounded-full h-2 border border-white/5">
                                                <div
                                                    className="bg-gradient-to-r from-primary to-cyan-400 h-2 rounded-full relative transition-all duration-1000 shadow-glow"
                                                    style={{ width: `${score}%` }}
                                                >
                                                    {score > 90 && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* History / Timeline Section */}
                <div className="glass-card rounded-3xl p-8 border border-white/5 bg-surface-dark">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-white font-black text-lg">Historial de Evaluaciones</h3>
                        <div className="flex gap-2">
                            <span className="text-xs font-bold text-slate-400 px-3 py-1 bg-white/5 rounded-lg border border-white/5">2023</span>
                        </div>
                    </div>
                    <div className="relative pl-4">
                        {/* Vertical Line */}
                        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/50 to-transparent"></div>
                        {/* Timeline Item 1 */}
                        <div className="relative pl-10 pb-10 group">
                            <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background-card shadow-[0_0_15px_rgba(37,106,244,0.6)]"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-white font-bold text-sm uppercase tracking-wide">Evaluación Q3 - Liderazgo</h4>
                                    <p className="text-slate-400 text-xs mt-1 font-medium">Evaluado por: Victor H. (CTO)</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-green-400 font-black text-lg">9.2</span>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">15 Oct 2023</p>
                                </div>
                            </div>
                            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-slate-300 italic">
                                "Ha demostrado una capacidad excepcional para motivar al equipo durante el sprint crítico..."
                            </div>
                        </div>
                        {/* Timeline Item 2 */}
                        <div className="relative pl-10 pb-2 group">
                            <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-slate-600 border-2 border-background-card"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-slate-300 font-bold text-sm uppercase tracking-wide">Mid-Year Review</h4>
                                    <p className="text-slate-500 text-xs mt-1 font-medium">Evaluación 360°</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-primary font-black text-lg">8.8</span>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">20 Jun 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TalentProfileDetail;
