import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandColumn}>
          <h2 className={styles.brandName}>Móveis <span className="text-gradient">Planejados</span></h2>
          <p className={styles.brandDesc}>
            Transformando ambientes em experiências únicas de alto padrão desde 2010.
          </p>
        </div>

        <div className={styles.linksColumn}>
          <h3>Contato</h3>
          <ul>
            <li>
              <Phone size={18} />
              <span>(12) 98320-8335</span>
            </li>
            <li>
              <Mail size={18} />
              <span>contato@moveisplanejados.com.br</span>
            </li>
            <li>
              <a href="https://instagram.com/sant00z" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>
                <span>@sant00z</span>
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.addressColumn}>
          <h3>Endereço</h3>
          <ul>
            <li>
              <MapPin size={18} className={styles.iconTop} />
              <span>
                Av. Paulista, 1000 - Bela Vista<br />
                São Paulo - SP, 01310-100<br />
                Brasil
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Móveis Planejados Premium. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
