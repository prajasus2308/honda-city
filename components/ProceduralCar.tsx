import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Add missing JSX definitions for React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      cylinderGeometry: any;
    }
  }
}

// Also augment React's JSX namespace directly for newer TS/React versions
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      cylinderGeometry: any;
    }
  }
}

interface ProceduralCarProps {
  color: string;
}

// A low-poly futuristic representation of the Honda City
// Note: This component is currently replaced by HeroCarViewer in the main app
// but kept for reference or fallback.
export const ProceduralCar: React.FC<ProceduralCarProps> = ({ color }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 0.5, 4.5]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Wheels placeholder */}
      <mesh position={[1, -0.25, 1.5]} rotation={[0, 0, Math.PI / 2]}>
         <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
         <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1, -0.25, 1.5]} rotation={[0, 0, Math.PI / 2]}>
         <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
         <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1, -0.25, -1.5]} rotation={[0, 0, Math.PI / 2]}>
         <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
         <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1, -0.25, -1.5]} rotation={[0, 0, Math.PI / 2]}>
         <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
         <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
};