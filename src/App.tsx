import { useRef, useState, useEffect } from 'react';
import Lenis from 'lenis';

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

  // Lenis Hijacked Scroll to guarantee frame-perfect video sync
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true, // Crucial: Hijack mobile touch to bypass browser video throttling
      touchMultiplier: 2.5,
    });

    lenis.on('scroll', (e: any) => {
      if (!videoRef.current || duration <= 0) return;
      const progress = e.progress; // Direct 0 to 1 progress from Lenis
      const safeProgress = Math.max(0, Math.min(1, progress));
      videoRef.current.currentTime = safeProgress * duration;
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
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
