import { ParticlePool } from '@living-motion/core'

export interface PointEmitterOptions {
  rate: number
  position?: [number, number, number]
}

export default class PointEmitter {
  private acc = 0
  constructor(private opts: PointEmitterOptions) {}

  update(pool: ParticlePool, dt: number) {
    this.acc += dt * this.opts.rate
    const count = Math.floor(this.acc)
    this.acc -= count
    const [x, y, z] = this.opts.position ?? [0, 0, 0]
    for (let i = 0; i < count; i++) {
      if (pool.count >= pool.capacity) return
      pool.addParticle([x, y, z], [0, 0, 0])
    }
  }
}
