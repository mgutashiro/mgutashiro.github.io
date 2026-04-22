/**
 * Toggle between explanation modes (e.g. friends / colleague).
 * Renders buttons from availableModes and updates selected mode.
 *
 * Highlights active mode for UI feedback.
 */

import { availableModes, modeLabels } from '../data/specModes';

export default function SpecModeToggle({ mode, onChange }) {
  return (
    <div className="specpageModeToggle" role="tablist" aria-label="Explanation mode">
      {availableModes.map((modeKey) => (
        <button
          key={modeKey}
          type="button"
          className={`specpageModeButton ${mode === modeKey ? 'is-active' : ''}`}
          onClick={() => onChange(modeKey)}
        >
          {modeLabels[modeKey]}
        </button>
      ))}
    </div>
  );
}