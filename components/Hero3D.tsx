import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, Stars, Html } from '@react-three/drei';
import { ProceduralCar } from './ProceduralCar';
import { CarColor } from '../types';

// Add missing JSX definitions for React Three Fiber lights
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      spotLight: any;
    }
  }
}

// Also augment React's JSX namespace directly for newer TS/React versions
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      spotLight: any;
    }
  }
}

interface Hero3DProps {
  selectedColor: CarColor;
  onHotspotClick?: (feature: string) => void;
  showHotspots?: boolean;
  autoRotateSpeed?: number;
}

export const Hero3D: React.FC<Hero3DProps> = ({ 
  selectedColor, 
  onHotspotClick, 
  showHotspots,
  autoRotateSpeed = 2 
}) => {
  return (
    <div className="w-full h-full relative cursor-move">
      <Canvas shadows camera={{ position: [5, 2, 5], fov: 45 }}>
        <Suspense fallback={<Html center><span className="text-neon-blue font-display animate-pulse">SYSTEM INITIALIZING...</span></Html>}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <Stage 
            environment={null} 
            intensity={0.5} 
            contactShadow={{ resolution: 1024, scale: 10, blur: 2, opacity: 0.5, color: '#000000' }}
          >
            <ProceduralCar color={selectedColor.hex} />
            
            {showHotspots && (
              <>
                 <Html position={[0.8, 0.8, 2.4]} distanceFactor={10} zIndexRange={[100, 0]}>
                  <div 
                    className="cursor-pointer group relative"
                    onClick={() => onHotspotClick?.('Headlights')}
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-neon-blue bg-black/50 animate-pulse flex items-center justify-center hover:scale-125 transition-transform">
                      <div className="w-2 h-2 bg-neon-blue rounded-full" />
                    </div>
                    <div className="absolute left-8 top-0 bg-black/80 border border-neon-blue text-neon-blue px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm pointer-events-none">
                      Full LED Arrays
                    </div>
                  </div>
                </Html>

                <Html position={[-1.2, 0.4, 1.4]} distanceFactor={10} zIndexRange={[100, 0]}>
                  <div 
                    className="cursor-pointer group relative"
                    onClick={() => onHotspotClick?.('Wheels')}
                  >
                     <div className="w-6 h-6 rounded-full border-2 border-neon-blue bg-black/50 animate-pulse flex items-center justify-center hover:scale-125 transition-transform">
                      <div className="w-2 h-2 bg-neon-blue rounded-full" />
                    </div>
                    <div className="absolute left-8 top-0 bg-black/80 border border-neon-blue text-neon-blue px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm pointer-events-none">
                      Diamond Cut Alloys
                    </div>
                  </div>
                </Html>
              </>
            )}

          </Stage>

          {/* Futuristic Environment Map */}
          <Environment preset="city" />
          
          {/* Custom Lights for Neon Feel */}
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} color="#00f3ff" castShadow />
          <spotLight position={[-10, 5, -10]} angle={0.2} penumbra={1} intensity={1.5} color="#bc13fe" />

        </Suspense>
        
        <OrbitControls 
          enableDamping={true} 
          dampingFactor={0.05} // Smooth inertia
          rotateSpeed={0.5} // Smoother rotation speed
          zoomSpeed={0.8} 
          panSpeed={0.5}
          minPolarAngle={Math.PI / 6} 
          maxPolarAngle={Math.PI / 2 - 0.05} 
          minDistance={5}
          maxDistance={15}
          autoRotate={autoRotateSpeed > 0}
          autoRotateSpeed={autoRotateSpeed}
          target={[0, 0.5, 0]} 
          makeDefault 
        />
      </Canvas>
    </div>
  );
};