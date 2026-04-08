import { lazy } from 'react';

const shared = (loader) => ({
  friends: lazy(loader),
  colleague: lazy(loader),
});

export const visualRegistry = {
    'what-is-spectroscopy': {
        'dual-nature': {
            friends: lazy(() =>
                import('../whatIsSpec/DualNatureVisual.jsx')
            ),
        },

        'interaction': {
            friends: lazy(() => 
                import('../whatIsSpec/InteractionVisual.jsx')
            ),
        },

        'measurement': {
            friends: lazy(() =>
                import('../whatIsSpec/measurement.jsx')
            ),
        },

        'quantized-light': {
            colleague: lazy(() =>
                import('../whatIsSpec/quantized-light.jsx')
            ),
        },

        'transitions': {
            colleague: lazy(() =>
                import('../whatIsSpec/transitions.jsx')
            ),
        },

        'spectroscopic-observables': {
            colleague: lazy(() =>
                import('../whatIsSpec/spectroscopic-observables.jsx')
            ),
        },
    },

    'what-all-instruments-have-in-common': {
        'source': {
            friends: lazy(() =>
                import('../commonFramework/source.jsx')
            ),
        },

        'sample': {
            friends: lazy(() =>
                import('../commonFramework/sample.jsx')
            ),
        },

        'detector': {
            friends: lazy(() =>
                import('../commonFramework/detector.jsx')
            ),
        },

        'field-states': {
            colleague: lazy(() =>
                import('../commonFramework/field-states.jsx')
            ),
        },

        'coupling': {
            colleague: lazy(() =>
                import('../commonFramework/coupling.jsx')
            ),
        },

        'shared-framework': {
            colleague: lazy(() =>
                import('../commonFramework/shared-framework.jsx')
            ),
        },

    },

    'uv-vis': {

    },

    'fluorescence': {

    },

    'nmr': {

    },

    'epr': {

    },

    'ultrafast-ta': {

    },

}