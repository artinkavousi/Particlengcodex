import { ParticlePool } from '@living-motion/core'

export interface PhysarumParams {
  trailDecay: number
}

export default class PhysarumSolver {
  constructor(private params: PhysarumParams) {}

  update(pool: ParticlePool, dt: number) {
    for (let i = 0; i < pool.capacity; i++) {
      const idx = i * 3
      pool.velocity[idx] *= 1 - this.params.trailDecay * dt
      pool.velocity[idx + 1] *= 1 - this.params.trailDecay * dt
      pool.velocity[idx + 2] *= 1 - this.params.trailDecay * dt
      pool.position[idx] += pool.velocity[idx] * dt
      pool.position[idx + 1] += pool.velocity[idx + 1] * dt
      pool.position[idx + 2] += pool.velocity[idx + 2] * dt
    }
  }
}
