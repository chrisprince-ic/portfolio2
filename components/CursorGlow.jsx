'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <motion.div
      className="cursor-glow fixed top-0 left-0 z-40"
      animate={{
        x: position.x - 40,
        y: position.y - 40,
        scale: isPressed ? 0.9 : 1,
        opacity: 0.4,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
    >
      <div className="h-20 w-20 rounded-full bg-teal-400/18 blur-2xl" />
    </motion.div>
  );
};

export default CursorGlow;


