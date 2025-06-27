export interface DepthOfFieldOptions {
  focusDistance: number
}

export default class DepthOfFieldNodePass {
  constructor(public options: DepthOfFieldOptions) {}
}
