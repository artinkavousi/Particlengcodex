import { describe, it, expect } from 'vitest';
import ParticlePool from '../src/ParticlePool.js';

describe('ParticlePool', () => {
  it('initializes arrays of correct length', () => {
    const pool = new ParticlePool(2);
    expect(pool.position.length).toBe(6);
    expect(pool.velocity.length).toBe(6);
  });
});
