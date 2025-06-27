import { describe, it, expect } from 'vitest'
import DipoleField from '../src/DipoleField.js'

describe('DipoleField', () => {
  it('samples inverse square vector', () => {
    const field = new DipoleField({ strength: 1 })
    const res = field.sample(new Float32Array([1, 0, 0]))
    expect(res[0]).toBeCloseTo(1)
  })
})
