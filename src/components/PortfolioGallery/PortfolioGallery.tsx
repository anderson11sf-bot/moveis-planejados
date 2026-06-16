import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageLoader } from '../ImageLoader/ImageLoader';
import styles from './PortfolioGallery.module.css';

const projects = [
  {
    id: 1,
    image: '/assets/images/gourmet.jpeg',
    title: 'Área Gourmet',
    styleClass: styles.tall
  },
  {
    id: 2,
    image: '/assets/images/bedroom.jpeg',
    title: 'Quarto Master',
    styleClass: styles.wide
  },
  {
    id: 3,
    image: '/assets/images/kitchen.jpeg',
    title: 'Cozinha Natural',
    styleClass: styles.regular
  },
  {
    id: 4,
    image: '/assets/images/closet.jpeg',
    title: 'Closet Iluminado',
    styleClass: styles.tall
  },
  {
    id: 5,
    image: '/assets/images/office.jpeg',
    title: 'Home Office',
    styleClass: styles.wide
  }
];

export const PortfolioGallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = '';
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? projects.length - 1 : (prev as number) - 1
      );
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => 
        prev === projects.length - 1 ? 0 : (prev as number) + 1
      );
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex]);

  return (
    <section className={styles.sectionContainer} id="portfolio">
      <div className={styles.header}>
        <h2 className={styles.title}>Portfólio</h2>
        <p className={styles.subtitle}>Uma seleção de nossos projetos mais exclusivos.</p>
      </div>

      <div className={styles.galleryGrid}>
        {projects.map((project, index) => {
          return (
            <motion.div 
              key={project.id} 
              className={`${styles.projectItem} ${project.styleClass}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.6, delay: project.id * 0.1 }}
              onClick={() => handleOpen(index)}
            >
              <div className={styles.imageWrapper}>
                <ImageLoader src={project.image} alt={project.title} className={styles.image} wrapperClassName={styles.imageWrapper} />
                <div className={styles.overlay}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* The Dark Glass tabletop layer (acts as reflections and tint over wood) */}
            <div className={styles.glassTabletop}></div>

            {/* Close button */}
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Fechar galeria">
              <X size={28} />
            </button>

            {/* Left navigation arrow (Desktop only) */}
            <button className={styles.navBtnLeft} onClick={handlePrev} aria-label="Imagem anterior">
              <ChevronLeft size={36} />
            </button>

            {/* Center card wrapper */}
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Swipe-enabled image card */}
              <motion.div
                key={selectedImageIndex}
                className={styles.imageCard}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_event, info) => {
                  const threshold = 50;
                  if (info.offset.x < -threshold) {
                    handleNext();
                  } else if (info.offset.x > threshold) {
                    handlePrev();
                  }
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <img
                  src={projects[selectedImageIndex].image}
                  alt={projects[selectedImageIndex].title}
                  className={styles.lightboxImage}
                  draggable="false"
                />
                <div className={styles.lightboxCaption}>
                  <h3>{projects[selectedImageIndex].title}</h3>
                  <span>{selectedImageIndex + 1} / {projects.length}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right navigation arrow (Desktop only) */}
            <button className={styles.navBtnRight} onClick={handleNext} aria-label="Próxima imagem">
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
