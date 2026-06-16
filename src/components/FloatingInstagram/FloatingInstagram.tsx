import React from 'react';
import { motion } from 'framer-motion';
import styles from './FloatingInstagram.module.css';

export const FloatingInstagram: React.FC = () => {
  const handleClick = () => {
    window.open('https://instagram.com/sant00z', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className={styles.instagramWrapper}
      drag
      dragConstraints={{ left: -300, right: 0, top: -500, bottom: 100 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.1 
      }}
    >
      <div className={styles.iconContainer}>
        {/* Inline Instagram SVG matching lucide-react style */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </div>
      <div className={styles.ripple}></div>
    </motion.div>
  );
};
