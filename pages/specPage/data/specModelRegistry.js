import uvvisDoubleBeamUrl from '../specDemoModels/UVVisDoubleBeamModel.glb?url';
import { uvvisDoubleBeamParts } from './specModelPanels/uvvisDoubleBeamParts';

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
};

export function getSpecModel(modelId) {
    return specModelRegistry[modelId] ?? null;
}