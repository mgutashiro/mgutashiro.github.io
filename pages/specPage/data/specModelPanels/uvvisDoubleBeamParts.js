export const uvvisDoubleBeamParts = [
    {
        id: 'overview',
        label: 'Overview',
        title: 'Double-Beam UV-Vis Spectrophotometer',
        objectNames: [],
        body: {
            friends:
                'This model shows how a UV-Vis instrument compares two beams: one beam passes through a blank reference, while the other passes through the sample.',
            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `A double-beam UV-Vis spectrophotometer compares a reference channel and a sample channel after wavelength selection.`,
                        },
                        {
                            type: 'text',
                            value: `The reference path tracks the blank response, while the sample path records the additional attenuation caused by the analyte.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `Because both beams pass through closely related optical paths, the instrument can treat the reference signal as the wavelength-dependent baseline.`,
                        },
                        {
                            type: 'text',
                            value: `The sample signal is then interpreted relative to that baseline, so the final spectrum reports how much extra light is removed by the absorbing species.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `That comparison is converted into absorbance by taking the negative logarithm of the transmitted sample-to-reference intensity ratio:`,
                        },
                        {
                            type: 'equation',
                            value: String.raw`A(\lambda) = -\log_{10}(I_s/I_r)`,
                        },
                        {
                            type: 'text',
                            value: `The transmitted sample intensity and transmitted reference intensity are compared at each selected wavelength.`,
                        },
                    ],
                },
            ],
        },
    },

    {
        id: 'source',
        label: 'Source',
        title: 'Continuum Light Source',
        objectNames: ['xelamp', 'xelight', 'xelampbase'],
        body: {
            friends:
                'The lamp sends out broad UV-Vis light. It is the starting point of the measurement.',
            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The light source provides the initial continuum of radiation used for the scan. In many UV-Vis spectrophotometers, this is achieved by combining a deuterium lamp for the ultraviolet region with a tungsten or tungsten-halogen lamp for the visible region.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The source does not provide the final measurement wavelength directly. Instead, it supplies broad radiant power that the monochromator can narrow into a selected wavelength band.`,
                        },
                        {
                            type: 'text',
                            value: `This makes the source the starting reservoir of optical intensity for the instrument, while the monochromator defines which part of that continuum interrogates the sample.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `Source stability matters because absorbance is calculated from intensity ratios. Fluctuations in lamp output can appear as baseline noise or drift if they are not corrected.`,
                        },
                        {
                            type: 'text',
                            value: `In a double-beam design, the reference and sample channels are measured under closely related source conditions, helping reduce the effect of lamp drift on the final spectrum.`,
                        },
                    ],
                },
            ],
        },
    },
    {
        id: 'monochromator',
        label: 'Monochromator',
        title: 'Monochromator',
        objectNames: [
            'monochromator',
            'monochromatorbase',
            'mono',
            'monoentslit',
        ],
        body: {
            friends:
                'This box chooses one color, one wavelength, from the lamp light before sending it forward.',
            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The monochromator selects a narrow band of wavelengths from the continuum source. It turns broadband lamp radiation into the wavelength-defined probe used for the absorption measurement.`,
                        },
                        {
                            type: 'text',
                            value: `In a scanning UV-Vis spectrophotometer, this wavelength selection happens sequentially as the instrument scans across the chosen spectral range.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The monochromator typically contains entrance and exit slits, focusing mirrors, and a dispersive element such as a diffraction grating.`,
                        },
                        {
                            type: 'text',
                            value: `As the grating rotates during the scan, different wavelengths are directed toward the exit slit and then passed into the sample and reference paths.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The monochromator controls spectral bandpass, which determines how narrow the selected wavelength region is.`,
                        },
                        {
                            type: 'text',
                            value: `A smaller bandpass improves wavelength resolution, but it also reduces light throughput. This makes the monochromator one of the main places where resolution and signal-to-noise are balanced.`,
                        },
                    ],
                },
            ],
        },

        children: [
            {
                id: 'mono-mirrors',
                label: 'Internal Mirrors',
                title: 'Monochromator Steering Mirrors',
                objectNames: [
                    'basemirror1',
                    'basemirror2',
                    'monomirror',
                    'monochromatormirror',
                ],
                body: {
                    friends:
                        'These mirrors guide the lamp light through the monochromator so it can reach the grating and exit slit.',
                    colleague:[
                        {
                            type: 'page',
                            blocks: [
                                {
                                    type: 'text',
                                    value: `The monochromator selects a narrow band of wavelengths from the continuum source. It turns broadband lamp radiation into the wavelength-defined probe used for the absorption measurement.`,
                                },
                                {
                                    type: 'text',
                                    value: `In a scanning UV-Vis spectrophotometer, this wavelength selection happens sequentially as the instrument scans across the chosen spectral range.`,
                                },
                            ],
                        },

                        {
                            type: 'page',
                            blocks: [
                                {
                                    type: 'text',
                                    value: `The monochromator typically contains entrance and exit slits, focusing mirrors, and a dispersive element such as a diffraction grating.`,
                                },
                                {
                                    type: 'text',
                                    value: `As the grating rotates during the scan, different wavelengths are directed toward the exit slit and then passed into the sample and reference paths.`,
                                },
                            ],
                        },

                        {
                            type: 'page',
                            blocks: [
                                {
                                    type: 'text',
                                    value: `The monochromator controls spectral bandpass, which determines how narrow the selected wavelength region is.`,
                                },
                                {
                                    type: 'text',
                                    value: `A smaller bandpass improves wavelength resolution, but it also reduces light throughput. This makes the monochromator one of the main places where resolution and signal-to-noise are balanced.`,
                                },
                            ],
                        },
                    ],
                },
            },

            {
                id: 'diffraction-grating',
                label: 'Diffraction Grating',
                title: 'Diffraction Grating',
                objectNames: [
                    'diffractiongrater',
                    'diffractiongrating',
                ],
                body: {
                    friends:
                        'The diffraction grating spreads the lamp light into different wavelengths, like separating a hidden rainbow inside the monochromator.',
                    colleague: [
                        {
                            type: 'page',
                            blocks: [
                                {
                                    type: 'text',
                                    value: `The diffraction grating separates incoming light by wavelength. It converts the mixed continuum from the source into wavelength-dependent directions inside the monochromator.`,
                                },
                                {
                                    type: 'text',
                                    value: `This dispersion is what allows one wavelength band to be selected at the exit slit while other wavelengths are rejected.`,
                                },
                            ],
                        },

                        {
                            type: 'page',
                            blocks: [
                                {
                                    type: 'text',
                                    value: `The angular position of each diffracted wavelength is described by the grating equation:`,
                                },
                                {
                                    type: 'equation',
                                    value: String.raw`m\lambda = d\left(\sin\alpha + \sin\beta\right)`,
                                },
                                {
                                    type: 'text',
                                    value: `Here, m is the diffraction order, d is the groove spacing, α is the incident angle, and β is the diffracted angle.`,
                                },
                            ],
                        },

                        {
                            type: 'page',
                            blocks: [
                                {
                                    type: 'text',
                                    value: `During a scan, the grating rotates so that different wavelengths are directed toward the exit slit.`,
                                },
                                {
                                    type: 'text',
                                    value: `In this way, the monochromator tests the sample one selected wavelength band at a time rather than sending the full source spectrum through the cuvettes.`,
                                },
                            ],
                        },

                        {
                            type: 'page',
                            blocks: [
                                {
                                    type: 'text',
                                    value: `The grating also introduces practical limits. Higher groove density improves dispersion, but overlapping diffraction orders can create stray or ambiguous signals.`,
                                },
                                {
                                    type: 'text',
                                    value: `Order-sorting filters and careful optical design help prevent shorter-wavelength light from appearing at the wrong detection wavelength.`,
                                },
                            ],
                        },
                    ],
                },
            },

            {
                id: 'mono-exit-slit',
                label: 'Exit Slit',
                title: 'Monochromator Exit Slit',
                objectNames: [
                    'monochromatorexitslit',
                    'monoexitslit',
                ],
                body: {
                    friends:
                        'The exit slit lets only a narrow slice of the separated light leave the monochromator. This turns the broad lamp light into one selected beam.',
                    colleague: [
                        {
                            type: 'page',
                            blocks: [
                                {
                                    type: 'text',
                                    value: `The exit slit selects the narrow wavelength band that leaves the monochromator. After the grating separates the source light, only the portion focused onto this slit continues toward the sample and reference paths.`,
                                },
                            ],
                        },

                        {
                            type: 'page',
                            blocks: [
                                {
                                    type: 'text',
                                    value: `The slit width controls the spectral bandpass. A narrower slit improves wavelength resolution because a smaller range of wavelengths reaches the sample.`,
                                },
                                {
                                    type: 'text',
                                    value: `However, narrowing the slit also reduces light intensity at the detector, which can lower the signal-to-noise ratio.`,
                                },
                            ],
                        },

                        {
                            type: 'page',
                            blocks: [
                                {
                                    type: 'text',
                                    value: `A wider slit increases throughput and can improve signal strength, but it broadens the wavelength band that reaches the sample.`,
                                },
                                {
                                    type: 'text',
                                    value: `The exit slit therefore sets one of the main compromises in UV-Vis instrumentation: wavelength selectivity versus signal-to-noise.`,
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    },
      
    {
        id: 'mirrors',
        label: 'Mirrors',
        title: 'Steering Mirrors',
        objectNames: [
            'basemirror3',
            'basemirror4',
            'basemirror5',
            'basemirror5.1',
            'basemirror5.2',
            'mirror',
        ],
        body: {
            friends:
                'The mirrors guide the beam through the instrument path.',
            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `Mirrors guide and focus the beam through the instrument without changing the selected wavelength.`,
                        },
                        {
                            type: 'text',
                            value: `Their role is to preserve the optical path geometry so the selected light reaches the correct components with the proper alignment.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `Inside the monochromator, curved mirrors can collimate light onto the grating and refocus diffracted light toward the exit slit.`,
                        },
                        {
                            type: 'text',
                            value: `Outside the monochromator, other mirrors help maintain the beam geometry through the sample and reference paths.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `Good mirror alignment matters because small angular errors can change throughput, beam position, and detector response.`,
                        },
                        {
                            type: 'text',
                            value: `In a double-beam system, keeping the two paths well aligned helps preserve symmetry between the sample and reference channels, so the intensity ratio remains meaningful.`,
                        },
                    ],
                },
            ],
        },
    },


    {
        id: 'beam-splitter',
        label: 'Beam Splitter',
        title: 'Beam Splitter',
        objectNames: ['beamSplitter', 'bs', 'splitter'],
        body: {
            friends:
                'The selected beam is divided into two paths: one for the blank and one for the sample.',
            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The beam splitter divides the wavelength-selected light into reference and sample paths.`,
                        },
                        {
                            type: 'text',
                            value: `This lets the instrument compare the blank and analyte under closely related optical conditions.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `Because absorbance is calculated from a ratio, the split-beam design helps both channels experience similar source and optical conditions.`,
                        },
                        {
                            type: 'text',
                            value: `The reference path then serves as the baseline against which the sample path is interpreted.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `This comparison helps correct for source variation, solvent background, cuvette losses, and wavelength-dependent changes in optical throughput.`,
                        },
                        {
                            type: 'text',
                            value: `The beam splitter therefore supports the main logic of double-beam UV-Vis: measuring the analyte by comparing transmitted sample light against a matched reference signal.`,
                        },
                    ],
                },
            ],
        },
    },

    {
        id: 'reference',
        label: 'Reference',
        title: 'Reference Cuvette',
        objectNames: ['refcuvette', 'refliquid', 'reference', 'ref'],
        body: {
            friends:
                'The reference holds the blank, usually solvent. It tells the instrument what the light looks like without the sample.',
            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The reference liquid contains the solvent, buffer, or blank without the absorbing analyte.`,
                        },
                        {
                            type: 'text',
                            value: `It defines the optical background used to correct the sample measurement.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `This correction accounts for solvent absorption, cuvette material, reflection losses, and source variation.`,
                        },
                        {
                            type: 'text',
                            value: `These background contributions are not the analyte signal, but they still affect how much light reaches the detector.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `By comparing the sample path against the reference path, the instrument isolates the additional attenuation caused by the analyte.`,
                        },
                        {
                            type: 'text',
                            value: `This makes the measured absorbance more chemically interpretable than the raw transmitted sample intensity alone.`,
                        },
                    ],
                },
            ],
        },
    },

    {
        id: 'sample',
        label: 'Sample',
        title: 'Sample Cuvette',
        objectNames: ['sample', 'samplecuvette', 'sampleliquid'],
        body: {
            friends:
                'The sample absorbs part of the selected light. That missing light becomes the absorption signal.',
            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The sample cell contains the absorbing analyte dissolved or suspended in a suitable medium.`,
                        },
                        {
                            type: 'text',
                            value: `As the wavelength-selected beam passes through the sample, photons matching allowed electronic transitions are absorbed, reducing the transmitted intensity.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The measured absorbance depends on the concentration of the analyte, the optical path length through the cell, and the wavelength-dependent molar absorptivity:`,
                        },
                        {
                            type: 'equation',
                            value: String.raw`A(\lambda) = \epsilon(\lambda)c\ell`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `This relationship is most reliable when the solution is dilute, chemically stable, and optically clear.`,
                        },
                        {
                            type: 'text',
                            value: `In practice, the absorbance should also stay within a reasonable range so detector noise, stray light, and concentration-dependent deviations do not dominate the measurement.`,
                        },
                    ],
                },
            ],
        },
    },

    {
        id: 'reference-detector',
        label: 'Reference Detector',
        title: 'Reference Detector Channel',
        objectNames: [
            'refdetector1',
            'refdetectorslit',
            'refdetector',
        ],
        body: {
            friends:
                'This detector channel reads the light from the blank/reference path.',
            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The reference detector signal represents the light transmitted through the blank path.`,
                        },
                        {
                            type: 'text',
                            value: `This signal provides the baseline intensity used to correct the sample measurement.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `Because source intensity, detector sensitivity, and optical throughput can vary with wavelength, the reference signal is essential for producing a meaningful absorbance spectrum.`,
                        },
                        {
                            type: 'text',
                            value: `The detector response from the blank path helps track these wavelength-dependent background changes during the scan.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `By comparing the sample detector signal against the reference detector signal, the instrument can separate analyte absorption from background optical variation.`,
                        },
                        {
                            type: 'text',
                            value: `The reference detector therefore helps convert transmitted light into a corrected absorbance measurement rather than a raw intensity reading.`,
                        },
                    ],
                },
            ],
        },
    },

    {
        id: 'sample-detector',
        label: 'Sample Detector',
        title: 'Sample Detector Channel',
        objectNames: [
            'sampledetector',
            'sampledetectorslit',
        ],
        body: {
            friends:
                'This detector channel reads the light after it passes through the sample.',
            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The sample detector signal corresponds to light transmitted through the analyte-containing cell.`,
                        },
                        {
                            type: 'text',
                            value: `This signal decreases when the sample absorbs strongly at the selected wavelength.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The detector does not directly “see absorbance.” It measures optical power after the beam has passed through the sample.`,
                        },
                        {
                            type: 'text',
                            value: `That optical power is converted into an electrical response, such as a current or voltage.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The instrument then compares the sample detector response against the reference detector response.`,
                        },
                        {
                            type: 'text',
                            value: `This comparison converts the transmitted sample signal into absorbance, allowing the final spectrum to report analyte attenuation rather than raw detector output.`,
                        },
                    ],
                },
            ],
        },
    },

    {
        id: 'beam-path',
        label: 'Beam Path',
        title: 'Beam Path',
        objectNames: [
            'beam1','beam2', 'beam3', 'beam4', 'beam5', 'beam6', 'beam7', 'beam8', 'beam9', 'beam10.1', 'beam10.2', 'beam11.1', 'beam11.2' 
        ],
        body: {
            friends:
                'The glowing beam shows how light travels through the instrument.',
            colleague: [
                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The beam path is the controlled route that light follows from the source to the detector.`,
                        },
                        {
                            type: 'text',
                            value: `In a scanning double-beam instrument, the beam is wavelength-selected first, then directed through reference and sample channels before detection.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `The beam path is not just a drawing of where light travels. It defines the optical sequence that connects wavelength selection, sample interaction, and detection.`,
                        },
                        {
                            type: 'text',
                            value: `Each segment of the path affects how much light is preserved, redirected, or lost before reaching the detector.`,
                        },
                    ],
                },

                {
                    type: 'page',
                    blocks: [
                        {
                            type: 'text',
                            value: `A well-controlled beam path helps the sample and reference channels remain comparable.`,
                        },
                        {
                            type: 'text',
                            value: `This matters because optical loss, beam misalignment, scattering, or stray light can change the detector signal and distort the absorbance ratio.`,
                        },
                    ],
                },
            ], 
        },
    },
];