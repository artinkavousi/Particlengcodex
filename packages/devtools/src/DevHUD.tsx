import React, { useEffect, useState } from 'react'
import { ParticleEngine } from '@living-motion/core'

export interface DevHUDProps {
  engineRef: ParticleEngine
}

export default function DevHUD({ engineRef }: DevHUDProps) {
  const [fps, setFps] = useState(0)
  useEffect(() => {
    let last = performance.now()
    let frame = 0
    const loop = () => {
      const now = performance.now()
      frame++
      if (now - last >= 1000) {
        setFps(frame)
        frame = 0
        last = now
      }
      requestAnimationFrame(loop)
    }
    loop()
  }, [])
  return <div style={{ position: 'absolute', top: 0, left: 0, color: 'white' }}>FPS: {fps}</div>
}
