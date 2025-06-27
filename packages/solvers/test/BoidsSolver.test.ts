import { describe, it, expect } from 'vitest'
import BoidsSolver from '../src/BoidsSolver.js'
import { ParticlePool } from '@living-motion/core'

describe('BoidsSolver', () => {
  it('updates velocities toward average', () => {
    const pool = new ParticlePool(2)
    pool.velocity[0] = 1
    pool.velocity[3] = -1
    const solver = new BoidsSolver({ cohesionW: 1 })
    solver.update(pool, 1)
    expect(pool.velocity[0]).toBeGreaterThan(0)
    expect(pool.velocity[3]).toBeLessThan(0)
  })
})
