import React, { useState } from 'react';
import DNAGrid from '../components/DNAGrid';

export default function ComposerPortal() {
  const [pitchDNA, setPitchDNA] = useState([60, 62, 64, 67, 69]); // Pentatonic
  const [status, setStatus] = useState('Standby');
  const [jobId, setJobId] = useState(null);

  const handleSubmit = async () => {
    setStatus('Transmitting...');
    try {
      const res = await fetch('http://localhost:8000/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pitch_dna: pitchDNA,
          rhythm_dna: [1, 0, 1, 1, 0, 1, 0, 0], // Mock from grid soon
          style: "Cyber-Blues",
          tempo: 84
        })
      });
      const data = await res.json();
      setJobId(data.job_id);
      setStatus('Synthesizing...');
    } catch (err) {
      setStatus('Error: Engine Offline');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="mb-12 border-b border-gray-800 pb-4">
        <h1 className="text-4xl font-black tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          MUSICOM WEB PORTAL
        </h1>
        <p className="text-gray-400 font-mono text-sm mt-2">White Box Composition Wrapper | Version 0.1.0-alpha</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Input DNA */}
        <section className="space-y-8">
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
              DNA ENCODER
            </h2>
            
            <div className="space-y-6">
              <DNAGrid rows={1} cols={16} onChange={(g) => console.log(g)} />
              
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Pitch DNA (A-G Ticks)</label>
                <input 
                  type="text" 
                  value={pitchDNA.join(', ')} 
                  onChange={(e) => setPitchDNA(e.target.value.split(',').map(n => parseInt(n.trim())))}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 font-mono text-pink-400 focus:outline-none focus:border-pink-500 text-sm"
                />
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-pink-600 to-violet-600 rounded-lg font-black text-sm uppercase tracking-widest hover:scale-[1.01] transition-transform active:scale-95 active:opacity-90"
              >
                Assemble Composition
              </button>
            </div>
          </div>
        </section>

        {/* Right: Asset Tracking */}
        <section className="space-y-8">
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-300">
              ENGINE STATUS: {status}
            </h2>
            
            {jobId && (
              <div className="p-4 bg-gray-800 rounded font-mono text-xs text-gray-400 space-y-2">
                <p>JobID: <span className="text-pink-500">{jobId}</span></p>
                <p>> Loading VST Stack...</p>
                <p>> Applying Hindemith Fluctuation Rules...</p>
                <p>> Generating Master Render...</p>
              </div>
            )}

            {!jobId && (
              <div className="h-44 flex items-center justify-center border-2 border-dashed border-gray-800 rounded">
                <p className="text-gray-600 italic">Waiting for DNA data...</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
