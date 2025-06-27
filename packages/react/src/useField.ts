import { useEffect, useMemo } from 'react'
import type ParticleEngine from '@living-motion/core/dist/ParticleEngine'

export default function useField(engine: ParticleEngine | undefined, Field: new (...args: any[]) => any, deps: any[] = []) {
  const instance = useMemo(() => new Field(...deps), deps)
  useEffect(() => {
    if (!engine) return
    const remove = engine.addSolver(instance)
    return () => remove()
  }, [engine, instance])
  return instance
}
