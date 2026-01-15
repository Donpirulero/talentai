export enum AssessmentStatus {
  PENDING = 'Pendiente',
  IN_PROGRESS = 'En Progreso',
  COMPLETED = 'Completado'
}

export enum AnalysisStage {
  DATA_LOADED = 'Ingesta de Datos',
  CAMPAIGN_ACTIVATED = 'Activación de Campaña',
  INTERVIEW_COMPLETED = 'Entrevista Concretada',
  ANALYSIS_COMPLETED = 'Análisis Completado',
  TEAM_CONCLUSION = 'Team Conclusion'
}

export interface Skill {
  name: string;
  score: number; // 1-5
  fullMark: number;
  level?: 'Novato' | 'Competente' | 'Experto'; // Perizia level
}

export interface CompetencyCatalogo {
  name: string;
  definition: string;
  relevanceCognitive: string;
  applicationTalentAi: string;
}

export interface RoleRecommendation {
  roleId: string;
  title: string;
  matchScore: number; // Percentage
  skillGaps: string[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredChannel: 'Email' | 'WhatsApp' | 'Phone';
  age: number; // New field
  gender: 'Male' | 'Female' | 'Non-Binary' | 'Other'; // New field
  avatar: string;
  currentRole: string;
  role?: string; // Type alias for dashboard
  department: string;
  status: AssessmentStatus;
  currentStage: AnalysisStage;
  skills: Skill[];
  potentialScore: number; // 0-100 (Y-axis of 9-box)
  performanceScore: number; // 0-100 (X-axis of 9-box)
  overallScore?: number; // Analytical composite score
  potential?: number; // Percentage potential
  riskOfExit?: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendations: RoleRecommendation[];
}

export interface Metric {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  isAudio?: boolean;
}