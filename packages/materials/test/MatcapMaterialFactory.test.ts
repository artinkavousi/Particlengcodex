import { describe, it, expect } from 'vitest'
import { Texture } from 'three'
import { MatcapMaterialFactory } from '../src/index.js'

describe('MatcapMaterialFactory', () => {
  it('creates a MeshMatcapMaterial', () => {
    const tex = new Texture()
    const mat = MatcapMaterialFactory(tex)
    expect(mat.map).toBe(tex)
  })
})
