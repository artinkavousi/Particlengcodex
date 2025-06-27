import { WebGPURenderer } from 'three/examples/jsm/renderers/WebGPURenderer.js';
import { PerspectiveCamera, Scene } from 'three';
import ParticlePool from './ParticlePool.js';
import Scheduler from './Scheduler.js';
import UniformBridge from './UniformBridge.js';

export interface EngineOptions {
  canvas: HTMLCanvasElement;
  maxParticles?: number;
}

export default class ParticleEngine {
  readonly renderer: WebGPURenderer;
  readonly scene: Scene;
  readonly camera: PerspectiveCamera;
  readonly pool: ParticlePool;
  readonly scheduler: Scheduler;
  readonly uniformBridge: UniformBridge;

  addSolver(solver: { update(pool: ParticlePool, dt: number): void }) {
    const step = (dt: number) => solver.update(this.pool, dt);
    this.scheduler.add(step);
    return () => this.scheduler.remove(step);
  }

  addEmitter(emitter: { update(pool: ParticlePool, dt: number): void }) {
    const step = (dt: number) => emitter.update(this.pool, dt);
    this.scheduler.add(step);
    return () => this.scheduler.remove(step);
  }

  constructor(opts: EngineOptions) {
    this.renderer = new WebGPURenderer({ canvas: opts.canvas });
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(60, 1, 0.1, 1000);
    this.pool = new ParticlePool(opts.maxParticles ?? 100000);
    this.scheduler = new Scheduler();
    this.uniformBridge = new UniformBridge();
  }

  start() {
    const tick = () => {
      this.scheduler.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(tick);
    };
    tick();
  }

  dispose() {
    this.renderer.dispose();
  }
}
