import { useRef } from 'react';

import { Hero } from './components/Hero/Hero';
import { FloatingWhatsApp } from './components/FloatingWhatsApp/FloatingWhatsApp';
import { Environments } from './components/Environments/Environments';
import { BeforeAfterSlider } from './components/BeforeAfterSlider/BeforeAfterSlider';
import { ProcessTimeline } from './components/ProcessTimeline/ProcessTimeline';
import { PortfolioGallery } from './components/PortfolioGallery/PortfolioGallery';
import { ContactForm } from './components/ContactForm/ContactForm';
import { Footer } from './components/Footer/Footer';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  // No artificial scroll tracking. The video will just play normally in the background.

  return (
    <>
      {/* GLOBAL FIXED BACKGROUND VIDEO */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2
      }}>
        <video
          ref={videoRef}
          src="/assets/videos/scroll-bg-optimized.mp4"
          muted
          autoPlay
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Dark Glass Overlay (Blur removed to prevent GPU throttling during scroll on mobile) */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0, 0, 0, 0.65)'
        }}></div>
      </div>

      <Hero />
      
      <div ref={mainContentRef} style={{ position: 'relative', zIndex: 5 }}>
        <Environments />
        
        <BeforeAfterSlider 
          beforeImage="/assets/images/before-room.png" 
          afterImage="/assets/images/living.jpeg" 
        />
        
        <ProcessTimeline />

        <PortfolioGallery />

        <ContactForm />
        
        <Footer />
      </div>
      
      <FloatingWhatsApp />
    </>
  );
}

export default App;
