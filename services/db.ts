import { supabase } from '../utils/supabase';
import { Employee, AssessmentStatus, AnalysisStage, CompetencyCatalogo } from '../types';

export const COMPETENCIES_CATALOG: CompetencyCatalogo[] = [
    {
        name: 'Pensamiento Crítico y Auditoría de Realidad',
        definition: 'Capacidad de analizar información, cuestionar supuestos y validar la veracidad de los resultados generados sintéticamente por la IA.',
        relevanceCognitive: 'Es vital para mitigar la "pereza metacognitiva" y la acumulación de "deuda cognitiva", fenómenos donde el humano deja de pensar profundamente y acepta alucinaciones de la IA como verdades.',
        applicationTalentAi: 'Evaluada por TalentScout para identificar quiénes pueden actuar como verificadores constantes en tareas críticas.'
    },
    {
        name: 'Teoría de la Mente (ToM) y Toma de Perspectiva',
        definition: 'Habilidad cognitiva para inferir y razonar sobre los estados mentales (creencias, intenciones, conocimientos) de otros agentes, ya sean humanos o sistemas de IA.',
        relevanceCognitive: 'Los usuarios con mayor ToM logran una colaboración más efectiva y respuestas de la IA de mayor calidad, al saber "leer" las capacidades y limitaciones del modelo.',
        applicationTalentAi: 'Factor determinante en el ranking de afinidad para roles de liderazgo en equipos híbridos.'
    },
    {
        name: 'Creatividad Humana Aumentada (Curaduría Estratégica)',
        definition: 'Capacidad de dirigir herramientas inteligentes para explorar nuevas fronteras de innovación, pasando de la ejecución técnica manual a la curaduría estratégica.',
        relevanceCognitive: 'En un mundo de contenido automatizado, la originalidad humana y la formulación de problemas complejos son recursos escasos y valiosos.',
        applicationTalentAi: 'Identifica el potencial del talento para generar valor agregado que la IA no puede replicar por sí sola.'
    },
    {
        name: 'Adaptabilidad y Agilidad de Aprendizaje (Learning Agility)',
        definition: 'Capacidad de aprender, desaprender y reaprender de manera continua ante un entorno volátil.',
        relevanceCognitive: 'Se estima que el 39% de las habilidades actuales quedarán obsoletas para 2030. Esta competencia es el "pasaporte laboral" definitivo.',
        applicationTalentAi: 'Base para diagramar la hoja de ruta de upskilling en el módulo Talent Bridge.'
    },
    {
        name: 'Ingeniería de Contexto y Gestión de Datos',
        definition: 'Evolución del prompt engineering hacia la arquitectura de inyección de datos dinámicos (técnicas como RAG) para conectar la IA con el conocimiento real de la empresa.',
        relevanceCognitive: 'Capacidad de gestionar cómo la información corporativa se integra en los modelos para producir respuestas seguras y precisas.',
        applicationTalentAi: 'Evaluada para perfiles técnicos y de gestión que deben escalar la IA de forma auditable.'
    },
    {
        name: 'Colaboración Humano-IA Estratégica',
        definition: 'Habilidad de trabajar sinérgicamente con sistemas de IA para potenciar el rendimiento organizacional, sabiendo cuándo confiar y cuándo cuestionar el algoritmo.',
        relevanceCognitive: 'Permite que empleados de menor experiencia alcancen niveles de productividad de veteranos, democratizando el conocimiento.',
        applicationTalentAi: 'Métrica clave en BioStack Analytics para medir el nivel de adopción tecnológica del equipo.'
    },
    {
        name: 'Inteligencia Emocional y Resiliencia Digital',
        definition: 'Capacidad de gestionar las emociones propias y ajenas, manteniendo la estabilidad mental frente al "tecnoestrés" y el aislamiento del trabajo híbrido.',
        relevanceCognitive: 'Los líderes deben poseer agilidad emocional para detectar desmotivación en equipos que interactúan constantemente con máquinas.',
        applicationTalentAi: 'Evaluación de la salud mental y el bienestar como activo del cambio.'
    },
    {
        name: 'Pensamiento Adaptativo Anticipatorio',
        definition: 'Capacidad de anticipar cambios del entorno y pivotar estrategias proactivamente mediante el análisis de múltiples variables simuladas por IA.',
        relevanceCognitive: 'Permite a los líderes "pensar varios pasos adelante" en contextos dinámicos y de disrupción constante.',
        applicationTalentAi: 'Vital para identificar talentos capaces de liderar áreas de responsabilidad en crisis o transformaciones radicales.'
    },
    {
        name: 'Alfabetización en IA (AI Literacy)',
        definition: 'Nivel de conocimiento base sobre qué es la IA, cómo usarla éticamente y cuáles son sus percepciones sin asumir sesgos.',
        relevanceCognitive: 'Identifica brechas de conocimiento que podrían boicotear la adopción de nuevas herramientas.',
        applicationTalentAi: 'Primer filtro de diagnóstico para planes de ingreso a la era de la IA.'
    },
    {
        name: 'Locus de Control Interno e Iniciativa',
        definition: 'Creencia de que las propias acciones y decisiones definen el destino, en lugar de atribuir el éxito o fracaso a factores externos.',
        relevanceCognitive: 'Las personas con locus interno son más proactivas ante el cambio tecnológico y muestran mayor persistencia en procesos de reskilling.',
        applicationTalentAi: 'Factor de clasificación en la matriz de Potencial vs. Desempeño en BioStack.'
    }
];

export const dbService = {
    // Employees
    async getEmployees(): Promise<Employee[]> {
        try {
            const { data, error } = await supabase
                .from('employees')
                .select('*')
                .order('name');

            if (error) {
                console.error('Database error fetching employees:', error);
                throw new Error(`Failed to fetch employees: ${error.message}`);
            }

            if (!data) return [];

            // Map database snake_case to frontend camelCase with validation
            return data.map(emp => {
                // Validate required fields
                if (!emp.id || !emp.name || !emp.email) {
                    console.warn('Employee missing required fields:', emp);
                }

                // Safely parse numeric fields
                const potentialScore = Number(emp.potential_score);
                const performanceScore = Number(emp.performance_score);

                return {
                    ...emp,
                    currentRole: emp.current_role || 'No Role',
                    currentStage: emp.current_stage || AnalysisStage.DATA_LOADED,
                    potentialScore: isNaN(potentialScore) ? 0 : Math.max(0, Math.min(100, potentialScore)),
                    performanceScore: isNaN(performanceScore) ? 0 : Math.max(0, Math.min(100, performanceScore)),
                    preferredChannel: emp.preferred_channel || 'email',
                    skills: Array.isArray(emp.skills) ? emp.skills : [],
                    recommendations: Array.isArray(emp.recommendations) ? emp.recommendations : []
                } as Employee;
            });
        } catch (error) {
            console.error('Error in getEmployees:', error);
            throw error;
        }
    },

    async createEmployee(employee: Partial<Employee>) {
        const dbParams: any = {
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            preferred_channel: employee.preferredChannel,
            avatar: employee.avatar,
            current_role: employee.currentRole,
            department: employee.department,
            status: employee.status || AssessmentStatus.PENDING,
            current_stage: employee.currentStage || AnalysisStage.DATA_LOADED,
            potential_score: employee.potentialScore || 0,
            performance_score: employee.performanceScore || 0,
            skills: employee.skills || [],
            recommendations: employee.recommendations || [],
            age: employee.age,
            gender: employee.gender
        };

        const { data, error } = await supabase
            .from('employees')
            .insert([dbParams])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async getEmployeeById(id: string) {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        return {
            ...data,
            currentRole: data.current_role,
            currentStage: data.current_stage,
            potentialScore: Number(data.potential_score),
            performanceScore: Number(data.performance_score),
            preferredChannel: data.preferred_channel
        } as Employee;
    },

    async updateEmployee(id: string, updates: Partial<Employee>) {
        // Map frontend camelCase to database snake_case
        const dbUpdates: any = {};
        if (updates.name) dbUpdates.name = updates.name;
        if (updates.email) dbUpdates.email = updates.email;
        if (updates.phone) dbUpdates.phone = updates.phone;
        if (updates.preferredChannel) dbUpdates.preferred_channel = updates.preferredChannel;
        if (updates.currentRole) dbUpdates.current_role = updates.currentRole;
        if (updates.department) dbUpdates.department = updates.department;
        if (updates.status) dbUpdates.status = updates.status;
        if (updates.currentStage) dbUpdates.current_stage = updates.currentStage;
        if (updates.potentialScore !== undefined) dbUpdates.potential_score = updates.potentialScore;
        if (updates.performanceScore !== undefined) dbUpdates.performance_score = updates.performanceScore;
        if (updates.skills) dbUpdates.skills = updates.skills;
        if (updates.recommendations) dbUpdates.recommendations = updates.recommendations;

        const { data, error } = await supabase
            .from('employees')
            .update(dbUpdates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Evaluations
    async saveEvaluation(evaluation: {
        employee_id: string;
        interviewer_id: string | undefined;
        transcript: string;
        biometrics: any;
        burnout_analysis: any;
    }) {
        const { data, error } = await supabase
            .from('evaluations')
            .insert([evaluation])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // User Settings
    async getUserSettings(userId: string) {
        const { data, error } = await supabase
            .from('user_settings')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows found"
        return data;
    },

    async updateUserSettings(userId: string, settings: {
        ai_agent_name?: string;
        ai_agent_profile?: string;
        ai_agent_focus?: string;
        language?: string;
        theme?: string;
    }) {
        const { data, error } = await supabase
            .from('user_settings')
            .upsert({ user_id: userId, ...settings, updated_at: new Date().toISOString() })
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
