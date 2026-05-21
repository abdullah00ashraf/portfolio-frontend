import React from 'react';

const getCategoryConfig = (category) => {
  switch (category) {
    case 'WEB_EDGE':
      return { label: '// WEB & EDGE INFRA', color: '#ffb000' };
    case 'AI_CORE':
      return { label: '// AI & DATA MATRICES', color: '#ffb000' };
    case 'QUANTUM':
      return { label: '// QUANTUM ENGINEERING', color: '#38bdf8' };
    case 'SECURITY':
      return { label: '// SYSTEMS SECURITY', color: '#f87171' };
    default:
      return { label: `// ${category} INFRA`, color: '#ffb000' };
  }
};

const CapabilityNode = ({ id, title, body, category }) => {
  const { label, color } = getCategoryConfig(category);
  
  return (
    <div className="w-full box-border p-8 bg-[rgba(10,10,10,0.7)] backdrop-blur-[12px] border border-[#1a1a1a] transition-all duration-300 hover:border-[#ffb000] hover:shadow-[0_0_20px_rgba(255,176,0,0.15)] group flex flex-col">
      {/* Top Row */}
      <div className="flex justify-between items-center font-mono">
        <span style={{ color: color }} className="text-[0.8rem] tracking-[2px] uppercase">
          {label}
        </span>
        <span className="text-[#444444] text-[0.8rem]">
          {id}
        </span>
      </div>

      {/* Mid Section */}
      <div className="flex-grow">
        <h3 className="text-[#ffffff] text-[1.5rem] font-bold mt-4 mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-[#a0a0a0] text-[0.95rem] leading-[1.6]">
          {body}
        </p>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center border-t border-[#1f1f1f] pt-4 mt-6 text-[0.8rem] font-mono">
        <span className="text-[#666666]">
          STATE: VERIFIED
        </span>
        <span className="text-[#00ff41] font-bold tracking-wider">
          ✓ IN PRODUCTION
        </span>
      </div>
    </div>
  );
};

const CapabilitiesStack = ({ metrics = [] }) => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto">
      {metrics.map((node) => (
        <CapabilityNode key={node.id} {...node} />
      ))}
    </div>
  );
};

export default CapabilitiesStack;
