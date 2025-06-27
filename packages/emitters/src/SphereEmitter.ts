import { ParticlePool } from '@living-motion/core'

export interface SphereEmitterOptions {
  radius: number
  rate: number
}

export default class SphereEmitter {
  constructor(private options: SphereEmitterOptions) {}

  spawn(pool: ParticlePool, dt: number) {
    // placeholder spawn logic
    const count = Math.floor(this.options.rate * dt)
    for (let i = 0; i < Math.min(count, pool.capacity); i++) {
      pool.position[i * 3] = 0
      pool.position[i * 3 + 1] = 0
      pool.position[i * 3 + 2] = 0
    }
  }
}
