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
    demoHref: '/spec/demo/fluorescence-spec',
    demoLabel: 'Launch Fluorescence Demo',
    modes: {
      friends: {
        parts: [
          { id: 'emission', label: 'Fluorescence Spec Emission', visualKey: 'FluorSpecEmission' },
          { id: 'redshift', label: 'Fluorescence Spec Red Shift', visualKey: 'FluorSpecRedShift' },
          { id: 'speclimits', label: 'Fluorescence Spec Limits', visualKey: 'FluorSpecLimits' },
        ],
      },
      colleague: {
        parts: [
          { id: 'RelaxedPopulation', label: 'Fluorescence Spec Relaxed Population', visualKey: 'fluorRelaxedPopulation' },
          { id: 'MirrorStokesShift', label: 'Fluorescence Spec Mirror Stokes Shift', visualKey: 'fluorescenceMirrorStokesShift' },
          { id: 'DecayPartition', label: 'Fluorescence Spec Decay Partition', visualKey: 'fluorescenceDecayPartition' },
          { id: 'EmissionReadout', label: 'Fluorescence Spec Emission Readout', visualKey: 'fluorEmissionReadout' }
        ],
      },
    },
  },

  nmr: {
    kind: 'instrument',
    title: 'NMR',
    visualType: 'instrument-hotspot',
    demoHref: '',
    modes: {
      friends: {
        parts: [
          { id: 'magnet-motion', label: 'Fluorescence Spec Emission', visualKey: 'hidden-motion' },
          { id: 'nuclear-neighbors', label: 'Nuclear Neighbors', visualKey: 'NuclearNeighbors' },
          { id: 'nuclear-local-structure', label: 'Nuclear Local Structure', visualKey: 'nuclearStructureMap' },
          { id: 'nuclear-signals', label: 'Nuclear Resoinse Signals', visualKey: 'nucleusResponseSignals' },
        ],
      },
      colleague: {
        parts: [
          { id: 'NuclearMagneticResonance', label: 'Nuclear Magnetic Resonance', visualKey: 'nmrResonanceTransition' },
          { id: 'NuclearChemicalShift', label: 'Nuclear Chemical Shift', visualKey: 'nmrChemicalShiftShielding' },
          { id: 'nmrInstrumentFlow', label: 'NMR Instrument Flow', visualKey: 'nmrInstrumentSignalFlow' },
        ],
      },
    },
  },

  epr: {
    kind: 'instrument',
    title: 'TREPR / EPR',
    visualType: 'instrument-hotspot',
    demoHref: '',
    modes: {
      friends: {
        parts: [
          { id: 'epr-electron-magnets', label: 'EPR Electron Magnets', visualKey: 'epr-electron-magnets' },
          { id: 'epr-vs-nmr-resonance', label: 'EPR vs NMR Resonance', visualKey: 'epr-vs-nmr-resonance' },
          { id: 'epr-beer-radical-quality', label: 'EPR beer Radical Quality', visualKey: 'epr-beer-radical-quality' },
        ],
      },
      colleague: {
        parts: [
          { id: 'epr-single-spin-system', label: 'EPR Single Spin Systems', visualKey: 'EPR-single-spin-systems' },
          { id: 'epr-vs-nmr-magnetic-moment', label: 'EPR vs NMR Magnetic Moment', visualKey: 'EPR-vs-nmr-magnetic-moment' },
          { id: 'epr-hyq-radical-spec', label: 'EPR HYQ Radical Spec', visualKey: 'EPR-HYQRadical-spec' },
          { id: 'epr-reveal-in-research', label: 'EPR Reveal in Research', visualKey: 'EPR-research-applications' },
        ],
      },
    },
  },

  'ultrafast-ta': {
    kind: 'instrument',
    title: 'Ultrafast Transient Absorption',
    visualType: 'instrument-hotspot',
    demoHref: '',
    parts: [
      { id: 'ultrafast-continuation', label: 'ultrafast spec continuation', visualKey: 'ultrafast-spec-continuation' },
      { id: 'ultrafast-pump', label: 'Sample', visualKey: 'ultrafast-pump' },
      { id: 'ultrafast-probe', label: 'Discriminator', visualKey: 'ultrafast-probe' },
      { id: 'ultrafast-evolution', label: 'Detector', visualKey: 'ultrafast-evolution' }
    ]
  }
};

export function getVisualConfig(sectionId) {
  return spectroscopyVisuals[sectionId] ?? null;
}