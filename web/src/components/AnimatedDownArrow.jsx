import React from 'react';

function AnimatedDownArrow() {
  // Scroll to next section on click
  const handleClick = () => {
    const sections = document.querySelectorAll('section');
    if (sections.length > 1) {
      sections[1].scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '2.5rem',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 30,
        pointerEvents: 'auto',
      }}
    >
      <button
        onClick={handleClick}
        aria-label="Scroll down"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
          padding: 0,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: 'bounceDown 1.2s infinite',
            filter: 'drop-shadow(0 2px 8px #0003)',
          }}
        >
          <path d="M24 12v24M24 36l-8-8M24 36l8-8" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <style>{`
          @keyframes bounceDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(16px); }
          }
        `}</style>
      </button>
    </div>
  );
}

export default AnimatedDownArrow;
