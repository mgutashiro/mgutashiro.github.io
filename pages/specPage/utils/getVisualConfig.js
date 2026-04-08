import { spectroscopyVisuals } from '../data/specVisuals';

export function getVisualConfig(sectionId) {
  return spectroscopyVisuals[sectionId] ?? null;
}