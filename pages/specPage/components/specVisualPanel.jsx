import { Suspense, useMemo } from 'react';
import { resolveVisualComponent } from '../visuals/registry/visualFallbacks';
import { visualRegistry } from '../visuals/registry/visualRegistry';

export default function SpecVisualPanel({
  sectionId,
  mode,
  panel,
  panelIndex,
}) {
  const visualId = useMemo(() => {
    const panelId = panel?.id ?? 'default';
    return `${mode}:${sectionId}:${panelId}`;
  }, [mode, sectionId, panel]);

  const VisualComponent = resolveVisualComponent({
    registry: visualRegistry,
    sectionId,
    panelId: panel?.id,
    mode,
  });

  return (
    <aside className="specVisualPanel">
      <div className="specVisualStage">
        {VisualComponent ? (
          <Suspense fallback={<VisualLoading panel={panel} />}>
            <VisualComponent
              sectionId={sectionId}
              mode={mode}
              panel={panel}
              panelIndex={panelIndex}
            />
          </Suspense>
        ) : (
          <VisualPlaceholder panel={panel} visualId={visualId} />
        )}
      </div>
    </aside>
  );
}

function VisualLoading({ panel }) {
  return (
    <div className="specVisualPlaceholder">
      <p className="specVisualEyebrow">Loading visual</p>
      <h3>{panel?.heading ?? 'Loading...'}</h3>
      <p>Preparing the companion graphic…</p>
    </div>
  );
}

function VisualPlaceholder({ panel, visualId }) {
  return (
    <div className="specVisualPlaceholder">
      <p className="specVisualEyebrow">Visual placeholder</p>
      <h3>{panel?.heading ?? 'Coming Soon'}</h3>
      <p>No visual has been assigned yet for:</p>
      <code>{visualId}</code>
    </div>
  );
}