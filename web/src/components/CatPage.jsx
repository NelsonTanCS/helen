import React from 'react';
import { getAssetPath } from '../utils/assets';

function CatPage() {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
      padding: '2rem'
    }}>
      <img
        src={getAssetPath('images/meatloaf.jpg')}
        alt="Adorable cat"
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          objectFit: 'contain',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      />
    </div>
  );
}

export default CatPage;
