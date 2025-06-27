import { ParticlePool } from '@living-motion/core';

export type SDF = (x: number, y: number, z: number) => number;

export interface SDFGradientFieldOptions {
  sdf: SDF;
  strength: number;
}

export default class SDFGradientField {
  constructor(private opts: SDFGradientFieldOptions) {}

  private gradient(x: number, y: number, z: number, h = 0.01) {
    const { sdf } = this.opts;
    const dx = sdf(x + h, y, z) - sdf(x - h, y, z);
    const dy = sdf(x, y + h, z) - sdf(x, y - h, z);
    const dz = sdf(x, y, z + h) - sdf(x, y, z - h);
    return [dx / (2 * h), dy / (2 * h), dz / (2 * h)] as const;
  }

  update(pool: ParticlePool, dt: number) {
    const { strength } = this.opts;
    for (let i = 0; i < pool.count; i++) {
      const x = pool.position[i * 3];
      const y = pool.position[i * 3 + 1];
      const z = pool.position[i * 3 + 2];
      const [gx, gy, gz] = this.gradient(x, y, z);
      pool.velocity[i * 3] += gx * strength * dt;
      pool.velocity[i * 3 + 1] += gy * strength * dt;
      pool.velocity[i * 3 + 2] += gz * strength * dt;
    }
  }
}
