import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Activity, Users, CheckCircle, TrendingUp, Search, Filter, Database, Send, ScanFace, MessageSquare, FileText, ArrowRight, Sparkles, Loader2, Bot, ChevronRight, BrainCircuit } from 'lucide-react';
import StatCard from '../components/StatCard';
import SkillsRadar from '../components/SkillsRadar';
import NineBoxGrid from '../components/NineBoxGrid';
import { dbService } from '../services/db';
import { Employee, AssessmentStatus, AnalysisStage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { HfInference } from '@huggingface/inference';

const Dashboard = () => {
  const { t, language } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Roadmap Filters
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await dbService.getEmployees();
        setEmployees(data);
        if (data.length > 0 && !selectedEmployeeId) {
          setSelectedEmployeeId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const selectedEmployee = useMemo(() => {
    return selectedEmployeeId
      ? employees.find(e => e.id === selectedEmployeeId)
      : employees[0];
  }, [selectedEmployeeId, employees]);

  const totalEmployees = employees.length;
  const completedAssessments = employees.filter(e => e.status === AssessmentStatus.COMPLETED).length;
  const completionRate = totalEmployees > 0 ? Math.round((completedAssessments / totalEmployees) * 100) : 0;

  // Derive unique values for dropdowns
  const departments = useMemo(() => Array.from(new Set(employees.map(e => e.department))), [employees]);
  const roles = useMemo(() => Array.from(new Set(employees.map(e => e.currentRole))), [employees]);

  // Filter Logic for Roadmap
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      if (departmentFilter !== 'All' && emp.department !== departmentFilter) return false;
      if (roleFilter !== 'All' && emp.currentRole !== roleFilter) return false;
      return true;
    });
  }, [employees, departmentFilter, roleFilter]);

  // Calculate Roadmap Stages based on filtered data
  const stages = [
    {
      id: AnalysisStage.DATA_LOADED,
      label: t('dashboard.stageData'),
      icon: Database,
      count: filteredEmployees.length
    },
    {
      id: AnalysisStage.CAMPAIGN_ACTIVATED,
      label: t('dashboard.stageActivate'),
      icon: Send,
      count: filteredEmployees.filter(e => ![AnalysisStage.DATA_LOADED].includes(e.currentStage)).length
    },
    {
      id: AnalysisStage.INTERVIEW_COMPLETED,
      label: t('dashboard.stageInterviewed'),
      icon: MessageSquare,
      count: filteredEmployees.filter(e => [AnalysisStage.INTERVIEW_COMPLETED, AnalysisStage.ANALYSIS_COMPLETED, AnalysisStage.TEAM_CONCLUSION].includes(e.currentStage)).length
    },
    {
      id: AnalysisStage.ANALYSIS_COMPLETED,
      label: t('dashboard.stageAnalyzed'),
      icon: FileText,
      count: filteredEmployees.filter(e => [AnalysisStage.ANALYSIS_COMPLETED, AnalysisStage.TEAM_CONCLUSION].includes(e.currentStage)).length
    },
    {
      id: AnalysisStage.TEAM_CONCLUSION,
      label: t('dashboard.stageConclusion'),
      icon: Users,
      count: filteredEmployees.filter(e => e.currentStage === AnalysisStage.TEAM_CONCLUSION).length
    },
  ];

  const generateDashboardInsights = async () => {
    // Check if HuggingFace token is available
    const hfToken = import.meta.env.VITE_HUGGINGFACE_TOKEN;
    if (!hfToken || hfToken === 'your-huggingface-token-here') {
      setAiSummary(
        language === 'es'
          ? '⚠️ **Token de HuggingFace no configurado.** Para habilitar los insights de IA, agrega tu token en el archivo `.env.local`. Consulta `DEPLOYMENT.md` para más información.'
          : '⚠️ **HuggingFace token not configured.** To enable AI insights, add your token to `.env.local`. See `DEPLOYMENT.md` for details.'
      );
      return;
    }

    setIsGenerating(true);
    setAiSummary(null);

    try {
      const hf = new HfInference(hfToken);

      // Prepare context data
      const highPotentials = filteredEmployees.filter(e => e.potentialScore > 66).length;
      const highPerformers = filteredEmployees.filter(e => e.performanceScore > 66).length;
      const lowPerformers = filteredEmployees.filter(e => e.performanceScore < 33).length;

      const contextData = {
        totalEmployees: filteredEmployees.length,
        completionRate: filteredEmployees.length > 0 ? Math.round((filteredEmployees.filter(e => e.status === AssessmentStatus.COMPLETED).length / filteredEmployees.length) * 100) : 0,
        filters: { department: departmentFilter, role: roleFilter },
        roadmap: stages.map(s => `${s.label}: ${s.count}`),
        nineBoxStats: {
          highPotential: highPotentials,
          highPerformance: highPerformers,
          atRisk: lowPerformers
        }
      };

      const targetLanguage = language === 'es' ? 'Spanish' : 'English';

      const prompt = `[INST] Act as an Executive HR Analyst. Analyze the following dashboard data for the "BioStack Analytics" platform.
            
            Data Context:
            ${JSON.stringify(contextData, null, 2)}
            
            Provide a concise, 3-paragraph executive summary in ${targetLanguage} using Markdown formatting:
            1. **Talent Health:** Comment on the completion rate and the balance of high potentials vs high performers.
            2. **Operational Bottlenecks:** Look at the roadmap counts. Where are candidates getting stuck?
            3. **Strategic Recommendation:** Give one specific action item for the HR Director based on the department filter applied.
            
            Keep it professional, insightful, and under 200 words. [/INST]`;

      const out = await hf.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
        }
      });

      setAiSummary(out.generated_text);

    } catch (error) {
      console.error("Error generating insights:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setAiSummary(
        language === 'es'
          ? `❌ **Error al generar análisis:** ${errorMessage}. Verifica tu token de HuggingFace y la cuota de API.`
          : `❌ **Error generating analysis:** ${errorMessage}. Check your HuggingFace token and API quota.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="size-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Sistema Activo</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">{t('dashboard.title')}</h2>
          <p className="text-slate-400 font-medium">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={generateDashboardInsights}
            disabled={isGenerating}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-bold ${isGenerating
              ? 'bg-primary/20 text-primary border border-primary/30 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-glow shadow-lg shadow-primary/20 active:scale-95'
              }`}
          >
            {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
            <span>{isGenerating ? t('dashboard.analyzing') : t('dashboard.generateAI')}</span>
          </button>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              className="bg-surface-dark border border-glass-border text-white pl-12 pr-6 py-3 rounded-xl focus:outline-none focus:border-primary/50 text-sm w-full md:w-80 group-hover:bg-white/5 transition-all"
            />
          </div>
        </div>
      </div>

      {/* AI Insights Summary Card */}
      {aiSummary && (
        <div className="glass-panel border-primary/30 rounded-3xl p-8 shadow-2xl shadow-primary/5 animate-fade-in-up relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 size-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles size={24} className="text-primary" />
            </div>
            <h3 className="font-black text-white text-xl tracking-tight">{t('dashboard.aiTitle')}</h3>
          </div>
          <div className="prose prose-invert prose-sm max-w-none text-slate-300 relative z-10 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: aiSummary.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-bold">$1</strong>').replace(/\n/g, '<br />') }} />
          </div>
          <div className="mt-6 pt-6 border-t border-glass-border flex justify-end relative z-10">
            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
              Exportar Informe <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Organizational Roadmap Section */}
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <TrendingUp className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">{t('dashboard.roadmapTitle')}</h3>
              <p className="text-sm text-slate-500 font-medium">{t('dashboard.roadmapSubtitle')}</p>
            </div>
          </div>

          {/* Roadmap Filters */}
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-surface-dark/50 border border-glass-border text-slate-300 text-xs font-bold py-2.5 pl-9 pr-4 rounded-xl focus:outline-none focus:border-primary/50 cursor-pointer hover:bg-white/5 transition-colors appearance-none min-w-[160px]"
              >
                <option value="All">{t('common.allDepartments')}</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="relative">
              <Bot className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-surface-dark/50 border border-glass-border text-slate-300 text-xs font-bold py-2.5 pl-9 pr-4 rounded-xl focus:outline-none focus:border-primary/50 cursor-pointer hover:bg-white/5 transition-colors appearance-none min-w-[160px]"
              >
                <option value="All">{t('common.allRoles')}</option>
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="relative pb-4">
          {/* Progress Line Background */}
          <div className="absolute top-[44px] left-0 w-full h-1.5 bg-slate-800/50 rounded-full hidden md:block z-0">
            <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full shadow-[0_0_15px_rgba(236,91,19,0.3)] transition-all duration-1000" style={{ width: '85%' }}></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative z-10">
            {stages.map((stage, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group cursor-default">
                <div className={`
                            size-20 rounded-2xl border-2 flex items-center justify-center mb-5 transition-all duration-500 relative
                            ${stage.count > 0
                    ? 'bg-surface-dark border-primary text-primary shadow-2xl shadow-primary/20 scale-105'
                    : 'bg-surface-dark/50 border-glass-border text-slate-600'
                  }
                        `}>
                  {stage.count > 0 && <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-lg animate-pulse"></div>}
                  <stage.icon size={32} className="relative z-10" />
                </div>
                <h4 className={`text-xs font-black mb-2 tracking-widest uppercase ${stage.count > 0 ? 'text-white' : 'text-slate-600'}`}>{stage.label}</h4>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-black font-mono transition-colors duration-300 ${stage.count > 0 ? 'text-primary' : 'text-slate-700'}`}>
                    {stage.count}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Candidatos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label={t('dashboard.kpiEmployees')}
          value={totalEmployees}
          icon={Users}
          change="+12%"
          trend="up"
        />
        <StatCard
          label={t('dashboard.kpiAssessed')}
          value={`${completionRate}%`}
          icon={CheckCircle}
          change="+5%"
          trend="up"
        />
        <StatCard
          label={t('dashboard.kpiGap')}
          value="18%"
          icon={Activity}
          change="-2%"
          trend="up"
        />
        <StatCard
          label={t('dashboard.kpiHighPot')}
          value="4"
          icon={TrendingUp}
          trend="neutral"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: 9-Box Grid */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-8 relative">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
              <div className="size-1.5 rounded-full bg-primary shadow-glow"></div>
              {t('dashboard.matrixTitle')}
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded-full bg-primary/20 border border-primary/50"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Top Talent</span>
              </div>
            </div>
          </div>
          <NineBoxGrid
            employees={employees}
            onSelectEmployee={setSelectedEmployeeId}
          />
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-4 space-y-8">

          {/* Employee Card */}
          {selectedEmployee && (
            <div className="glass-panel border-primary/20 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Bot size={200} />
              </div>

              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="relative">
                  <img
                    src={selectedEmployee.avatar}
                    alt={selectedEmployee.name}
                    className="size-20 rounded-2xl border-2 border-primary shadow-2xl shadow-primary/30"
                  />
                  <div className="absolute -bottom-2 -right-2 size-6 rounded-lg bg-emerald-500 flex items-center justify-center border-2 border-surface-dark shadow-xl">
                    <CheckCircle size={12} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{selectedEmployee.name}</h3>
                  <div className="flex flex-col mt-1">
                    <span className="text-primary text-sm font-bold tracking-tight">{selectedEmployee.currentRole}</span>
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{selectedEmployee.department}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5 group-hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <BrainCircuit size={18} className="text-primary" />
                    <h4 className="text-sm font-black text-white uppercase tracking-wider">{t('dashboard.skillsRadar')}</h4>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black">
                    IQ 132
                  </div>
                </div>
                <SkillsRadar skills={selectedEmployee.skills} />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-glass-border pb-3">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{t('dashboard.suggestedRoles')}</h4>
                  <span className="text-[10px] text-primary font-bold cursor-pointer hover:underline">Ver Todos</span>
                </div>
                <div className="space-y-3">
                  {selectedEmployee.recommendations.length > 0 ? (
                    selectedEmployee.recommendations.map(role => (
                      <div key={role.roleId} className="flex flex-col gap-2 p-3 rounded-xl hover:bg-white/5 transition-all group/role border border-transparent hover:border-glass-border">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-slate-300 group-hover/role:text-white transition-colors">{role.title}</span>
                          <span className="text-xs font-black text-primary">{role.matchScore}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full shadow-[0_0_8px_rgba(236,91,19,0.4)] transition-all duration-1000 group-hover/role:shadow-[0_0_12px_rgba(236,91,19,0.6)]" style={{ width: `${role.matchScore}%` }}></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm italic font-medium p-4 text-center">{t('dashboard.noRecs')}</p>
                  )}
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-sm border border-glass-border transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group-hover:border-primary/30">
                Ver Perfil Completo <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;