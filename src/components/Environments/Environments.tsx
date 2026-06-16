import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ImageLoader } from '../ImageLoader/ImageLoader';
import styles from './Environments.module.css';

const categories = [
  {
    id: 'cozinhas',
    label: 'Cozinhas Planejadas',
    image: '/assets/images/kitchen.jpeg',
    desc: 'O coração da casa, projetado com inteligência, ergonomia e acabamentos de altíssimo padrão.'
  },
  {
    id: 'quartos',
    label: 'Quartos Planejados',
    image: '/assets/images/bedroom.jpeg',
    desc: 'Seu refúgio particular. Conforto absoluto com otimização milimétrica de espaço.'
  },
  {
    id: 'closets',
    label: 'Closets',
    image: '/assets/images/closet.jpeg',
    desc: 'Exposição elegante e organização impecável para suas peças mais valiosas.'
  },
  {
    id: 'escritorios',
    label: 'Escritórios',
    image: '/assets/images/office.jpeg',
    desc: 'Produtividade encontra luxo em ambientes corporativos desenhados para inspirar.'
  },
  {
    id: 'salas',
    label: 'Salas',
    image: '/assets/images/living.jpeg',
    desc: 'Recepção em grande estilo. Painéis e racks integrados com perfeição à sua arquitetura.'
  }
];

export const Environments: React.FC = () => {
  const [activeTab, setActiveTab] = useState(categories[0].id);

  const activeCategory = categories.find(c => c.id === activeTab)!;

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = offset.x;
    if (swipe < -50) {
      // Swipe left (next)
      const currentIndex = categories.findIndex(c => c.id === activeTab);
      const nextIndex = (currentIndex + 1) % categories.length;
      setActiveTab(categories[nextIndex].id);
    } else if (swipe > 50) {
      // Swipe right (prev)
      const currentIndex = categories.findIndex(c => c.id === activeTab);
      const prevIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
      setActiveTab(categories[prevIndex].id);
    }
  };

  return (
    <section className={styles.container} id="ambientes">
      <div className={styles.header}>
        <h2 className={styles.title}>Ambientes</h2>
        <p className={styles.subtitle}>Explore nossas soluções sob medida para cada espaço do seu lar.</p>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.tabBtn} ${activeTab === cat.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
              {activeTab === cat.id && (
                <motion.div 
                  layoutId="activeIndicator"
                  className={styles.activeIndicator} 
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className={styles.displayArea}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={styles.imageWrapper}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <ImageLoader src={activeCategory.image} alt={activeCategory.label} className={styles.image} wrapperClassName={styles.imageWrapper} />
              
              <div className={styles.imageOverlay}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className={styles.cardInfo}
                >
                  <h3>{activeCategory.label}</h3>
                  <p>{activeCategory.desc}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
