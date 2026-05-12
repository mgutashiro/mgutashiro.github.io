const sharedChildExplanations = {
    apertureStop: {
        label: 'Aperture Stop',
        title: 'Aperture Stop',
        body: {
            friends:
                'An aperture stop helps control which part of the light path is allowed through. Think of it like a tiny gate for the beam.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `An aperture stop limits the spatial extent of the beam and helps control stray light, beam diameter, and optical throughput.`,
                        },
                        {
                            type: 'text',
                            value: `In a spectrometer, aperture placement can affect intensity, alignment tolerance, and how much unwanted scattered light reaches later optics or the detector.`,
                        },
                    ],
                },
            ],
        },
    },

    diffractionGrating: {
        label: 'Diffraction Grating',
        title: 'Diffraction Grating',
        body: {
            friends:
                'A diffraction grating spreads light by wavelength. It helps the instrument choose which color goes forward.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `A diffraction grating disperses light by wavelength. Rotating or positioning the grating changes which wavelength is directed toward the exit slit.`,
                        },
                        {
                            type: 'text',
                            value: `In the excitation monochromator, the grating selects the incoming excitation wavelength. In the emission monochromator, the same principle selects the emitted wavelength reaching the detector.`,
                        },
                    ],
                },
            ],
        },
    },
    collimatingMirror: {
        label: 'Collimating Mirror',
        title: 'Collimating Mirror',
        body: {
            friends:
                'A collimating mirror helps shape the light so it travels in a more controlled direction before it reaches the grating.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `A collimating mirror converts diverging light into a more parallel beam before dispersion by the grating, or helps refocus dispersed light toward a slit depending on the optical layout.`,
                        },
                    ],
                },
            ],
        },
    },
    entranceSlit: {
        label: 'Entrance Slit',
        title: 'Entrance Slit',
        body: {
            friends:
                'The entrance slit is where light enters the monochromator. It helps define how much light gets inside.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The entrance slit defines the input beam geometry for the monochromator. It affects throughput, spectral bandpass, and stray-light control.`,
                        },
                    ],
                },
            ],
        },
    },
    exitSlit: {
        label: 'Exit Slit',
        title: 'Exit Slit',
        body: {
            friends:
                'The exit slit lets only the selected part of the spread-out light leave the monochromator.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The exit slit selects the wavelength band leaving the monochromator. Its width strongly affects spectral resolution and signal intensity.`,
                        },
                    ],
                },
            ],
        },
    },
    filterHolder: {
        label: 'Filter Holder',
        title: 'Filter Holder',
        body: {
            friends:
                'A filter holder is where a filter can sit to block unwanted light before it reaches the next part of the instrument.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `A filter holder positions optical filters in the beam path. Filters can reduce stray excitation light, remove unwanted wavelength regions, or protect the detector from excessive signal.`,
                        },
                    ],
                },
            ],
        },
    },
    polarizer: {
        label: 'Polarizer',
        title: 'Polarizer',
        body: {
            friends:
                'A polarizer only lets light with a certain orientation pass through. It is like giving the light a direction rule.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `A polarizer selects a polarization component of the light. In fluorescence measurements, polarization optics can be used for anisotropy, orientation, or polarization-bias control.`,
                        },
                    ],
                },
            ],
        },
    },
    shutter: {
        label: 'Shutter',
        title: 'Shutter',
        body: {
            friends:
                'A shutter opens or closes the light path. It is basically a controllable gate for the beam.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `A shutter blocks or permits light through a selected optical path. It can protect the sample, control exposure, or isolate optical channels during measurement setup.`,
                        },
                    ],
                },
            ],
        },
    },
    lens: {
        label: 'Lens',
        title: 'Beam-Shaping Lens',
        body: {
            friends:
                'A lens helps bend, focus, or spread the light so the beam reaches the next part of the instrument correctly.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `Lenses shape the beam by focusing, collecting, or expanding light. In a fluorometer, lens placement affects excitation delivery, emission collection efficiency, throughput, and alignment sensitivity.`,
                        },
                    ],
                },
            ],
        },
    },
    pmtPhotocathode: {
        label: 'Photocathode',
        title: 'PMT Photocathode',
        body: {
            friends:
                'The photocathode is the first surface the light hits inside the PMT. When light reaches it, it starts the detector signal.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The photocathode converts incoming photons into electrons through the photoelectric effect. This is the first step in turning weak fluorescence into an electrical signal.`,
                        },
                    ],
                },
            ],
        },
    },
    pmtFocusingElectrode: {
        label: 'Focusing Electrode',
        title: 'PMT Focusing Electrode',
        body: {
            friends:
                'The focusing electrode helps guide the first electrons toward the dynodes so the signal can grow in the right direction.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The focusing electrode directs photoelectrons from the photocathode toward the dynode chain. This improves collection efficiency and helps maintain the electron-multiplication path.`,
                        },
                    ],
                },
            ],
        },
    },
    pmtDynodeChain: {
        label: 'Dynode Chain',
        title: 'PMT Dynode Chain',
        body: {
            friends:
                'The dynodes multiply the signal. One tiny light-triggered electron becomes many electrons as it bounces through the chain.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The dynode chain amplifies the electron signal by secondary emission. Each dynode releases additional electrons, producing a larger current by the time the signal reaches the anode.`,
                        },
                    ],
                },
            ],
        },
    },
    pmtPhotoanode: {
        label: 'Photoanode',
        title: 'PMT Photoanode',
        body: {
            friends:
                'The photoanode collects the multiplied electron signal at the end of the PMT.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The anode collects the amplified electron cascade from the dynode chain. The collected charge becomes the electrical output signal of the PMT.`,
                        },
                    ],
                },
            ],
        },
    },
    pmtCircuitSimple: {
        label: 'PMT Circuit',
        title: 'PMT Circuit, Power, and Output',
        body: {
            friends:
                'These parts power the PMT and help carry the detector signal out to the instrument readout.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The PMT circuit parts represent the power supply, resistor chain, circuit base, and output meter. Together, they provide the voltage distribution needed for electron multiplication and route the detector signal toward readout.`,
                        },
                    ],
                },
            ],
        },
    },
};

function makeSharedChildPart({
    id,
    parentId,
    sharedConceptId,
    objectNames,
    label,
    title,
}) {
    const shared = sharedChildExplanations[sharedConceptId];

    if (!shared) {
        throw new Error(`Missing shared child explanation: ${sharedConceptId}`);
    }

    return {
        id,
        parentId,
        sharedConceptId,
        kind: 'child',
        label: label ?? shared.label,
        title: title ?? shared.title,
        objectNames,
        body: shared.body,
    };
}

export const fluorescenceSpecParts = [
    {
        id: 'overview',
        label: 'Overview',
        title: 'Steady-State Fluorescence Spectrometer',
        objectNames: [],
        body: {
            friends:
                'This demo follows the light through a fluorescence spectrometer: the source sends light in, the excitation side chooses the incoming color, the sample gives light back, and the detector turns that faint glow into a spectrum.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `A steady-state fluorescence spectrometer uses a continuous light source, excitation wavelength selection, a sample chamber, emission collection optics, an emission monochromator, and photomultiplier detection.`,
                        },
                        {
                            type: 'text',
                            value: `Compared with UV-Vis absorption, the key change is the observable. UV-Vis measures how much light is removed from a transmitted beam, while fluorescence measures emitted light from a relaxed excited-state population.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The excitation and emission paths are separated optically. In many fluorometer layouts, fluorescence is collected from the side of the sample, often near 90° relative to the excitation beam, to reduce direct excitation light reaching the detector.`,
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'light-source',
        label: 'Light Source',
        title: 'Light Source',
        kind: 'base',
        objectNames: [
            'LightSourceBase',
        ],
        children: [
            'AnodeBox',
            'AnodeBullet',
            'Capacitors',
            'CathodeBox',
            'CathodeBullet',
            'CircuitBase',
            'LightSourceBase',
            'LightSourcceCircuitBase',
            'LightSourceLens',
            'LightSourceLensBase',
            'LightSourcePowerSupplyBase',
            'XeLampGlass'
        ],
        body: {
            friends:
                'This is where the light starts. The source gives the instrument a bright range of light, and the next section chooses which part of that light gets sent into the sample.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The light source module represents the continuous broadband excitation source and its supporting electronics. In a steady-state fluorescence experiment, this source provides the radiation that will later be narrowed by the excitation monochromator.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `This parent module can later contain child explanations for the xenon lamp, anode/cathode region, capacitors, circuit base, source lens, and power supply. Those parts belong to the source system but do not need to be separate base modules.`,
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'excitation-monochromator',
        label: 'Excitation Monochromator',
        title: 'Dual-Grating Excitation Monochromator',
        kind: 'base',
        objectNames: [
            'ExciMonoBase',
        ],
        children: [
            'ApertureStop1',
            'ApertureStop2',
            'CollimatingMirror1',
            'CollimatingMirror1Mirror',
            'CollimatingMirror2',
            'CollimatingMirror2Mirror',
            'DiffractionGrating1',
            'DiffractionGrating1Screen',
            'ExcMonoEntSlit',
            'ExcMonoExitSlit',
        ],
        body: {
            friends:
                'This section chooses the color of light going into the sample. The lamp makes many colors, but the excitation monochromator helps pick the one used for the experiment.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The excitation monochromator module selects the excitation wavelength band from the broadband source. This determines which wavelength reaches the sample and prepares the fluorescent excited-state population.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `This parent module can later contain child explanations for the entrance slit, exit slit, aperture stops, collimating mirror, and diffraction grating. Repeated optical parts, such as aperture stops or gratings, can reuse shared explanation text across different parent modules.`,
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'sample-chamber',
        label: 'Sample Chamber',
        title: 'Sample Chamber',
        kind: 'base',
        objectNames: [
            'SampleChamberBase',
            'TSideEmissionChannelbase',
        ],
        children: [
            'ApertureStop3',
            'BS',
            'FilterHolder1',
            'FilterHolder2',
            'FilterHolder3',
            'Polarizer1',
            'Polarizer1Screen',
            'Polarizer2',
            'Polarizer2Screen',
            'RefCell',
            'RefLiquid',
            'SampleCell',
            'SampleLiquid',
            'Shutter1',
            'Shutter2',
            'Shutter3',
            'ConvexLens2',
            'ConvexLens3',
            'ConvexLens4',
            'ConcaveLens2',
            'ConcaveLens3',
            'ConcaveLens4',
            'FilterHolder4',
            'Polarizer3',
            'Polarizer3Screen',
            'Shutter4',
        ],
        body: {
            friends:
                'This is where the molecule responds. The selected light reaches the sample, the sample absorbs it, and then some of that energy comes back out as fluorescence.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The sample chamber is the interaction region of the instrument. Excitation light enters the chamber, interacts with the sample, and fluorescence is collected into a separate emission path.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `This parent module can later contain child explanations for the sample cell, reference cell, beam splitter, filter holders, polarizers, shutters, and aperture stop. These parts control how light enters, interacts with, and leaves the sample region.`,
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'emission-monochromator',
        label: 'Emission Monochromator',
        title: 'Emission Monochromator',
        kind: 'base',
        objectNames: [
            'EmissionMono',
        ],
        children: [
            'ApertureStop4',
            'CollimatingMirror3',
            'CollimatingMirror3Mirror',
            'DiffractionGrating2',
            'DiffractionGrating2Screen',
            'EmissionmonoEntSlit',
            'EmissionMonoExitSlit',
        ],
        body: {
            friends:
                'This section chooses which emitted color reaches the detector. The sample may give back a range of light, and the emission monochromator helps sort it into a spectrum.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The emission monochromator selects the wavelength window reaching the detector. Scanning this wavelength selection produces fluorescence intensity as a function of emission wavelength.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `This parent module can later contain child explanations for the entrance slit, exit slit, aperture stop, collimating mirror, and diffraction grating. The grating explanation can share the same conceptual text as the excitation grating while still being parented to the emission monochromator.`,
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'monochromator-controller',
        label: 'Monochromator Controller',
        title: 'Monochromator Controller Computer',
        kind: 'base',
        objectNames: [
            'MonoCompBase'
        ],
        body: {
            friends:
                'This controller represents the part of the instrument that tells the monochromators what wavelength to select during the experiment.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The monochromator controller represents the electronics or software interface that coordinates wavelength selection. During a scan, the selected wavelength must be synchronized with detector readout.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `In the full demo, this module can help connect the optical instrument to the measurement logic: wavelength selection, scan position, detector timing, and readout coordination.`,
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'readout',
        label: 'Readout',
        title: 'Computer Readout',
        kind: 'base',
        objectNames: [
            'PC',
            'PCScreen',
        ],
        body: {
            friends:
                'The computer turns the detector signal into a plot. That final plot shows how strongly the sample fluoresces at different wavelengths.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The readout module represents signal processing and display. The detector output is converted into a fluorescence spectrum, usually shown as emission intensity versus wavelength.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The final spectrum reflects both the molecular emission behavior and the instrument response, including slit width, detector sensitivity, optical throughput, background signal, and correction procedures.`,
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'pmt-1',
        label: 'PMT 1',
        title: 'Photomultiplier Tube 1',
        kind: 'base',
        objectNames: [
            'PMTBase1',
            'PMTHolder1',
            'PMTHolder2',
        ],
        children: [
            'Dynode1.1',
            'Dynode1.2',
            'Dynode1.3',
            'Dynode1.4',
            'Dynode1.5',
            'Dynode1.6',
            'Dynode1.7',
            'Dynode1.8',
            'FocusingElectrode1',
            'PhotoAnode1',
            'PhotoCathode1',
            'PMTCircuitBase1',
            'PMTOutputMeter1',
            'PowerSupply1',
            'Resistor1.1',
            'Resistor1.2',
            'Resistor1.3',
            'Resistor1.4',
            'Resistor1.5',
            'Resistor1.6',
            'Resistor1.7',
        ],
        body: {
            friends:
                'PMT 1 is a sensitive light detector. It catches faint fluorescence and turns it into a stronger electrical signal.',

            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `PMT 1 represents a photomultiplier detection channel. Incoming photons are converted to electrons at the photocathode, multiplied through the dynode chain, and collected as an electrical signal at the anode.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `Because fluorescence can be weak, PMTs are useful when the detector needs high sensitivity and strong signal amplification.`,
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'pmt-2',
        label: 'PMT 2',
        title: 'Photomultiplier Tube 2',
        kind: 'base',
        objectNames: [
            'PMTBase2',
            'PMTHolder3',
            'PMTHolder4',
        ],
        children: [
            'Dynode2.1',
            'Dynode2.2',
            'Dynode2.3',
            'Dynode2.4',
            'Dynode2.5',
            'Dynode2.6',
            'Dynode2.7',
            'Dynode2.8',
            'FocusingElectrode2',
            'PhotoAnode2',
            'PhotoCathode2',
            'PMTCircuitBase2',
            'PMTOutputMeter2',
            'PowerSupply2',
            'Resistor2.1',
            'Resistor2.2',
            'Resistor2.3',
            'Resistor2.4',
            'Resistor2.5',
            'Resistor2.6',
            'Resistor2.7',
        ],
    },
    makeSharedChildPart({
        id: 'excitation-aperture-stops',
        parentId: 'excitation-monochromator',
        sharedConceptId: 'apertureStop',
        objectNames: [
            'ApertureStop1',
            'ApertureStop2',
        ],
    }),
    makeSharedChildPart({
        id: 'sample-aperture-stop',
        parentId: 'sample-chamber',
        sharedConceptId: 'apertureStop',
        objectNames: [
            'ApertureStop3',
        ],
    }),
    makeSharedChildPart({
        id: 'emission-aperture-stop',
        parentId: 'emission-monochromator',
        sharedConceptId: 'apertureStop',
        objectNames: [
            'ApertureStop4',
        ],
    }),
    makeSharedChildPart({
        id: 'excitation-diffraction-grating',
        parentId: 'excitation-monochromator',
        sharedConceptId: 'diffractionGrating',
        objectNames: [
            'DiffractionGrating1',
            'DiffractionGrating1Screen',
        ],
    }),
    makeSharedChildPart({
        id: 'emission-diffraction-grating',
        parentId: 'emission-monochromator',
        sharedConceptId: 'diffractionGrating',
        objectNames: [
            'DiffractionGrating2',
            'DiffractionGrating2Screen',
        ],
    }),
    makeSharedChildPart({
        id: 'excitation-collimating-mirror',
        parentId: 'excitation-monochromator',
        sharedConceptId: 'collimatingMirror',
        objectNames: [
            'CollimatingMirror1',
            'CollimatingMirror1Mirror',
            'CollimatingMirror2',
            'CollimatingMirror2Mirror',
        ],
    }),
    makeSharedChildPart({
        id: 'emission-collimating-mirror',
        parentId: 'emission-monochromator',
        sharedConceptId: 'collimatingMirror',
        objectNames: [
            'CollimatingMirror3',
            'CollimatingMirror3Mirror',
        ],
    }),
    makeSharedChildPart({
        id: 'excitation-entrance-slit',
        parentId: 'excitation-monochromator',
        sharedConceptId: 'entranceSlit',
        objectNames: [
            'ExcMonoEntSlit',
        ],
    }),
    makeSharedChildPart({
        id: 'emission-entrance-slit',
        parentId: 'emission-monochromator',
        sharedConceptId: 'entranceSlit',
        objectNames: [
            'EmissionMonoEntSlit',
        ],
    }),
    makeSharedChildPart({
        id: 'excitation-exit-slit',
        parentId: 'excitation-monochromator',
        sharedConceptId: 'exitSlit',
        objectNames: [
            'ExcMonoExitSlit',
        ],
    }),
    makeSharedChildPart({
        id: 'emission-exit-slit',
        parentId: 'emission-monochromator',
        sharedConceptId: 'exitSlit',
        objectNames: [
            'EmissionMonoExitSlit',
        ],
    }),
    makeSharedChildPart({
        id: 'sample-filter-holders',
        parentId: 'sample-chamber',
        sharedConceptId: 'filterHolder',
        objectNames: [
            'FilterHolder1',
            'FilterHolder2',
            'FilterHolder3',
            'FilterHolder4',
        ],
    }),
    makeSharedChildPart({
        id: 'sample-polarizers',
        parentId: 'sample-chamber',
        sharedConceptId: 'polarizer',
        objectNames: [
            'Polarizer1',
            'Polarizer1Screen',
            'Polarizer2',
            'Polarizer2Screen',
            'Polarizer3',
            'Polarizer3Screen',
        ],
    }),
    makeSharedChildPart({
        id: 'sample-shutters',
        parentId: 'sample-chamber',
        sharedConceptId: 'shutter',
        objectNames: [
            'Shutter1',
            'Shutter2',
            'Shutter3',
            'Shutter4',
        ],
    }),
    makeSharedChildPart({
        id: 'lens-system',
        parentId: 'optical-path',
        sharedConceptId: 'lens',
        objectNames: [
            'ConcaveLens2',
            'ConcaveLens3',
            'ConcaveLens4',
            'ConvexLens2',
            'ConvexLens3',
            'ConvexLens4',
        ],
    }),
    makeSharedChildPart({
        id: 'pmt-1-photocathode',
        parentId: 'pmt-1',
        sharedConceptId: 'pmtPhotocathode',
        objectNames: [
            'PhotoCathode1',
        ],
    }),
    makeSharedChildPart({
        id: 'pmt-2-photocathode',
        parentId: 'pmt-2',
        sharedConceptId: 'pmtPhotocathode',
        objectNames: [
            'PhotoCathode2',
        ],
    }),
    makeSharedChildPart({
        id: 'pmt-1-focusing-electrode',
        parentId: 'pmt-1',
        sharedConceptId: 'pmtFocusingElectrode',
        objectNames: [
            'FocusingElectrode1',
        ],
    }),
    makeSharedChildPart({
        id: 'pmt-2-focusing-electrode',
        parentId: 'pmt-2',
        sharedConceptId: 'pmtFocusingElectrode',
        objectNames: [
            'FocusingElectrode2',
        ],
    }),
    makeSharedChildPart({
        id: 'pmt-1-dynode-chain',
        parentId: 'pmt-1',
        sharedConceptId: 'pmtDynodeChain',
        objectNames: [
            'Dynode1.1',
            'Dynode1.2',
            'Dynode1.3',
            'Dynode1.4',
            'Dynode1.5',
            'Dynode1.6',
            'Dynode1.7',
            'Dynode1.8',
        ],
    }),
    makeSharedChildPart({
        id: 'pmt-2-dynode-chain',
        parentId: 'pmt-2',
        sharedConceptId: 'pmtDynodeChain',
        objectNames: [
            'Dynode2.1',
            'Dynode2.2',
            'Dynode2.3',
            'Dynode2.4',
            'Dynode2.5',
            'Dynode2.6',
            'Dynode2.7',
            'Dynode2.8',
        ],
    }),
    makeSharedChildPart({
        id: 'pmt-1-photoanode',
        parentId: 'pmt-1',
        sharedConceptId: 'pmtPhotoanode',
        objectNames: [
            'PhotoAnode1',
        ],
    }),
    makeSharedChildPart({
        id: 'pmt-2-photoanode',
        parentId: 'pmt-2',
        sharedConceptId: 'pmtPhotoanode',
        objectNames: [
            'PhotoAnode2',
        ],
    }),
    makeSharedChildPart({
        id: 'pmt-1-circuit',
        parentId: 'pmt-1',
        sharedConceptId: 'pmtCircuitSimple',
        objectNames: [
            'PMTCircuitBase1',
            'PMTOutputMeter1',
            'PowerSupply1',
            'Resistor1.1',
            'Resistor1.2',
            'Resistor1.3',
            'Resistor1.4',
            'Resistor1.5',
            'Resistor1.6',
            'Resistor1.7',
        ],
    }),
    makeSharedChildPart({
        id: 'pmt-2-circuit',
        parentId: 'pmt-2',
        sharedConceptId: 'pmtCircuitSimple',
        objectNames: [
            'PMTCircuitBase2',
            'PMTOutputMeter2',
            'PowerSupply2',
            'Resistor2.1',
            'Resistor2.2',
            'Resistor2.3',
            'Resistor2.4',
            'Resistor2.5',
            'Resistor2.6',
            'Resistor2.7',
        ],
    }),
];