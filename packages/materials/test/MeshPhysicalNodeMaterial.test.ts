import { describe, it, expect } from 'vitest'
import MeshPhysicalNodeMaterial from '../src/MeshPhysicalNodeMaterial.js'

describe('MeshPhysicalNodeMaterial', () => {
  it('stores params', () => {
    const mat = new MeshPhysicalNodeMaterial({ metalness: 0.8 })
    expect(mat.params.metalness).toBe(0.8)
  })
})
