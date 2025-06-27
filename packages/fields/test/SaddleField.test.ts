import { describe, it, expect } from 'vitest'
import { ParticlePool } from '@living-motion/core'
import { SaddleField } from '../src/index.js'

describe('SaddleField', () => {
  it('applies saddle force', () => {
    const pool = new ParticlePool(1)
    pool.addParticle([1,1,0],[0,0,0])
    const field = new SaddleField({ strength: 1 })
    field.update(pool, 1)
    expect(pool.velocity[0]).toBeGreaterThan(0)
    expect(pool.velocity[1]).toBeLessThan(0)
  })
})
