import React, { useEffect, useState } from 'react';
import AnimatedDownArrow from './AnimatedDownArrow';

function ShowDownArrowWrapper({ replaySignal }) {
  const [show, setShow] = useState(false);
  // Listen for custom event from RolodexMessages
  useEffect(() => {
    const handler = (e) => setShow(e.detail === true);
    window.addEventListener('showDownArrow', handler);
    return () => window.removeEventListener('showDownArrow', handler);
  }, [replaySignal]);
  return show ? <AnimatedDownArrow /> : null;
}

export default ShowDownArrowWrapper;
