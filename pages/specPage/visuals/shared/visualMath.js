/**
 * Utility math functions for visuals and animations.
 * Includes interpolation, clamping, smoothing, and path generation.
 *
 * Used for consistent motion and positioning logic.
 */

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function clamp01(value) {
  return clamp(value, 0, 1);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function invLerp(a, b, value) {
  if (a === b) return 0;
  return (value - a) / (b - a);
}

export function mapRange(inMin, inMax, outMin, outMax, value) {
  const t = invLerp(inMin, inMax, value);
  return lerp(outMin, outMax, t);
}

export function smoothstep01(t) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export function nearlyEqual(a, b, tolerance = 0.001) {
  return Math.abs(a - b) <= tolerance;
}

export function makeSinePath({
  x0,
  x1,
  y,
  amplitude = 12,
  cycles = 3,
  phase = 0,
  samples = 80,
}) {
  const width = x1 - x0;
  let d = '';

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const x = x0 + width * t;
    const yy = y + amplitude * Math.sin(t * cycles * Math.PI * 2 + phase);

    d += i === 0 ? `M ${x} ${yy}` : ` L ${x} ${yy}`;
  }

  return d;
}