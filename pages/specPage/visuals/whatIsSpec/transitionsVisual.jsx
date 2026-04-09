import { useEffect, useState } from 'react';
import '../shared/visualShared.css';
import './transitionsVisual.css';

const PHASES = [
  { id: 'absorption', label: 'Absorption', sublabel: 'energy in' },
  { id: 'emission', label: 'Emission', sublabel: 'energy out' },
  { id: 'scattering', label: 'Scattering', sublabel: 'redirect / exchange' },
];

const LEVELS = [
  { id: 'ghost', className: 'tvLevel--ghost', label: '', y: '78%' },
  { id: 'psi-i', className: 'tvLevel--i', label: 'Ψ_i', y: '54%' },
  { id: 'psi-f', className: 'tvLevel--f', label: 'Ψ_f', y: '30%' },
];

export default function TransitionsVisual() {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    let intervalId;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setPhaseIndex((current) => (current + 1) % PHASES.length);
      }, 2800);
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  const phase = PHASES[phaseIndex];

  return (
    <div
      className="transitionsVisual"
      data-phase={phase.id}
      aria-label={`Eigenstate transition visual showing ${phase.label}`}
    >
      <div className="tvAmbientGlow" aria-hidden="true" />
      <div className="tvScanline" aria-hidden="true" />

      <div className="tvLadder" aria-hidden="true">
        {LEVELS.map((level) => (
          <div
            key={level.id}
            className={`tvLevel ${level.className}`}
            style={{ '--level-y': level.y }}
          >
            {level.label ? (
              <span className="tvLevelLabel">{level.label}</span>
            ) : null}
          </div>
        ))}

        <div className="tvPopulation" />
      </div>

      <div className="tvOperator" aria-hidden="true">
        ⟨Ψ_f | μ̂ | Ψ_i⟩
      </div>

      <svg
        className="tvEventSvg"
        viewBox="0 0 320 240"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Absorption */}
        <g className="tvEventGroup tvEventGroup--absorption">
          <path
            className="tvPhotonTrail tvPhotonTrail--absorption"
            d="M294 130 H 198"
          />
          <circle
            className="tvPhotonOrb tvPhotonOrb--absorption"
            cx="294"
            cy="130"
            r="4.5"
          />

          <path
            className="tvArrowStem tvArrowStem--up"
            d="M160 130 L160 72"
          />
          <path
            className="tvArrowHead tvArrowHead--up"
            d="M152 82 L160 72 L168 82"
          />

          <circle className="tvEventFlash" cx="160" cy="130" r="12" />
        </g>

        {/* Emission */}
        <g className="tvEventGroup tvEventGroup--emission">
          <path
            className="tvArrowStem tvArrowStem--down"
            d="M160 72 L160 130"
          />
          <path
            className="tvArrowHead tvArrowHead--down"
            d="M152 120 L160 130 L168 120"
          />

          <path
            className="tvPhotonTrail tvPhotonTrail--emission"
            d="M194 72 H 294"
          />
          <circle
            className="tvPhotonOrb tvPhotonOrb--emission"
            cx="194"
            cy="72"
            r="4.5"
          />

          <circle className="tvEventFlash" cx="160" cy="72" r="12" />
        </g>

        {/* Scattering */}
        <g className="tvEventGroup tvEventGroup--scattering">
          <path
            className="tvPhotonTrail tvPhotonTrail--scatter-in"
            d="M294 130 H 196"
          />
          <circle
            className="tvPhotonOrb tvPhotonOrb--scatter-in"
            cx="294"
            cy="130"
            r="4.5"
          />

          <circle className="tvInteractionRing" cx="190" cy="130" r="14" />
          <circle className="tvInteractionCore" cx="190" cy="130" r="4" />

          <path
            className="tvScatterPath"
            d="M196 130 Q 170 118 220 88 T 286 66"
          />
        </g>
      </svg>

      <div className="tvBadge" key={phase.id}>
        <div className="tvBadgeLabel">{phase.label}</div>
        <div className="tvBadgeSub">{phase.sublabel}</div>
      </div>
    </div>
  );
}