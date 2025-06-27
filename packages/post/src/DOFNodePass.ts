import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import type { Scene, Camera } from 'three';

export interface DOFOptions {
  focus: number;
  aperture: number;
  maxblur: number;
}

export default class DOFNodePass {
  readonly pass: BokehPass;
  constructor(scene: Scene, camera: Camera, opts: DOFOptions) {
    this.pass = new BokehPass(scene, camera, opts);
  }
  apply(composer: EffectComposer) {
    composer.addPass(this.pass);
  }
}
