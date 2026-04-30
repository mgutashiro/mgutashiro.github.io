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
  },

  'what-is-spectroscopy': {
    kind: 'concept',
    title: 'What Is Spectroscopy',
    visualType: 'introduction',
    modes: {
      friends: {
        parts: [
          { id: 'dual-nature', label: 'Dual Nature Visual', visualKey: 'dual-nature'},
          { id: 'interaction', label: `Interaction Visual`, visualKey: 'interaction' },
          { id: `measurement`, label: `Measurement Visual`, visualKey: `measurement` },
        ],
      },
      colleague: {
        parts: [
          { id: 'quantized-light', label: 'Quantized Light Visual', visualKey: 'quantized-light' },
          { id: 'transitions', label: 'Transitions Visual', visualKey: 'transitions' },
          { id: 'spectroscopic-observables', label: 'Spectroscopic Observables Visual', visualKey: 'spectroscopic-observables' }
        ],
      },
    }
  },

  'what-all-instruments-have-in-common': {
    kind: 'concept',
    title: 'Common Instrument Logic',
    visualType: 'instrument-flow',
    modes: {
      friends: {
        parts: [
          { id: 'source', label: 'Source Visual', visualKey: 'source' },
          { id: 'sample', label: 'Sample Visual', visualKey: 'sample' },
          { id: 'detector', label: 'Detector Visual', visualKey: 'detector' }
        ],
      },
      colleague: {
        parts: [
          { id: 'field-matter-interaction', label: 'Field Matter Interaction Visual', visualKey: 'field-matter-interaction' },
          { id: 'transition-probability-population', label: 'Transition Probability Population Visual', visualKey: 'transition-probability-population' },
          { id: 'unified-spectroscopic-framework', label: 'unified-spectroscopic Framework Visual', visualKey: 'unified-spectroscopic-framework' }
        ],
      },
    },
  },

  'uv-vis': {
    kind: 'instrument',
    title: 'UV-Vis',
    visualType: 'instrument-hotspot',
    demoHref: '/spec/demo/uvvis-double-beam',
    demoLabel: 'Launch UV-Vis Demo',
    modes: {
      friends: {
        parts: [
          { id: 'white-light-splitting', label: 'White Light Splitting Visual', visualKey: 'white-light-splitting' },
          { id: 'absorption', label: 'Absorption Visual', visualKey: 'absorption' },
          { id: 'beam-band', label: 'Beam Band Visual', visualKey: 'beam-band' },
        ],
      },
      colleague: {
        parts: [
          {id: 'uvvisTransmissionVisual', label: 'UV-Vis Transmission Visual', visualKey: 'uvvisTransmissionVisual' },
          {id: 'uvvisMonochromatorVisual', label: 'UV-Vis Monochromator Visual', visualKey: 'uvvisMonochromatorVisual' },
          {id: 'uvvisAbsorbanceRatioVisual', label: 'UV-Vis Absorbance Ratio Visual', visualKey: 'uvvisAbsorbanceRatioVisual' },
          {id: 'uvvisDetectorReadoutVisual', label: 'UV-Vis Detector Readout Visual', visualKey: 'uvvisDetectorReadoutVisual' },
        ],
      },
    },
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