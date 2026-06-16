import React from 'react';
import { motion } from 'framer-motion';

import { Send, MessageCircle } from 'lucide-react';
import styles from './ContactForm.module.css';

export const ContactForm: React.FC = () => {
  const whatsappNumber = "5512983208335";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de falar sobre móveis planejados.")}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nome = formData.get('nome');
    const telefone = formData.get('telefone');
    const cidade = formData.get('cidade');
    const ambiente = formData.get('ambiente');

    const message = `Olá! Gostaria de solicitar um orçamento para móveis planejados.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Cidade:* ${cidade}\n*Ambiente:* ${ambiente}`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.container}>
        <motion.div 
          className={styles.textColumn}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Vamos transformar seu <span className="text-gradient">ambiente?</span></h2>
          <p className={styles.subtitle}>
            Preencha os dados abaixo ou fale diretamente conosco pelo WhatsApp para um atendimento imediato e exclusivo.
          </p>
          
          <button className={styles.whatsappBtn} onClick={handleWhatsAppClick}>
            <MessageCircle size={24} />
            Falar pelo WhatsApp
          </button>
        </motion.div>

        <motion.div 
          className={styles.formColumn}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Nome Completo</label>
              <input name="nome" type="text" placeholder="Como prefere ser chamado?" required />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Telefone / WhatsApp</label>
              <input name="telefone" type="tel" placeholder="(00) 00000-0000" required />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Cidade</label>
              <input name="cidade" type="text" placeholder="Onde será o projeto?" required />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Tipo de Ambiente</label>
              <select name="ambiente" required defaultValue="">
                <option value="" disabled>Selecione um ambiente...</option>
                <option value="cozinha">Cozinha Planejada</option>
                <option value="quarto">Quarto / Closet</option>
                <option value="sala">Sala de Estar / Home Theater</option>
                <option value="escritorio">Escritório / Home Office</option>
                <option value="outro">Outro / Projeto Completo</option>
              </select>
            </div>

            <button type="submit" className={styles.submitBtn}>
              <Send size={20} />
              Solicitar Orçamento
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
