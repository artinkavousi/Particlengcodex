import { describe, it, expect } from 'vitest'
import MotionBlurNodePass from '../src/MotionBlurNodePass.js'

describe('MotionBlurNodePass', () => {
  it('stores options', () => {
    const pass = new MotionBlurNodePass({ shutter: 0.5 })
    expect(pass.options.shutter).toBe(0.5)
  })
})
