import { describe, it, expect } from 'vitest'
import MeshSurfaceEmitter from '../src/MeshSurfaceEmitter.js'
import { ParticlePool } from '@living-motion/core'
import { BufferGeometry } from 'three'

describe('MeshSurfaceEmitter', () => {
  it('spawns particles', () => {
    const pool = new ParticlePool(1)
    const geometry = new BufferGeometry()
    const emitter = new MeshSurfaceEmitter({ geometry, rate: 10 })
    emitter.spawn(pool, 0.1)
    expect(pool.position[0]).toBe(0)
  })
})
