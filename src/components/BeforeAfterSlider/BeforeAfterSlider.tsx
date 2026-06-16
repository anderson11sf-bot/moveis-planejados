import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import { ImageLoader } from '../ImageLoader/ImageLoader';
import styles from './BeforeAfterSlider.module.css';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.getBoundingClientRect().width;
      setContainerWidth(width);
      x.set(width / 2); // Start in the middle
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [x]);

  const clipPath = useTransform(x, (val) => `inset(0 ${containerWidth - val}px 0 0)`);

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.header}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={styles.title}
        >
          Transformação <span className="text-gradient">Real</span>
        </motion.h2>
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className={styles.subtitle}
        >
          Deslize para ver o antes e depois do projeto
        </motion.p>
      </div>

      <div className={styles.sliderContainer} ref={containerRef}>
        {/* Before Image (Background) */}
        <div className={styles.imageWrapper}>
          <ImageLoader src={beforeImage} alt="Antes" className={styles.image} wrapperClassName={styles.imageWrapper} draggable="false" />
          <span className={styles.labelBefore}>Antes</span>
        </div>

        {/* After Image (Clipped) */}
        <motion.div className={styles.imageWrapperAfter} style={{ clipPath }}>
          <ImageLoader src={afterImage} alt="Depois" className={styles.image} wrapperClassName={styles.imageWrapperAfter} draggable="false" />
          <span className={styles.labelAfter}>Depois</span>
        </motion.div>

        {/* Drag Handle */}
        <motion.div 
          className={styles.handle}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: 0, right: containerWidth }}
          dragElastic={0}
          dragMomentum={false}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.handleLine}></div>
          <div className={styles.handleIcon}>
            <ArrowLeftRight size={20} color="#050505" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
