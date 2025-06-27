import { useEffect } from 'react'
import { UniformBridge } from '@living-motion/core'

export default function useGSAPBridge(bridge: UniformBridge, timeline: any) {
  useEffect(() => {
    if (!timeline) return
    const update = () => {
      // placeholder syncing
    }
    timeline.eventCallback('onUpdate', update)
    return () => {
      timeline.eventCallback('onUpdate', null)
    }
  }, [bridge, timeline])
}
