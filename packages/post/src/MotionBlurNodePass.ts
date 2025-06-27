import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

export default class MotionBlurNodePass {
  readonly pass: AfterimagePass;
  constructor(damp = 0.96) {
    this.pass = new AfterimagePass(damp);
  }
  apply(composer: EffectComposer) {
    composer.addPass(this.pass);
  }
}
