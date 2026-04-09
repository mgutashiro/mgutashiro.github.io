/**
 * Renders the visual companion for each section panel.
 * Dynamically resolves visuals from registry (mode + section + panel).
 *
 * Uses Suspense for lazy loading.
 * Falls back to loading or placeholder if no visual exists.
 */

import React, { Suspense, useMemo } from 'react';
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

  const looksRenderable =
    typeof VisualComponent === 'function' ||
    (typeof VisualComponent === 'object' && VisualComponent !== null);

  if (!VisualComponent) {
    return (
      <aside className="specVisualPanel">
        <div className="specVisualStage">
          <VisualPlaceholder panel={panel} visualId={visualId} />
        </div>
      </aside>
    );
  }

  if (!looksRenderable) {
    return (
      <aside className="specVisualPanel">
        <div className="specVisualStage">
          <InvalidVisual
            panel={panel}
            visualId={visualId}
            visualComponent={VisualComponent}
          />
        </div>
      </aside>
    );
  }

  return (
    <aside className="specVisualPanel">
      <div className="specVisualStage">
        {VisualComponent ? (
          // <Suspense fallback={<VisualLoading panel={panel} />}>
            <VisualComponent
              sectionId={sectionId}
              mode={mode}
              panel={panel}
              panelIndex={panelIndex}
            />
          // </Suspense>
        ) : (
          <VisualPlaceholder panel={panel} visualId={visualId} />
        )}
      </div>
    </aside>
  );
}

// function VisualLoading({ panel }) {
//   return (
//     <div className="specVisualPlaceholder">
//       <p className="specVisualEyebrow">Loading visual</p>
//       <h3>{panel?.heading ?? 'Loading...'}</h3>
//       <p>Preparing the companion graphic…</p>
//     </div>
//   );
// }

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

function InvalidVisual({ panel, visualId, visualComponent }) {
  return (
    <div className="specVisualPlaceholder">
      <p className="specVisualEyebrow">Invalid visual</p>
      <h3>{panel?.heading ?? 'Unknown panel'}</h3>
      <p>Resolved visual is not a valid React component.</p>
      <p>
        <strong>visualId:</strong> <code>{visualId}</code>
      </p>
      <p>
        <strong>type:</strong> {typeof visualComponent}
      </p>
    </div>
  );
}

class VisualErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message ?? 'Unknown visual render error',
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Visual render error:', error);
    console.error('Visual render stack:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="specVisualPlaceholder">
          <p className="specVisualEyebrow">Visual crashed</p>
          <h3>{this.props.panel?.heading ?? 'Visual error'}</h3>
          <p>
            <strong>visualId:</strong> <code>{this.props.visualId}</code>
          </p>
          <p>
            <strong>error:</strong> {this.state.errorMessage}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}