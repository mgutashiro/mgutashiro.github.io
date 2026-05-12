import uvvisDoubleBeamUrl from '/src/assets/models/UVVisDoubleBeamModel.glb?url';
import { uvvisDoubleBeamParts } from './specModelPanels/uvvisDoubleBeamParts';

import fluorescenceSpecUrl from '/src/assets/models/spectrofluorometerModel.glb?url';
import { fluorescenceSpecParts } from './specModelPanels/fluorescenceSpecParts';

export const specModelRegistry = {
    'uvvis-double-beam': {
    id: 'uvvis-double-beam',
    title: 'Double-Beam UV-Vis Absorption Spectrometer',
    subtitle: 'One selected wavelength, two paths, one comparison.',
    modelUrl: uvvisDoubleBeamUrl,
    defaultPartId: 'overview',

    camera: {
        position: [4.2, 2.4, 5.2],
        fov: 35,
    },

    lights: {
        ambient: 0.7,
        key: 1.15,
        accent: 0.8,
    },

        scale: 1.12,
        parts: uvvisDoubleBeamParts,
  },
  'fluorescence-spec-demo': {
        id: 'fluorescence-spec-demo',
        title: 'Steady-State Fluorescence Spectrometer',
        subtitle: 'Selected excitation light enters the sample, then emitted fluorescence travels to the detector.',
        modelUrl: fluorescenceSpecUrl,
        defaultPartId: 'overview',
        sceneType: 'fluorescence',

        camera: {
            position: [4.6, 2.7, 5.8],
            fov: 35,
        },

        lights: {
            ambient: 0.72,
            key: 1.25,
            accent: 0.95,
        },
        controls: {
            laser: true,
            openParts: true,
        },

        hotspots: {
            enabled: true,
            partIds: [
                'light-source',
                'excitation-monochromator',
                'sample-chamber',
                't-side-emission-channel',
                'emission-monochromator',
                'pmt-1',
                'pmt-2',
                'monochromator-controller',
                'readout',
            ],
        },

        scale: 1.08,
        parts: fluorescenceSpecParts,
    },
};

export function getSpecModel(modelId) {
    return specModelRegistry[modelId] ?? null;
}