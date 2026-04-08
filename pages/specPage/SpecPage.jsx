import { useState } from 'react';
import './SpecPage.css';
import { spectroscopySections } from './data/specSections';
import { getTextSectionById } from './data/specText';
import { defaultMode } from './data/specModes';
import SpecSection from './components/SpecSection';

function buildOrderedSections() {
  return spectroscopySections
    .map((id) =>
      id === 'landing'
        ? { id: 'landing', label: 'Graveyard Chemist', hook: 'Spectral Observatorium' }
        : getTextSectionById(id)
    )
    .filter(Boolean);
}

export default function SpectroscopyPage() {
  const orderedSections = buildOrderedSections();
  const [mode, setMode] = useState(defaultMode);

  return (
    <main className="SpectroscopyPage">
      {orderedSections.map((section) => {
        if (section.id === 'landing') {
          return (
            <section key={section.id} className="specLanding">
              <div className="specLandingInner">
                <p className="specSectionLabel">{section.label}</p>
                <h1 className="specLandingTitle">{section.hook}</h1>
              </div>
            </section>
          );
        }

        return (
          <SpecSection
            key={section.id}
            section={section}
            mode={mode}
            setMode={setMode}
            showToggle={true}
          />
        );
      })}
    </main>
  );
}