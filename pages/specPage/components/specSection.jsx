/**
 * Core section layout for spec page.
 * - Renders header, text panel, and visual panel
 * - Supports mode switching (friends / colleague)
 * - Handles multi-panel navigation (next, back, dots)
 *
 * Resets panel index on section or mode change.
 * Optionally includes a demo link at the bottom.
 */

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SpecSectionHeader from './SpecSectionHeader';
import SpecTextPanel from './SpecTextPanel';
import SpecVisualPanel from './SpecVisualPanel';


export default function SpecSection({
  section,
  mode,
  setMode,
  showToggle = true,
}) {
  const content = section?.modes?.[mode];
  const panels = useMemo(() => content?.panels ?? [], [content]);

  const [panelIndex, setPanelIndex] = useState(0);

  useEffect(() => {
    setPanelIndex(0);
  }, [section?.id, mode]);

  if (!section) return null;

  const hasPanels = panels.length > 0;
  const safePanelIndex = hasPanels
    ? Math.min(panelIndex, panels.length - 1)
    : 0;

  const currentPanel = hasPanels ? panels[safePanelIndex] : null;
  const isFirstPanel = safePanelIndex === 0;
  const isLastPanel = safePanelIndex === panels.length - 1;

  // demo link support
  const demoHref = section.demoHref;
  const demoLabel = section.demoLabel ?? 'Open Demo';
  const hasDemo = Boolean(demoHref);

  function handlePrevPanel() {
    setPanelIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleNextPanel() {
    setPanelIndex((prev) => Math.min(prev + 1, panels.length - 1));
  }

  function handleJumpToPanel(index) {
    setPanelIndex(index);
  }

  return (
    <section className="specSection" id={section.id}>
      <SpecSectionHeader
        label={section.label}
        hook={section.hook}
        section={section}
        mode={mode}
        onModeChange={setMode}
        setMode={setMode}
        showToggle={showToggle}
      />

      <div className="specSectionBody">
        <SpecTextPanel
          panel={currentPanel}
          panelIndex={safePanelIndex}
          panelCount={panels.length}
          setPanelIndex={setPanelIndex}
        />

        <SpecVisualPanel
          sectionId={section.id}
          mode={mode}
          panel={currentPanel}
          panelIndex={safePanelIndex}
        />
      </div>

      {hasPanels && (
        <div className="specPanelControls">
          <div className="specPanelArrowRow">
            <button
              type="button"
              className="specPanelButton specPanelButtonPrev"
              onClick={handlePrevPanel}
              disabled={isFirstPanel}
              aria-label="Go to previous panel"
            >
              ← Back
            </button>

            <span className="specPanelCounter">
              {safePanelIndex + 1} / {panels.length}
            </span>

            <button
              type="button"
              className="specPanelButton specPanelButtonNext"
              onClick={handleNextPanel}
              disabled={isLastPanel}
              aria-label="Go to next panel"
            >
              Next →
            </button>
          </div>

          <div
            className="specPanelDots"
            role="tablist"
            aria-label={`${section.label} panels`}
          >
            {panels.map((panel, index) => {
              const isActive = index === safePanelIndex;
              const panelLabel =
                panel?.heading && panel.heading.trim().length > 0
                  ? `: ${panel.heading}`
                  : '';

              return (
                <button
                  key={panel.id ?? index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to panel ${index + 1}${panelLabel}`}
                  className={`specPanelDot ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleJumpToPanel(index)}
                >
                  <span className="specPanelDotInner" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasDemo && (
        <footer className="specSectionBottom">
          <a
            to={demoHref}
            className="demoLink"
            aria-label={demoLabel}
          >
            {demoLabel}
          </a>
        </footer>
      )}
    </section>
  );
}