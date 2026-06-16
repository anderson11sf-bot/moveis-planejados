import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, PenTool, Hammer, CheckCircle } from 'lucide-react';
import styles from './ProcessTimeline.module.css';

const steps = [
  {
    id: 1,
    title: 'Atendimento',
    desc: 'Compreendemos suas necessidades, estilo de vida e expectativas em uma consultoria exclusiva.',
    icon: <MessageSquare size={24} />
  },
  {
    id: 2,
    title: 'Projeto',
    desc: 'Nossos designers criam modelagens 3D hiper-realistas para visualização perfeita do ambiente.',
    icon: <PenTool size={24} />
  },
  {
    id: 3,
    title: 'Produção',
    desc: 'Fabricação com maquinário de alta precisão alemã e materiais premium.',
    icon: <Hammer size={24} />
  },
  {
    id: 4,
    title: 'Instalação',
    desc: 'Montagem impecável realizada por especialistas, com limpeza e acabamento finais.',
    icon: <CheckCircle size={24} />
  }
];

export const ProcessTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className={styles.sectionContainer} ref={containerRef}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Nosso <span className="text-gradient">Processo</span>
        </h2>
        <p className={styles.subtitle}>
          Do primeiro contato à entrega das chaves.
        </p>
      </div>

      <div className={styles.timelineWrapper}>
        <div className={styles.lineBackground}></div>
        <motion.div className={styles.lineFill} style={{ height: lineHeight }}></motion.div>

        {steps.map((step) => (
          <div key={step.id} className={styles.stepContainer}>
            <div className={styles.stepNumber}>0{step.id}</div>
            <div className={styles.iconWrapper}>
              {step.icon}
            </div>
            <div className={styles.contentCard}>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
