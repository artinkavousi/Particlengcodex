import { ParticlePool } from '@living-motion/core';

export interface GravityParams {
  g: number;
}

export default class SimpleGravity {
  constructor(private params: GravityParams) {}

  update(pool: ParticlePool, dt: number) {
    for (let i = 0; i < pool.capacity; i++) {
      pool.velocity[i * 3 + 1] -= this.params.g * dt;
      pool.position[i * 3 + 1] += pool.velocity[i * 3 + 1] * dt;
    }
  }
}
