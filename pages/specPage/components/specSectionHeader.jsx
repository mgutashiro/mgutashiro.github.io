import SpecModeToggle from './specModeToggle';

export default function SpecSectionHeader({ label, hook, mode, onModeChange, showToggle = true }) {
  return (
    <header className="specSectionHeader">
      <div className="specSectionHeading">
        <p className="specSectionLabel">{label}</p>
        <h2 className="specSectionHook">{hook}</h2>
      </div>

      {showToggle && <SpecModeToggle mode={mode} onChange={onModeChange} />}
    </header>
  );
}