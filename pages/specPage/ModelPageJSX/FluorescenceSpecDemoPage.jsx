import { useState } from 'react';
import SpecDemoViewer from '/pages/specPage/components/ModelDemoComponents/specDemoViewer';
import '/pages/specPage/data/specModelPanels/specModel.css';
import '/pages/specPage/data/specModelPanels/fluorescenceSpecModel.css';

export default function FluorescenceSpecDemoPage() {
    const [mode, setMode] = useState('friends');

    return (
        <main className="SpectroscopyPage SpecModelPage">
            <SpecDemoViewer
                modelId="fluorescence-spec-demo"
                mode={mode}
                setMode={setMode}
                debugNames={true}
            />
        </main>
    );
}