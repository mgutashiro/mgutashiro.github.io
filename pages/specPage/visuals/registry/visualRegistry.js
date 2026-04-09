/**
 * Maps section + panel → visual components (lazy-loaded).
 * Organized by mode (friends / colleague).
 *
 * Used to dynamically load visuals for each panel.
 */

import DualNatureVisual from '../whatIsSpec/dual-natureVisual.jsx';
import SourceVisual from '../commonFramework/sourceVisual.jsx';
import WhiteLightSplittingVisual from '../uvvis/white-light-splittingVisual.jsx';
import ExcitedStateVisual from '../fluorescence/excited-stateVisual.jsx';
import HiddenMotionVisual from '../nmr/hidden-motionVisual.jsx';
import AfterExcitationVisual from '../epr/after-excitationVisual.jsx'
import pumpVisual from '../ultrafast/pumpVisual.jsx'

import QuantizedInteractionVisual from '../whatIsSpec/quantized-lightVisual.jsx';
import FieldStatesVisual from '../commonFramework/field-statesVisual.jsx'
import ResonantExcitationVisual from '../uvvis/resonant-excitationVisual.jsx'
import KashaRelaxationVisual from '../fluorescence/kasha-relaxationVisual.jsx'
import ZeemanSplittingVisual from '../nmr/zeeman-splittingVisual.jsx'
import SpinHamiltonianVisual from '../epr/spin-hamiltonianVisual.jsx'
import DeltaAVisual from '../ultrafast/delta-aVisual.jsx'


import { lazy } from 'react';

const shared = (loader) => ({
  friends: lazy(loader),
  colleague: lazy(loader),
});

export const visualRegistry = {
    'what-is-spectroscopy': {
        'dual-nature': {
            friends: DualNatureVisual,
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
            colleague: QuantizedInteractionVisual,
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
            friends: SourceVisual,
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
            colleague: FieldStatesVisual,
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
            friends: WhiteLightSplittingVisual,
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
            colleague: ResonantExcitationVisual,
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
            friends: ExcitedStateVisual,
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
            colleague: KashaRelaxationVisual
        },

        'quantum-yield': {
            colleague: lazy(() =>
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
            friends: HiddenMotionVisual
        },

        'alignment': {
            friends: lazy(() =>
                import('../nmr/alignmentVisual.jsx')
            ),
        },

        'precession': {
            friends: lazy(() =>
                import('../nmr/precessionVisual.jsx')
            ),
        },

        'signal-spectrum': {
            friends: lazy(() =>
                import('../nmr/signal-spectrumVisual.jsx')
            ),
        },

        'zeeman-splitting': {
            colleague: ZeemanSplittingVisual
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
            friends: AfterExcitationVisual,
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
            colleague: SpinHamiltonianVisual
        },

        'spin-dynamics': {
            colleague: lazy(() =>
                import('../epr/spin-dynamicsVisual.jsx')
            ),
        },
    },

    'ultrafast-ta': {
        'pump': {
            friends: pumpVisual
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
            colleague: DeltaAVisual
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