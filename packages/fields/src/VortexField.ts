import { ParticlePool } from '@living-motion/core'

export interface VortexFieldOptions {
  center?: [number, number, number]
  axis?: [number, number, number]
  strength: number
}

export default class VortexField {
  constructor(private opts: VortexFieldOptions) {}

  update(pool: ParticlePool, dt: number) {
    const [cx, cy, cz] = this.opts.center ?? [0, 0, 0]
    const [ax, ay, az] = this.opts.axis ?? [0, 1, 0]
    const k = this.opts.strength
    for (let i = 0; i < pool.count; i++) {
      const x = pool.position[i * 3] - cx
      const y = pool.position[i * 3 + 1] - cy
      const z = pool.position[i * 3 + 2] - cz
      const vx = ay * z - az * y
      const vy = az * x - ax * z
      const vz = ax * y - ay * x
      pool.velocity[i * 3] += vx * k * dt
      pool.velocity[i * 3 + 1] += vy * k * dt
      pool.velocity[i * 3 + 2] += vz * k * dt
    }
  }
}
