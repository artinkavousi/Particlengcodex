export interface BloomOptions {
  intensity: number
}

export default class BloomNodePass {
  constructor(public options: BloomOptions) {}
}
