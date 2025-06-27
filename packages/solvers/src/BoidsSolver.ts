import { ParticlePool } from '@living-motion/core'

export interface BoidsParams {
  cohesionW: number
}

export default class BoidsSolver {
  constructor(private params: BoidsParams) {}

  update(pool: ParticlePool, dt: number) {
    let avgX = 0,
      avgY = 0,
      avgZ = 0
    const count = pool.capacity
    for (let i = 0; i < count; i++) {
      avgX += pool.velocity[i * 3]
      avgY += pool.velocity[i * 3 + 1]
      avgZ += pool.velocity[i * 3 + 2]
    }
    avgX /= count
    avgY /= count
    avgZ /= count
    for (let i = 0; i < count; i++) {
      const vxIdx = i * 3
      pool.velocity[vxIdx] += (avgX - pool.velocity[vxIdx]) * this.params.cohesionW * dt
      pool.velocity[vxIdx + 1] +=
        (avgY - pool.velocity[vxIdx + 1]) * this.params.cohesionW * dt
      pool.velocity[vxIdx + 2] +=
        (avgZ - pool.velocity[vxIdx + 2]) * this.params.cohesionW * dt
      pool.position[vxIdx] += pool.velocity[vxIdx] * dt
      pool.position[vxIdx + 1] += pool.velocity[vxIdx + 1] * dt
      pool.position[vxIdx + 2] += pool.velocity[vxIdx + 2] * dt
    }
  }
}
