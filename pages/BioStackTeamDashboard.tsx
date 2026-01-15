import React, { useState, useMemo } from 'react';
import {
    Users, TrendingUp, Activity, BrainCircuit, Filter,
    Briefcase, MapPin, User, Calendar
} from 'lucide-react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis
} from 'recharts';
import { dbService, COMPETENCIES_CATALOG } from '../services/db';
import { Employee } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const BioStackTeamDashboard: React.FC = () => {
    const { t } = useLanguage();

    // State
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [selectedRole, setSelectedRole] = useState<string>('all');
    const [selectedDept, setSelectedDept] = useState<string>('all');
    const [selectedGender, setSelectedGender] = useState<string>('all');
    const [selectedAgeRange, setSelectedAgeRange] = useState<string>('all');
    const [viewType, setViewType] = useState<'group' | 'individual'>('group');

    // Load Data
    React.useEffect(() => {
        const load = async () => {
            const data = await dbService.getEmployees();
            setEmployees(data);
            setLoading(false);
        };
        load();
    }, []);

    // Filter Logic
    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            if (selectedRole !== 'all' && emp.role !== selectedRole) return false;
            if (selectedDept !== 'all' && emp.department !== selectedDept) return false;
            if (selectedGender !== 'all' && emp.gender !== selectedGender) return false;

            if (selectedAgeRange !== 'all') {
                const age = emp.age || 0;
                if (selectedAgeRange === '18-25') return age >= 18 && age <= 25;
                if (selectedAgeRange === '26-35') return age >= 26 && age <= 35;
                if (selectedAgeRange === '36-45') return age >= 36 && age <= 45;
                if (selectedAgeRange === '46+') return age >= 46;
            }
            return true;
        });
    }, [employees, selectedRole, selectedDept, selectedGender, selectedAgeRange]);

    // Aggregate Data for Radar Chart
    const teamCompetencyData = useMemo(() => {
        if (filteredEmployees.length === 0) return [];

        // Initialize sums
        const sums: Record<string, number> = {};
        COMPETENCIES_CATALOG.forEach(c => sums[c.name] = 0);

        // Sum up scores
        let count = 0;
        filteredEmployees.forEach(emp => {
            if (emp.competencies) {
                count++;
                emp.competencies.forEach(c => {
                    if (sums[c.name] !== undefined) {
                        sums[c.name] += c.score;
                    }
                });
            }
        });

        if (count === 0) return COMPETENCIES_CATALOG.map(c => ({ subject: c.name, A: 0, fullMark: 100 }));

        return COMPETENCIES_CATALOG.map(c => ({
            subject: c.name.split(' ')[0], // Shorten name for chart
            A: Math.round(sums[c.name] / count),
            fullMark: 100
        }));
    }, [filteredEmployees]);

    // Derived Lists for Filters
    const roles = useMemo(() => Array.from(new Set(employees.map(e => e.role))), [employees]);
    const departments = useMemo(() => Array.from(new Set(employees.map(e => e.department))), [employees]);

    // Stats
    const avgScore = filteredEmployees.length > 0
        ? Math.round(filteredEmployees.reduce((acc, curr) => acc + (curr.overallScore || 0), 0) / filteredEmployees.length)
        : 0;

    const highPotentialCount = filteredEmployees.filter(e => (e.potential || 0) > 80).length;

    return (
        <div className="flex h-screen bg-background-dark text-white overflow-hidden font-display">
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

                {/* Header Backdrop */}
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#101622] via-[#0B101B]/80 to-[#0B101B] z-0 pointer-events-none"></div>

                <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 p-8">
                    <div className="max-w-[1600px] mx-auto space-y-8">

                        {/* Title Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-4xl">dashboard</span>
                                    BioStack Team Dashboard
                                </h1>
                                <p className="text-slate-400 font-medium mt-1">
                                    Unified graphical representation of organizational talent metrics.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 bg-surface-dark border border-white/5 px-4 py-2 rounded-lg">
                                <Calendar size={16} />
                                <span className="font-bold">Q4 2025 Analysis</span>
                            </div>
                        </div>

                        {/* Filters Bar */}
                        <div className="glass-panel p-4 rounded-xl border border-white/5 flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider mr-2">
                                <Filter size={16} />
                                Filters
                            </div>

                            {/* View Toggle */}
                            <div className="flex bg-surface-dark p-1 rounded-lg border border-white/5 mr-4">
                                <button
                                    onClick={() => setViewType('group')}
                                    className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${viewType === 'group' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-white'}`}
                                >
                                    Group
                                </button>
                                <button
                                    onClick={() => setViewType('individual')}
                                    className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${viewType === 'individual' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-white'}`}
                                >
                                    Individual
                                </button>
                            </div>

                            {/* Role Filter */}
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="bg-surface-dark border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary/50"
                            >
                                <option value="all">All Roles</option>
                                {roles.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>

                            {/* Department Filter */}
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                className="bg-surface-dark border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary/50"
                            >
                                <option value="all">All Departments</option>
                                {departments.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>

                            {/* Gender Filter */}
                            <select
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                                className="bg-surface-dark border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary/50"
                            >
                                <option value="all">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>

                            {/* Age Filter */}
                            <select
                                value={selectedAgeRange}
                                onChange={(e) => setSelectedAgeRange(e.target.value)}
                                className="bg-surface-dark border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary/50"
                            >
                                <option value="all">All Ages</option>
                                <option value="18-25">18-25</option>
                                <option value="26-35">26-35</option>
                                <option value="36-45">36-45</option>
                                <option value="46+">46+</option>
                            </select>

                            <div className="ml-auto text-xs font-bold text-slate-500">
                                Showing {filteredEmployees.length} profiles
                            </div>
                        </div>

                        {/* Key Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <MetricCard
                                title="Total Employees"
                                value={filteredEmployees.length.toString()}
                                icon={<Users className="text-blue-400" />}
                                trend="+5%"
                                positive={true}
                            />
                            <MetricCard
                                title="Avg. Competency Score"
                                value={`${avgScore}/100`}
                                icon={<BrainCircuit className="text-purple-400" />}
                                trend="+2.1%"
                                positive={true}
                            />
                            <MetricCard
                                title="High Potential Talent"
                                value={highPotentialCount.toString()}
                                icon={<TrendingUp className="text-emerald-400" />}
                                subtitle={`${Math.round((highPotentialCount / filteredEmployees.length) * 100 || 0)}% of workforce`}
                            />
                            <MetricCard
                                title="Retention Risk"
                                value="12%"
                                icon={<Activity className="text-rose-400" />}
                                trend="-1.5%"
                                positive={true}
                                subtitle="Low risk level"
                            />
                        </div>

                        {/* Main Charts Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">

                            {/* Radar Chart Section */}
                            <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/5 relative overflow-hidden flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <BrainCircuit className="text-primary" size={20} />
                                    Team Competency DNA
                                </h3>

                                <div className="flex-1 w-full min-h-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={teamCompetencyData}>
                                            <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                            <PolarAngleAxis
                                                dataKey="subject"
                                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                                            />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar
                                                name="Team Average"
                                                dataKey="A"
                                                stroke="#256af4"
                                                strokeWidth={3}
                                                fill="#256af4"
                                                fillOpacity={0.3}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="absolute top-6 right-6 flex flex-col items-end">
                                    <div className="text-4xl font-black text-white">{avgScore}</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Score</div>
                                </div>
                            </div>

                            {/* Additional Stats / Demographics */}
                            <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col gap-6">
                                <h3 className="text-lg font-bold text-white mb-2">Team Composition</h3>

                                {/* Quick Distribution Bars */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-slate-400">
                                            <span>Engineering</span>
                                            <span>45%</span>
                                        </div>
                                        <div className="h-2 w-full bg-surface-dark rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[45%]"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-slate-400">
                                            <span>Product</span>
                                            <span>25%</span>
                                        </div>
                                        <div className="h-2 w-full bg-surface-dark rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-[25%]"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-slate-400">
                                            <span>Design</span>
                                            <span>20%</span>
                                        </div>
                                        <div className="h-2 w-full bg-surface-dark rounded-full overflow-hidden">
                                            <div className="h-full bg-pink-500 w-[20%]"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-slate-400">
                                            <span>Recruiting</span>
                                            <span>10%</span>
                                        </div>
                                        <div className="h-2 w-full bg-surface-dark rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[10%]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <TrendingUp className="text-primary" />
                                        <span className="font-bold text-white">Insight AI</span>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        The team shows strong performance in <strong>Technical Proficiency</strong> but lower scores in <strong>Adaptability</strong>. Consider a training workshop for Q1.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

// Helper Component for Metrics
const MetricCard = ({ title, value, icon, trend, positive, subtitle }: any) => (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-surface-dark border border-white/5">
                {icon}
            </div>
            {trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {trend}
                </span>
            )}
        </div>
        <div>
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h4>
            <div className="text-2xl font-black text-white">{value}</div>
            {subtitle && <div className="text-xs text-slate-500 font-medium mt-1">{subtitle}</div>}
        </div>
    </div>
);

export default BioStackTeamDashboard;
