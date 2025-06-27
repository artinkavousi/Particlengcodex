export interface CurlNoiseParams {
  scale: number
  octaves: number
}

export default class CurlNoiseField {
  constructor(private params: CurlNoiseParams) {}

  sample(position: Float32Array): [number, number, number] {
    // placeholder - returns zero vector
    return [0, 0, 0]
  }
}
