import { ParticlePool } from '@living-motion/core'
import { BufferGeometry } from 'three'

export interface MeshSurfaceEmitterOptions {
  geometry: BufferGeometry
  rate: number
}

export default class MeshSurfaceEmitter {
  constructor(private options: MeshSurfaceEmitterOptions) {}

  spawn(pool: ParticlePool, dt: number) {
    // minimal placeholder that writes zeroes
    const count = Math.min(Math.floor(this.options.rate * dt), pool.capacity)
    for (let i = 0; i < count; i++) {
      pool.position[i * 3] = 0
      pool.position[i * 3 + 1] = 0
      pool.position[i * 3 + 2] = 0
    }
  }
}
