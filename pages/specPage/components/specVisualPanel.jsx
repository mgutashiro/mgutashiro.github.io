/**
 * Renders the visual companion for each section panel.
 * Dynamically resolves visuals from registry (mode + section + panel).
 *
 * Uses Suspense for lazy loading.
 * Falls back to loading or placeholder if no visual exists.
 */

import React, {  Suspence, useMemo } from 'react';
import { resolveVisualComponent } from '../visuals/registry/visualFallbacks';
import { visualRegistry } from '../visuals/registry/visualRegistry';

export default function SpecVisualPanel({
  sectionId,
  mode,
  panel,
  panelIndex,
}) {
  const panelId = panel?.id ?? 'default';

  const visualId = useMemo(() => {
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
      <aside className="specpageVisualPanel">
        <div className="specVisualStage">
          <VisualPlaceholder panel={panel} visualId={visualId} />
        </div>
      </aside>
    );
  }

  if (!looksRenderable) {
    return (
      <aside className="specpageVisualPanel">
        <div className="specpageVisualStage">
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
    <aside className="specpageVisualPanel">
      <div className="specpageVisualStage">
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


function VisualPlaceholder({ panel, visualId }) {
  return (
    <div className="specpageVisualPlaceholder">
      <p className="specpageVisualEyebrow">Visual placeholder</p>
      <h3>{panel?.heading ?? 'Coming Soon'}</h3>
      <p>No visual has been assigned yet for:</p>
      <code>{visualId}</code>
    </div>
  );
}

function InvalidVisual({ panel, visualId, visualComponent }) {
  return (
    <div className="specpageVisualPlaceholder">
      <p className="specpageVisualEyebrow">Invalid visual</p>
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
        <div className="specpageVisualPlaceholder">
          <p className="specpageVisualEyebrow">Visual crashed</p>
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

