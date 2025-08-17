
import React, { useState } from 'react';

import AnimatedRibbons from './components/AnimatedRibbons';
import PatternedBackground from './components/PatternedBackground';
import RolodexMessages from './components/RolodexMessages';
import ShowDownArrowWrapper from './components/ShowDownArrowWrapper';
import TextingStatsPage from './components/TextingStatsPage';



import CollageStatsPage from './components/CollageStatsPage';
import TimelinePage from './components/TimelinePage';
import GeoGuessrPage from './components/GeoGuessrPage';
import RolodexPage2 from './components/RolodexPage2';

const rolodexMessages = [
  'Happy Birthday Helen',
  'You\'ve made this the best year of my life',
  'I hope I\'ve made you half as happy as you\'ve made me',
  'Every day with you is a perfect dream come true',
  'Let\'s take a look back at all the wonderful memories we\'ve created together'
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
      <section className="min-h-screen flex flex-col justify-center items-center snap-start snap-always px-0 relative" style={{ scrollSnapAlign: 'start', padding: 0, background: 'transparent' }}>
        <CollageStatsPage />
      </section>
      {/* Page 4: Timeline */}
      <section className="min-h-[200vh] flex flex-col justify-start items-center snap-start snap-always px-0 relative" style={{ scrollSnapAlign: 'start', padding: 0, background: 'transparent' }}>
        <TimelinePage />
      </section>
      {/* Page 5: GeoGuessr */}
      <section className="min-h-screen snap-start snap-always relative w-full" style={{ scrollSnapAlign: 'start', padding: 0, background: 'transparent' }}>
        <GeoGuessrPage />
      </section>
      {/* Page 6: Final Rolodex Messages */}
      <section 
        className="min-h-screen snap-start snap-always px-4 relative" 
        style={{ 
          scrollSnapAlign: 'start', 
          position: 'relative',
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PatternedBackground />
        <AnimatedRibbons replaySignal={replaySignal} key={`ribbons-page6-${replaySignal}`} />
        <div className="flex justify-center items-center">
          <RolodexPage2 replaySignal={replaySignal} />
        </div>
      </section>
    </div>
  );
}

export default App;
