

import React, { useState } from 'react';

// Timeline events grouped by month (no background pattern)
const timelineData = [
  { 
    month: 'September', 
    year: '2024', 
    events: [ 
      { date: 'Sep 26th', label: 'The day you thought we met', image: 'day_we_met.jpg' } 
    ] 
  },
  { 
    month: 'Oct', 
    year: '2024', 
    events: [ 
      { date: 'Oct 17th', label: 'First insta DM', text: 'I sent you a partiful invite!' }, 
      { date: 'Oct 31st', label: 'First text message', text: 'You needed a handyman!' } 
    ] 
  },
  { 
    month: 'Nov', 
    year: '2024', 
    events: [ 
      { date: 'Nov 1st', label: 'First party', image: 'first_party.jpg' }, 
      { date: 'Nov 14th', label: 'First handyman task', image: 'first_handyman.jpg' }, 
      { date: 'Nov 23rd', label: 'First 1 on 1, making art', image: 'one_on_one.jpg' }, 
      { date: 'Nov 26th', label: 'First time buying you flowers', image: 'first_flowers.jpg' } 
    ] 
  },
  { 
    month: 'Dec', 
    year: '2024', 
    events: [ 
      { date: 'Dec 13th', label: 'First time climbing', video: 'climbing.mp4' }, 
      { date: 'Dec 15th', label: 'First time clubbing', image: 'clubbing.jpeg' } 
    ] 
  },
  { 
    month: 'Jan', 
    year: '2025', 
    events: [ 
      { date: 'Jan 19th', label: 'First time at the driving range', video: 'driving.mp4' }, 
      { date: 'Jan 26th', label: 'First time golfing', image: 'golfing.jpg' }, 
      { date: 'Jan 31st', label: 'First time meeting my parents', image: 'my_parents.jpg' } 
    ] 
  },
  { 
    month: 'Feb', 
    year: '2025', 
    events: [ 
      { date: 'Feb 2nd', label: 'First time skiing', image: 'skiing.jpg' }, 
      { date: 'Feb 7th', label: 'First costume party', image: 'costume.jpeg' }, 
      { date: 'Feb 22nd', label: 'First time eating out at a restaurant', image: 'eating_out.jpg' }, 
      { date: 'Feb 26th', label: 'First time falling asleep overnight on my couch (image from a different night)', image: 'sleep.jpg' } 
    ] 
  },
  { 
    month: 'Mar', 
    year: '2025', 
    events: [ 
      { date: 'Mar 1st', label: 'First time at a fancy event', image: 'image4.jpg' }, 
      { date: 'Mar 9th', label: 'First time meeting your friends (Ava)', image: 'meeting_friends.jpg' }, 
      { date: 'Mar 20th', label: 'First time stepping on your back', image: 'stepping_back.jpg' }, 
      { date: 'Mar 28th', label: 'First time roller skating (backwards!!)', video: 'skating.mp4' }, 
      { date: 'Mar 29th', label: 'First costco trip', image: 'costco.jpg' } 
    ] 
  },
  { 
    month: 'Apr', 
    year: '2025', 
    events: [ 
      { date: 'Apr 2nd', label: 'First time playing pickleball', image: 'pickleball.jpg' }, 
      { date: 'Apr 4th', label: 'First overnight trip', image: 'overnight.jpg' }, 
      { date: 'Apr 26th', label: 'First mall shopping trip', image: 'mall.jpg' } 
    ] 
  },
  { 
    month: 'May', 
    year: '2025', 
    events: [ 
      { date: 'May 2nd', label: 'First 18 holes', image: 'eighteen_holes.jpg' }, 
      { date: 'May 3rd', label: 'First time skydiving', image: 'skydiving.jpg' }, 
      { date: 'May 3rd', label: 'First time solving a rubik\'s cube', video: 'rubiks.mp4' }, 
      { date: 'May 4th', label: 'First beach day', video: 'beach.mp4' }, 
      { date: 'May 10th', label: 'First hike', image: 'hike.jpg' }, 
      { date: 'May 18th', label: 'First time at pike place', image: 'pikeplace.jpg' }, 
      { date: 'May 23rd', label: 'First time at the space needle', video: 'space_needle.mp4' }, 
      { date: 'May 25th', label: 'First time mini golfing', video: 'mini_golf.mp4' }, 
      { date: 'May 26th', label: 'First time buying you a bouquet', image: 'bouquet.jpg' }, 
      { date: 'May 26th', label: 'First time holding Lucas', video: 'holding_lucas.mp4' }, 
      { date: 'May 28th', label: 'First time paddleboarding', image: 'paddleboard.jpg' } 
    ] 
  },
  { 
    month: 'Jun', 
    year: '2025', 
    events: [ 
      { date: 'Jun 7th', label: 'First time white water rafting', image: 'white_water.jpg' }, 
      { date: 'Jun 10th', label: 'First time meeting your parents', video: 'meeting_parents.mp4' } 
    ] 
  },
  { 
    month: 'Jul', 
    year: '2025', 
    events: [ 
      { date: 'Jul 25th', label: 'First concert (MORGAN WALLEN!!!)', video: 'concert.mp4' } 
    ] 
  },
  { 
    month: 'Aug', 
    year: '2025', 
    events: [ 
      { date: 'Aug 1st', label: 'First Mariners game', video: 'mariners.mp4' } 
    ] 
  }
];

function TimelineEventCard({ event, setExpandedImg, setExpandedVideo, align }) {
  return (
    <div
      style={{
        position: 'relative',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(139, 92, 246, 0.15), 0 8px 32px rgba(0,0,0,0.1)',
        padding: '20px',
        border: `4px solid ${align === 'left' ? '#f472b6' : '#a855f7'}`,
        maxWidth: 220, // Reduced from 280 to make cards narrower
        width: 220, // Fixed width instead of 100%
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: 'scale(1)',
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.borderColor = align === 'left' ? '#ec4899' : '#9333ea';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.borderColor = align === 'left' ? '#f472b6' : '#a855f7';
      }}
      onClick={() => {
        if (event.image) {
          setExpandedImg(event.image);
        } else if (event.video) {
          setExpandedVideo(event.video);
        }
      }}
    >
      <div 
        style={{ 
          fontFamily: '"Playfair Display", "Georgia", serif',
          fontSize: '16px', // Reduced from 18px
          fontWeight: '900',
          color: '#5b21b6',
          marginBottom: '8px',
          lineHeight: '1.3', // Increased for better readability with wrapping
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
        }}>
        {event.label}
      </div>
      <div 
        style={{ 
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          fontSize: '14px',
          fontWeight: '700',
          backgroundColor: '#1f2937',
          color: '#ffffff',
          padding: '4px 12px',
          borderRadius: '9999px',
          marginBottom: (event.image || event.video || event.text) ? '12px' : '0px', // Less margin if no image, video or text
          display: 'inline-block',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
        {event.date}
      </div>
      {/* Only render image if it exists */}
      {event.image && (
        <img
          src={`/images/${event.image}`}
          alt={event.label}
          style={{ 
            width: 80, 
            height: 80, 
            objectFit: 'cover', 
            display: 'block',
            margin: '0 auto',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '4px solid rgba(255,255,255,0.8)'
          }}
        />
      )}
      {/* Only render video thumbnail if it exists (and no image) */}
      {!event.image && event.video && (
        <div style={{
          position: 'relative',
          width: 80, 
          height: 80, 
          display: 'block',
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '4px solid rgba(255,255,255,0.8)',
          cursor: 'pointer'
        }}>
          <video
            src={`/videos/${event.video}`}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              pointerEvents: 'none'
            }}
            muted
            preload="metadata"
          />
          {/* Play button overlay */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '24px',
            height: '24px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '8px solid white',
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              marginLeft: '2px'
            }}></div>
          </div>
        </div>
      )}
      {/* Render text content if no image or video but text exists */}
      {!event.image && !event.video && event.text && (
        <div style={{
          minHeight: '80px',
          padding: '12px',
          margin: '0 auto',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border: '2px solid rgba(167, 139, 250, 0.2)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            fontSize: '12px',
            fontWeight: '600',
            color: '#64748b',
            lineHeight: '1.4',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}>
            {event.text}
          </div>
        </div>
      )}
      {/* Decorative corner elements */}
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        width: '12px',
        height: '12px',
        background: 'linear-gradient(135deg, #f9a8d4, #a855f7)',
        borderRadius: '50%',
        opacity: 0.6
      }}></div>
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        width: '12px',
        height: '12px',
        background: 'linear-gradient(135deg, #c084fc, #ec4899)',
        borderRadius: '50%',
        opacity: 0.6
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '8px',
        left: '8px',
        width: '8px',
        height: '8px',
        background: 'linear-gradient(135deg, #ec4899, #9333ea)',
        borderRadius: '50%',
        opacity: 0.4
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        width: '8px',
        height: '8px',
        background: 'linear-gradient(135deg, #a855f7, #ec4899)',
        borderRadius: '50%',
        opacity: 0.4
      }}></div>
    </div>
  );
}

function TimelinePage() {
  const [expandedImg, setExpandedImg] = useState(null);
  const [expandedVideo, setExpandedVideo] = useState(null);

  // Fun background patterns for each month
  const monthBackgrounds = [
    // September 2024
    'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    // Oct 2024  
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    // Nov 2024
    'radial-gradient(circle, #ff6b6b, #feca57)',
    // Dec 2024
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    // Jan 2025
    'linear-gradient(45deg, #d299c2 0%, #fef9d7 100%)',
    // Feb 2025
    'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    // Mar 2025
    'radial-gradient(circle, #ffecd2, #fcb69f)',
    // Apr 2025
    'linear-gradient(45deg, #a8e6cf 0%, #dcedc1 100%)',
    // May 2025
    'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    // Jun 2025
    'radial-gradient(circle, #fdbb2d, #22c1c3)',
    // Jul 2025
    'linear-gradient(45deg, #ff9a8b 0%, #a8e6cf 100%)',
    // Aug 2025
    'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)'
  ];

  // Calculate positions for events within each month with alternating distance strategy
  const MONTH_HEIGHT = 400; // Increased from 300 to 400 for better spacing around month labels
  const MIN_VERTICAL_SPACING = 80; // Increased from 60 to 80 for more space between cards
  const CLOSE_DISTANCE = 170; // Distance for "close" cards
  const FAR_DISTANCE = 170 + 220 + 60; // Close distance + card width + buffer = 430px
  
  // *** ADJUST THIS VALUE TO CHANGE VERTICAL SPACING BETWEEN MONTHS ***
  const MONTH_BOTTOM_PADDING = 220; // Extra height at bottom of each month container (currently 300px)
  // Increase this number for more space between months, decrease for less space
  
  
  const processedData = timelineData.map((monthData, monthIndex) => {
    const { events } = monthData;
    const numEvents = events.length;
    
    // Position events with alternating side and distance pattern
    const positionedEvents = events.map((event, eventIndex) => {
      // Alternate sides for each event
      const isLeft = eventIndex % 2 === 0;
      
      // Determine if this is close or far from center
      // Pattern: close-left, close-right, far-left, far-right, close-left, close-right, etc.
      const positionInSequence = Math.floor(eventIndex / 2); // 0,0,1,1,2,2...
      const isClose = positionInSequence % 2 === 0; // Even positions are close, odd are far
      
      // Calculate horizontal offset based on close/far pattern
      const horizontalOffset = isClose ? CLOSE_DISTANCE : FAR_DISTANCE;
      
      // Calculate vertical position - distribute events evenly within month
      const totalHeight = Math.max(MONTH_HEIGHT, numEvents * MIN_VERTICAL_SPACING);
      const verticalPosition = numEvents > 1 ? 
        (eventIndex / (numEvents - 1)) * (totalHeight - MIN_VERTICAL_SPACING) : 0;
      
      return {
        ...event,
        isLeft,
        verticalPosition,
        horizontalOffset,
        eventIndex,
        isClose,
        positionInSequence
      };
    });
    
    // Calculate total height needed for this month
    const totalHeight = Math.max(MONTH_HEIGHT, numEvents * MIN_VERTICAL_SPACING);
    
    return {
      ...monthData,
      positionedEvents,
      monthIndex,
      totalHeight
    };
  });

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#f9fafb',
      paddingBottom: '96px'
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: '800',
        marginBottom: '48px',
        color: '#7c3aed',
        textShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginTop: '40px'
      }}>Our Firsts Timeline (Click images/videos to expand!)</h1>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: `${processedData.reduce((sum, month) => sum + month.totalHeight + MONTH_BOTTOM_PADDING, 0) + 100}px` // Set explicit height for scrolling
      }} className="timeline-container">
        
        {/* Background container - only month background rectangles */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1 // Background layer
        }}>
          {processedData.map((monthData, monthIndex) => {
            const topOffset = processedData.slice(0, monthIndex).reduce((sum, month) => sum + month.totalHeight + MONTH_BOTTOM_PADDING + 20, 0);
            return (
              <div key={`background-${monthData.month}-${monthData.year}`} style={{
                position: 'absolute',
                top: `${topOffset}px`,
                left: 0,
                height: `${monthData.totalHeight + MONTH_BOTTOM_PADDING}px`, // Using variable for easy adjustment
                width: '100%',
                background: monthBackgrounds[monthIndex] || monthBackgrounds[0],
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '2px solid rgba(255,255,255,0.3)'
              }} />
            );
          })}
        </div>

        {/* Content container - all interactive elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10 // Above backgrounds
        }}>
          {/* Central vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            height: `${processedData.reduce((sum, month) => sum + month.totalHeight + MONTH_BOTTOM_PADDING, 0)}px`,
            width: '6px',
            background: '#a78bfa',
            borderRadius: '8px',
            transform: 'translateX(-50%)',
            zIndex: 15,
            boxShadow: '0 0 10px rgba(167, 139, 250, 0.5)'
          }}></div>

          {/* Month labels */}
          {processedData.map((monthData, monthIndex) => {
            const topOffset = processedData.slice(0, monthIndex).reduce((sum, month) => sum + month.totalHeight + MONTH_BOTTOM_PADDING + 20, 0);
            return (
              <div key={`month-label-${monthData.month}-${monthData.year}`} style={{
                position: 'absolute',
                top: `${topOffset + 16}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 25,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '1400px'
              }}>
                <div style={{
                  flex: 1,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                  marginRight: '16px'
                }}></div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#ffffff',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  position: 'relative',
                  zIndex: 25
                }}>{monthData.month} {monthData.year}</div>
                <div style={{
                  flex: 1,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                  marginLeft: '16px'
                }}></div>
              </div>
            );
          })}

          {/* Events and center dots */}
          {processedData.map((monthData, monthIndex) => {
            const monthTopOffset = processedData.slice(0, monthIndex).reduce((sum, month) => sum + month.totalHeight + MONTH_BOTTOM_PADDING + 20, 0);
            return monthData.positionedEvents.map((event, eventIndex) => (
              <div key={`${event.date}-${event.label}`} style={{
                position: 'absolute',
                top: `${monthTopOffset + 120 + event.verticalPosition}px`, // Reduced from 180 to 120 for closer spacing to month label
                left: 0,
                width: '100%',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                zIndex: 30
              }}>
                {/* Center dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#a78bfa',
                  border: '4px solid #fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2), 0 0 8px rgba(167, 139, 250, 0.3)',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 35
                }}></div>
                
                {/* Event card and connector line */}
                {event.isLeft ? (
                  <>
                    <div style={{ width: '50%', position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        right: `${event.horizontalOffset}px`,
                        top: '50%',
                        transform: 'translate(50%, -50%)',
                        zIndex: 40
                      }}>
                        <TimelineEventCard event={event} setExpandedImg={setExpandedImg} setExpandedVideo={setExpandedVideo} align="left" />
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: 'calc(50% + 12px)',
                      width: `${event.horizontalOffset}px`,
                      height: 4,
                      background: '#a78bfa',
                      transform: 'translateY(-50%)',
                      zIndex: 20
                    }}></div>
                    <div style={{ width: '50%' }}></div>
                  </>
                ) : (
                  <>
                    <div style={{ width: '50%' }}></div>
                    <div style={{ width: '50%', position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: `${event.horizontalOffset}px`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 40
                      }}>
                        <TimelineEventCard event={event} setExpandedImg={setExpandedImg} setExpandedVideo={setExpandedVideo} align="right" />
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: 'calc(50% + 12px)',
                      width: `${event.horizontalOffset}px`,
                      height: 4,
                      background: '#a78bfa',
                      transform: 'translateY(-50%)',
                      zIndex: 20
                    }}></div>
                  </>
                )}
              </div>
            ));
          })}
        </div>
      </div>
      {/* Modal for expanded image */}
      {expandedImg && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }} onClick={() => setExpandedImg(null)}>
          <img
            src={`/images/${expandedImg}`}
            alt="expanded"
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '4px solid #c084fc'
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
      {/* Modal for expanded video */}
      {expandedVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }} onClick={() => setExpandedVideo(null)}>
          <video
            src={`/videos/${expandedVideo}`}
            controls
            autoPlay
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '4px solid #c084fc'
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default TimelinePage;
