import { describe, it, expect } from 'vitest'
import { ParticlePool } from '@living-motion/core'
import { AudioFFTEmitter } from '../src/index.js'

describe('AudioFFTEmitter', () => {
  it('uses fft value to spawn particles', () => {
    const fft = new Float32Array([0, 1])
    const pool = new ParticlePool(10)
    const emitter = new AudioFFTEmitter({ fft, band: 1, rate: 2 })
    emitter.update(pool, 1)
    expect(pool.count).toBe(2)
  })
})
