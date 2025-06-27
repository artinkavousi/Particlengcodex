import { describe, it, expect } from 'vitest'
import DepthOfFieldNodePass from '../src/DepthOfFieldNodePass.js'

describe('DepthOfFieldNodePass', () => {
  it('stores options', () => {
    const pass = new DepthOfFieldNodePass({ focusDistance: 5 })
    expect(pass.options.focusDistance).toBe(5)
  })
})
