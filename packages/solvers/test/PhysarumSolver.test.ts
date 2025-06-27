import { describe, it, expect } from 'vitest'
import PhysarumSolver from '../src/PhysarumSolver.js'
import { ParticlePool } from '@living-motion/core'

describe('PhysarumSolver', () => {
  it('decays velocity', () => {
    const pool = new ParticlePool(1)
    pool.velocity[0] = 1
    const solver = new PhysarumSolver({ trailDecay: 1 })
    solver.update(pool, 1)
    expect(pool.velocity[0]).toBeCloseTo(0)
  })
})
