import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

declare var driver: any;

const FloatingMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();

    const screens = [
        { path: "/", name: t("nav.home") },
        { path: "/ingestion", name: t("nav.ingestion") },
        { path: "/reskilling", name: t("nav.dashboard") },

        { path: "/competency", name: t("nav.competency") },
        { path: "/skill-gap", name: t("nav.skillgap") },
        { path: "/cognitive", name: t("nav.cognitive") },
        { path: "/learning-path", name: t("nav.paths") },
        { path: "/retention", name: t("nav.retention") },
        { path: "/collaboration", name: t("nav.collaboration") },
    ];

    const startTour = () => {
        setIsOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(initDriver, 500);
        } else {
            initDriver();
        }
    };

    const initDriver = () => {
        const driverObj = driver({
            showProgress: true,
            steps: [
                { popover: { title: t("tour.welcome.title"), description: t("tour.welcome.desc") } },
                { element: '#tour-hero', popover: { title: t("tour.hero.title"), description: t("tour.hero.desc") } },
                { element: '#tour-actions', popover: { title: t("tour.actions.title"), description: t("tour.actions.desc") } },
                { element: '#tour-modules', popover: { title: t("tour.modules.title"), description: t("tour.modules.desc") } },
                { element: '#tour-navigation', popover: { title: t("tour.menu.title"), description: t("tour.menu.desc") } },
            ]
        });
        driverObj.drive();
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
            {isOpen && (
                <div className="bg-surface-dark border border-border-dark rounded-xl shadow-2xl p-2 mb-2 w-64 max-h-[70vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex gap-2 p-2 border-b border-border-dark mb-2">
                        <button
                            onClick={toggleLanguage}
                            className="flex-1 bg-surface-dark-lighter hover:bg-primary/20 hover:text-primary text-white text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[16px]">translate</span>
                            {t("nav.lang")}
                        </button>
                        <button
                            onClick={startTour}
                            className="flex-1 bg-primary hover:bg-blue-600 text-white text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[16px]">tour</span>
                            Tour
                        </button>
                    </div>
                    <h3 className="text-xs font-bold text-text-secondary px-3 py-2 uppercase tracking-wider">{t("tour.menu.title")}</h3>
                    {screens.map((screen) => (
                        <button
                            key={screen.path}
                            onClick={() => {
                                navigate(screen.path);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === screen.path
                                    ? "bg-primary text-white"
                                    : "text-gray-300 hover:bg-surface-dark-lighter hover:text-white"
                                }`}
                        >
                            {screen.name}
                        </button>
                    ))}
                </div>
            )}
            <button
                id="tour-navigation"
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-primary hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
            >
                <span className="material-symbols-outlined text-3xl">
                    {isOpen ? "close" : "menu"}
                </span>
            </button>
        </div>
    );
};

export default FloatingMenu;