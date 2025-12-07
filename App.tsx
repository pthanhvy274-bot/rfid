import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SLIDES } from './constants';
import { Background } from './components/Background';
import { SlideRenderer } from './components/SlideRenderer';

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for up, 1 for down
  const [isAnimating, setIsAnimating] = useState(false);

  // Debounced navigation handler
  const changeSlide = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < SLIDES.length && !isAnimating) {
      setDirection(newIndex > currentSlideIndex ? 1 : -1);
      setCurrentSlideIndex(newIndex);
      setIsAnimating(true);
      // Lock navigation briefly to allow animation to start cleanly
      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [currentSlideIndex, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        changeSlide(currentSlideIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        changeSlide(currentSlideIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, changeSlide, isAnimating]);

  // Wheel/Scroll navigation
  useEffect(() => {
    let lastScrollTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < 1000) return; // Longer throttle to prevent skipping
      
      if (Math.abs(e.deltaY) > 50) {
        lastScrollTime = now;
        if (e.deltaY > 0) {
          changeSlide(currentSlideIndex + 1);
        } else {
          changeSlide(currentSlideIndex - 1);
        }
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSlideIndex, changeSlide]);

  const handleGlobalClick = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      changeSlide(currentSlideIndex + 1);
    }
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-tech-900 text-white font-sans cursor-pointer selection:bg-tech-accent selection:text-black"
      onClick={handleGlobalClick}
    >
      <Background />

      {/* Main Slide Area */}
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={currentSlideIndex}
          custom={direction}
          initial={{ 
            y: direction > 0 ? '100%' : '-100%', 
            opacity: 0,
            scale: 0.9 
          }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: 1 
          }}
          exit={{ 
            y: direction > 0 ? '-20%' : '20%', 
            opacity: 0,
            scale: 0.95
          }}
          transition={{ 
            type: "spring", 
            stiffness: 250, 
            damping: 25, 
            mass: 1 
          }}
          className="absolute inset-0 w-full h-full shadow-2xl origin-center"
        >
           <SlideRenderer slide={SLIDES[currentSlideIndex]} />
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar (Bottom) */}
      <div className="fixed bottom-0 left-0 w-full h-1.5 bg-slate-800 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-tech-blue to-tech-accent shadow-[0_0_15px_#3b82f6]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Navigation Controls (Right Side) */}
      <div 
        className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden md:flex"
        onClick={(e) => e.stopPropagation()} // Prevent double trigger
      >
        <button 
          onClick={(e) => { e.stopPropagation(); changeSlide(currentSlideIndex - 1); }}
          disabled={currentSlideIndex === 0}
          className="p-3 rounded-full bg-slate-800/30 backdrop-blur-md border border-slate-700/50 text-white hover:bg-tech-blue hover:border-tech-blue transition-all disabled:opacity-0 disabled:hover:bg-transparent"
        >
          <ChevronUp size={24} />
        </button>
        
        {/* Dot Indicators */}
        <div className="flex flex-col gap-3 py-4 items-center">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); changeSlide(idx); }}
              className={`rounded-full transition-all duration-500 ease-out ${
                idx === currentSlideIndex 
                  ? 'bg-tech-accent w-3 h-8 shadow-[0_0_10px_#06b6d4]' 
                  : 'bg-slate-600/50 w-2 h-2 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); changeSlide(currentSlideIndex + 1); }}
          disabled={currentSlideIndex === SLIDES.length - 1}
          className="p-3 rounded-full bg-slate-800/30 backdrop-blur-md border border-slate-700/50 text-white hover:bg-tech-blue hover:border-tech-blue transition-all disabled:opacity-0 disabled:hover:bg-transparent"
        >
          <ChevronDown size={24} />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="fixed bottom-8 right-8 font-mono text-slate-500 z-40 text-sm pointer-events-none flex gap-2 items-center">
        <span className="text-white font-bold">{currentSlideIndex + 1}</span>
        <span className="h-4 w-[1px] bg-slate-700"></span>
        <span>{SLIDES.length}</span>
      </div>
      
      {/* Department/Company Label */}
      <div className="fixed top-8 right-8 z-40 pointer-events-none opacity-50">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-tech-accent rounded-full animate-pulse"></div>
           <span className="font-bold text-slate-300 text-xs tracking-[0.2em] uppercase">Smart Warehouse QC Group</span>
        </div>
      </div>
    </div>
  );
}

export default App;