import { useState } from 'react';
import './SpecPage.css';
import { spectroscopySections } from './data/specSections';
import { getTextSectionById } from './data/specText';
import { defaultMode } from './data/specModes';
import { getVisualConfig } from './data/specVisuals';
import SpecSection from './components/specSection';

function buildOrderedSections() {
  return spectroscopySections
    .map((id) => {
      if (id === 'landing') {
        return {
          id: 'landing',
          label: 'Graveyard Chemist',
          hook: 'Spectral Observatorium',
        };
      }

      const textSection = getTextSectionById(id);
      const visualConfig = getVisualConfig(id);

      if (!textSection) return null;

      return {
        ...textSection,
        demoHref: visualConfig?.demoHref ?? textSection.demoHref,
        demoLabel: visualConfig?.demoLabel ?? textSection.demoLabel,
      };
    })
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
            <section key={section.id} className="specpageLanding">
              <div className="specpageLandingInner">
                <p className="specpageSectionLabel">{section.label}</p>
                <h1 className="specpageLandingTitle">{section.hook}</h1>
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