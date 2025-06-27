import { ParticlePool } from '@living-motion/core';

export interface SphereEmitterOptions {
  radius: number;
  rate: number; // particles per second
}

export default class SphereEmitter {
  private acc = 0;

  constructor(private opts: SphereEmitterOptions) {}

  update(pool: ParticlePool, dt: number) {
    this.acc += dt * this.opts.rate;
    const count = Math.floor(this.acc);
    this.acc -= count;
    for (let i = 0; i < count; i++) {
      if (pool.count >= pool.capacity) return;
      const r = Math.cbrt(Math.random()) * this.opts.radius;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pool.addParticle([x, y, z], [0, 0, 0]);
    }
  }
}
