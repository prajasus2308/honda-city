import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarVariant } from '../types';
import { X, Check, Gauge, Zap, Fuel, Settings, ArrowRight } from 'lucide-react';

interface VariantDetailsProps {
  variant: CarVariant;
  isOpen: boolean;
  onClose: () => void;
}

const SpecCard = ({ icon: Icon, label, value, delay }: { icon: any, label: string, value?: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-neon-blue/30 hover:bg-white/10 transition-all group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <Icon className="text-neon-blue mb-2 group-hover:scale-110 transition-transform relative z-10" size={20} />
    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 relative z-10">{label}</p>
    <p className="text-xl font-bold text-white font-display relative z-10">{value || 'N/A'}</p>
  </motion.div>
);

export const VariantDetails: React.FC<VariantDetailsProps> = ({ variant, isOpen, onClose }) => {
  const handleTestDrive = () => {
    window.open('https://www.hondacarindia.com/shop/request-test-drive/honda-city-5th-generation?carId=32', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,243,255,0.1)] flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Visual/Summary */}
            <div className="md:w-2/5 bg-gradient-to-br from-[#111] to-black p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
               {/* Background Decorative Elements */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
               
               <div className="relative z-10">
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="inline-flex items-center gap-2 px-3 py-1 border border-neon-blue/30 rounded-full text-neon-blue text-[10px] tracking-[0.2em] font-bold mb-6 bg-neon-blue/5"
                 >
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
                    SELECTED CONFIGURATION
                 </motion.div>
                 
                 <motion.h2 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 }}
                   className="text-5xl md:text-6xl font-display font-bold text-white mb-2 tracking-tight"
                 >
                   {variant.name}
                 </motion.h2>
                 
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-baseline gap-2 mb-8"
                  >
                   <span className="text-3xl text-gray-200 font-light">{variant.price}</span>
                   <span className="text-sm text-gray-500 font-medium">Ex-Showroom</span>
                 </motion.div>
                 
                 <motion.p 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.3 }}
                   className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-neon-blue/50 pl-6 py-1"
                 >
                   {variant.description}
                 </motion.p>
               </div>

               <div className="space-y-3 relative z-10">
                 <button 
                   onClick={onClose}
                   className="w-full py-4 bg-neon-blue text-black font-bold font-display tracking-wider hover:bg-white transition-colors rounded-xl flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(0,243,255,0.2)]"
                 >
                   CONFIGURE IN 3D
                   <Settings size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                 </button>
                 <button 
                   onClick={handleTestDrive}
                   className="w-full py-4 bg-transparent border border-white/20 text-white font-bold font-display tracking-wider hover:bg-white/10 transition-colors rounded-xl flex items-center justify-center gap-2 group"
                 >
                   BOOK TEST DRIVE
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
               </div>
            </div>

            {/* Right Side: Specs & Features */}
            <div className="md:w-3/5 p-8 md:p-10 overflow-y-auto bg-[#050505] scrollbar-thin scrollbar-thumb-neon-blue/20">
               <div className="flex justify-between items-center mb-10">
                 <h3 className="text-xl font-display font-bold text-white tracking-widest flex items-center gap-2">
                   <span className="w-8 h-[1px] bg-neon-blue"></span>
                   SPECIFICATIONS
                 </h3>
                 <button 
                    onClick={onClose} 
                    className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-all md:hidden"
                 >
                   <X size={24} />
                 </button>
               </div>

               {/* Specs Grid */}
               <div className="grid grid-cols-2 gap-4 mb-10">
                 <SpecCard icon={Zap} label="Power" value={variant.specs?.power} delay={0.4} />
                 <SpecCard icon={Gauge} label="Torque" value={variant.specs?.torque} delay={0.5} />
                 <SpecCard icon={Fuel} label="Mileage" value={variant.specs?.mileage} delay={0.6} />
                 <SpecCard icon={Settings} label="Transmission" value={variant.specs?.transmission} delay={0.7} />
               </div>

               <h3 className="text-xl font-display font-bold text-white mb-6 tracking-widest flex items-center gap-2">
                 <span className="w-8 h-[1px] bg-neon-blue"></span>
                 HIGHLIGHTS
               </h3>
               
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {variant.features.map((feature, i) => (
                   <motion.li 
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.5 + (i * 0.1) }}
                     className="flex items-start gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/5 hover:bg-white/[0.08] transition-colors group cursor-default"
                   >
                     <div className="w-6 h-6 rounded-full bg-neon-blue/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-neon-blue/20 transition-colors">
                       <Check size={12} className="text-neon-blue" />
                     </div>
                     <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{feature}</span>
                   </motion.li>
                 ))}
               </ul>
            </div>
            
            {/* Close Button Desktop */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors hidden md:block z-20 hover:bg-white/10 rounded-full"
            >
              <X size={24} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};