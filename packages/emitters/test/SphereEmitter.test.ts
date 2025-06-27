import { describe, it, expect } from 'vitest';
import { ParticlePool } from '@living-motion/core';
import { SphereEmitter } from '../src/index.js';

describe('SphereEmitter', () => {
  it('spawns particles according to rate', () => {
    const pool = new ParticlePool(10);
    const emitter = new SphereEmitter({ radius: 1, rate: 5 });
    emitter.update(pool, 1);
    expect(pool.count).toBe(5);
  });
});
