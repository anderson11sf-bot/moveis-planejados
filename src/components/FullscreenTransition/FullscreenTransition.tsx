import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export const FullscreenTransition: React.FC<{ onTransitionComplete: (completed: boolean) => void }> = ({ onTransitionComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale from 0 to 1 as it enters the screen, keeping it fixed using position sticky
  const scaleY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Notify when the curtain has fully covered the screen (around 0.5)
    // so the background video can start loading/playing.
    if (latest > 0.45) {
      onTransitionComplete(true);
    } else {
      onTransitionComplete(false);
    }
  });

  return (
    <div ref={containerRef} style={{ height: '200vh', width: '100%', position: 'relative', zIndex: 9999 }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#050505',
            scaleY,
            opacity,
            transformOrigin: 'bottom'
          }}
        >
          {/* Cinematographic Overlay Content */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            color: '#C5A880', fontSize: '2rem', fontFamily: 'var(--font-serif)', letterSpacing: '4px',
            textAlign: 'center'
          }}>
            Descubra o Novo Padrão
          </div>
        </motion.div>
      </div>
    </div>
  );
};
