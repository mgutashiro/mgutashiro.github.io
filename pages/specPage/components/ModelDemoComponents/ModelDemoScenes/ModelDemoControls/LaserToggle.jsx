export default function LaserToggle({
    laserOn = false,
    setLaserOn,
    disabled = false,
    labelOn = 'Laser On',
    labelOff = 'Laser Off',
}) {
    if (!setLaserOn) return null;

    return (
        <button
            type="button"
            className={`SpecDemoLaserButton ${laserOn ? 'is-active' : ''}`}
            onClick={() => {
                if (disabled) return;
                setLaserOn((current) => !current);
            }}
            aria-pressed={laserOn}
            disabled={disabled}
        >
            {laserOn ? labelOn : labelOff}
        </button>
    );
}