import React, { useEffect, useState } from 'react';

const RolodexPage2 = ({ replaySignal = 1 }) => {
  const rolodexMessages = [
    'Thank you for being amazing',
    'Here\'s to many more adventures together!',
    'You have made my life infinitely more fun and exciting',
    'Shelly and I love you very much'
  ];

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timers = [];
    
    // Reset and start the cycle
    setIndex(0);
    setShow(false);
    
    // Initial delay before showing first message
    timers.push(setTimeout(() => {
      setShow(true);
    }, 1000));

    // Function to cycle through messages infinitely
    const startCycle = () => {
      let currentIndex = 0;
      
      const cycleThroughMessages = () => {
        // Hide current message
        setShow(false);
        
        setTimeout(() => {
          // Move to next message (loop back to 0 after last message)
          currentIndex = (currentIndex + 1) % rolodexMessages.length;
          setIndex(currentIndex);
          setShow(true);
          
          // Schedule next message change
          timers.push(setTimeout(cycleThroughMessages, 4000 + 350));
        }, 350);
      };
      
      // Start the infinite cycle after initial display
      timers.push(setTimeout(cycleThroughMessages, 4000));
    };
    
    // Start the cycle after initial message is shown
    timers.push(setTimeout(startCycle, 1000));
    
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [replaySignal]);

  const messageClass = [
    'absolute left-0 right-0 mx-auto transition-all duration-350 ease-in-out',
    'font-extrabold z-10 text-center drop-shadow-lg',
    'w-full',
    show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16',
  ].join(' ');

  return (
    <div className="mt-8 flex items-center justify-center relative select-none" style={{minHeight: '7rem', width: '100vw', maxWidth: '100vw'}}>
      <div
        className={messageClass}
        style={{
          transition: 'all 0.35s',
          wordBreak: 'keep-all',
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: 'bold',
          maxWidth: '90vw',
          padding: '0 2rem',
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
          textAlign: 'center',
          overflow: 'visible',
          color: '#1f2937',
          textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)'
        }}
      >
        {rolodexMessages[index]}
      </div>
    </div>
  );
};

export default RolodexPage2;
