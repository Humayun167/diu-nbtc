/**
 * NanoParticle Component
 * 
 * A 3D nano-particle/molecular structure for the hero section.
 * Features icosahedron geometry with glowing effects.
 */

import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function ParticleCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && wireframeRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
      wireframeRef.current.rotation.x = time * 0.1;
      wireframeRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Core sphere with distortion */}
        <Sphere ref={meshRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#0891B2"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#0891B2"
            emissiveIntensity={0.2}
          />
        </Sphere>
        
        {/* Wireframe overlay */}
        <Icosahedron ref={wireframeRef} args={[2, 1]}>
          <meshBasicMaterial
            color="#10B981"
            wireframe
            transparent
            opacity={0.3}
          />
        </Icosahedron>
        
        {/* Orbital rings */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[i * 0.5, i * 0.3, 0]}>
            <torusGeometry args={[2.5 + i * 0.3, 0.02, 16, 100]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#0891B2" : "#10B981"}
              transparent
              opacity={0.4 - i * 0.1}
            />
          </mesh>
        ))}
        
        {/* Floating particles around the core */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 3 + Math.random() * 0.5;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 2,
                Math.sin(angle) * radius,
              ]}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? "#10B981" : "#0891B2"}
                emissive={i % 3 === 0 ? "#10B981" : "#0891B2"}
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0891B2" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#10B981" />
      <ParticleCore />
    </>
  );
}

interface NanoParticleProps {
  className?: string;
}

export function NanoParticle({ className = '' }: NanoParticleProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default NanoParticle;
