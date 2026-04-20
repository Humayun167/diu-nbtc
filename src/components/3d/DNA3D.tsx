/**
 * DNA3D Component
 * 
 * A 3D DNA double helix visualization using React Three Fiber.
 * The DNA rotates based on scroll position for an engaging visual effect.
 * 
 * Features:
 * - Scroll-synchronized rotation
 * - Respects prefers-reduced-motion
 * - Optimized for performance with low poly geometry
 * - Automatic fallback on low-end devices
 */

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// DNA Helix geometry generator
function createDNAGeometry(turns: number = 3, radius: number = 1, height: number = 8) {
  const points: THREE.Vector3[] = [];
  const pointsPerTurn = 20;
  const totalPoints = turns * pointsPerTurn;
  
  for (let i = 0; i <= totalPoints; i++) {
    const t = i / totalPoints;
    const angle = t * turns * Math.PI * 2;
    const y = (t - 0.5) * height;
    
    // First strand
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ));
  }
  
  return points;
}

// Individual DNA strand component
function DNAStrand({ 
  offset = 0, 
  color, 
  scrollProgress 
}: { 
  offset?: number; 
  color: string;
  scrollProgress: MotionValue<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const points = useMemo(() => createDNAGeometry(4, 0.8, 10), []);
  
  // Create sphere positions for base pairs
  const spherePositions = useMemo(() => {
    return points.filter((_, i) => i % 4 === 0);
  }, [points]);

  useFrame(() => {
    if (groupRef.current) {
      const progress = scrollProgress.get();
      groupRef.current.rotation.y = progress * Math.PI * 2 + offset;
    }
  });

  return (
    <group ref={groupRef}>
      {/* DNA backbone as a tube */}
      <mesh>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(points),
          64,
          0.05,
          8,
          false
        ]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.3} 
          roughness={0.4}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Nucleotide base spheres */}
      {spherePositions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#10B981" : "#0891B2"}
            metalness={0.5}
            roughness={0.3}
            emissive={i % 2 === 0 ? "#10B981" : "#0891B2"}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Base pair connectors between strands
function BasePairs({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const turns = 4;
  const pointsPerTurn = 20;
  const totalPoints = turns * pointsPerTurn;
  
  const pairs = useMemo(() => {
    const result = [];
    for (let i = 0; i <= totalPoints; i += 2) {
      const t = i / totalPoints;
      const angle = t * turns * Math.PI * 2;
      const y = (t - 0.5) * 10;
      
      result.push({
        position: [0, y, 0] as [number, number, number],
        rotation: [0, angle, 0] as [number, number, number],
      });
    }
    return result;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const progress = scrollProgress.get();
      groupRef.current.rotation.y = progress * Math.PI * 2;
    }
  });

  return (
    <group ref={groupRef}>
      {pairs.map((pair, i) => (
        <mesh 
          key={i} 
          position={pair.position}
          rotation={pair.rotation}
        >
          <cylinderGeometry args={[0.03, 0.03, 1.6, 8]} />
          <meshStandardMaterial 
            color="#94A3B8"
            metalness={0.2}
            roughness={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main DNA scene
function DNAScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <>
      {/* Ambient lighting for overall illumination */}
      <ambientLight intensity={0.4} />
      
      {/* Main directional light */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        color="#ffffff"
      />
      
      {/* Accent lights for the nano theme */}
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#0891B2" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#10B981" />
      
      {/* DNA Structure with Float for subtle animation */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <group scale={0.6}>
          {/* First DNA strand */}
          <DNAStrand color="#0891B2" scrollProgress={scrollProgress} />
          
          {/* Second DNA strand (offset by PI) */}
          <DNAStrand color="#0891B2" offset={Math.PI} scrollProgress={scrollProgress} />
          
          {/* Base pair connectors */}
          <BasePairs scrollProgress={scrollProgress} />
        </group>
      </Float>
    </>
  );
}

interface DNA3DProps {
  className?: string;
  opacity?: number;
}

export function DNA3D({ className = '', opacity = 1 }: DNA3DProps) {
  const [shouldRender, setShouldRender] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Scroll progress for DNA rotation
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Check for low-end device (simple heuristic)
    const isLowEnd = navigator.hardwareConcurrency <= 2 || 
                     (window.innerWidth < 768 && /Android|iPhone/i.test(navigator.userAgent));
    
    if (isLowEnd) {
      setShouldRender(false);
    }
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Don't render 3D on low-end devices or when reduced motion is preferred
  if (!shouldRender || reducedMotion) {
    return (
      <div 
        className={`${className} bg-gradient-glow opacity-50`}
        style={{ opacity }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div 
      className={`${className}`} 
      style={{ opacity }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <DNAScene scrollProgress={smoothProgress} />
      </Canvas>
    </div>
  );
}

export default DNA3D;
