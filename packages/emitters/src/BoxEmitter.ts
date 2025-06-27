import { ParticlePool } from '@living-motion/core'

export interface BoxEmitterOptions {
  size: [number, number, number]
  rate: number
}

export default class BoxEmitter {
  constructor(private options: BoxEmitterOptions) {}

  spawn(pool: ParticlePool, dt: number) {
    const count = Math.min(Math.floor(this.options.rate * dt), pool.capacity)
    for (let i = 0; i < count; i++) {
      const idx = i * 3
      pool.position[idx] = (Math.random() - 0.5) * this.options.size[0]
      pool.position[idx + 1] = (Math.random() - 0.5) * this.options.size[1]
      pool.position[idx + 2] = (Math.random() - 0.5) * this.options.size[2]
    }
  }
}
