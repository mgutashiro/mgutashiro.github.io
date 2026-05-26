/**
 * toggle between explanation modes 
 * renders buttons from availableModes and updates selected Mode
 */
import { availableModes, modeLabels } from '../data/specModes';

export default function specModeToggle({ mode, onChange }) {
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