import { useRef, useState, useEffect } from 'react';

import { Hero } from './components/Hero/Hero';
import { FloatingWhatsApp } from './components/FloatingWhatsApp/FloatingWhatsApp';
import { FloatingInstagram } from './components/FloatingInstagram/FloatingInstagram';
import { Environments } from './components/Environments/Environments';
import { BeforeAfterSlider } from './components/BeforeAfterSlider/BeforeAfterSlider';
import { ProcessTimeline } from './components/ProcessTimeline/ProcessTimeline';
import { PortfolioGallery } from './components/PortfolioGallery/PortfolioGallery';
import { ContactForm } from './components/ContactForm/ContactForm';
import { Footer } from './components/Footer/Footer';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    let ticking = false;

    const updateVideo = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!videoRef.current || duration <= 0) {
            ticking = false;
            return;
          }
          const stableHeight = document.documentElement.clientHeight;
          const maxScroll = document.documentElement.scrollHeight - stableHeight;
          const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
          const targetTime = Math.max(0, Math.min(1, progress)) * duration;
          
          if (Math.abs(videoRef.current.currentTime - targetTime) > 0.04) {
            videoRef.current.currentTime = targetTime;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateVideo, { passive: true });
    return () => window.removeEventListener('scroll', updateVideo);
  }, [duration]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

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
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
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
      
      <FloatingInstagram />
      <FloatingWhatsApp />
    </>
  );
}

export default App;
