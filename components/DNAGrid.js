import React, { useState } from 'react';

const DNAGrid = ({ rows, cols, onChange }) => {
  const [grid, setGrid] = useState(
    Array(rows).fill().map(() => Array(cols).fill(0))
  );

  const toggleCell = (r, c) => {
    const newGrid = [...grid];
    newGrid[r][c] = newGrid[r][c] === 1 ? 0 : 1;
    setGrid(newGrid);
    if (onChange) onChange(newGrid);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
      <h3 className="text-pink-500 font-mono font-bold uppercase tracking-widest text-xs">Rhythmic DNA Matrix [Euclidean]</h3>
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {grid.map((row, r) => 
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => toggleCell(r, c)}
              className={`w-8 h-12 cursor-pointer transition-all duration-150 border rounded-sm ${
                cell === 1 
                  ? 'bg-pink-600 border-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]' 
                  : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center h-full text-[10px] text-gray-500 font-mono">
                {cell === 1 ? '█' : '░'}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between mt-2 text-[10px] font-mono text-gray-400 uppercase">
        <span>Pulse 0</span>
        <span>Pulse {cols - 1}</span>
      </div>
    </div>
  );
};

export default DNAGrid;
