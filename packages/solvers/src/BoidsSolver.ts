import { ParticlePool } from '@living-motion/core'

export interface BoidsOptions {
  viewRadius: number
  separationW: number
  alignW: number
  cohesionW: number
}

export default class BoidsSolver {
  constructor(private opts: BoidsOptions) {}

  update(pool: ParticlePool, dt: number) {
    const { viewRadius, separationW, alignW, cohesionW } = this.opts
    const vr2 = viewRadius * viewRadius
    for (let i = 0; i < pool.count; i++) {
      let count = 0
      let sepX = 0, sepY = 0, sepZ = 0
      let aliX = 0, aliY = 0, aliZ = 0
      let cohX = 0, cohY = 0, cohZ = 0
      const ix = pool.position[i*3]
      const iy = pool.position[i*3+1]
      const iz = pool.position[i*3+2]
      const ivx = pool.velocity[i*3]
      const ivy = pool.velocity[i*3+1]
      const ivz = pool.velocity[i*3+2]
      for (let j = 0; j < pool.count; j++) {
        if (i === j) continue
        const jx = pool.position[j*3]
        const jy = pool.position[j*3+1]
        const jz = pool.position[j*3+2]
        const dx = jx - ix
        const dy = jy - iy
        const dz = jz - iz
        const distSq = dx*dx + dy*dy + dz*dz
        if (distSq < vr2) {
          count++
          aliX += pool.velocity[j*3]
          aliY += pool.velocity[j*3+1]
          aliZ += pool.velocity[j*3+2]
          cohX += dx
          cohY += dy
          cohZ += dz
          if (distSq > 0) {
            sepX -= dx/distSq
            sepY -= dy/distSq
            sepZ -= dz/distSq
          }
        }
      }
      if (count > 0) {
        aliX = aliX/count - ivx
        aliY = aliY/count - ivy
        aliZ = aliZ/count - ivz
        cohX /= count
        cohY /= count
        cohZ /= count
        pool.velocity[i*3] += (sepX*separationW + aliX*alignW + cohX*cohesionW) * dt
        pool.velocity[i*3+1] += (sepY*separationW + aliY*alignW + cohY*cohesionW) * dt
        pool.velocity[i*3+2] += (sepZ*separationW + aliZ*alignW + cohZ*cohesionW) * dt
      }
      pool.position[i*3] += pool.velocity[i*3] * dt
      pool.position[i*3+1] += pool.velocity[i*3+1] * dt
      pool.position[i*3+2] += pool.velocity[i*3+2] * dt
    }
  }
}
