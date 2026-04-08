// helper function (clamp, lerp, invLerp)
export function clamp(x, a = 0, b = 1) {
    return Math.min(b, Math.max(a, x))
}

// alias: clamp into [0..1]
export function clamp01(x) {
  return clamp(x, 0, 1)
}

export function lerp(a, b, t) {
    return a + (b - a) * t
}

export function invLerp(a, b, v) {
  // handles NaN / Infinity and a===b
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(v)) return 0
  const d = b - a
  if (d === 0) return 0
  return (v - a) / d
}

// map v from [a..b] into [0..1] and clamps
export function range01(v, a, b) {
  const u = invLerp(a, b, v)
  return clamp(Number.isFinite(u) ? u : 0, 0, 1)
}

// smoothstep on already-normalized t in [0..1]
export function smoothstep01(t) {
    t = clamp(t, 0, 1)
    return t * t * (3 - 2 * t)
}

// smoothstep btwn [edge0..edge1] in v-space
export function smoothstep(v, edge0, edge1) {
    return smoothstep01(range01(v, edge0, edge1))
}

// slightly "smoother" smoothstep
export function smootherstep01(t) {
  t = clamp(t, 0, 1)
  return t * t * t * (t * (t * 6 - 15) + 10)
}

// main helper
// range(t, a, b) returns a clamped 0..1 progress of t within [a..b]
export function range(t, a, b, ease = smoothstep01) {
    const u = range01(t, a, b)
    return ease ? ease(u) : u
}

// pulse centered at 'center' with half-width 'width (in t-space)
// returns 0..1 bump (smooth on/off)
export function pulse(t, center, width = 0.05, ease = smoothstep01) {
    const left = range(t, center - width, center, ease)
    const right = 1 - range(t, center, center + width, ease)
    return clamp(Math.min(left, right), 0, 1)
}

// cubic ease in/out (smooth acceleration + deceleration)
export function easeInOutCubic(t) {
  t = clamp(t, 0, 1)
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}