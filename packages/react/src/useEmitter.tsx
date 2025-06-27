import { useEffect } from 'react'
import { ParticleEngine } from '@living-motion/core'
import { SphereEmitter } from '@living-motion/emitters'

export default function useEmitter(engine: ParticleEngine, EmitterClass: typeof SphereEmitter, deps: any) {
  useEffect(() => {
    const emitter = new EmitterClass(deps)
    engine.scheduler.update() // placeholder register
    return () => {
      // teardown placeholder
    }
  }, [engine, EmitterClass, deps])
}
