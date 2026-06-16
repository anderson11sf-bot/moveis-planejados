import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  // Disable parallax on mobile by checking screen size in a state, or simply use CSS/media queries.
  // Alternatively, map transforms to 0 on mobile.
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const yText = useTransform(scrollYProgress, [0, 0.5], [0, isMobile ? 0 : 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3], [1, isMobile ? 1 : 0]);

  return (
    <div className={styles.heroContainer}>
      <div className={styles.stickyWrapper}>
        <video
          className={styles.backgroundVideo}
          src="/assets/videos/hero-bg-2.mp4"
          muted
          autoPlay
          loop
          playsInline
        />
        
        <div className={styles.overlay}></div>
        
        <motion.div 
          className={styles.content}
          style={{ y: yText, opacity: opacityText }}
        >
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Design de Interiores Premium
          </motion.p>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Projetos exclusivos de móveis planejados para transformar seu ambiente.
          </motion.h1>
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Criamos ambientes sofisticados, funcionais e personalizados para sua casa.
          </motion.p>
          
          <motion.div 
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className={styles.primaryButton}>Solicitar orçamento</button>
            <button className={styles.secondaryButton}>Ver projetos</button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
