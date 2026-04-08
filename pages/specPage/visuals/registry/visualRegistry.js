/**
 * Maps section + panel → visual components (lazy-loaded).
 * Organized by mode (friends / colleague).
 *
 * Used to dynamically load visuals for each panel.
 */

import { lazy } from 'react';

const shared = (loader) => ({
  friends: lazy(loader),
  colleague: lazy(loader),
});

export const visualRegistry = {
    'what-is-spectroscopy': {
        'dual-nature': {
            friends: lazy(() =>
                import('../whatIsSpec/dual-natureVisual.jsx')
            ),
        },

        'interaction': {
            friends: lazy(() => 
                import('../whatIsSpec/interactionVisual.jsx')
            ),
        },

        'measurement': {
            friends: lazy(() =>
                import('../whatIsSpec/measurementVisual.jsx')
            ),
        },

        'quantized-light': {
            colleague: lazy(() =>
                import('../whatIsSpec/quantized-lightVisual.jsx')
            ),
        },

        'transitions': {
            colleague: lazy(() =>
                import('../whatIsSpec/transitionsVisual.jsx')
            ),
        },

        'spectroscopic-observables': {
            colleague: lazy(() =>
                import('../whatIsSpec/spectroscopic-observablesVisual.jsx')
            ),
        },
    },

    'what-all-instruments-have-in-common': {
        'source': {
            friends: lazy(() =>
                import('../commonFramework/sourceVisual.jsx')
            ),
        },

        'sample': {
            friends: lazy(() =>
                import('../commonFramework/sampleVisual.jsx')
            ),
        },

        'detector': {
            friends: lazy(() =>
                import('../commonFramework/detectorVisual.jsx')
            ),
        },

        'field-states': {
            colleague: lazy(() =>
                import('../commonFramework/field-statesVisual.jsx')
            ),
        },

        'coupling': {
            colleague: lazy(() =>
                import('../commonFramework/couplingVisual.jsx')
            ),
        },

        'shared-framework': {
            colleague: lazy(() =>
                import('../commonFramework/shared-frameworkVisual.jsx')
            ),
        },

    },

    'uv-vis': {
        'white-light-splitting': {
            friends: lazy(() =>
                import('../uvvis/white-light-splittingVisual.jsx')
            ),
        },

        'absorption': {
            friends: lazy(() =>
                import('../uvvis/absorptionVisual.jsx')
            ),
        },

        'electron-jump': {
            friends: lazy(() =>
                import('../uvvis/electron-jumpVisual.jsx')
            ),
        },

        'spectrum-forms': {
            friends: lazy(() =>
                import('../uvvis/spectrum-formsVisual.jsx')
            ),
        },

        'resonant-excitation': {
            colleague: lazy(() =>
                import('../uvvis/resonant-excitationVisual.jsx')
            ),
        },

        'beer-lambert': {
            colleague: lazy(() =>
                import('../uvvis/beer-lambertVisual.jsx')
            ),
        },

        'transition-allowance': {
            colleague: lazy(() =>
                import('../uvvis/transition-allowanceVisual.jsx')
            ),
        },
    },

    'fluorescence': {
        'excited-state': {
            friends: lazy(() =>
                import('../fluorescence/excited-stateVisual.jsx')
            ),
        },

        'relaxation': {
            friends: lazy(() =>
                import('../fluorescence/relaxationVisual.jsx')
            ),
        },

        'emission': {
            friends: lazy(() =>
                import('../fluorescence/emissionVisual.jsx')
            ),
        },

        'kasha-relaxation': {
            colleague: lazy(() =>
                import('../fluorescence/kasha-relaxationVisual.jsx')
            ),
        },

        'quantum-yield': {
            colleagye: lazy(() =>
                import('../fluorescence/quantum-yieldVisual.jsx')
            ),
        },

        'stokes-shift': {
            colleague: lazy(() =>
                import('../fluorescence/stokes-shiftVisual.jsx')
            ),
        },
    },

    'nmr': {
        'hidden-motion': {
            friends: lazy(() =>
                import('../nmr/hidden-motionVisual.jsx')
            ),
        },

        'alignment': {
            friends: lazy(() =>
                import('../nmr/alignmentVisual.jsx')
            ),
        },

        'precession': {
            friends: lazy(() =>
                import(',,.nmr/precessionVisual.jsx')
            ),
        },

        'signal-spectrum': {
            friends: lazy(() =>
                import('../nmr/signal-spectrumVisual.jsx')
            ),
        },

        'zeeman-splitting': {
            colleague: lazy(() =>
                import('../nmr/zeeman-splittingVisual.jsx')
            ),
        },

        'larmor-precession': {
            colleague: lazy(() =>
                import('../nmr/larmor-precessionVisual.jsx')
            ),
        },

        'chemical-shift': {
            colleague: lazy(() => 
                import('../nmr/chemical-shiftVisual.jsx')
            ),
        },
    },

    'epr': {
        'after-excitation': {
            friends: lazy(() =>
                import('../epr/after-excitationVisual.jsx')
            ),
        },

        'spin-appears': {
            friends: lazy(() =>
                import('../epr/spin-appearsVisual.jsx')
            ),
        },

        'radical-pair': {
            friends: lazy(() =>
                import('../epr/radical-pairVisual.jsx')
            ),
        },

        'epr-signal': {
            friends: lazy(() =>
                import('../epr/epr-signalVisual.jsx')
            ),
        },

        'spin-hamiltonian': {
            colleague: lazy(() =>
                import('../epr/spin-hamiltonianVisual.jsx')
            ),
        },

        'spin-dynamics': {
            colleague: lazy(() =>
                import('../epr/spin-dynamicsVisual.jsx')
            ),
        },
    },

    'ultrafast-ta': {
        'pump': {
            friends: lazy(() =>
                import('../ultrafast/pumpVisual.jsx')
            ),
        },

        'delay': {
            friends: lazy(() =>
                import('../ultrafast/delayVisual.jsx')
            ),
        },

        'probe': {
            friends: lazy(() =>
                import('../ultrafast/probeVisual.jsx')
            ),
        },

        'evolution': {
            friends: lazy(() =>
                import('../ultrafast/evolutionVisual.jsx')
            ),
        },

        'delta-a': {
            colleague: lazy(() =>
                import('../ultrafast/delta-aVisual.jsx')
            ),
        },

        'spectral-contributions': {
            colleague: lazy(() =>
                import('../ultrafast/spectral-contributionsVisual.jsx')
            ),
        },

        'chirped-probe': {
            colleague: lazy(() =>
                import('../ultrafast/chirped-probeVisual.jsx')
            ),
        },
    },



}