import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Skill } from '../types';

interface SkillsRadarProps {
  skills: Skill[];
}

const SkillsRadar: React.FC<SkillsRadarProps> = ({ skills }) => {
  if (skills.length === 0) return <div className="text-slate-500 flex items-center justify-center h-full font-medium italic">Sin datos de habilidades</div>;

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
          <PolarGrid stroke="#334155" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 5]}
            tick={{ fill: '#64748b', fontSize: 10 }}
            tickCount={6}
            stroke="#1e293b"
          />
          <Radar
            name="Nivel"
            dataKey="score"
            stroke="#ec5b13"
            strokeWidth={3}
            fill="#ec5b13"
            fillOpacity={0.25}
            animationBegin={0}
            animationDuration={1500}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#f8fafc',
              backdropFilter: 'blur(8px)'
            }}
            itemStyle={{ color: '#ec5b13', fontWeight: 'bold' }}
            cursor={{ stroke: '#ec5b13', strokeWidth: 1 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsRadar;