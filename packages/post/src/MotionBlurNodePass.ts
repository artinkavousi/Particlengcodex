export interface MotionBlurOptions {
  shutter: number
}

export default class MotionBlurNodePass {
  constructor(public options: MotionBlurOptions) {}
}
