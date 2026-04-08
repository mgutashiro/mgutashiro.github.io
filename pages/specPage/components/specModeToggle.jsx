import { availableModes, modeLabels } from '../data/specModes';

export default function SpecModeToggle({ mode, onChange }) {
  return (
    <div className="specModeToggle" role="tablist" aria-label="Explanation mode">
      {availableModes.map((modeKey) => (
        <button
          key={modeKey}
          type="button"
          className={`specModeButton ${mode === modeKey ? 'is-active' : ''}`}
          onClick={() => onChange(modeKey)}
        >
          {modeLabels[modeKey]}
        </button>
      ))}
    </div>
  );
}