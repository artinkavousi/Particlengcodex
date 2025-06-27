export interface VortexFieldParams {
  strength: number
}

export default class VortexField {
  constructor(private params: VortexFieldParams) {}

  sample(pos: Float32Array): [number, number, number] {
    const [x, y, z] = pos
    const f = this.params.strength
    return [-y * f, x * f, 0]
  }
}
