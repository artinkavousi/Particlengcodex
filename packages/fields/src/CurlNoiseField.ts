import { ParticlePool } from '@living-motion/core';

export interface CurlNoiseOptions {
  scale: number;
}

export default class CurlNoiseField {
  constructor(private opts: CurlNoiseOptions) {}

  private noise3d(x: number, y: number, z: number): number {
    const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719);
    return s - Math.floor(s);
  }

  update(pool: ParticlePool, dt: number) {
    const { scale } = this.opts;
    for (let i = 0; i < pool.count; i++) {
      const px = pool.position[i * 3];
      const py = pool.position[i * 3 + 1];
      const pz = pool.position[i * 3 + 2];
      const n = this.noise3d(px * scale, py * scale, pz * scale);
      pool.velocity[i * 3] += Math.cos(n * Math.PI * 2) * dt;
      pool.velocity[i * 3 + 1] += Math.sin(n * Math.PI * 2) * dt;
    }
  }
}
