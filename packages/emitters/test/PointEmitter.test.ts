import { describe, it, expect } from 'vitest'
import { ParticlePool } from '@living-motion/core'
import { PointEmitter } from '../src/index.js'

describe('PointEmitter', () => {
  it('emits at a fixed position', () => {
    const pool = new ParticlePool(5)
    const emitter = new PointEmitter({ rate: 2, position: [1, 2, 3] })
    emitter.update(pool, 1)
    expect(pool.count).toBe(2)
    expect(pool.position[0]).toBe(1)
    expect(pool.position[1]).toBe(2)
    expect(pool.position[2]).toBe(3)
  })
})
