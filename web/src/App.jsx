
import React, { useState } from 'react';

import AnimatedRibbons from './components/AnimatedRibbons';
import PatternedBackground from './components/PatternedBackground';
import RolodexMessages from './components/RolodexMessages';
import ShowDownArrowWrapper from './components/ShowDownArrowWrapper';
import TextingStatsPage from './components/TextingStatsPage';

const rolodexMessages = [
  'Happy Birthday Helen',
  'May all your dreams come true this year!'
];



function App() {
  const [replaySignal, setReplaySignal] = useState(0);
  return (
    <div
      className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative min-h-screen overflow-hidden"
      style={{ scrollSnapType: 'y mandatory', height: '100vh', overflowY: 'auto' }}
    >
      <button
        className="absolute top-6 right-8 z-20 bg-white/80 hover:bg-white text-blue-600 font-bold py-2 px-4 rounded shadow transition-all border border-blue-200"
        style={{backdropFilter:'blur(4px)'}}
        onClick={() => setReplaySignal(s => s + 1)}
        aria-label="Replay birthday messages"
      >
        &#8635; Replay
      </button>
      {/* Page 1 */}
      <section className="min-h-screen flex flex-col justify-center items-center snap-start snap-always px-4" style={{ scrollSnapAlign: 'start', position: 'relative' }}>
        <PatternedBackground />
        <AnimatedRibbons replaySignal={replaySignal} key={replaySignal} />
        <RolodexMessages messages={rolodexMessages} initial={3000} delay={3000} transition={350} replaySignal={replaySignal} />
        <ShowDownArrowWrapper replaySignal={replaySignal} />
      </section>
      {/* Page 2 */}
      <section className="min-h-screen flex flex-col justify-center items-center snap-start snap-always px-4 relative" style={{ scrollSnapAlign: 'start', background: 'linear-gradient(135deg, #f7d06c 0%, #ffb36b 100%)' }}>
        <TextingStatsPage />
      </section>
      {/* Page 3 */}
      <section className="min-h-screen flex flex-col justify-center items-center snap-start snap-always px-4 relative" style={{ scrollSnapAlign: 'start', background: 'linear-gradient(135deg, #6bc1ff 0%, #b36cff 100%)' }}>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem', textShadow: '0 2px 8px #0008' }}>A Wish from All of Us</h2>
          <p style={{ fontSize: '1.5rem', maxWidth: 600, textAlign: 'center', color: '#fff', background: 'rgba(0,0,0,0.18)', borderRadius: 12, padding: '1.5rem 2rem', boxShadow: '0 2px 16px #0002' }}>
            You are loved and celebrated by everyone around you. Have a fantastic birthday and a wonderful year ahead!
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
