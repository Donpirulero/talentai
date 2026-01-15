import React, { useState, useMemo } from 'react';
import { FileText, Printer, Filter, Download, PieChart as PieChartIcon, Users, BarChart3, Sliders, ChevronDown } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RechartsPieChart, Pie, Cell, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { EMPLOYEES } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

type ChartType = 'Pie' | 'Bar' | 'Radar';

const Reports = () => {
  const { t } = useLanguage();
  // Filter States
  const [roleFilter, setRoleFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(65);
  const [skillFilter, setSkillFilter] = useState('All');
  const [minSkillScore, setMinSkillScore] = useState<number>(3);

  // Chart Configuration States
  const [genderChartType, setGenderChartType] = useState<ChartType>('Pie');
  const [deptChartType, setDeptChartType] = useState<ChartType>('Bar');
  const [skillsChartType, setSkillsChartType] = useState<ChartType>('Radar');

  // Derive unique values for dropdowns
  const roles = Array.from(new Set(EMPLOYEES.map(e => e.currentRole)));
  const departments = Array.from(new Set(EMPLOYEES.map(e => e.department)));
  const allSkills = Array.from(new Set(EMPLOYEES.flatMap(e => e.skills.map(s => s.name))));

  // Filter Logic
  const filteredEmployees = useMemo(() => {
    return EMPLOYEES.filter(emp => {
      if (roleFilter !== 'All' && emp.currentRole !== roleFilter) return false;
      if (departmentFilter !== 'All' && emp.department !== departmentFilter) return false;
      if (genderFilter !== 'All' && emp.gender !== genderFilter) return false;
      if (emp.age < minAge || emp.age > maxAge) return false;
      
      if (skillFilter !== 'All') {
        const hasSkill = emp.skills.some(s => s.name === skillFilter && s.score >= minSkillScore);
        if (!hasSkill) return false;
      }
      
      return true;
    });
  }, [roleFilter, departmentFilter, genderFilter, minAge, maxAge, skillFilter, minSkillScore]);

  // Aggregate Data for Charts
  const genderData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredEmployees.forEach(e => { counts[e.gender] = (counts[e.gender] || 0) + 1; });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [filteredEmployees]);

  const departmentData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredEmployees.forEach(e => { counts[e.department] = (counts[e.department] || 0) + 1; });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [filteredEmployees]);

  const avgSkills = useMemo(() => {
    const skillMap: Record<string, { total: number, count: number }> = {};
    filteredEmployees.forEach(e => {
        e.skills.forEach(s => {
            if (!skillMap[s.name]) skillMap[s.name] = { total: 0, count: 0 };
            skillMap[s.name].total += s.score;
            skillMap[s.name].count += 1;
        });
    });
    return Object.keys(skillMap).map(name => ({
        name,
        score: parseFloat((skillMap[name].total / skillMap[name].count).toFixed(1)),
        fullMark: 5
    })).slice(0, 6);
  }, [filteredEmployees]);

  const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#6366f1'];

  const handlePrint = () => {
    window.print();
  };

  const renderChart = (type: ChartType, data: any[], dataKey: string, nameKey: string, colors: string[]) => {
    if (type === 'Pie') {
      return (
        <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey={dataKey}
                    nameKey={nameKey}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Legend />
            </RechartsPieChart>
        </ResponsiveContainer>
      );
    } else if (type === 'Bar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey={nameKey} stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey={dataKey} fill={colors[0]} radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
         </ResponsiveContainer>
      );
    } else if (type === 'Radar') {
         return (
             <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey={nameKey} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#475569' }} />
                  <Radar
                    name="Valor"
                    dataKey={dataKey}
                    stroke={colors[0]}
                    strokeWidth={3}
                    fill={colors[0]}
                    fillOpacity={0.3}
                  />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                </RadarChart>
             </ResponsiveContainer>
         );
    }
    return null;
  };

  const ChartHeader = ({ title, icon: Icon, selectedType, onChangeType, options = ['Pie', 'Bar'] }: { title: string, icon: any, selectedType: ChartType, onChangeType: (t: ChartType) => void, options?: ChartType[] }) => (
     <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 print:text-black">
            <Icon size={18} className="text-cyan-500" />
            {title}
        </h3>
        <div className="relative group print:hidden">
             <select 
                value={selectedType}
                onChange={(e) => onChangeType(e.target.value as ChartType)}
                className="appearance-none bg-slate-900 border border-slate-700 text-slate-300 text-xs py-1 pl-3 pr-8 rounded focus:outline-none focus:border-cyan-500 cursor-pointer"
             >
                {options.map(opt => <option key={opt} value={opt}>{opt} Chart</option>)}
             </select>
             <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
     </div>
  );

  return (
    <div className="animate-fade-in space-y-6 print:space-y-4 print:p-0 pb-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 print:hidden">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2">{t('reports.title')}</h2>
           <p className="text-slate-400">{t('reports.subtitle')}</p>
        </div>
        <div className="flex gap-3">
             <button 
                onClick={handlePrint}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2.5 rounded-lg border border-slate-700 transition-all font-medium"
            >
                <Printer size={20} />
                <span>{t('common.print')}</span>
            </button>
        </div>
      </div>

      <div className="hidden print:block mb-8 border-b border-slate-300 pb-4">
          <h1 className="text-3xl font-bold text-black">{t('reports.printHeader')}</h1>
          <p className="text-slate-600">{t('reports.generatedBy')} - {new Date().toLocaleDateString()}</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 print:hidden">
        <div className="flex items-center gap-2 mb-4 text-cyan-400 font-bold">
            <Filter size={18} />
            <span>{t('reports.activeFilters')}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
                <label className="block text-xs text-slate-500 mb-1">{t('common.department')}</label>
                <select 
                    value={departmentFilter} 
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                    <option value="All">{t('common.allDepartments')}</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
             <div>
                <label className="block text-xs text-slate-500 mb-1">{t('common.role')}</label>
                <select 
                    value={roleFilter} 
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                    <option value="All">{t('common.allRoles')}</option>
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-xs text-slate-500 mb-1">{t('common.gender')}</label>
                <select 
                    value={genderFilter} 
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                    <option value="All">{t('common.filters')}</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                </select>
            </div>
            <div>
                 <label className="block text-xs text-slate-500 mb-1">{t('common.age')} ({minAge} - {maxAge})</label>
                 <div className="flex gap-2">
                    <input 
                        type="number" value={minAge} onChange={(e) => setMinAge(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white text-sm"
                    />
                    <span className="text-slate-500 self-center">-</span>
                    <input 
                        type="number" value={maxAge} onChange={(e) => setMaxAge(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white text-sm"
                    />
                 </div>
            </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Sliders size={12} /> Filter
                </label>
                <select 
                    value={skillFilter} 
                    onChange={(e) => setSkillFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                    <option value="All">{t('common.filters')}</option>
                    {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            {skillFilter !== 'All' && (
                 <div>
                    <label className="block text-xs text-slate-500 mb-1">{t('reports.minScore')}: {minSkillScore}</label>
                    <input 
                        type="range" min="1" max="5" step="0.5"
                        value={minSkillScore} 
                        onChange={(e) => setMinSkillScore(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:block print:space-y-6">
          
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4 print:grid-cols-4 print:mb-6">
               <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 print:bg-white print:border-slate-300">
                   <p className="text-slate-400 text-xs uppercase font-bold print:text-black">{t('reports.totalFiltered')}</p>
                   <p className="text-2xl font-bold text-white print:text-black">{filteredEmployees.length}</p>
               </div>
               <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 print:bg-white print:border-slate-300">
                   <p className="text-slate-400 text-xs uppercase font-bold print:text-black">{t('reports.avgAge')}</p>
                   <p className="text-2xl font-bold text-white print:text-black">
                       {(filteredEmployees.reduce((acc, curr) => acc + curr.age, 0) / (filteredEmployees.length || 1)).toFixed(1)}
                   </p>
               </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 print:bg-white print:border-slate-300">
                   <p className="text-slate-400 text-xs uppercase font-bold print:text-black">{t('reports.topSkills')}</p>
                   <p className="text-2xl font-bold text-cyan-400 print:text-black">{avgSkills[0]?.name || 'N/A'}</p>
               </div>
               <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 print:bg-white print:border-slate-300">
                   <p className="text-slate-400 text-xs uppercase font-bold print:text-black">{t('reports.dataComplete')}</p>
                   <p className="text-2xl font-bold text-green-400 print:text-black">100%</p>
               </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 print:bg-white print:border-slate-300 print:page-break-inside-avoid">
              <ChartHeader 
                  title={t('reports.genderDiv')}
                  icon={PieChartIcon} 
                  selectedType={genderChartType} 
                  onChangeType={setGenderChartType}
                  options={['Pie', 'Bar']}
              />
              <div className="h-[250px] w-full">
                {renderChart(genderChartType, genderData, 'value', 'name', COLORS)}
              </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 print:bg-white print:border-slate-300 print:page-break-inside-avoid">
              <ChartHeader 
                  title={t('reports.deptDist')}
                  icon={BarChart3} 
                  selectedType={deptChartType} 
                  onChangeType={setDeptChartType}
                  options={['Bar', 'Pie']}
              />
              <div className="h-[250px] w-full">
                 {renderChart(deptChartType, departmentData, 'value', 'name', ['#8b5cf6', ...COLORS])}
              </div>
          </div>

           <div className="col-span-1 md:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-6 print:bg-white print:border-slate-300 print:page-break-inside-avoid">
              <ChartHeader 
                  title={t('reports.skillsRadar')}
                  icon={Users} 
                  selectedType={skillsChartType} 
                  onChangeType={setSkillsChartType}
                  options={['Radar', 'Bar']}
              />
              <div className="h-[300px] w-full flex justify-center">
                  <div className="w-full md:w-2/3 h-full">
                    {renderChart(skillsChartType, avgSkills, 'score', 'name', ['#22d3ee', ...COLORS])}
                  </div>
              </div>
          </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden print:bg-white print:border-slate-300 print:mt-6">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50 print:bg-slate-100 print:border-slate-300">
              <h3 className="font-bold text-white print:text-black">{t('reports.empDetail')}</h3>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900 text-slate-400 print:bg-slate-200 print:text-black">
                      <tr>
                          <th className="px-4 py-3">{t('talent.fullName')}</th>
                          <th className="px-4 py-3">{t('common.age')}</th>
                          <th className="px-4 py-3">{t('common.gender')}</th>
                          <th className="px-4 py-3">{t('common.role')}</th>
                          <th className="px-4 py-3">{t('common.department')}</th>
                          <th className="px-4 py-3 text-right">Potencial</th>
                          <th className="px-4 py-3 text-right">Desempeño</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 print:divide-slate-300">
                      {filteredEmployees.map(emp => (
                          <tr key={emp.id} className="hover:bg-slate-900/50 print:text-black">
                              <td className="px-4 py-3 font-medium text-white print:text-black">{emp.name}</td>
                              <td className="px-4 py-3 text-slate-400 print:text-black">{emp.age}</td>
                              <td className="px-4 py-3 text-slate-400 print:text-black">{emp.gender}</td>
                              <td className="px-4 py-3 text-cyan-400 print:text-black">{emp.currentRole}</td>
                              <td className="px-4 py-3 text-slate-400 print:text-black">{emp.department}</td>
                              <td className="px-4 py-3 text-right font-mono">{emp.potentialScore}</td>
                              <td className="px-4 py-3 text-right font-mono">{emp.performanceScore}</td>
                          </tr>
                      ))}
                      {filteredEmployees.length === 0 && (
                          <tr>
                              <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                                  No results.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};

export default Reports;