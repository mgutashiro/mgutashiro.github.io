/**
 * Shared constants for visual layout and styling.
 * Defines sizes, positions, labels, and colors.
 *
 * Keeps visuals consistent and easy to tweak.
 */

export const VISUAL_SIZE = {
  width: 800,
  height: 500,
};

export const PANEL_BOX = {
  rx: 24,
  padding: 24,
};

export const ENERGY_LEVELS = {
  leftX: 110,
  rightX: 320,
  nodeX: 215,
  ys: [110, 180, 260, 340],
};

export const FIELD_ZONE = {
  x0: 430,
  x1: 720,
  y: 220,
};

export const VISUAL_LABELS = {
  friends: {
    states: 'energy steps',
    field: 'incoming light',
    signal: 'what changes',
  },
  colleague: {
    states: 'quantized states',
    field: 'external field',
    signal: 'measured response',
  },
};

export const VISUAL_COLORS = {
  cyan: 'var(--c-glow-1)',
  violet: 'var(--c-glow-2)',
  pink: 'var(--c-glow-3)',
  ink: 'var(--c-ink)',
  metal: 'var(--c-metal-1)',
};