import { describe, it, expect } from 'vitest'
import BoxEmitter from '../src/BoxEmitter.js'
import { ParticlePool } from '@living-motion/core'

describe('BoxEmitter', () => {
  it('spawns within bounds', () => {
    const pool = new ParticlePool(1)
    const emitter = new BoxEmitter({ size: [2, 2, 2], rate: 10 })
    emitter.spawn(pool, 0.1)
    expect(Math.abs(pool.position[0]) <= 1).toBe(true)
  })
})
