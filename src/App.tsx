import { useRef, useState, useEffect } from 'react';

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
  const [duration, setDuration] = useState(0);

  // Native pure scroll tracking with 0 artificial physics
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    let lastScrollY = -1;

    const updateVideo = () => {
      if (!videoRef.current || duration <= 0) return;
      
      const scrollY = window.scrollY;
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
        
        const safeProgress = Math.max(0, Math.min(1, progress));
        videoRef.current.currentTime = safeProgress * duration;
      }
    };

    window.addEventListener('scroll', updateVideo, { passive: true });
    window.addEventListener('touchmove', updateVideo, { passive: true });
    window.addEventListener('wheel', updateVideo, { passive: true });

    let rafId: number;
    const loop = () => {
      updateVideo();
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', updateVideo);
      window.removeEventListener('touchmove', updateVideo);
      window.removeEventListener('wheel', updateVideo);
      cancelAnimationFrame(rafId);
    };
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
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -2,
        willChange: 'transform'
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
      
      <div ref={mainContentRef} style={{ position: 'relative', zIndex: 5, overflowX: 'hidden' }}>
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
