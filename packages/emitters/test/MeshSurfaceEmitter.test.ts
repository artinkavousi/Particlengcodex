import { describe, it, expect } from 'vitest'
import { ParticlePool } from '@living-motion/core'
import { MeshSurfaceEmitter } from '../src/index.js'
import { BoxGeometry } from 'three'

describe('MeshSurfaceEmitter', () => {
  it('samples points on the mesh surface', () => {
    const pool = new ParticlePool(5)
    const geo = new BoxGeometry(1,1,1)
    const emitter = new MeshSurfaceEmitter({ geometry: geo, rate: 3 })
    emitter.update(pool, 1)
    expect(pool.count).toBe(3)
  })
})
