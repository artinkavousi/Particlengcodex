import { describe, it, expect } from 'vitest'
import { ParticlePool } from '@living-motion/core'
import { BoidsSolver } from '../src/index.js'

describe('BoidsSolver', () => {
  it('steers particles towards each other', () => {
    const pool = new ParticlePool(2)
    pool.addParticle([0, 0, 0], [1, 0, 0])
    pool.addParticle([1, 0, 0], [-1, 0, 0])
    const solver = new BoidsSolver({ viewRadius: 2, separationW: 0, alignW: 1, cohesionW: 1 })
    solver.update(pool, 1)
    expect(pool.velocity[0]).toBeLessThan(1)
    expect(pool.velocity[3]).toBeGreaterThan(-1)
  })
})
