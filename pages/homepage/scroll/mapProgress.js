export function clamp(x, a = 0, b = 1) {
  return Math.min(b, Math.max(a, x))
}

export function clamp01(x) {
  return clamp(x, 0, 1)
}

function invLerp(a, b, v) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(v)) return 0
  const d = b - a
  if (d === 0) return 0
  return (v - a) / d
}

function smoothstep01(t) {
  t = clamp01(t)
  return t * t * (3 - 2 * t)
}

export function range(t, a, b, ease = smoothstep01) {
  const u = clamp01(invLerp(a, b, t))
  return ease ? ease(u) : u
}