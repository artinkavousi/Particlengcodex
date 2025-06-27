import { describe, it, expect } from 'vitest'
import ComponentRegistry from '../src/ComponentRegistry.js'

describe('ComponentRegistry', () => {
  it('registers schemas', () => {
    const reg = new ComponentRegistry()
    reg.register({ name: 'test', layout: { foo: 'f32' } })
    expect(reg.get('test')?.layout.foo).toBe('f32')
  })
})
