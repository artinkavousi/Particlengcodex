export default class ParticlePool {
  capacity: number;
  position: Float32Array;
  velocity: Float32Array;
  count = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.position = new Float32Array(capacity * 3);
    this.velocity = new Float32Array(capacity * 3);
  }

  addParticle(
    position: [number, number, number],
    velocity: [number, number, number]
  ): number {
    if (this.count >= this.capacity) return -1;
    const i = this.count++;
    this.position.set(position, i * 3);
    this.velocity.set(velocity, i * 3);
    return i;
  }
}
