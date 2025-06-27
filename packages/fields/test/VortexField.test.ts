import { describe, it, expect } from 'vitest'
import VortexField from '../src/VortexField.js'

describe('VortexField', () => {
  it('returns perpendicular force', () => {
    const field = new VortexField({ strength: 1 })
    const v = field.sample(new Float32Array([1, 0, 0]))
    expect(v[1]).toBeCloseTo(1)
  })
})
