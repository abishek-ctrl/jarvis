import { useSyncExternalStore } from 'react'
import { isCalm, setCalm, subscribeCalm } from '../lib/calm'
import { stopAll } from '../lib/music'

/**
 * A small switch in the corner between the full show and calm mode. Turning
 * calm on also stops any music already playing, so the change is immediate.
 */
export function CalmToggle() {
  const calm = useSyncExternalStore(subscribeCalm, isCalm, isCalm)

  const flip = () => {
    setCalm(!calm)
    if (!calm) stopAll()
  }

  return (
    <button
      type="button"
      onClick={flip}
      aria-pressed={calm}
      title={calm ? 'Calm mode on: no music or effects' : 'Full show: music and effects on'}
      style={{
        position: 'fixed',
        top: 'max(12px, env(safe-area-inset-top))',
        right: 'max(12px, env(safe-area-inset-right))',
        zIndex: 50,
        padding: '6px 10px',
        font: '600 11px/1 ui-monospace, monospace',
        letterSpacing: '0.12em',
        color: calm ? '#9fe8ff' : '#ffb36b',
        background: 'rgba(0,0,0,0.45)',
        border: `1px solid ${calm ? '#9fe8ff' : '#ffb36b'}`,
        borderRadius: 6,
        cursor: 'pointer',
        touchAction: 'manipulation',
      }}
    >
      {calm ? 'CALM · ON' : 'CALM · OFF'}
    </button>
  )
}
