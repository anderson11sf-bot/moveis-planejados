import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import styles from './FloatingWhatsApp.module.css';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    // Open WhatsApp only if it's a real click, not a drag release.
    // Framer motion's drag handles this reasonably well natively,
    // but we can ensure standard behavior.
    window.open('https://wa.me/5512983208335?text=' + encodeURIComponent('Olá! Gostaria de falar sobre móveis planejados.'), '_blank');
  };

  return (
    <motion.div
      className={styles.whatsappWrapper}
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1 
      }}
    >
      <div className={styles.iconContainer}>
        <MessageCircle size={32} color="#FFFFFF" strokeWidth={2.5} />
      </div>
      <div className={styles.ripple}></div>
    </motion.div>
  );
};
