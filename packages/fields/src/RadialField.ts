import { ParticlePool } from '@living-motion/core'

export interface RadialFieldOptions {
  center?: [number, number, number]
  strength: number
}

export default class RadialField {
  constructor(private opts: RadialFieldOptions) {}

  update(pool: ParticlePool, dt: number) {
    const [cx, cy, cz] = this.opts.center ?? [0, 0, 0]
    const k = this.opts.strength
    for (let i = 0; i < pool.count; i++) {
      const x = pool.position[i * 3] - cx
      const y = pool.position[i * 3 + 1] - cy
      const z = pool.position[i * 3 + 2] - cz
      const len = Math.sqrt(x*x + y*y + z*z) + 1e-6
      pool.velocity[i * 3] += (-x / len) * k * dt
      pool.velocity[i * 3 + 1] += (-y / len) * k * dt
      pool.velocity[i * 3 + 2] += (-z / len) * k * dt
    }
  }
}
