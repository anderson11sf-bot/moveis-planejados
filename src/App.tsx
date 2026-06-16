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

    let targetTime = 0;
    let currentTimeValue = 0;

    const updateVideo = () => {
      if (!videoRef.current || duration <= 0) return;
      // Use clientHeight instead of innerHeight to prevent massive jumps when mobile URL bar hides/shows!
      const stableHeight = document.documentElement.clientHeight;
      const maxScroll = document.documentElement.scrollHeight - stableHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      targetTime = Math.max(0, Math.min(1, progress)) * duration;
    };

    window.addEventListener('scroll', updateVideo, { passive: true });

    let rafId: number;
    const loop = () => {
      if (videoRef.current && duration > 0) {
        // Fast Lerp (30% per frame) to stabilize micro-jitters and fix "hyper-sensitivity"
        currentTimeValue += (targetTime - currentTimeValue) * 0.3;
        
        // Prevent DOM spam by only updating when change is > 0.01s
        if (Math.abs(currentTimeValue - videoRef.current.currentTime) > 0.01) {
          videoRef.current.currentTime = currentTimeValue;
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', updateVideo);
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
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2,
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
