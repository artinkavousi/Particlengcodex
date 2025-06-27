import { describe, it, expect } from 'vitest'
import VolumeSignedDistanceMaterial from '../src/VolumeSignedDistanceMaterial.js'

describe('VolumeSignedDistanceMaterial', () => {
  it('stores params', () => {
    const mat = new VolumeSignedDistanceMaterial({ threshold: 0.5 })
    expect(mat.params.threshold).toBe(0.5)
  })
})
