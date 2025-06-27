import { describe, it, expect } from 'vitest'
import SphereEmitter from '../src/SphereEmitter.js'
import { ParticlePool } from '@living-motion/core'

describe('SphereEmitter', () => {
  it('spawns particles into pool', () => {
    const pool = new ParticlePool(1)
    const emitter = new SphereEmitter({ radius: 1, rate: 10 })
    emitter.spawn(pool, 0.1)
    expect(pool.position[0]).toBe(0)
  })
})
