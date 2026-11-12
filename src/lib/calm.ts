/**
 * Calm mode: no music, no sound effects, no screen-shake or flashes.
 *
 * Speech and the HUD itself are unaffected. It is on by default on touch
 * screens and small viewports, where the full show is too much for a phone,
 * and off on a desktop. The choice is remembered per browser and can be
 * flipped with the CALM button. Storage is wrapped because it may be blocked.
 */

const KEY = 'jarvis.calm'

/** Set once the user (or a stored choice) has decided; null means "not yet". */
let memo: boolean | null = null
const listeners = new Set<() => void>()

function deviceDefault(): boolean {
  try {
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
  } catch {
    return false
  }
}

export function isCalm(): boolean {
  if (memo !== null) return memo
  try {
    const saved = window.localStorage.getItem(KEY)
    if (saved === '1') return true
    if (saved === '0') return false
  } catch {
    // Storage blocked: fall through to the device default.
  }
  return deviceDefault()
}

export function setCalm(on: boolean): void {
  memo = on
  try {
    window.localStorage.setItem(KEY, on ? '1' : '0')
  } catch {
    // Not remembered across reloads, but still applied for this page.
  }
  listeners.forEach((l) => l())
}

export function subscribeCalm(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
