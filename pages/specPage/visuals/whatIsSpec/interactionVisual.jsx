import './interactionVisual.css'

const RIPPLE_COUNT = 3;

const MOTES = [
  { id: 0, x: '30%', y: '36%', delay: '0.1s' },
  { id: 1, x: '63%', y: '42%', delay: '0.35s' },
  { id: 2, x: '46%', y: '66%', delay: '0.55s' },
];

export default function InteractionVisualResponse() {
    return (
        <div className="visualShell interactionVisualShell">
            <div className="interactionCard" aria-hidden="true">
                <div className="interactionAmbient interactionAmbient--one" />
                <div className="interactionAmbient interactionAmbient--two" />

                <div className="interactionStage">
                    <div className="interactionBeamZone">
                        <span className="interactionBeamLine interactionBeamLine--base" />
                        <span className="interactionBeamLine interactionBeamLine--glow" />
                        <span className="interactionPhoton" />
                    </div>

                    <div className="interactionMatter">
                        <span className="interactionAura" />

                        {Array.from({ length: RIPPLE_COUNT }, (_, i) => (
                            <span
                                key={i}
                                className={`interactionRipple interactionRipple--${i + 1}`}
                            />
                        ))}

                        <div className="interactionSphere">
                            <span className="interactionSphereHighlight" />
                        </div>
                    </div>
                </div>

                <p className="interactionCaption">
                    A gentle pulse of light arrives. The system answers with motion and glow.
                </p>
            </div>
        </div>
    );
}