import React from 'react';
import { UserPlus, Search, Filter, MoreHorizontal, GraduationCap, TrendingUp, Briefcase } from 'lucide-react';
import Talent from './Talent';

const TalentProfiles = () => {
    return (
        <div className="h-full bg-surface-dark border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="h-full p-0 custom-scrollbar overflow-y-auto">
                <Talent />
            </div>
        </div>
    );
};

export default TalentProfiles;
