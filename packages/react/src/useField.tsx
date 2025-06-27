import { useEffect } from 'react'
import { ParticleEngine } from '@living-motion/core'
import { CurlNoiseField } from '@living-motion/fields'

export default function useField(engine: ParticleEngine, FieldClass: typeof CurlNoiseField, params: any) {
  useEffect(() => {
    const field = new FieldClass(params)
    engine.scheduler.update() // placeholder to register field
    return () => {
      // teardown placeholder
    }
  }, [engine, FieldClass, params])
}
