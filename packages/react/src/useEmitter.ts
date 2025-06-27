import { useEffect, useMemo } from 'react'
import type ParticleEngine from '@living-motion/core/dist/ParticleEngine'

export default function useEmitter(engine: ParticleEngine | undefined, Emitter: new (...args: any[]) => any, deps: any[] = []) {
  const instance = useMemo(() => new Emitter(...deps), deps)
  useEffect(() => {
    if (!engine) return
    const remove = engine.addEmitter(instance)
    return () => remove()
  }, [engine, instance])
  return instance
}
