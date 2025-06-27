export interface MeshPhysicalNodeParams {
  metalness: number
}

export default class MeshPhysicalNodeMaterial {
  constructor(public params: MeshPhysicalNodeParams) {}
}
