import React from 'react';
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
  return (
    <section className={styles.sectionContainer} id="portfolio">
      <div className={styles.header}>
        <h2 className={styles.title}>Portfólio</h2>
        <p className={styles.subtitle}>Uma seleção de nossos projetos mais exclusivos.</p>
      </div>

      <div className={styles.galleryGrid}>
        {projects.map((project) => {
          // Add parallax effect (alternating columns)
          return (
            <div 
              key={project.id} 
              className={`${styles.gridItem} ${project.styleClass}`}
            >
              <div className={styles.imageWrapper}>
                <ImageLoader src={project.image} alt={project.title} className={styles.image} wrapperClassName={styles.imageWrapper} />
                <div className={styles.overlay}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
