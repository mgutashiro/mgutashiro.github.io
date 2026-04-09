/**
 * Defines visual configurations for each spectroscopy section.
 * Maps section → visual type, parts, and metadata.
 *
 * Used to drive visual rendering and instrument layouts.
 * Includes helper to fetch config by section id.
 */

export const spectroscopyVisuals = {
  landing: {
    kind: 'hero',
    title: 'Spectroscopy Portal',
    description: 'Intro visual placeholder'
  },

  'what-is-spectroscopy': {
    kind: 'concept',
    title: 'What Is Spectroscopy',
    parts: [
      {
        id: 'quantized-light',
        heading: 'Quantized Interaction',
        visualKey: 'quantized-light',
      },
    ]
  },

  'what-all-instruments-have-in-common': {
    kind: 'concept',
    title: 'Common Instrument Logic',
    visualType: 'instrument-flow',
    parts: [
      { id: 'source', label: 'Source' },
      { id: 'sample', label: 'Sample' },
      { id: 'discriminator', label: 'Discriminator' },
      { id: 'detector', label: 'Detector' }
    ]
  },

  'uv-vis': {
    kind: 'instrument',
    title: 'UV-Vis',
    visualType: 'instrument-hotspot',
    demoHref: '',
    parts: [
      { id: 'source', label: 'Source', title: 'Lamp / Input Light' },
      { id: 'sample', label: 'Sample', title: 'Cuvette / Sample Cell' },
      { id: 'discriminator', label: 'Discriminator', title: 'Monochromator' },
      { id: 'detector', label: 'Detector', title: 'Detector' }
    ]
  },

  fluorescence: {
    kind: 'instrument',
    title: 'Fluorescence',
    visualType: 'instrument-hotspot',
    demoHref: '',
    parts: [
      { id: 'source', label: 'Source', title: 'Excitation Source' },
      { id: 'sample', label: 'Sample', title: 'Emission Region' },
      { id: 'discriminator', label: 'Discriminator', title: 'Emission Selection' },
      { id: 'detector', label: 'Detector', title: 'Emission Detector' }
    ]
  },

  nmr: {
    kind: 'instrument',
    title: 'NMR',
    visualType: 'instrument-hotspot',
    demoHref: '',
    parts: [
      { id: 'source', label: 'Source', title: 'Magnet + RF Pulse' },
      { id: 'sample', label: 'Sample', title: 'Sample Tube' },
      { id: 'discriminator', label: 'Discriminator', title: 'Resonance Selection' },
      { id: 'detector', label: 'Detector', title: 'Receiver Coil' }
    ]
  },

  epr: {
    kind: 'instrument',
    title: 'TREPR / EPR',
    visualType: 'instrument-hotspot',
    demoHref: '',
    parts: [
      { id: 'source', label: 'Source', title: 'Photoexcitation + Microwave Field' },
      { id: 'sample', label: 'Sample', title: 'Radical Pair Region' },
      { id: 'discriminator', label: 'Discriminator', title: 'Spin-State Selection' },
      { id: 'detector', label: 'Detector', title: 'Microwave Detection' }
    ]
  },

  'ultrafast-ta': {
    kind: 'instrument',
    title: 'Ultrafast Transient Absorption',
    visualType: 'instrument-hotspot',
    demoHref: '',
    parts: [
      { id: 'source', label: 'Source', title: 'Pump + Probe Pulses' },
      { id: 'sample', label: 'Sample', title: 'Excited Sample' },
      { id: 'discriminator', label: 'Discriminator', title: 'Delay + Wavelength Sorting' },
      { id: 'detector', label: 'Detector', title: 'Array Detector' }
    ]
  }
};

export function getVisualConfig(sectionId) {
  return spectroscopyVisuals[sectionId] ?? null;
}