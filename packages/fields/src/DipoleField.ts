export interface DipoleFieldParams {
  strength: number
}

export default class DipoleField {
  constructor(private params: DipoleFieldParams) {}

  sample(position: Float32Array): [number, number, number] {
    const r2 =
      position[0] * position[0] + position[1] * position[1] + position[2] * position[2]
    if (r2 === 0) return [0, 0, 0]
    const inv = this.params.strength / (r2 * Math.sqrt(r2))
    return [position[0] * inv, position[1] * inv, position[2] * inv]
  }
}
