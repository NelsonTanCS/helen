import React from 'react';

function PatternedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{zIndex:0, opacity:0.18, pointerEvents:'none'}}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="confetti" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="4" fill="#ff6b6b" />
            <circle cx="40" cy="20" r="3" fill="#6bc1ff" />
            <rect x="25" y="40" width="8" height="8" fill="#f7d06c" rx="2" />
            <rect x="50" y="50" width="5" height="5" fill="#b36cff" rx="1" />
          </pattern>
          <linearGradient id="ribbon5" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff6bb3" />
            <stop offset="100%" stopColor="#6bffd0" />
          </linearGradient>
          <linearGradient id="ribbon6" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe36b" />
            <stop offset="100%" stopColor="#6b8cff" />
          </linearGradient>
          <linearGradient id="ribbon7" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff6b8c" />
            <stop offset="100%" stopColor="#6bffb3" />
          </linearGradient>
          <linearGradient id="ribbon8" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#b3b36b" />
            <stop offset="100%" stopColor="#6bffea" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#confetti)" />
      </svg>
    </div>
  );
}

export default PatternedBackground;
