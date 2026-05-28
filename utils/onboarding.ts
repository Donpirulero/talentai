import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startOnboarding = (currentPath: string = '/home') => {
    // Definimos pasos globales ( Sidebar y Header )
    const globalSteps = [
        {
            element: '.size-12.rounded-xl.bg-gradient-to-br',
            popover: {
                title: '🚀 ¡Bienvenido a TalentAI!',
                description: 'Esta es tu central de Inteligencia de Talento. Aquí es donde la IA y la visión humana se encuentran.',
                side: "bottom",
                align: 'start'
            }
        },
        {
            element: '.group\\/user',
            popover: {
                title: '👤 Tu Perfil Digital',
                description: 'Aquí verás tu identidad sincronizada con Google. Puedes personalizar tu foto en Configuración.',
                side: "top",
                align: 'center'
            }
        }
    ];

    // Pasos específicos por página
    const pageSteps: Record<string, any[]> = {
        '/home': [
            {
                element: '.glass-panel.border-primary\\/30',
                popover: {
                    title: '✨ Insights de IA',
                    description: 'Pulsa el botón "Generar con IA" para obtener un resumen ejecutivo de la salud del talento en tu organización.',
                    side: "bottom",
                    align: 'center'
                }
            },
            {
                element: '.lg\\:col-span-8.glass-panel.rounded-3xl.p-8',
                popover: {
                    title: '🎯 Matriz 9-Box',
                    description: 'Visualiza el potencial y desempeño de tus colaboradores en tiempo real. Haz clic en cualquier perfil para ver detalles.',
                    side: "top",
                    align: 'center'
                }
            }
        ],
        '/scout/interview': [
            {
                element: '.glass-panel.rounded-3xl.p-2',
                popover: {
                    title: '🎙️ Entrevistas IA',
                    description: 'Configura y lanza sesiones de entrevista automatizadas. Magui analizará respuestas y lenguaje no verbal.',
                    side: "bottom",
                    align: 'center'
                }
            }
        ],
        '/biostack/dashboard': [
            {
                element: '.glass-panel.p-4.rounded-xl',
                popover: {
                    title: '🔍 Filtros Avanzados',
                    description: 'Segmenta por rol, departamento, género o edad para entender la demografía de tu talento.',
                    side: "bottom",
                    align: 'center'
                }
            },
            {
                element: '.lg\\:col-span-2.glass-panel.rounded-2xl',
                popover: {
                    title: '🧬 ADN de Competencias',
                    description: 'Visualiza el promedio de habilidades del equipo en este radar interactivo.',
                    side: "bottom",
                    align: 'center'
                }
            }
        ],
        '/talent-bridge/matching': [
            {
                element: '.glass-panel.rounded-3xl.overflow-hidden.border',
                popover: {
                    title: '🏅 Ranking de Talento',
                    description: 'Listado refinado por algoritmos Bayesianos que priorizan la hibridación IA (κ).',
                    side: "top",
                    align: 'center'
                }
            }
        ],
        '/talent-bridge/recommendations': [
            {
                element: '.lg\\:col-span-2 .glass-panel', // Target the main detail area
                popover: {
                    title: '🤝 Asistente de Matching',
                    description: 'Compara perfiles contra roles específicos y descubre "gaps" de competencias de forma automática.',
                    side: "left",
                    align: 'center'
                }
            }
        ],
        '/talent-bridge/learning-path': [
            {
                element: '.glass-panel.p-12.rounded-3xl',
                popover: {
                    title: '🗺️ Generador de Rutas',
                    description: 'Crea planes de carrera personalizados. La IA diseña los pasos necesarios para cerrar brechas de habilidades.',
                    side: "top",
                    align: 'center'
                }
            }
        ],
        '/settings': [
            {
                element: '.relative.group\\/avatar',
                popover: {
                    title: '📸 Personaliza tu Imagen',
                    description: 'Sube tu propia foto de perfil. Se guardará de forma segura en nuestro storage.',
                    side: "bottom",
                    align: 'center'
                }
            }
        ]
    };

    // Sidebar navigation steps (shortened for repeat tours)
    const sidebarSteps = [
        {
            element: '[id="onboarding"]',
            popover: {
                title: '🔄 Tour Contextual',
                description: 'Recuerda que este botón siempre te mostrará los detalles específicos de la página en la que estés.',
                side: "right",
                align: 'center'
            }
        }
    ];

    // Combine steps: Intro -> Contextual Page Steps -> Sidebar Help -> End
    const steps = [
        ...globalSteps,
        ...(pageSteps[currentPath] || []),
        ...sidebarSteps
    ];

    const driverObj = driver({
        showProgress: true,
        animate: true,
        allowClose: true,
        overlayColor: 'rgba(0, 0, 0, 0.75)',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Anterior',
        doneBtnText: 'Finalizar',
        steps: steps
    });

    driverObj.drive();
};
