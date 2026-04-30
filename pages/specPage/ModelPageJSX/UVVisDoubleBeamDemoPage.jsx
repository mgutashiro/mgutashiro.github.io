import { useState } from 'react';
import SpecDemoViewer from '/pages/specPage/components/specDemoViewer';
// import SpecModeToggle from '/pages/specPage/components/specModeToggle';
import '/pages/specPage/data/specModelPanels/specModel.css';

export default function UVVisDoubleBeamDemoPage() {
  const [mode, setMode] = useState('friends');

    return (
        <main className="SpectroscopyPage SpecModelPage">
            <SpecDemoViewer
                modelId="uvvis-double-beam"
                mode={mode}
                setMode={setMode}
                debugNames={false}
            />
        </main>
    );
}