import React, { useEffect, useRef, useState } from 'react';

function RolodexMessages({
  messages,
  initial = 0,
  delay,
  transition = 350,
  replaySignal,
}) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const timer = useRef();

  useEffect(() => {
    let timers = [];
    setIndex(0);
    setShow(false);
    timers.push(setTimeout(() => {
      setShow(true);
    }, initial));
    for (let i = 1; i < messages.length; i++) {
      timers.push(setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          setIndex(i);
          setShow(true);
        }, transition);
      }, initial + (delay + transition) * (i - 1) + delay));
    }
    return () => timers.forEach(clearTimeout);
  }, [replaySignal, initial, delay, transition, messages.length]);

  const messageClass = [
    'absolute left-0 right-0 mx-auto transition-all duration-350 ease-in-out',
    'font-extrabold z-10 text-center drop-shadow-lg',
    'w-full',
    show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16',
  ].join(' ');

  const [onFirstPage, setOnFirstPage] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      if (sections.length > 0) {
        const rect = sections[0].getBoundingClientRect();
        setOnFirstPage(rect.top <= 1 && rect.bottom > window.innerHeight / 2);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const shouldShow = index === messages.length - 1 && show && onFirstPage;
    window.dispatchEvent(new CustomEvent('showDownArrow', { detail: shouldShow }));
  }, [index, show, onFirstPage]);

  return (
    <div className="mt-8 flex items-center justify-center relative select-none" style={{minHeight: '7rem', minWidth: '100%', width: '100%'}}>
      <div
        className={messageClass}
        style={{
          transition: 'all 0.35s',
          wordBreak: 'break-word',
          fontSize: '3vw',
          fontWeight: 'bold',
          maxWidth: '90vw',
          padding: '0 1rem',
          lineHeight: 1.1,
        }}
      >
        {messages[index]}
      </div>
    </div>
  );
}

export default RolodexMessages;
