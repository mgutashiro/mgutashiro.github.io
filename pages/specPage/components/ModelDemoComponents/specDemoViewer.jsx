import { useEffect, useMemo, useState } from 'react';
import { getSpecModel } from '../../data/specModelRegistry';
import { getModelPartById } from '../../utils/modelParts';
import SpecModelCanvas from './specModelCanvas';
import SpecModelInfoPanel from './specModelInfoPanel';
import DemoControlBar from './ModelDemoScenes/ModelDemoControls/DemoControlBar';

function SpecDemoModeToggle({ mode, setMode }) {
    return (
        <div className="SpecDemoModeToggle" aria-label="Explanation mode">
            <button
                type="button"
                className={`SpecDemoModeButton ${mode === 'friends' ? 'is-active' : ''}`}
                onClick={() => setMode('friends')}
            >
                Friends Mode
            </button>

            <button
                type="button"
                className={`SpecDemoModeButton ${mode === 'colleague' ? 'is-active' : ''}`}
                onClick={() => setMode('colleague')}
            >
                Colleague Mode
            </button>
        </div>
    );
}

function SpecDemoLaserToggle({ laserOn, setLaserOn }) {
    return (
        <button
            type="button"
            className={`SpecDemoLaserButton ${laserOn ? 'is-active' : ''}`}
            onClick={() => setLaserOn((current) => !current)}
            aria-pressed={laserOn}
        >
            {laserOn ? 'Laser On' : 'Laser Off'}
        </button>
    );
}

function SpecDemoControlBar({
    mode,
    setMode,
    laserOn,
    setLaserOn,
    showLaserToggle = false,
}) {
    return (
        <div className="SpecDemoControlBar">
            <SpecDemoModeToggle
                mode={mode}
                setMode={setMode}
            />

            {showLaserToggle && (
                <SpecDemoLaserToggle
                    laserOn={laserOn}
                    setLaserOn={setLaserOn}
                />
            )}
        </div>
    );
}

export default function SpecDemoViewer({
    modelId = 'uvvis-double-beam',
    mode = 'friends',
    setMode,
    debugNames = false,
}) {
    const config = useMemo(() => getSpecModel(modelId), [modelId]);

    const defaultPartId =
        config?.defaultPartId ?? config?.parts?.[0]?.id ?? null;

    const [activePartId, setActivePartId] = useState(defaultPartId);
    const [laserOn, setLaserOn] = useState(false);
    const [openParts, setOpenParts] = useState({});
    const showLaserToggle = Boolean(config?.controls?.laser);

    useEffect(() => {
        document.body.classList.add('SpecModelBodyLocked');

        return () => {
            document.body.classList.remove('SpecModelBodyLocked');
        };
    }, []);

    useEffect(() => {
        setActivePartId(defaultPartId);
        setLaserOn(false);
        setOpenParts({});
    }, [defaultPartId, modelId]);

    const activePart =
        getModelPartById(config?.parts, activePartId) ??
        config?.parts?.[0] ??
        null;

    if (!config) {
        return (
        <section className="SpecDemoViewer">
            <p>Model not found.</p>
        </section>
        );
    }

    return (
        <section className="SpecDemoViewer">
            <header className="SpecDemoHeader">
                <h1>{config.title}</h1>
                <p>{config.subtitle}</p>
            </header>

            <div className="SpecDemoGrid">
                <div className="SpecDemoCanvasShell">
                <SpecModelCanvas
                    config={config}
                    mode={mode}
                    activePartId={activePartId}
                    selectedPartId={activePartId}
                    onSelectPart={setActivePartId}
                    setSelectedPartId={setActivePartId}
                    onResetPart={() => setActivePartId(defaultPartId)}
                    laserOn={laserOn}
                    openParts={openParts}
                    setOpenParts={setOpenParts}
                    debugNames={debugNames}
                />
                </div>

                <div className="SpecDemoSide">
                    <div className="SpecDemoToggleShell">
                        <DemoControlBar
                            mode={mode}
                            setMode={setMode}
                            laserOn={laserOn}
                            setLaserOn={setLaserOn}
                            showLaserToggle={showLaserToggle}
                        />
                    </div>

                    <SpecModelInfoPanel
                        config={config}
                        activePart={activePart}
                        mode={mode}
                    />
                </div>
            </div>
        </section>
    );
}