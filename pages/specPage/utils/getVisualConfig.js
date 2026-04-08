/**
 * Retrieves visual configuration for a given section.
 * Returns null if no config exists.
 */

import { spectroscopyVisuals } from '../data/specVisuals';

export function getVisualConfig(sectionId) {
  return spectroscopyVisuals[sectionId] ?? null;
}