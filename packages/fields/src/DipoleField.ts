import { ParticlePool } from '@living-motion/core';

export interface DipoleFieldOptions {
  strength: number;
  posA: [number, number, number];
  posB: [number, number, number];
}

export default class DipoleField {
  constructor(private opts: DipoleFieldOptions) {}

  update(pool: ParticlePool, dt: number) {
    const { strength, posA, posB } = this.opts;
    for (let i = 0; i < pool.count; i++) {
      const x = pool.position[i * 3];
      const y = pool.position[i * 3 + 1];
      const z = pool.position[i * 3 + 2];
      const ax = x - posA[0];
      const ay = y - posA[1];
      const az = z - posA[2];
      const bx = x - posB[0];
      const by = y - posB[1];
      const bz = z - posB[2];
      const aDistSq = ax * ax + ay * ay + az * az + 1e-6;
      const bDistSq = bx * bx + by * by + bz * bz + 1e-6;
      pool.velocity[i * 3] += (-ax / aDistSq + bx / bDistSq) * strength * dt;
      pool.velocity[i * 3 + 1] += (-ay / aDistSq + by / bDistSq) * strength * dt;
      pool.velocity[i * 3 + 2] += (-az / aDistSq + bz / bDistSq) * strength * dt;
    }
  }
}
