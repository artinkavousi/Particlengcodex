export interface VolumeSignedDistanceParams {
  threshold: number
}

export default class VolumeSignedDistanceMaterial {
  constructor(public params: VolumeSignedDistanceParams) {}
}
