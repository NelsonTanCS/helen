import React from 'react';

const ribbonSlideStyles = `
@keyframes ribbon-slide-in-left {
  0% { transform: translateX(-120vw); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateX(0); opacity: 1; }
}
@keyframes ribbon-slide-in-right {
  0% { transform: translateX(120vw); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateX(0); opacity: 1; }
}
`;

function AnimatedRibbons({ replaySignal }) {
  return (
    <>
      <style>{ribbonSlideStyles}</style>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:1}}>
        <defs>
          <linearGradient id="ribbon1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#f7d06c" />
          </linearGradient>
          <linearGradient id="ribbon2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6bc1ff" />
            <stop offset="100%" stopColor="#b36cff" />
          </linearGradient>
          <linearGradient id="ribbon3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffb36b" />
            <stop offset="100%" stopColor="#6bffb3" />
          </linearGradient>
          <linearGradient id="ribbon4" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#b36bff" />
            <stop offset="100%" stopColor="#6bffea" />
          </linearGradient>
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
        {/* Center ribbons (original) */}
        <g style={{animation: 'ribbon-slide-in-left 2.5s cubic-bezier(.7,0,.3,1) 0s 1'}}>
          <path d="M0,100 Q300,200 600,100 T1200,100" stroke="url(#ribbon1)" strokeWidth="18" fill="none">
            <animate attributeName="d" values="M0,100 Q300,200 600,100 T1200,100;M0,120 Q300,80 600,120 T1200,120;M0,100 Q300,200 600,100 T1200,100" dur="6s" repeatCount="indefinite" />
          </path>
        </g>
        <g style={{animation: 'ribbon-slide-in-left 2.7s cubic-bezier(.7,0,.3,1) 0.2s 1'}}>
          <path d="M0,200 Q400,300 800,200 T1600,200" stroke="url(#ribbon2)" strokeWidth="14" fill="none">
            <animate attributeName="d" values="M0,200 Q400,300 800,200 T1600,200;M0,220 Q400,180 800,220 T1600,220;M0,200 Q400,300 800,200 T1600,200" dur="7s" repeatCount="indefinite" />
          </path>
        </g>
        {/* New ribbons, more colors, different vertical positions */}
        <g style={{animation: 'ribbon-slide-in-left 2.2s cubic-bezier(.7,0,.3,1) 0.4s 1'}}>
          <path d="M0,320 Q350,400 700,320 T1400,320" stroke="url(#ribbon3)" strokeWidth="12" fill="none">
            <animate attributeName="d" values="M0,320 Q350,400 700,320 T1400,320;M0,340 Q350,300 700,340 T1400,340;M0,320 Q350,400 700,320 T1400,320" dur="5.5s" repeatCount="indefinite" />
          </path>
        </g>
        <g style={{animation: 'ribbon-slide-in-left 2.4s cubic-bezier(.7,0,.3,1) 0.6s 1'}}>
          <path d="M0,420 Q500,500 1000,420 T2000,420" stroke="url(#ribbon4)" strokeWidth="10" fill="none">
            <animate attributeName="d" values="M0,420 Q500,500 1000,420 T2000,420;M0,440 Q500,380 1000,440 T2000,440;M0,420 Q500,500 1000,420 T2000,420" dur="6.5s" repeatCount="indefinite" />
          </path>
        </g>
        {/* Four more ribbons sliding in from the left, below the text */}
        <g style={{animation: 'ribbon-slide-in-left 2.1s cubic-bezier(.7,0,.3,1) 0.8s 1'}}>
          <path d="M0,540 Q350,600 700,540 T1400,540" stroke="url(#ribbon5)" strokeWidth="10" fill="none">
            <animate attributeName="d" values="M0,540 Q350,600 700,540 T1400,540;M0,560 Q350,520 700,560 T1400,560;M0,540 Q350,600 700,540 T1400,540" dur="5.2s" repeatCount="indefinite" />
          </path>
        </g>
        <g style={{animation: 'ribbon-slide-in-left 2.3s cubic-bezier(.7,0,.3,1) 1.0s 1'}}>
          <path d="M0,600 Q400,660 800,600 T1600,600" stroke="url(#ribbon6)" strokeWidth="12" fill="none">
            <animate attributeName="d" values="M0,600 Q400,660 800,600 T1600,600;M0,620 Q400,580 800,620 T1600,620;M0,600 Q400,660 800,600 T1600,600" dur="5.7s" repeatCount="indefinite" />
          </path>
        </g>
        <g style={{animation: 'ribbon-slide-in-left 2.5s cubic-bezier(.7,0,.3,1) 1.2s 1'}}>
          <path d="M0,660 Q350,720 700,660 T1400,660" stroke="url(#ribbon7)" strokeWidth="14" fill="none">
            <animate attributeName="d" values="M0,660 Q350,720 700,660 T1400,660;M0,680 Q350,640 700,680 T1400,680;M0,660 Q350,720 700,660 T1400,660" dur="6.1s" repeatCount="indefinite" />
          </path>
        </g>
        <g style={{animation: 'ribbon-slide-in-left 2.7s cubic-bezier(.7,0,.3,1) 1.4s 1'}}>
          <path d="M0,720 Q400,780 800,720 T1600,720" stroke="url(#ribbon8)" strokeWidth="18" fill="none">
            <animate attributeName="d" values="M0,720 Q400,780 800,720 T1600,720;M0,740 Q400,700 800,740 T1600,740;M0,720 Q400,780 800,720 T1600,720" dur="6.4s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </>
  );
}

export default AnimatedRibbons;
