/**
 * display section title (label + hook)
 * keep header layout consistent across sections
 */
import SpecModeToggle from './specModeToggle';

export default function SpecSectionHeader({ label, hook, mode, onModeChange, showToggle = true }) {
    return (
        <header className="specpageSectionHeader">
            <div className="specpageSectionHeading">
                <p className="specpageSectionLabel">{label}</p>
                <h2 className="specpageSectionHook">{hook}</h2>
            </div>
        
            {showToggle && <SpecModeToggle mode={mode} onChange={onModeChange} />}
        </header>
    );
}