import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { SlideContent, SlideType } from '../types';
import { ComparisonChart } from './ComparisonChart';
import { PDCABadge } from './PDCABadge';

interface Props {
  slide: SlideContent;
}

// -- Animation Utilities --

// Counting Number Component
const AnimatedCounter = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const spring = useSpring(0, { bounce: 0, duration: 2000 });
  const displayValue = useTransform(spring, (current) => Math.round(current));
  
  useEffect(() => {
    spring.set(numericValue);
  }, [numericValue, spring]);

  return (
    <span className="flex items-baseline">
      <motion.span>{displayValue}</motion.span>
      <span className="text-4xl md:text-7xl ml-2">{suffix}</span>
    </span>
  );
};

// -- Variants --

const containerStagger = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.3 } 
  }
};

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 15 } 
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 10 } 
  }
};

const timelineLineVariant = {
  hidden: { height: 0 },
  visible: { height: '100%', transition: { duration: 1.5, ease: "easeInOut" } }
};

export const SlideRenderer: React.FC<Props> = ({ slide }) => {
  const Icon = slide.icon;

  const renderContent = () => {
    switch (slide.type) {
      case SlideType.COVER:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 relative z-10">
            {/* Ambient Pulse Behind Logo */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-[600px] h-[600px] bg-tech-blue/10 rounded-full blur-3xl -z-10"
            />

            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 20, duration: 1.5 }}
              className="mb-12 p-8 rounded-2xl bg-slate-900/50 border border-tech-blue/40 shadow-[0_0_60px_rgba(59,130,246,0.2)] backdrop-blur-md relative overflow-hidden group"
            >
              {/* Scan effect inside logo box */}
              <motion.div 
                 className="absolute inset-0 bg-gradient-to-b from-transparent via-tech-blue/10 to-transparent w-full h-full"
                 animate={{ top: ['-100%', '100%'] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-tech-blue to-blue-700 flex items-center justify-center shadow-inner">
                 <svg className="w-16 h-16 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400 mb-10 tracking-tight drop-shadow-sm leading-tight max-w-6xl">
                {slide.title}
              </h1>
            </motion.div>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-2xl md:text-4xl text-tech-accent font-light mb-20 tracking-wide"
            >
              {slide.subtitle}
            </motion.p>
            
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="px-10 py-4 border border-slate-700 rounded-full bg-slate-800/40 backdrop-blur-sm text-slate-200 flex items-center gap-4 text-xl">
                 <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                 {slide.highlight}
              </div>
            </motion.div>
          </div>
        );

      // New Timeline View for PROCESS slides
      case SlideType.PROCESS:
        return (
           <div className="flex flex-col h-full justify-center max-w-6xl mx-auto w-full relative pl-4 md:pl-0">
             <motion.div 
               initial={{ x: -50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="mb-14 pl-12"
             >
               <h2 className="text-6xl font-bold text-white mb-4 flex items-center gap-6">
                 {Icon && <div className="p-3 bg-tech-blue/20 rounded-lg"><Icon className="text-tech-blue w-10 h-10"/></div>}
                 {slide.title}
               </h2>
               {slide.subtitle && <p className="text-2xl text-slate-400 font-light pl-2">{slide.subtitle}</p>}
             </motion.div>

             <div className="relative pl-12">
               {/* Timeline Line */}
               <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-slate-700"></div>
               <motion.div 
                 variants={timelineLineVariant}
                 initial="hidden"
                 animate="visible"
                 className="absolute left-[23px] top-6 w-0.5 bg-gradient-to-b from-tech-accent via-tech-blue to-purple-500 origin-top shadow-[0_0_10px_#3b82f6]"
               />

               <motion.div 
                 variants={containerStagger}
                 initial="hidden"
                 animate="visible"
                 className="space-y-12"
               >
                 {slide.points?.map((point, idx) => {
                   const parts = point.split('：');
                   const title = parts.length > 1 ? parts[0] : `STEP 0${idx + 1}`;
                   const content = parts.length > 1 ? parts[1] : point;

                   return (
                     <motion.div key={idx} variants={fadeInUp} className="relative group">
                       {/* Timeline Node */}
                       <div className="absolute -left-[32px] top-2 w-7 h-7 rounded-full bg-slate-900 border-2 border-tech-accent z-10 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                         <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1.5 left-1.5"></div>
                       </div>
                       
                       {/* Card */}
                       <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/60 hover:border-tech-blue/30 transition-all duration-300 ml-8">
                         <h3 className="text-2xl font-bold text-tech-accent mb-2">{title}</h3>
                         <p className="text-2xl text-slate-200 leading-relaxed">{content}</p>
                       </div>
                     </motion.div>
                   )
                 })}
               </motion.div>
             </div>
           </div>
        );

      case SlideType.CHART:
        return (
          <div className="flex flex-col h-full justify-center max-w-6xl mx-auto w-full">
            <div className="mb-10 pl-4">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center gap-6">
                {Icon && <Icon className="text-tech-accent w-12 h-12" />}
                {slide.title}
              </h2>
              {slide.subtitle && <p className="text-3xl text-slate-400">{slide.subtitle}</p>}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-b from-slate-800/30 to-slate-900/30 p-6 md:p-10 rounded-3xl border border-slate-700/50 backdrop-blur-md shadow-2xl"
            >
              {slide.chartData && <ComparisonChart data={slide.chartData} />}
            </motion.div>
            
            <motion.div 
              variants={containerStagger}
              initial="hidden"
              animate="visible"
              className="mt-12 flex flex-col md:flex-row gap-8 justify-center"
            >
              {slide.points?.map((point, idx) => (
                 <motion.div 
                    key={idx} 
                    variants={scaleIn} 
                    className="flex-1 bg-slate-800/60 px-8 py-6 rounded-2xl border border-slate-600/50 shadow-lg text-center"
                 >
                   <p className="text-2xl font-medium text-slate-200">
                     {point.includes(':') ? (
                       <>
                         <span className="text-tech-blue font-bold block mb-2 text-3xl">{point.split(':')[0]}</span>
                         <span className="text-xl text-slate-400">{point.split(':')[1]}</span>
                       </>
                     ) : point}
                   </p>
                 </motion.div>
              ))}
            </motion.div>
          </div>
        );

      case SlideType.BIG_NUMBER:
        // Extract numeric part for animation
        const numMatch = slide.highlight?.match(/(\d+)(.*)/);
        const numValue = numMatch ? numMatch[1] : "0";
        const numSuffix = numMatch ? numMatch[2] : "";

        return (
          <div className="flex flex-col h-full justify-center items-center max-w-7xl mx-auto text-center w-full">
             <motion.div
               initial={{ scale: 0, rotate: -45 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ type: "spring", stiffness: 200, damping: 20 }}
               className="mb-10 p-8 bg-slate-800 rounded-full border border-slate-600"
             >
               {Icon && <Icon className="w-20 h-20 text-tech-accent" />}
             </motion.div>
             
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-4xl md:text-6xl font-bold text-slate-200 mb-20"
             >
               {slide.title}
             </motion.h2>

             <div className="flex flex-col md:flex-row gap-16 items-center w-full px-4">
               {/* Animated Counter Card */}
               <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex-1 w-full p-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] border border-tech-blue/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col items-center justify-center min-h-[350px]"
                >
                  <span className="text-tech-blue font-semibold tracking-wider mb-6 uppercase text-base">Target Efficiency</span>
                  <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 flex items-center justify-center">
                    <AnimatedCounter value={numValue} suffix={numSuffix} />
                  </div>
                  <span className="text-slate-400 mt-8 font-light border-t border-slate-700 pt-6 w-full text-center text-xl">{slide.subtitle}</span>
               </motion.div>

               {/* Points List */}
               <motion.ul 
                 variants={containerStagger}
                 initial="hidden"
                 animate="visible"
                 className="flex-1 space-y-8 text-left w-full"
               >
                 {slide.points?.map((point, idx) => (
                   <motion.li 
                      key={idx} 
                      variants={fadeInUp} 
                      className="flex items-center gap-8 p-6 rounded-2xl hover:bg-slate-800/30 transition-colors"
                   >
                     <div className="w-16 h-16 rounded-full bg-tech-blue/10 flex items-center justify-center text-tech-blue border border-tech-blue/20 shrink-0 text-2xl font-bold">
                        {idx + 1}
                     </div>
                     <span className="text-2xl text-slate-200 leading-relaxed font-light">{point}</span>
                   </motion.li>
                 ))}
               </motion.ul>
             </div>
          </div>
        );

      case SlideType.SPLIT:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 h-full items-center max-w-[90%] mx-auto w-full px-6">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <div className="mt-8">
                <motion.div 
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-6 mb-10"
                >
                  <div className="p-4 bg-gradient-to-br from-tech-blue to-purple-600 rounded-xl shadow-lg">
                    {Icon && <Icon className="w-10 h-10 text-white" />}
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">{slide.title}</h2>
                </motion.div>
                
                {slide.subtitle && (
                   <motion.p 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     transition={{ delay: 0.3 }}
                     className="text-3xl text-slate-400 mb-12 font-light pl-6 border-l-4 border-tech-accent"
                   >
                     {slide.subtitle}
                   </motion.p>
                )}

                <motion.div
                  variants={containerStagger}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                   {slide.points?.map((point, idx) => {
                      const [bold, rest] = point.split('：');
                      return (
                        <motion.div key={idx} variants={fadeInUp} className="flex gap-6 group">
                          <div className="mt-2.5 w-3 h-3 rounded-full bg-tech-accent group-hover:shadow-[0_0_12px_#06b6d4] transition-shadow shrink-0"></div>
                          <div className="flex-1">
                            {rest ? (
                              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                                <strong className="text-white font-semibold text-2xl md:text-3xl">{bold}：</strong>{rest}
                              </p>
                            ) : (
                              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">{point}</p>
                            )}
                          </div>
                        </motion.div>
                      )
                   })}
                </motion.div>
              </div>
            </div>

            {/* Visual Side (Right) - 3D Card Effect */}
            <motion.div 
              initial={{ opacity: 0, x: 100, rotateY: 30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
              className="order-1 md:order-2 h-full max-h-[600px] flex items-center justify-center perspective-1000"
            >
              <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] border border-slate-700 p-12 shadow-2xl flex flex-col items-center justify-center group overflow-hidden">
                 {/* Decorative Background Elements */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute -right-20 -top-20 w-80 h-80 bg-tech-blue/5 rounded-full blur-3xl"
                 />
                 
                 <Icon className="w-48 h-48 text-slate-700/50 absolute bottom-8 right-8" />
                 
                 {/* Main Icon Focus */}
                 <motion.div 
                   animate={{ y: [0, -15, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="relative z-10"
                 >
                    {Icon && <Icon className="w-56 h-56 text-tech-accent drop-shadow-[0_0_40px_rgba(6,182,212,0.4)]" />}
                 </motion.div>

                 <div className="absolute bottom-12 left-0 w-full text-center">
                    <p className="text-lg text-slate-500 tracking-[0.4em] uppercase">Visual Representation</p>
                 </div>
              </div>
            </motion.div>
          </div>
        );

      // Default Content
      default:
        return (
          <div className="flex flex-col h-full justify-center max-w-6xl mx-auto w-full relative">
            <motion.div 
               initial={{ y: -30, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6 }}
               className="mb-14 mt-16 pl-2"
            >
              <div className="flex items-center gap-6 mb-6">
                {Icon && <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-lg"><Icon className="w-12 h-12 text-tech-accent" /></div>}
                <h2 className="text-6xl font-bold text-white tracking-tight">{slide.title}</h2>
              </div>
              {slide.subtitle && <p className="text-3xl text-slate-400 ml-24 border-l-4 border-slate-600 pl-6">{slide.subtitle}</p>}
            </motion.div>

            <motion.div 
               variants={containerStagger}
               initial="hidden"
               animate="visible"
               className="grid gap-8"
            >
              {slide.points?.map((point, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="group flex items-center p-8 bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-2xl border border-slate-700/60 hover:border-tech-blue/50 transition-all duration-300 shadow-lg"
                >
                  <div className="mr-8 p-5 bg-slate-900 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-inner">
                    <div className="w-4 h-4 bg-tech-accent rounded-full shadow-[0_0_12px_#06b6d4]"></div>
                  </div>
                  <p className="text-2xl md:text-3xl text-slate-200 leading-normal font-light w-full">
                     {point.includes('：') ? (
                       <span>
                         <span className="font-bold text-white text-3xl mr-3">{point.split('：')[0]}</span>
                         <span className="text-slate-400 text-2xl block md:inline md:ml-2">{point.split('：')[1]}</span>
                       </span>
                     ) : point}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full p-6 md:p-16 flex flex-col relative z-10 overflow-hidden">
      <PDCABadge stage={slide.pdca} />
      {renderContent()}
    </div>
  );
};