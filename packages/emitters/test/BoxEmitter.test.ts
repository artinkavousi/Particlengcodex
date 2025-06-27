import { describe, it, expect } from 'vitest'
import { ParticlePool } from '@living-motion/core'
import { BoxEmitter } from '../src/index.js'

describe('BoxEmitter', () => {
  it('emits inside the box volume', () => {
    const pool = new ParticlePool(5)
    const emitter = new BoxEmitter({ size: [2, 2, 2], rate: 3 })
    emitter.update(pool, 1)
    expect(pool.count).toBe(3)
    for (let i = 0; i < 3; i++) {
      const x = pool.position[i * 3]
      const y = pool.position[i * 3 + 1]
      const z = pool.position[i * 3 + 2]
      expect(Math.abs(x)).toBeLessThanOrEqual(1)
      expect(Math.abs(y)).toBeLessThanOrEqual(1)
      expect(Math.abs(z)).toBeLessThanOrEqual(1)
    }
  })
})
