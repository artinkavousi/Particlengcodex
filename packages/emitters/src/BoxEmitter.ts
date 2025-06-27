import { ParticlePool } from '@living-motion/core'

export interface BoxEmitterOptions {
  size: [number, number, number]
  rate: number
}

export default class BoxEmitter {
  private acc = 0
  constructor(private opts: BoxEmitterOptions) {}

  update(pool: ParticlePool, dt: number) {
    this.acc += dt * this.opts.rate
    const count = Math.floor(this.acc)
    this.acc -= count
    const [sx, sy, sz] = this.opts.size
    for (let i = 0; i < count; i++) {
      if (pool.count >= pool.capacity) return
      const x = (Math.random() - 0.5) * sx
      const y = (Math.random() - 0.5) * sy
      const z = (Math.random() - 0.5) * sz
      pool.addParticle([x, y, z], [0, 0, 0])
    }
  }
}
