import { MeshMatcapMaterial, Texture } from 'three'

export default function MatcapMaterialFactory(matcap: Texture) {
  return new MeshMatcapMaterial({ matcap })
}
