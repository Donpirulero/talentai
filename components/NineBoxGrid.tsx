import React from 'react';
import { Employee } from '../types';

interface NineBoxGridProps {
  employees: Employee[];
  onSelectEmployee: (id: string) => void;
}

const NineBoxGrid: React.FC<NineBoxGridProps> = ({ employees, onSelectEmployee }) => {
  // 9-Box definitions (Low/Mod/High for Potential (Y) and Performance (X))
  // We divide 0-100 into 3 sections: 0-33, 34-66, 67-100

  const getBoxIndex = (performance: number, potential: number) => {
    let x = 0; // Low Performance
    if (performance > 66) x = 2; // High
    else if (performance > 33) x = 1; // Mod

    let y = 0; // Low Potential
    if (potential > 66) y = 2; // High
    else if (potential > 33) y = 1; // Mod

    // Grid coordinates (row, col) from top-left.
    // Potential is Y (High is top), Performance is X (High is right)
    // Row 0: High Potential. Row 2: Low Potential.
    const row = 2 - y;
    const col = x;

    return { row, col };
  };

  const gridLabels = [
    ['Enigma', 'Estrella en Crecimiento', 'Futuro Líder'],
    ['Dilema', 'Contribuidor Clave', 'Alto Impacto'],
    ['Bajo Rendimiento', 'Efectivo', 'Experto Confiable']
  ];

  // Group employees by box
  const gridData = Array(3).fill(null).map(() => Array(3).fill(null).map(() => [] as Employee[]));

  employees.forEach(emp => {
    if (emp.performanceScore !== undefined && emp.potentialScore !== undefined) {
      const { row, col } = getBoxIndex(emp.performanceScore, emp.potentialScore);
      gridData[row][col].push(emp);
    }
  });

  return (
    <div className="relative pt-2">
      <div className="absolute -left-10 top-1/2 -rotate-90 text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
        Potencial
      </div>
      <div className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
        Desempeño
      </div>

      <div className="grid grid-rows-3 gap-3 h-[450px] w-full">
        {gridData.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-3">
            {row.map((cellEmployees, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  glass-panel rounded-xl p-3 flex flex-col items-center justify-start overflow-y-auto
                  transition-all duration-300 hover:bg-white/5 group/box
                  ${rowIndex === 0 && colIndex === 2 ? 'border-primary/40 bg-primary/5' : 'border-glass-border'}
                `}
              >
                <span className={`text-[10px] font-bold mb-3 text-center w-full block tracking-wider uppercase ${rowIndex === 0 && colIndex === 2 ? 'text-primary' : 'text-slate-500'}`}>
                  {gridLabels[rowIndex][colIndex]}
                </span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {cellEmployees.map(emp => (
                    <button
                      key={emp.id}
                      onClick={() => onSelectEmployee(emp.id)}
                      className="group relative transition-transform hover:scale-110 active:scale-95"
                    >
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="size-9 rounded-lg border-2 border-slate-700 group-hover:border-primary transition-colors shadow-lg"
                      />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded border border-glass-border opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 shadow-2xl">
                        {emp.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NineBoxGrid;