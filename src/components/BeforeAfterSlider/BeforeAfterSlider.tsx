import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import { ImageLoader } from '../ImageLoader/ImageLoader';
import styles from './BeforeAfterSlider.module.css';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  useEffect(() => {
    // Keep empty dependency to maintain logic structure
  }, []);

  const clipPath = `${sliderPosition}%`;

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
        <div className={styles.imageWrapperAfter} style={{ clipPath: `inset(0 0 0 ${clipPath})` }}>
          <ImageLoader src={afterImage} alt="Depois" className={styles.image} wrapperClassName={styles.imageWrapperAfter} draggable="false" />
          <span className={styles.labelAfter}>Depois</span>
        </div>

        {/* Native Range Input Handle for 100% bug-free mobile swipe */}
        <input 
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'ew-resize',
            zIndex: 20
          }}
        />

        <div 
          className={styles.sliderHandle}
          style={{ left: `${sliderPosition}%` }}
        >
          <div className={styles.handleLine}></div>
          <div className={styles.handleButton}>
            <ArrowLeftRight size={16} color="#050505" />
          </div>
        </div>
      </div>
    </section>
  );
};
