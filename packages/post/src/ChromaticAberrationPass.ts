import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'

export default class ChromaticAberrationPass {
  readonly pass: ShaderPass
  constructor(amount = 0.001) {
    this.pass = new ShaderPass(RGBShiftShader)
    this.pass.uniforms['amount'].value = amount
  }
  apply(composer: EffectComposer) {
    composer.addPass(this.pass)
  }
}
