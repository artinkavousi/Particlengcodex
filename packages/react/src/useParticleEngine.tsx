import { useEffect, useRef } from 'react';
import { ParticleEngine, EngineOptions } from '@living-motion/core';

export default function useParticleEngine(opts: EngineOptions) {
  const engineRef = useRef<ParticleEngine>();
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    const canvas = opts.canvas;
    engineRef.current = new ParticleEngine({ canvas, maxParticles: opts.maxParticles });
    engineRef.current.start();
    return () => engineRef.current?.dispose();
  }, [opts.canvas, opts.maxParticles]);

  return { engine: engineRef.current, groupRef };
}
