/**
 * Maps section + panel → visual components (lazy-loaded).
 * Organized by mode (friends / colleague).
 *
 * Used to dynamically load visuals for each panel.
 */

import DualNatureVisual from '../whatIsSpec/dualNatureVisual.jsx';

import SourceVisual from '../commonFramework/sourceVisual.jsx';

import WhiteLightSplittingVisual from '../uvvis/whiteLightSplittingVisual.jsx';

import EmissionVisual from '../fluorescence/FluorSpecEmission.jsx';

import HiddenMotionVisual from '../nmr/nmrHiddenMotionVisual.jsx';

import EPRElectronMagnets from '../epr/eprElectronMagnetsVisual.jsx';

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
            colleague: lazy(() =>
                import('../whatIsSpec/quantizedLightVisual.jsx')
            ),
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
            friends: lazy(() => 
                import('../commonFramework/fieldMatterInteractionVisual.jsx')
            ),
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
            colleague: lazy(() =>
                import('../uvvis/uvvTransmissionVisual.jsx')
            ),
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
        'magnet-motion': {
            friends: HiddenMotionVisual
        },

        'nuclear-neighbors': {
            friends: lazy(() =>
                import('../nmr/nmrNuclearNeighborsVisual.jsx')
            ),
        },

        'nuclear-local-structure': {
            friends: lazy(() =>
                import('../nmr/nmrNuclearStructureMapVisual.jsx')
            ),
        },
        'nuclear-signals': {
            friends: lazy(() =>
                import('../nmr/nmrResponseSignals.jsx')
            ),
        },

        'NuclearMagneticResonance': {
            friends: lazy(() =>
                import('../nmr/NMRResonanceTransitionVisual.jsx')
            ),
        },

        'NuclearChemicalShift': {
            friends: lazy(() =>
                import('../nmr/NMRChemicalShiftShieldingVisual.jsx')
            ),
        },

        'nmrInstrumentFlow': {
            colleague: lazy(() =>
                import('../nmr/NMRInstrumentSignalFlowVisual.jsx')
            ),
        },
    },

    'epr': { 
        'epr-electron-magnets': {
            friends: EPRElectronMagnets,
        },

        'epr-vs-nmr-resonance': {
            friends: lazy(() =>
                import('../epr/eprVsNmrResonanceVisual.jsx')
            ),
        },

        'epr-beer-radical-quality': {
            friends: lazy(() =>
                import('../epr/eprBeerRadicalQualityVisual.jsx')
            ),
        },

        'epr-single-spin-system': {
            colleague: lazy(() =>
                import('../epr/EPRSingleSpinSystemsVisual.jsx')
            ),
        },

        'epr-vs-nmr-magnetic-moment': {
            colleague: lazy(() =>
                import('../epr/EPRVsNMRMagneticMomentVisual.jsx')
            ),
        },
        'EPR-cu2-paramagnetic-spectrum': {
            colleague: lazy(() =>
              import('../epr/EPRCu2ParamagneticSpecVisual.jsx')  
            ),
        },

        'epr-reveal-in-research': {
            colleague: lazy(() =>
                import('../epr/EPRResearchApplicationsVisual.jsx')
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