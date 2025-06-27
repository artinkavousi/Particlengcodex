export default class ParticlePool {
  capacity: number;
  position: Float32Array;
  velocity: Float32Array;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.position = new Float32Array(capacity * 3);
    this.velocity = new Float32Array(capacity * 3);
  }
}
