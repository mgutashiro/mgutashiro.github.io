import { useEffect, useMemo, useState } from 'react';
import { getSpecModel } from '../data/specModelRegistry';
import { getModelPartById } from '../utils/modelParts';
import SpecModelCanvas from './specModelCanvas';
import SpecModelInfoPanel from './specModelInfoPanel';

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

    useEffect(() => {
        document.body.classList.add('SpecModelBodyLocked');

        return () => {
            document.body.classList.remove('SpecModelBodyLocked');
        };
    }, []);

    useEffect(() => {
        setActivePartId(defaultPartId);
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
                    onSelectPart={setActivePartId}
                    onResetPart={() => setActivePartId(defaultPartId)}
                    debugNames={debugNames}
                />
                </div>

                <div className="SpecDemoSide">
                    <div className="SpecDemoToggleShell">
                        <SpecDemoModeToggle
                        mode={mode}
                        setMode={setMode}
                        onModeChange={setMode}
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