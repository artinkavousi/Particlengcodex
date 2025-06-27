import { describe, it, expect } from 'vitest'
import { ParticlePool } from '@living-motion/core'
import { RadialField } from '../src/index.js'

describe('RadialField', () => {
  it('accelerates particles toward the center', () => {
    const pool = new ParticlePool(1)
    pool.addParticle([1, 0, 0], [0, 0, 0])
    const field = new RadialField({ strength: 1 })
    field.update(pool, 1)
    expect(pool.velocity[0]).toBeLessThan(0)
  })
})
