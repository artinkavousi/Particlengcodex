import { describe, it, expect } from 'vitest'
import ChromaticAberrationNodePass from '../src/ChromaticAberrationNodePass.js'

describe('ChromaticAberrationNodePass', () => {
  it('stores options', () => {
    const pass = new ChromaticAberrationNodePass({ offset: 0.5 })
    expect(pass.options.offset).toBe(0.5)
  })
})
