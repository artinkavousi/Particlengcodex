import { ParticlePool } from '@living-motion/core'
import { BufferGeometry } from 'three'

export interface MeshSurfaceEmitterOptions {
  geometry: BufferGeometry
  rate: number
}

export default class MeshSurfaceEmitter {
  private acc = 0
  constructor(private opts: MeshSurfaceEmitterOptions) {
    const pos = opts.geometry.getAttribute('position')
    if (!pos) throw new Error('geometry missing position attribute')
  }

  update(pool: ParticlePool, dt: number) {
    const { geometry, rate } = this.opts
    const posAttr = geometry.getAttribute('position')!
    const index = geometry.index
    const triCount = index ? index.count / 3 : posAttr.count / 3

    this.acc += dt * rate
    const count = Math.floor(this.acc)
    this.acc -= count

    for (let i = 0; i < count; i++) {
      if (pool.count >= pool.capacity) return
      const tri = Math.floor(Math.random() * triCount)
      let a: number, b: number, c: number
      if (index) {
        a = index.getX(tri * 3)
        b = index.getX(tri * 3 + 1)
        c = index.getX(tri * 3 + 2)
      } else {
        a = tri * 3
        b = tri * 3 + 1
        c = tri * 3 + 2
      }
      const r1 = Math.random()
      const r2 = Math.random()
      const sqrtR1 = Math.sqrt(r1)
      const u = 1 - sqrtR1
      const v = r2 * sqrtR1
      const w = 1 - u - v
      const x = posAttr.getX(a) * u + posAttr.getX(b) * v + posAttr.getX(c) * w
      const y = posAttr.getY(a) * u + posAttr.getY(b) * v + posAttr.getY(c) * w
      const z = posAttr.getZ(a) * u + posAttr.getZ(b) * v + posAttr.getZ(c) * w
      pool.addParticle([x, y, z], [0, 0, 0])
    }
  }
}
