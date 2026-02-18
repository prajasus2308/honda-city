import React, { useState, useMemo } from 'react';
import { HeroCarViewer } from './components/HeroCarViewer';
import { ChatAssistant } from './components/ChatAssistant';
import { VariantDetails } from './components/VariantDetails';
import { CAR_COLORS, VARIANTS_DATA } from './constants';
import { CarColor, CarVariant, FuelType, VariantDefinition } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, Zap, ChevronRight, Menu, RefreshCw, Minus, Plus, Check, Fuel } from 'lucide-react';

const App: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<CarColor>(CAR_COLORS[0]);
  const [selectedVariantBase, setSelectedVariantBase] = useState<VariantDefinition>(VARIANTS_DATA[0]);
  const [fuelType, setFuelType] = useState<FuelType>('Petrol');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1.5);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Derive the actual display object based on selected variant + fuel type
  const currentVariant: CarVariant = useMemo(() => {
    const config = selectedVariantBase.config[fuelType];
    return {
      name: selectedVariantBase.name,
      features: selectedVariantBase.features,
      description: selectedVariantBase.description,
      price: config.price,
      engine: config.engine,
      specs: config.specs
    };
  }, [selectedVariantBase, fuelType]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const handleVariantSelect = (variantBase: VariantDefinition) => {
    setSelectedVariantBase(variantBase);
    setIsDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
    scrollToSection('home');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-blue selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
               <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-white">
                 CITY <span className="text-sm font-sans tracking-widest text-white/70">5TH GEN</span>
               </span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'Interior', 'Performance', 'Variants'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeSection === item.toLowerCase() 
                        ? 'text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.3)]' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                <Menu />
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
           <div className="md:hidden bg-black/90 border-b border-white/10 px-4 py-4 space-y-2">
             {['Home', 'Interior', 'Performance', 'Variants'].map((item) => (
               <button
                 key={item}
                 onClick={() => scrollToSection(item.toLowerCase())}
                 className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
               >
                 {item}
               </button>
             ))}
           </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="h-screen w-full relative pt-20 overflow-hidden bg-[#050505]">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />

        <div className="h-full flex flex-col md:flex-row">
           <div className="flex-1 relative z-10 h-[50vh] md:h-full order-2 md:order-1">
             <HeroCarViewer selectedColor={selectedColor} autoRotateSpeed={rotationSpeed} />
           </div>

           <div className="flex-1 z-20 p-8 flex flex-col justify-center order-1 md:order-2">
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 }}
               className="space-y-6"
             >
               <div>
                  <motion.div 
                    key={currentVariant.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-3 py-1 mb-2 border border-neon-blue/50 rounded text-neon-blue text-xs tracking-[0.2em] font-bold bg-neon-blue/10"
                  >
                    {currentVariant.name} EDITION
                  </motion.div>
                  <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                    THE NEW <br />
                    <span className="text-neon-blue drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">GENERATION</span>
                  </h1>
               </div>
               
               <p className="text-gray-400 text-lg max-w-md">
                 Experience the future of urban mobility with the <strong>{currentVariant.engine}</strong>. 
                 Advanced connectivity, superior comfort, and unmatched performance.
               </p>

               {/* Fuel Selector */}
               <div className="flex items-center gap-4 bg-white/5 w-fit p-1 rounded-lg border border-white/10">
                 {['Petrol', 'Diesel'].map((fuel) => (
                   <button
                     key={fuel}
                     onClick={() => setFuelType(fuel as FuelType)}
                     className={`px-4 py-2 rounded-md text-sm font-bold tracking-wider transition-all ${
                       fuelType === fuel 
                       ? 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,243,255,0.3)]' 
                       : 'text-gray-400 hover:text-white'
                     }`}
                   >
                     {fuel.toUpperCase()}
                   </button>
                 ))}
               </div>

               <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {currentVariant.price}
                  </span>
                  <span className="text-sm text-gray-500">Ex-Showroom</span>
               </div>

               {/* Color Selector */}
               <div className="space-y-3">
                 <p className="text-sm text-gray-500 uppercase tracking-widest">Select Finish</p>
                 <div className="flex gap-4">
                   {CAR_COLORS.map((color) => (
                     <button
                       key={color.name}
                       onClick={() => setSelectedColor(color)}
                       className={`w-12 h-12 rounded-full border-2 transition-all ${
                         selectedColor.name === color.name ? 'border-neon-blue scale-110 shadow-[0_0_15px_rgba(0,243,255,0.5)]' : 'border-transparent hover:scale-105'
                       }`}
                       style={{ backgroundColor: color.hex }}
                       title={color.name}
                     />
                   ))}
                 </div>
                 <p className="text-neon-blue font-display">{selectedColor.name}</p>
               </div>

                {/* Controls */}
               <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                 <div className="flex items-center gap-2">
                   <button onClick={() => setRotationSpeed(Math.max(0, rotationSpeed - 0.5))} className="p-2 hover:bg-white/10 rounded-full"><Minus size={16}/></button>
                   <RefreshCw size={16} className={`text-neon-blue ${rotationSpeed > 0 ? 'animate-spin' : ''}`} style={{ animationDuration: `${3/Math.max(0.1, rotationSpeed)}s` }} />
                   <button onClick={() => setRotationSpeed(Math.min(5, rotationSpeed + 0.5))} className="p-2 hover:bg-white/10 rounded-full"><Plus size={16}/></button>
                 </div>
                 <span className="text-xs text-gray-500 uppercase tracking-wider">Auto-Rotation Speed</span>
               </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Interior Section */}
      <section id="interior" className="min-h-screen bg-black py-20 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-12 text-neon-blue">INTERIOR LUXURY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-neon-blue/50 transition-colors group">
               <Shield className="w-12 h-12 text-neon-blue mb-4 group-hover:scale-110 transition-transform" />
               <h3 className="text-2xl font-bold mb-2">Honda Sensing</h3>
               <p className="text-gray-400">Advanced ADAS features including Collision Mitigation Braking System, Lane Keeping Assist, and Adaptive Cruise Control ensuring your safety on every journey.</p>
             </div>
             <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-neon-blue/50 transition-colors group">
               <Activity className="w-12 h-12 text-neon-blue mb-4 group-hover:scale-110 transition-transform" />
               <h3 className="text-2xl font-bold mb-2">Connected Technology</h3>
               <p className="text-gray-400">Next-gen Honda Connect with 32+ features, Alexa, and Google Watch integration. Stay connected to your car wherever you are.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="min-h-screen bg-[#050505] py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-display font-bold mb-12 text-neon-blue">PERFORMANCE</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-8">
               <div className="flex items-start gap-4">
                 <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                   {fuelType === 'Petrol' ? <Zap className="w-8 h-8 text-neon-blue" /> : <Fuel className="w-8 h-8 text-neon-blue" />}
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold mb-2">{currentVariant.engine}</h3>
                   <p className="text-gray-400">
                     {fuelType === 'Petrol' 
                       ? "High-performance i-VTEC delivering exhilarating power and efficiency. Experience the rush of high revs."
                       : "Efficient i-DTEC diesel engine providing superior torque and outstanding fuel economy for long journeys."}
                   </p>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-4 rounded-lg text-center border border-white/10">
                   <span className="block text-3xl font-display font-bold text-white">{currentVariant.specs?.power.replace(' PS', '')}</span>
                   <span className="text-xs text-gray-500 uppercase">PS Power</span>
                 </div>
                 <div className="bg-white/5 p-4 rounded-lg text-center border border-white/10">
                   <span className="block text-3xl font-display font-bold text-white">{currentVariant.specs?.torque.replace(' Nm', '')}</span>
                   <span className="text-xs text-gray-500 uppercase">Nm Torque</span>
                 </div>
               </div>
             </div>
             
             <div className="h-64 lg:h-96 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-neon-blue/5 group-hover:bg-neon-blue/10 transition-colors" />
                <span className="font-display text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors tracking-widest">
                  {fuelType === 'Petrol' ? 'i-VTEC' : 'i-DTEC'}
                </span>
             </div>
          </div>
        </div>
      </section>

      {/* Variants Section */}
      <section id="variants" className="min-h-screen bg-black py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <h2 className="text-4xl font-display font-bold text-neon-blue">VARIANTS</h2>
            <div className="bg-white/5 rounded-lg p-1 border border-white/10 flex">
               <span className="px-3 py-1 text-xs text-gray-400 uppercase tracking-widest">Pricing for {fuelType}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VARIANTS_DATA.map((variantBase) => {
              const isSelected = selectedVariantBase.name === variantBase.name;
              // Dynamically grab price/engine based on current fuelType state
              const variantConfig = variantBase.config[fuelType];

              return (
                <div 
                  key={variantBase.name} 
                  className={`relative rounded-xl p-6 border transition-all flex flex-col ${
                    isSelected 
                    ? 'bg-neon-blue/10 border-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.2)] -translate-y-4' 
                    : 'bg-white/5 border-white/10 hover:border-neon-blue/50 hover:-translate-y-2'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-blue text-black text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Check size={10} /> SELECTED
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-2xl font-bold ${isSelected ? 'text-neon-blue' : 'text-white'}`}>{variantBase.name}</h3>
                    <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded whitespace-nowrap">{variantConfig.engine}</span>
                  </div>
                  <p className="text-2xl font-display text-white mb-6">{variantConfig.price}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {variantBase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                        <ChevronRight size={14} className="text-neon-blue mt-1 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => handleVariantSelect(variantBase)}
                    className={`w-full py-2 border rounded transition-colors font-medium ${
                      isSelected
                      ? 'bg-neon-blue text-black border-neon-blue hover:bg-white hover:border-white'
                      : 'border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black'
                    }`}
                  >
                    {isSelected ? 'CURRENTLY SELECTED' : 'SELECT VARIANT'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-600 text-sm bg-black relative z-10 overflow-hidden">
        {/* Ambient Glow in Footer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-neon-blue/5 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center relative z-10">
          <p className="mb-2">© 2024 Honda Cars India. All rights reserved.</p>
          <p>Disclaimer: Images are for illustration purposes only. Actual colors/features may vary.</p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="mt-16 relative"
          >
            {/* Ultra Stylish Signature */}
            <div className="group relative cursor-default">
              <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue via-purple-500 to-neon-blue rounded-xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-700 animate-pulse" />
              
              <div className="relative px-8 py-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl flex flex-col items-center gap-2 group-hover:border-neon-blue/30 transition-colors">
                <span className="text-[9px] text-gray-500 uppercase tracking-[0.4em] group-hover:text-neon-blue transition-colors duration-500">
                  Concept & Design By
                </span>
                
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-neon-blue"></span>
                  <span className="font-display text-lg font-bold text-white tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-500 select-none">
                     <span className="text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">-</span> PRATYUSH RAJ
                  </span>
                  <span className="h-px w-8 bg-gradient-to-l from-transparent to-neon-blue"></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      <VariantDetails 
        variant={currentVariant} 
        isOpen={isDetailsOpen} 
        onClose={handleDetailsClose} 
      />

      <ChatAssistant />
    </div>
  );
};

export default App;