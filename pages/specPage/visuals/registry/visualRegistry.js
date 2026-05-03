/**
 * Maps section + panel → visual components (lazy-loaded).
 * Organized by mode (friends / colleague).
 *
 * Used to dynamically load visuals for each panel.
 */

import DualNatureVisual from '../whatIsSpec/dualNatureVisual.jsx';
import QuantizedInteractionVisual from '../whatIsSpec/quantizedLightVisual.jsx';

import SourceVisual from '../commonFramework/sourceVisual.jsx';
import FieldMatterInteractionVisual from '../commonFramework/fieldMatterInteractionVisual.jsx';

import WhiteLightSplittingVisual from '../uvvis/whiteLightSplittingVisual.jsx';
import UVVTransmissionVisual from '../uvvis/uvvTransmissionVisual.jsx';

import EmissionVisual from '../fluorescence/FluorSpecEmission.jsx';

import HiddenMotionVisual from '../nmr/hidden-motionVisual.jsx';
import ZeemanSplittingVisual from '../nmr/zeeman-splittingVisual.jsx';

import AfterExcitationVisual from '../epr/after-excitationVisual.jsx';
import SpinHamiltonianVisual from '../epr/spin-hamiltonianVisual.jsx';

import pumpVisual from '../ultrafast/pumpVisual.jsx';
import DeltaAVisual from '../ultrafast/delta-aVisual.jsx';


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
                import('../whatIsSpec/specObservablesVisual.jsx')
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

        'field-matter-interaction': {
            colleague: FieldMatterInteractionVisual,
        },

        'transition-probability-population': {
            colleague: lazy(() =>
                import('../commonFramework/transitionProbPopVisual.jsx')
            ),
        },

        'unified-spectroscopic-framework': {
            colleague: lazy(() =>
                import('../commonFramework/unifiedSpecFrameworkVisual.jsx')
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

        'beam-band': {
            friends: lazy(() =>
                import('../uvvis/beamBandVisual.jsx')
            ),
        },

        'uvvisTransmissionVisual': {
            colleague: UVVTransmissionVisual,
        },

        'uvvisMonochromatorVisual': {
            colleague: lazy(() =>
                import('../uvvis/uvvMonochromatorVisual.jsx')
            ),
        },

        'uvvisAbsorbanceRatioVisual': {
            colleague: lazy(() =>
                import('../uvvis/uvvAbsorbanceRatioVisual.jsx')
            ),
        },

        'uvvisDetectorReadoutVisual': {
            colleague: lazy(() =>
                import('../uvvis/uvvDetectorReadoutVisual.jsx')
            ),
        },
    },

    'fluorescence': {
        'emission': {
            friends: EmissionVisual,
        },

        'redshift': {
            friends: lazy(() =>
                import('../fluorescence/FluorSpecRedShift.jsx')
            ),
        },

        'speclimits': {
            friends: lazy(() =>
                import('../fluorescence/FluorSpecLimits.jsx')
            ),
        },

        'RelaxedPopulation': {
            colleague: lazy(() =>
                import('../fluorescence/fluorRelaxedPopulation.jsx')
            ),
        },

        'MirrorStokesShift': {
            colleague: lazy(() =>
                import('../fluorescence/fluorMirrorStokesShift.jsx')
            ),
        },

        'DecayPartition': {
            colleague: lazy(() =>
                import('../fluorescence/fluorDecayPartition.jsx')
            ),
        },

        'EmissionReadout': {
            colleague: lazy(() =>
                import('../fluorescence/fluorEmissionReadout.jsx')
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