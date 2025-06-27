import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import type { Scene, Camera, Vector2 } from 'three';

export default class BloomNodePass {
  readonly pass: UnrealBloomPass;
  constructor(resolution: Vector2 = new Vector2(1024, 1024), strength = 1, radius = 0.4, threshold = 0) {
    this.pass = new UnrealBloomPass(resolution, strength, radius, threshold);
  }

  apply(composer: EffectComposer, scene: Scene, camera: Camera) {
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(this.pass);
  }
}
