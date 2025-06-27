import { describe, it, expect } from 'vitest';
import ParticlePool from '../src/ParticlePool.js';

describe('ParticlePool', () => {
  it('initializes arrays of correct length', () => {
    const pool = new ParticlePool(2);
    expect(pool.position.length).toBe(6);
    expect(pool.velocity.length).toBe(6);
  });

  it('can add particles', () => {
    const pool = new ParticlePool(1);
    const idx = pool.addParticle([1, 2, 3], [0, 0, 0]);
    expect(idx).toBe(0);
    expect(pool.count).toBe(1);
    expect(Array.from(pool.position.slice(0, 3))).toEqual([1, 2, 3]);
  });
});
