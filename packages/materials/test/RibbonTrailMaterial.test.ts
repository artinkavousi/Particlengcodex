import { describe, it, expect } from 'vitest'
import RibbonTrailMaterial from '../src/RibbonTrailMaterial.js'

describe('RibbonTrailMaterial', () => {
  it('stores params', () => {
    const mat = new RibbonTrailMaterial({ width: 1 })
    expect(mat.params.width).toBe(1)
  })
})
