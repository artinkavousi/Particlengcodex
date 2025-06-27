import { ParticlePool } from '@living-motion/core'

export interface AudioFFTEmitterOptions {
  fft: Float32Array
  band: number
  rate: number
  position?: [number, number, number]
}

export default class AudioFFTEmitter {
  private acc = 0
  constructor(private opts: AudioFFTEmitterOptions) {}

  update(pool: ParticlePool, dt: number) {
    const value = this.opts.fft[this.opts.band] ?? 0
    this.acc += value * this.opts.rate * dt
    const count = Math.floor(this.acc)
    this.acc -= count
    const [x,y,z] = this.opts.position ?? [0,0,0]
    for (let i = 0; i < count; i++) {
      if (pool.count >= pool.capacity) return
      pool.addParticle([x,y,z],[0,0,0])
    }
  }
}
