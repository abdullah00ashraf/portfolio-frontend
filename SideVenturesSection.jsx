import React, { useEffect, useState } from 'react';

const LiquidGridSeparator = () => (
  <div className="w-full flex justify-center items-center py-12 opacity-40">
    <svg width="200" height="24" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="12" x2="200" y2="12" stroke="#333333" strokeDasharray="4 4" />
      <rect x="94" y="6" width="12" height="12" fill="#111" stroke="#444" />
      <circle cx="100" cy="12" r="2" fill="#ffb000" />
    </svg>
  </div>
);

const SideVentureCard = ({ asset }) => {
  const isVenture = asset.category === 'SIDE_VENTURE';
  const badgeLabel = isVenture ? '[ VENTURE_CORE ]' : '[ UNPUBLISHED MODULE ]';
  const badgeColor = isVenture ? 'text-cyan-400' : 'text-[#ffb000]';
  const borderColor = isVenture ? 'hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]' : 'hover:border-[#ffb000] hover:shadow-[0_0_15px_rgba(255,176,0,0.15)]';

  return (
    <a href={asset.uri || '#'} target="_blank" rel="noopener noreferrer" 
       className={`block w-full p-6 bg-[rgba(10,10,10,0.6)] backdrop-blur-[12px] border border-[#1a1a1a] transition-all duration-300 ${borderColor} group flex flex-col justify-between min-h-[220px]`}>
      
      {/* Header Badge */}
      <div className="font-mono text-[0.75rem] tracking-[2px] mb-4">
        <span className={badgeColor}>{badgeLabel}</span>
      </div>

      {/* Main Title */}
      <div className="flex-grow flex items-center">
        <h3 className="text-white text-[1.25rem] font-mono font-bold uppercase leading-snug group-hover:text-zinc-100 transition-colors">
          {asset.title}
        </h3>
      </div>

      {/* Telemetry Footer */}
      <div className="mt-6 pt-4 border-t border-[#1f1f1f] flex flex-wrap justify-between items-center text-[0.7rem] font-mono text-zinc-500 gap-y-2">
        <span>EXT: <span className="text-zinc-300">{asset.ext}</span></span>
        <span>SOURCE: <span className="text-zinc-300">{asset.storageProvider}</span></span>
        <span className="text-[#00ff41] tracking-wider">CLEARANCE: REQUISITIONED</span>
      </div>
    </a>
  );
};

const SideVenturesSection = () => {
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/side-ventures/')
      .then(res => res.json())
      .then(data => {
        if (data.ventures) {
          setVentures(data.ventures);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch side ventures:', err);
        setLoading(false);
      });
  }, []);

  if (loading || ventures.length === 0) return null;

  return (
    <div className="w-full">
      <LiquidGridSeparator />
      
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid w-full gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {ventures.map(asset => (
            <SideVentureCard key={asset.id} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideVenturesSection;
