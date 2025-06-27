import { ParticlePool } from '@living-motion/core'

export interface SaddleFieldOptions {
  strength: number
}

export default class SaddleField {
  constructor(private opts: SaddleFieldOptions) {}

  update(pool: ParticlePool, dt: number) {
    const k = this.opts.strength
    for (let i = 0; i < pool.count; i++) {
      const x = pool.position[i*3]
      const y = pool.position[i*3+1]
      pool.velocity[i*3] += x * k * dt
      pool.velocity[i*3+1] += -y * k * dt
    }
  }
}
