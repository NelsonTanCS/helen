

import React, { useEffect, useRef, useState } from 'react';
import { getAssetPath } from '../utils/assets';

// Simple count up hook for animating numbers, always animates when 'start' transitions to true
function useCountUp(target, start, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame;
    if (!start) {
      setValue(0);
      return;
    }
    setValue(0);
    const startTime = performance.now();
    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);
  return value;
}

// List of image filenames in the images folder (renamed to image1.jpg, image2.jpg, ...)
const imageFiles = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
  'image6.jpg',
  'image7.jpg',
  'image8.jpg',
  'image9.jpg',
  'image10.jpg',
  'image11.jpg',
  'image12.jpg',
  'image13.jpg',
  'image14.jpg',
  'image15.jpg',
  'image16.jpg',
  'image17.jpg',
  'image18.jpg',
  'image19.jpg',
  'image20.jpg',
  'image21.jpg',
  'image22.jpg',
  'image23.jpg',
];


// Statistic definitions
const stats = [
  { label: 'Full Weekends', value: 28, subtitle: '28 Full Weekends', big: true },
  { label: 'Whole Weekends', value: 18, subtitle: '18 (64%) whole weekends spent together', big: false },
  { label: 'Weekends', value: 26, subtitle: '26 (92%) weekends spent together', big: false },
  { label: 'Weeks', value: 28, subtitle: '28 (100%) weeks spent together', big: false },
];

export default function CollageStatsPage() {
  // Animate all numbers, replay every time section enters viewport
  const [showStats, setShowStats] = useState(false);
  const [statsAnimKey, setStatsAnimKey] = useState(0);
  const animatedFullWeekends = useCountUp(28, showStats, 1200);
  const animatedWholeWeekends = useCountUp(18, showStats, 1200);
  const animatedWeekends = useCountUp(26, showStats, 1200);
  const animatedWeeks = useCountUp(28, showStats, 1200);
  // 2 refs for 2 rows
  const rowRefs = [useRef(), useRef()];
  // Different speeds for each row
  const speeds = [0.3, 0.4];
  // Use IntersectionObserver to detect when section is in view and trigger animation
  useEffect(() => {
    const section = document.getElementById('collage-stats-section');
    if (!section) return;
    let prevVisible = false;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowStats(true);
          setStatsAnimKey(k => k + 1); // force remount/animation
        } else {
          setShowStats(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Infinite side-scrolling collage effect for 2 rows (fix for slow speeds)
  useEffect(() => {
    let animId;
    // Track float scroll positions for each row
    const scrollPositions = [0, 0];
    const scrollCollage = () => {
      rowRefs.forEach((ref, i) => {
        const el = ref.current;
        if (el) {
          scrollPositions[i] += speeds[i];
          if (scrollPositions[i] >= el.scrollWidth / 2) {
            scrollPositions[i] = 0;
          }
          el.scrollLeft = scrollPositions[i];
        }
      });
      animId = requestAnimationFrame(scrollCollage);
    };
    scrollCollage();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="collage-stats-section" className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden" style={{ background: '#222' }}>
      {/* Infinite collage background: 2 rows, each with different speed */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {[0, 1].map(row => {
          // Divide images evenly among rows
          const imagesPerRow = Math.ceil(imageFiles.length / 2);
          const startIdx = row * imagesPerRow;
          const endIdx = startIdx + imagesPerRow;
          const rowImages = imageFiles.slice(startIdx, endIdx);
          return (
            <div
              key={row}
              ref={rowRefs[row]}
              style={{
                width: '100vw',
                height: '50vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                whiteSpace: 'nowrap',
                alignItems: 'center',
              }}
            >
              {[...rowImages, ...rowImages].map((img, i) => (
                <img
                  key={i}
                  src={getAssetPath(`images/${img}`)}
                  alt="collage"
                  style={{
                    width: 'auto',
                    height: '45vh',
                    objectFit: 'cover',
                    marginRight: 2,
                    opacity: 0.85,
                    filter: 'brightness(0.85)',
                    borderRadius: 8,
                    userSelect: 'none',
                  }}
                  draggable={false}
                />
              ))}
            </div>
          );
        })}
      </div>
      {/* Stats content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full" style={{ minHeight: '100vh' }}>
        {/* Title stat */}
        <div style={{
          fontSize: '4rem',
          fontWeight: 900,
          color: '#fff',
          textShadow: '0 4px 24px #000a',
          marginTop: '3rem',
          marginBottom: '2.5rem',
          letterSpacing: 2,
        }}>
          {animatedFullWeekends} Full Weekends
        </div>
        {/* 3 side-by-side stats */}
        <div className="flex flex-row justify-center items-center gap-12 w-full" style={{ maxWidth: 1200 }} key={statsAnimKey}>
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 24,
            padding: '2.5rem 2.5rem',
            minWidth: 320,
            textAlign: 'center',
            boxShadow: '0 4px 32px #0002',
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#b36cff',
            margin: '0 1rem',
          }}>
            <span style={{ fontSize: '3.2rem', color: '#ff6b6b', fontWeight: 900, letterSpacing: 1, marginRight: 8 }}>
              {animatedWholeWeekends}
            </span>
            <span style={{ fontSize: '1.3rem', color: '#333', fontWeight: 600, marginLeft: 8 }}>
              {(stats[1].subtitle.replace(/^[0-9]+/, '').trim())}
            </span>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 24,
            padding: '2.5rem 2.5rem',
            minWidth: 320,
            textAlign: 'center',
            boxShadow: '0 4px 32px #0002',
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#b36cff',
            margin: '0 1rem',
          }}>
            <span style={{ fontSize: '3.2rem', color: '#ff6b6b', fontWeight: 900, letterSpacing: 1, marginRight: 8 }}>
              {animatedWeekends}
            </span>
            <span style={{ fontSize: '1.3rem', color: '#333', fontWeight: 600, marginLeft: 8 }}>
              {(stats[2].subtitle.replace(/^[0-9]+/, '').trim())}
            </span>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 24,
            padding: '2.5rem 2.5rem',
            minWidth: 320,
            textAlign: 'center',
            boxShadow: '0 4px 32px #0002',
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#b36cff',
            margin: '0 1rem',
          }}>
            <span style={{ fontSize: '3.2rem', color: '#ff6b6b', fontWeight: 900, letterSpacing: 1, marginRight: 8 }}>
              {animatedWeeks}
            </span>
            <span style={{ fontSize: '1.3rem', color: '#333', fontWeight: 600, marginLeft: 8 }}>
              {(stats[3].subtitle.replace(/^[0-9]+/, '').trim())}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
