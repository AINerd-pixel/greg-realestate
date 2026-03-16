import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => {
  return (
    <div className={`relative ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-2xl"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Red Ring - Solid circle */}
        <circle cx="50" cy="50" r="48" stroke="#FF3B3B" strokeWidth="4" />
        
        {/* Inner Black Circle */}
        <circle cx="50" cy="50" r="46" fill="black" />
        
        {/* Inner White Border - Width matched to T's (3px) */}
        <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="3" />
        
        {/* Vertical Center Gap - Restricted to inner area so it doesn't cut the red ring */}
        <rect x="48.5" y="6" width="3" height="88" fill="black" />
        
        {/* RE - Top Section */}
        <text 
          x="50" 
          y="46" 
          fill="white" 
          fontFamily="Oswald" 
          fontWeight="700" 
          fontSize="36" 
          textAnchor="middle"
          textLength="22"
          lengthAdjust="spacingAndGlyphs"
        >
          RE
        </text>
        
        {/* Symmetrical Bottom Section */}
        <g fill="white">
          {/* Left Symmetrical Shape */}
          <rect x="35" y="52" width="13.5" height="3" /> {/* Horizontal bar */}
          <rect x="45.5" y="52" width="3" height="38" /> {/* Vertical bar - shifted to align with gap */}
          
          {/* Right Symmetrical Shape (Mirror of Left) */}
          <rect x="51.5" y="52" width="13.5" height="3" /> {/* Horizontal bar */}
          <rect x="51.5" y="52" width="3" height="38" /> {/* Vertical bar - shifted to align with gap */}
        </g>
      </svg>
    </div>
  );
};
