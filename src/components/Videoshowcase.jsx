'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../css/videoshowcase.module.css';

const Videoshowcase = ({ autoplay = true, muted = true, loop = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !videoRef.current) return;

    const video = videoRef.current;
    
    // Set video properties
    video.muted = isMuted;
    video.loop = loop;
    
    // Auto play if enabled
    if (autoplay) {
      const playVideo = async () => {
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented:', error);
          // Autoplay was prevented, user interaction required
        }
      };
      
      if (video.readyState >= 3) {
        playVideo();
      } else {
        video.addEventListener('canplay', playVideo, { once: true });
      }
    }

    return () => {
      if (video) {
        video.removeEventListener('canplay', () => {});
      }
    };
  }, [mounted, autoplay, isMuted, loop]);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
      });
    };

    const throttle = (func, limit) => {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };

    const handleScrollThrottled = throttle(handleScroll, 16);
    const handleMouseThrottled = throttle(handleMouseMove, 32);

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseThrottled, { passive: true });
    }
    
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseThrottled);
      }
    };
  }, [mounted]);

  // Video event handlers
  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    
    try {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        await video.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing/pausing video:', error);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const newMutedState = !isMuted;
    video.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    setIsLoaded(true);
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Parallax calculations
  const parallaxOffset = Math.min(scrollY * 0.2, 100);
  const mouseParallaxX = mousePosition.x * 15;
  const mouseParallaxY = mousePosition.y * 10;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!mounted) {
    return (
      <section className={styles.videoSection}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.videoSection} ref={sectionRef}>
      {/* Artistic Background Elements */}
      <div className={styles.backgroundElements}>
        <div 
          className={styles.backgroundLayer}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.05}px, ${parallaxOffset + mouseParallaxY * 0.03}px, 0)`
          }}
        />
        <div 
          className={styles.floatingElements}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.02}px, ${parallaxOffset * 0.4}px, 0)`
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div 
              key={i}
              className={styles.floatingOrb}
              style={{
                '--delay': `${i * 0.8}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--duration': `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.headerContent}>
          <div className={styles.titleBadge}>
            <span>Behind the Craft</span>
          </div>
          
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleMain}>Our Story</span>
          </h2>
          
          <p className={styles.sectionDescription}>
            Journey into the heart of Seven Sisters, where tradition meets innovation
          </p>
        </div>
      </div>

      {/* Full-Width Video Container */}
      <div className={styles.videoContainer}>
        {/* Video Player */}
        <div className={`${styles.videoPlayer} ${!isLoaded ? styles.loading : ''}`}>
          <video
            ref={videoRef}
            className={styles.video}
            muted={isMuted}
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onCanPlay={() => setIsLoaded(true)}
          >
            <source src="/company-video.mp4" type="video/mp4" />
            <source src="/company-video.webm" type="video/webm" />
            <track kind="captions" src="/company-video-captions.vtt" srcLang="en" label="English" />
            Your browser does not support the video tag.
          </video>

          {/* Loading Overlay */}
          {!isLoaded && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading video...</p>
            </div>
          )}

          {/* Video Overlay */}
          <div className={styles.videoOverlay}>
            {/* Play/Pause Button */}
            <div className={styles.centerControls}>
              <button 
                className={styles.playButton} 
                onClick={handlePlayPause}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className={styles.bottomControls}>
              <div className={styles.progressContainer}>
                <div 
                  className={styles.progressBar} 
                  onClick={handleProgressClick}
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={progress}
                  aria-label="Video progress"
                >
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                  >
                    <div className={styles.progressThumb}></div>
                  </div>
                </div>
              </div>

              <div className={styles.controlsRow}>
                <div className={styles.leftControls}>
                  <button 
                    className={styles.controlButton} 
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  <button 
                    className={styles.controlButton} 
                    onClick={handleMuteToggle}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </button>

                  <div className={styles.timeDisplay}>
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videoshowcase;
