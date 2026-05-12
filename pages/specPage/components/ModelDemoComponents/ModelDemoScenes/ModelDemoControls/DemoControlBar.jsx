import LaserToggle from './LaserToggle';

function ModeToggle({ mode = 'friends', setMode }) {
    if (!setMode) return null;

    return (
        <div className="SpecDemoModeToggle" aria-label="Explanation mode">
            <button
                type="button"
                className={`SpecDemoModeButton ${mode === 'friends' ? 'is-active' : ''}`}
                onClick={() => setMode('friends')}
                aria-pressed={mode === 'friends'}
            >
                Friends Mode
            </button>

            <button
                type="button"
                className={`SpecDemoModeButton ${mode === 'colleague' ? 'is-active' : ''}`}
                onClick={() => setMode('colleague')}
                aria-pressed={mode === 'colleague'}
            >
                Colleague Mode
            </button>
        </div>
    );
}

export default function DemoControlBar({
    mode = 'friends',
    setMode,
    laserOn = false,
    setLaserOn,
    showLaserToggle = false,
}) {
    return (
        <div className="SpecDemoControlBar">
            <ModeToggle
                mode={mode}
                setMode={setMode}
            />

            {showLaserToggle && (
                <LaserToggle
                    laserOn={laserOn}
                    setLaserOn={setLaserOn}
                />
            )}
        </div>
    );
}