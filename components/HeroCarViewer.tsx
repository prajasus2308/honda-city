import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarColor } from '../types';
import { ChevronLeft, ChevronRight, Rotate3d, ZoomIn, Armchair, CarFront, ImageOff } from 'lucide-react';

interface HeroCarViewerProps {
  selectedColor: CarColor;
  autoRotateSpeed?: number;
}

// Using 1056x594 resolution which is more reliable for gallery images
// Cleaned up to ensure smooth rotation (removed disjointed static shots)
const EXTERIOR_ANGLES = [
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-front-view.jpeg?q=75",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-right-front-three-quarter-77.jpeg?q=75",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-right-side-view.jpeg?q=75",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-right-rear-three-quarter.jpeg?q=75",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-rear-view.jpeg?q=75",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-left-rear-three-quarter.jpeg?q=75",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-left-side-view.jpeg?q=75",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-left-front-three-quarter.jpeg?q=75",
  "https://www.hondacarindia.com/web-data/models/2023/city5thGen/Honda%20sensing/Honda%20sensing_city5g%20blue_ehev_desktop.mp4"
];

// Cleaned up Interior Images - Only reliable views
const INTERIOR_ANGLES = [
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-interior-dashboard.jpeg?q=75",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-interior-steering-wheel.jpeg?q=75",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-interior-rear-seats.jpeg?q=75",
  "https://stimg.cardekho.com/images/carinteriorimages/930x620/Honda/City/12667/1750411188904/dashboard-59.jpg",
  "https://stimg.cardekho.com/images/carinteriorimages/930x620/Honda/City/12667/1750411188904/door-controls-40.jpg",
  "https://stimg.cardekho.com/images/carinteriorimages/930x620/Honda/City/12667/1750411188904/ac-vents-on-side-pillar-195.jpg",
  "https://imgd.aeplcdn.com/642x361/n/cw/ec/176747/honda-city-gear-shifter-gear-shifter-stalk3.jpeg?isig=0&wm=1&q=75"
];

export const HeroCarViewer: React.FC<HeroCarViewerProps> = ({ selectedColor, autoRotateSpeed = 0 }) => {
  const [viewMode, setViewMode] = useState<'EXTERIOR' | 'INTERIOR'>('EXTERIOR');
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const activeImages = viewMode === 'EXTERIOR' ? EXTERIOR_ANGLES : INTERIOR_ANGLES;

  // Reset angle when switching modes
  useEffect(() => {
    setCurrentAngle(0);
    setImageError(false);
    setIsLoading(true);
  }, [viewMode]);

  // Auto rotate / Slideshow logic
  useEffect(() => {
    if (isDragging || isZoomed) return;
    
    const isInterior = viewMode === 'INTERIOR';
    
    if (autoRotateSpeed <= 0) return;

    const intervalTime = isInterior 
      ? 4000 
      : Math.max(800, 6000 - (autoRotateSpeed * 1000));

    const interval = setInterval(() => {
      setIsLoading(true);
      setCurrentAngle(prev => (prev + 1) % activeImages.length);
      setImageError(false); // Reset error state for new image
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [autoRotateSpeed, isDragging, isZoomed, activeImages.length, viewMode]);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || isZoomed) return;
    const diff = startX - clientX;
    const threshold = 50; 

    if (Math.abs(diff) > threshold) {
      setIsLoading(true);
      if (diff > 0) {
        // Drag left -> Next
        setCurrentAngle(prev => (prev + 1) % activeImages.length);
      } else {
        // Drag right -> Prev
        setCurrentAngle(prev => (prev - 1 + activeImages.length) % activeImages.length);
      }
      setStartX(clientX);
      setImageError(false);
    }
  };

  const handleEnd = () => setIsDragging(false);

  const toggleViewMode = () => {
    setIsLoading(true);
    setViewMode(prev => prev === 'EXTERIOR' ? 'INTERIOR' : 'EXTERIOR');
  };

  const handleManualNext = () => {
    setIsLoading(true);
    setCurrentAngle(prev => (prev + 1) % activeImages.length);
    setImageError(false);
  };

  const handleManualPrev = () => {
    setIsLoading(true);
    setCurrentAngle(prev => (prev - 1 + activeImages.length) % activeImages.length);
    setImageError(false);
  };

  return (
    <div 
      className={`w-full h-full relative flex items-center justify-center overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-grab active:cursor-grabbing'}`}
      onMouseDown={(e) => !isZoomed && handleStart(e.clientX)}
      onMouseMove={(e) => !isZoomed && handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => !isZoomed && handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => !isZoomed && handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-0 pointer-events-none" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] blur-[100px] opacity-30 z-0 transition-colors duration-700"
        style={{ backgroundColor: selectedColor.hex }}
      />

      {/* Main Image Container */}
      <div className={`relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full h-full flex items-center justify-center p-4 md:p-12 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
        <AnimatePresence mode='wait'>
          {!imageError ? (
            <React.Fragment key={`${viewMode}-${currentAngle}`}>
              {/* Loading Indicator */}
              {isLoading && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                 >
                    <div className="relative">
                      <div className="w-16 h-16 border-2 border-neon-blue/30 rounded-full animate-[spin_3s_linear_infinite]" />
                      <div className="absolute inset-0 border-t-2 border-neon-blue rounded-full animate-spin" />
                      <div className="absolute inset-4 border-2 border-white/20 rounded-full animate-pulse" />
                    </div>
                 </motion.div>
              )}
              
              <motion.img 
                src={activeImages[currentAngle]}
                alt={`Honda City ${viewMode} View`}
                // Start invisible, fade in when loaded (isLoading becomes false)
                initial={viewMode === 'INTERIOR' ? { opacity: 0, scale: 0.96 } : { opacity: 0, x: 20 }}
                animate={isLoading ? { opacity: 0 } : { opacity: 1, x: 0, scale: 1 }}
                exit={viewMode === 'INTERIOR' ? { opacity: 0, scale: 1.04 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className={`max-w-full max-h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] select-none pointer-events-none ${
                  viewMode === 'INTERIOR' ? 'rounded-lg shadow-2xl' : ''
                }`}
                draggable={false}
                onLoad={() => setIsLoading(false)}
                onError={() => { setImageError(true); setIsLoading(false); }}
              />
            </React.Fragment>
          ) : (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-64 flex flex-col items-center justify-center text-gray-500 bg-white/5 rounded-lg backdrop-blur-sm p-12 border border-white/10"
            >
               <ImageOff size={48} className="mb-4 opacity-50" />
               <p className="font-display tracking-widest text-xs uppercase">Image Unavailable</p>
               <p className="text-[10px] text-gray-600 mt-2">{activeImages[currentAngle].split('/').pop()}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Ground Reflection Simulation (Exterior Only) */}
        {viewMode === 'EXTERIOR' && !imageError && !isLoading && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-black/60 blur-3xl rounded-[100%] scale-y-50 pointer-events-none" 
           />
        )}
      </div>

      {/* Controls Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        
        {/* View Switcher Button */}
        <div className="absolute top-24 md:top-32 right-4 md:right-10 pointer-events-auto z-30">
          <button
            onClick={toggleViewMode}
            className={`flex items-center gap-3 px-6 py-3 backdrop-blur-md border rounded-full text-white transition-all group shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
              viewMode === 'INTERIOR' 
              ? 'bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.4)]' 
              : 'bg-black/40 border-white/20 hover:bg-neon-blue hover:text-black hover:border-neon-blue'
            }`}
          >
            {viewMode === 'EXTERIOR' ? <Armchair size={20} /> : <CarFront size={20} />}
            <span className="font-display text-sm tracking-wider font-bold">
              {viewMode === 'EXTERIOR' ? 'VIEW INTERIOR' : 'VIEW EXTERIOR'}
            </span>
          </button>
        </div>

        {/* 360/Gallery Indicator */}
        {!isZoomed && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up">
            <div className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.3)]">
               <Rotate3d className={`text-neon-blue w-6 h-6 ${autoRotateSpeed > 0 ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
            </div>
            <span className="text-[10px] text-neon-blue uppercase tracking-[0.2em] font-display">
              {viewMode === 'EXTERIOR' ? 'Drag to Rotate' : 'Interior Gallery'}
            </span>
          </div>
        )}

        {/* Zoom Toggle */}
        <button 
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-1/2 right-4 md:right-10 pointer-events-auto p-3 rounded-full bg-black/40 border border-white/10 hover:bg-neon-blue hover:text-black hover:border-neon-blue transition-all group"
        >
          <ZoomIn className={`w-6 h-6 transition-transform ${isZoomed ? 'rotate-180' : ''}`} />
        </button>

        {/* Manual Navigation Arrows */}
        {!isZoomed && (
          <>
            <button 
              className="absolute top-1/2 left-4 md:left-10 -translate-y-1/2 pointer-events-auto p-4 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
              onClick={handleManualPrev}
            >
              <ChevronLeft size={40} />
            </button>
            <button 
              className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 pointer-events-auto p-4 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
              onClick={handleManualNext}
            >
              <ChevronRight size={40} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};