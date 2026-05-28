import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export interface BioStackMetric {
    subject: string;
    score: number;
    fullMark: number;
}

interface BioStackRadarProps {
    data: BioStackMetric[];
}

export const BioStackRadar: React.FC<BioStackRadarProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="text-gray-500 text-center p-4">No competency data available yet.</div>;
    }

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                        name="Competency"
                        dataKey="score"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
