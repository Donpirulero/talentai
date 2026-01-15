import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TalentProfileDetail from './TalentProfileDetail';
import {
    Search, Mail, MoreHorizontal, TrendingUp, Activity,
    Download, BrainCircuit, User, CloudUpload
} from 'lucide-react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import { dbService, COMPETENCIES_CATALOG } from '../services/db';
import { Employee } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Talent = () => {
    useLanguage(); // Hook into language context if needed for translations
    const navigate = useNavigate();

    // State
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeEmployeeId, setActiveEmployeeId] = useState<string | null>(null);
    const [filterCategory, setFilterCategory] = useState<'ALL' | 'TOP' | 'RISK'>('ALL');

    // Load Data
    React.useEffect(() => {
        const load = async () => {
            const data = await dbService.getEmployees();
            setEmployees(data);
            setLoading(false);
        };
        load();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const activeEmployee = useMemo(() =>
        employees.find(e => e.id === activeEmployeeId),
        [employees, activeEmployeeId]);

    const filteredEmployees = useMemo(() => {
        let result = employees.filter(e =>
            e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.currentRole.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filterCategory === 'TOP') {
            result = result.filter(e => e.potentialScore > 80);
        } else if (filterCategory === 'RISK') {
            result = result.filter(e => e.performanceScore < 60); // Example logic
        }

        return result;
    }, [employees, searchTerm, filterCategory]);

    // Competency Data for Chart
    const radarData = useMemo(() => {
        if (!activeEmployee) return [];
        // Map 6 key dimensions for the radar
        return [
            { subject: 'Liderazgo', A: activeEmployee.potentialScore, fullMark: 100 },
            { subject: 'Estrategia', A: activeEmployee.performanceScore, fullMark: 100 },
            { subject: 'Técnica', A: 85, fullMark: 100 }, // Mock/Derived
            { subject: 'Gestión', A: activeEmployee.performanceScore, fullMark: 100 },
            { subject: 'Innovación', A: activeEmployee.potentialScore * 0.9, fullMark: 100 },
            { subject: 'Comunicación', A: 90, fullMark: 100 },
        ];
    }, [activeEmployee]);

    if (loading) return <div className="flex h-full items-center justify-center"><div className="animate-spin size-8 border-2 border-primary border-t-transparent rounded-full"></div></div>;

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden w-full">
            {/* Master List Panel - Taking Full Width */}
            <div className="w-full h-full flex flex-col glass-panel relative">
                {/* Search & Filter Header */}
                <div className="p-6 border-b border-glass-border bg-black/40 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-white text-2xl font-black tracking-tight flex items-center gap-3">
                            <User className="text-primary" />
                            Nómina de Talento
                        </h2>

                        <div className="flex gap-2">
                            <div className="relative group w-80">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
                                </div>
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-[#1a1f2e] border border-glass-border rounded-xl leading-5 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-inner"
                                    placeholder="Buscar por nombre, rol o área..."
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filters & Actions */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
                            <button
                                onClick={() => setFilterCategory('ALL')}
                                className={`px-4 py-2 rounded-xl text-xs font-black border whitespace-nowrap transition-all uppercase tracking-wider ${filterCategory === 'ALL' ? 'bg-primary text-white border-primary shadow-glow' : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'}`}
                            >
                                Todos
                            </button>
                            <button
                                onClick={() => setFilterCategory('TOP')}
                                className={`px-4 py-2 rounded-xl text-xs font-black border whitespace-nowrap transition-all uppercase tracking-wider ${filterCategory === 'TOP' ? 'bg-primary text-white border-primary shadow-glow' : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'}`}
                            >
                                <span className="flex items-center gap-2"><TrendingUp size={14} /> Top Talents</span>
                            </button>
                            <button
                                onClick={() => setFilterCategory('RISK')}
                                className={`px-4 py-2 rounded-xl text-xs font-black border whitespace-nowrap transition-all uppercase tracking-wider ${filterCategory === 'RISK' ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'}`}
                            >
                                <span className="flex items-center gap-2"><Activity size={14} /> Riesgo de Fuga</span>
                            </button>
                        </div>

                        <button
                            onClick={() => navigate('/talent/ingestion')}
                            className="shrink-0 flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-white text-xs font-black uppercase tracking-wider transition-all hover:scale-105"
                        >
                            <CloudUpload size={18} className="text-primary" />
                            Ingesta
                        </button>
                    </div>
                </div>

                {/* List Container - Simplified Grid */}
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 custom-scrollbar content-start">
                    {filteredEmployees.map(emp => (
                        <div
                            key={emp.id}
                            onDoubleClick={() => setActiveEmployeeId(emp.id)}
                            className="bg-surface-dark border border-white/5 rounded-2xl p-6 cursor-pointer hover:bg-white/5 hover:border-primary/30 transition-all hover:scale-[1.02] hover:shadow-2xl group flex flex-col items-center text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative mb-4">
                                <div
                                    className="size-20 rounded-full bg-cover bg-center border-4 border-[#1a1f2e] group-hover:border-primary transition-colors shadow-lg"
                                    style={{ backgroundImage: `url('${emp.avatar}')` }}
                                ></div>
                                <div className={`absolute bottom-0 right-0 size-4 rounded-full border-2 border-[#101622] ${emp.potentialScore > 80 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            </div>

                            <h3 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">{emp.name}</h3>
                            <p className="text-sm text-slate-400 font-medium mb-4">{emp.currentRole}</p>

                            <div className="w-full border-t border-white/5 pt-4 mt-auto grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Potential</p>
                                    <span className={`text-sm font-black ${emp.potentialScore > 80 ? 'text-green-400' : 'text-slate-300'}`}>{emp.potentialScore}%</span>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Riesgo</p>
                                    <span className={`text-sm font-black ${emp.riskOfExit === 'HIGH' ? 'text-red-500' : 'text-slate-300'}`}>{emp.riskOfExit || 'LOW'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            {activeEmployeeId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setActiveEmployeeId(null)}
                    ></div>
                    <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-background-dark border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <TalentProfileDetail
                                employeeId={activeEmployeeId || undefined}
                                onClose={() => setActiveEmployeeId(null)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Talent;