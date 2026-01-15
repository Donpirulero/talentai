import { Employee, AssessmentStatus, AnalysisStage } from '../types';

export const EMPLOYEES: Employee[] = [
  {
    id: 'E001',
    name: 'Ana López',
    email: 'ana.lopez@zenta.group',
    phone: '+56 9 1234 5678',
    preferredChannel: 'Email',
    age: 29,
    gender: 'Female',
    avatar: 'https://picsum.photos/200/200?random=1',
    currentRole: 'Marketing Specialist',
    department: 'Marketing',
    status: AssessmentStatus.COMPLETED,
    currentStage: AnalysisStage.ANALYSIS_COMPLETED,
    potentialScore: 85,
    performanceScore: 90,
    skills: [
      { name: 'Pensamiento Crítico', score: 4.5, fullMark: 5 },
      { name: 'Liderazgo', score: 3.8, fullMark: 5 },
      { name: 'Adaptabilidad', score: 5.0, fullMark: 5 },
      { name: 'Com. Digital', score: 4.8, fullMark: 5 },
      { name: 'Análisis Datos', score: 3.2, fullMark: 5 },
      { name: 'Creatividad', score: 4.7, fullMark: 5 },
    ],
    recommendations: [
      {
        roleId: 'R01',
        title: 'Growth Manager',
        matchScore: 92,
        skillGaps: ['SQL Avanzado']
      },
      {
        roleId: 'R02',
        title: 'Product Owner',
        matchScore: 78,
        skillGaps: ['Gestión de Backlog', 'Metodologías Ágiles']
      }
    ]
  },
  {
    id: 'E002',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@zenta.group',
    phone: '+56 9 8765 4321',
    preferredChannel: 'WhatsApp',
    age: 24,
    gender: 'Male',
    avatar: 'https://picsum.photos/200/200?random=2',
    currentRole: 'Junior Developer',
    department: 'IT',
    status: AssessmentStatus.IN_PROGRESS,
    currentStage: AnalysisStage.INTERVIEW_COMPLETED,
    potentialScore: 70,
    performanceScore: 60,
    skills: [
      { name: 'Pensamiento Crítico', score: 3.5, fullMark: 5 },
      { name: 'Liderazgo', score: 2.0, fullMark: 5 },
      { name: 'Adaptabilidad', score: 4.0, fullMark: 5 },
      { name: 'Codificación', score: 4.0, fullMark: 5 },
      { name: 'Análisis Datos', score: 4.5, fullMark: 5 },
      { name: 'Creatividad', score: 3.0, fullMark: 5 },
    ],
    recommendations: [
      {
        roleId: 'R03',
        title: 'Data Analyst',
        matchScore: 85,
        skillGaps: ['Visualización de Datos']
      }
    ]
  },
  {
    id: 'E003',
    name: 'Elena Gómez',
    email: 'elena.gomez@zenta.group',
    phone: '+56 9 1122 3344',
    preferredChannel: 'Email',
    age: 42,
    gender: 'Female',
    avatar: 'https://picsum.photos/200/200?random=3',
    currentRole: 'Sales Manager',
    department: 'Ventas',
    status: AssessmentStatus.COMPLETED,
    currentStage: AnalysisStage.ANALYSIS_COMPLETED,
    potentialScore: 95,
    performanceScore: 40,
    skills: [
      { name: 'Pensamiento Crítico', score: 4.0, fullMark: 5 },
      { name: 'Liderazgo', score: 5.0, fullMark: 5 },
      { name: 'Adaptabilidad', score: 4.8, fullMark: 5 },
      { name: 'Negociación', score: 5.0, fullMark: 5 },
      { name: 'Análisis Datos', score: 2.0, fullMark: 5 },
      { name: 'Creatividad', score: 4.2, fullMark: 5 },
    ],
    recommendations: [
      {
        roleId: 'R04',
        title: 'Head of Sales',
        matchScore: 95,
        skillGaps: []
      },
      {
        roleId: 'R05',
        title: 'Business Developer',
        matchScore: 88,
        skillGaps: ['Tech Savviness']
      }
    ]
  },
  {
    id: 'E004',
    name: 'Javier Mendez',
    email: 'javier.mendez@zenta.group',
    phone: '+56 9 5555 6666',
    preferredChannel: 'Phone',
    age: 51,
    gender: 'Male',
    avatar: 'https://picsum.photos/200/200?random=4',
    currentRole: 'Accountant',
    department: 'Finanzas',
    status: AssessmentStatus.PENDING,
    currentStage: AnalysisStage.CAMPAIGN_ACTIVATED,
    potentialScore: 30,
    performanceScore: 80,
    skills: [],
    recommendations: []
  },
  {
    id: 'E005',
    name: 'Sofia Vergara',
    email: 'sofia.vergara@zenta.group',
    phone: '+56 9 9988 7766',
    preferredChannel: 'WhatsApp',
    age: 33,
    gender: 'Female',
    avatar: 'https://picsum.photos/200/200?random=5',
    currentRole: 'HR Generalist',
    department: 'RRHH',
    status: AssessmentStatus.COMPLETED,
    currentStage: AnalysisStage.INTERVIEW_COMPLETED,
    potentialScore: 60,
    performanceScore: 65,
    skills: [
      { name: 'Pensamiento Crítico', score: 3.0, fullMark: 5 },
      { name: 'Liderazgo', score: 3.5, fullMark: 5 },
      { name: 'Adaptabilidad', score: 4.0, fullMark: 5 },
      { name: 'Comunicación', score: 5.0, fullMark: 5 },
      { name: 'Análisis Datos', score: 2.5, fullMark: 5 },
      { name: 'Creatividad', score: 3.8, fullMark: 5 },
    ],
    recommendations: [
      {
        roleId: 'R06',
        title: 'Recruitment Lead',
        matchScore: 80,
        skillGaps: ['Employer Branding']
      }
    ]
  }
];