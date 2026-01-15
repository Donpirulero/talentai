import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const TalentLayout: React.FC = () => {
    const { t } = useLanguage();


    return (
        <div className="h-full bg-background-dark w-full">
            {/* Content Area */}
            <div className="w-full h-full">
                <Outlet />
            </div>
        </div>
    );
};

export default TalentLayout;
