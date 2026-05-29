/**
 * main text content source for spec section
 */
export const spectroscopyText = [
    {
        id: 'what-is-spectroscopy',
        label: 'What Is Spectroscopy',
        hook: 'Light touches matter, and something changes.',
        modes: {
            friends: {
                title: 'For Friends',
                panels: [
                    {
                        id: 'dual-nature',
                        heading: 'Light behaves in more than one way',
                        body: `Light is a strange thing. Sometimes it spreads out like a wave, and sometimes it arrives in tiny packets of energy. Every color carries its own amount of energy, which means light can do more than simply brighten a room. It can interact with matter in specific ways.`,
                        visualKey: 'dual-nature'
                    },
                    {
                        id: `interaction`,
                        heading: `When Light Touches Matter...`,
                        body: `Even something as small as a molecule is not completely still. When energy from light reaches the system, parts of the molecule man respond; bonds may vibrate, electrons may shift, or the molecule may release energy back out as light. These tiny responses are usually invisible to our eyes, but they leave patterns that an instrument can measure.`,
                        visualKey: 'interaction'
                    },
                    {
                        id: `measurement`,
                        heading: `Spectroscopy Turns Those Changes Into Clues`,
                        body: `Spectroscopy is the art of watching how matter responds to light. By noticing which colors are absorbed, emitted, scattered, or passed through, we can learn about a molecule’s structure, energy, and motion ... almost like reading the hidden handwriting of matter.`,
                        visualKey: `measurement`
                    }
                ],
            },
            colleague: {
                title: 'For Colleagues',
                panels: [
                    {
                        id: 'quantized-light',
                        heading: 'Quantized Interaction',
                        body: [
                            { type: 'text', value: 'Electromagnetic radiation carries energy in discrete quanta,' },
                            { type: 'equation', value: String.raw`E = h \nu .` },
                            { type: 'text', value: 'The molecular system is described by eigenstates of the time-independent Hamiltonian, while the radiation introduces a time-dependent perturbation that couples these states. ' },
                        ],
                        visualKey: 'quantized-light'
                    },
                    {
                        id: 'transitions',
                        heading: 'Eigenstate Transitions',
                        body: [
                            { type: 'text', value: `
                Under an external perturbation, the system evolves between eigenstates of the molecular Hamiltonian. Absorption, emission, and scattering arise from transitions between these stationary states, with their behavior governed by the energies, symmetries, and structure of the participating wavefunctions.

                This establishes the state-level picture of spectroscopic change. The next question is which of these transitions can actually appear in an experiment, since only those that couple effectively to the interaction and measurement process produce observable intensity. 
                            `}
                        ],
                        visualKey: 'transitions'
                    },
                    {
                        id: 'spectroscopic-observables',
                        heading: 'Observables as Projections',
                        body: [
                            { type: 'text', value: `Spectroscopic signals reflect not every imaginable state change, but the subset of transitions that successfully couple into measurement. A transition is observable when its transition dipole moment is nonzero. This is determined by the interaction operator, the symmetry of the initial and final wavefunctions, and their corresponding overlap. In centrosymmetric systems, some transitions are orbitally forbidden, and if the transition-moment integral lacks the totally symmetric representation, no measurable intensity will generally appear. 
                            In the usual Born-Oppenheimer applied Franck-Condon picture, the nuclei are treated as effectively fixed during the much faster electronic transition, so observed intensity is shaped by vibrational overlap as well as electronic selection rules. Yet in situations where spin-orbit or other nonadiabatic couplings become important, this clean separation becomes incomplete, and techniques such as EPR can reveal the spin-dependent consequences of those couplings in the excited state. 
                            ` }
                        ],
                        visualKey: 'spectroscopic-observables'
                    }
                ],
            },
        },
    },

    {
        id: 'what-all-instruments-have-in-common',
        label: 'What All Instruments Have in Common',
        hook: 'Different tools, same underlying idea.',
        modes: {
            friends: {
                title: 'For Friends',
                panels: [
                    {
                        id: 'source',
                        heading: 'Every measurement begins with a source',
                        body: `Before anything can be observed, something has to be sent in. It might be light, radio waves, or a carefully timed pulse, but every instrument begins by giving energy a direction.`,
                        visualKey: 'source'
                    },
                    {
                        id: 'sample',
                        heading: 'Matter responds in its own way',
                        body: `That energy given from certain sources meets a sample, and the sample responds. Sometimes the change is small, sometimes dramatic, but even the quietest interaction can leave behind a trace.`,
                        visualKey: 'sample'
                    },
                    {
                        id: 'detector',
                        heading: 'The response becomes something we can read',
                        body: `An instrument is built to catch that trace and turn it into a signal. The shapes and parts may differ, but the idea stays the same: send something in, let matter respond, and notice what changed.`,
                        visualKey: 'detector'
                    }
                ]
            },
            colleague: {
                title: 'For Colleagues',
                panels: [
                    {
                        id: 'field-matter-interaction',
                        heading: 'Field–Matter Interaction',
                        body: [
                            {
                                type: 'text',
                                value: `Every spectroscopic experiment begins by coupling a system to an external field. The sample is described by the molecular Hamiltonian, H (the sum of the kinetic energy T, the potential energy V and the pair-wise interaction W). While the source introduces a time-dependent perturbation that can drive transitions, mix states, or shift their energies.`
                            },
                            {
                                type: 'equation',
                                value: String.raw`\hat{H} = \hat{T} + \hat{V} + \hat{W}`
                            },
                            {
                                type: 'text',
                                value: `The exact form of this interaction measurement depends on the spectroscopy method being used.
                                What changes from technique to technique is not the underlying framework, but the nature of the perturbation, the timescale over which it acts, and the observable chosen at the detector.`
                            }
                        ],
                        visualKey: 'field-matter-interaction'
                    },
                    {
                        id: 'transition-probability-population',
                        heading: 'Transition Probability and Population',
                        body: [
                            {
                                type: 'text',
                                value: `A measurable signal requires more than a symmetry-allowed transition. Its intensity depends on both the population of the initial state and how strongly the perturbation couples the initial and final wavefunctions.
                                `
                            },
                            {
                                type: 'equation',
                                value: String.raw`\Gamma_{i \rightarrow f}  = \frac{2\pi}{\hbar} | \langle \psi_f | \hat{V} | \psi_i \rangle |^2 ρ(E_f) `
                            },
                            {
                                type: 'text',
                                value: `By Fermi’s golden rule, the transition probability depends on the coupling term and the density of accessible final states, ρ(E<sub>f</sub>).
                                `
                            },

                            {
                                type: 'text',
                                value: `What we observe in spectroscopy is therefore shaped not only by molecular structure, but also by population, coupling strength, and the design of the experiment.`
                            },
                        ],
                        visualKey: 'transition-probability-population'
                    },
                    {
                        id: 'unified-spectroscopic-framework',
                        heading: 'A Unified Spectroscopic Framework',
                        body: [
                            {
                                type: 'text',
                                value: `Spectroscopies may differ in method, but many share the same structure: a source prepares a field, the sample responds through allowed couplings, part of that response is isolated, and a detector converts it into a measurable signal. What changes is the perturbation, the states involved, the selection rules, and the form of the response.`
                            },
                            {
                                type: 'text',
                                value: `Spectroscopy is therefore not just the reading of energy levels, but the observation of how quantized states become visible through interaction. What appears in a spectrum depends on energy spacing, population, coupling strength, selection rules, and the limits of detection. UV-Vis absorption is the clearest place to begin applying this framework instrumentally. The perturbation is optical, the response is attenuation of transmitted light, and the observable is built from a wavelength-by-wavelength comparison between the light sent through a reference path and the light sent through the sample.`
                            },
                        ],
                        visualKey: 'unified-spectroscopic-framework'
                    }
                ],
            },
        },
    },

    {
        id: 'uv-vis',
        label: 'UV-Vis',
        hook: 'This is where we first see electrons move.',
        demoHref: '/specDemo/uvvis',
        demoLabel: 'Open UV-Vis Demo',
        modes: {
            friends: {
                title: 'For Friends',
                panels: [
                    {
                        id: 'white-light-splitting',
                        heading: 'Light Enters as Many Colors',
                        body: `In UV-Vis spectroscopy, the source sends in a wide range of ultraviolet and visible light. Each color carries a different amount of energy, so the sample is not tested with just one possibility. It is given many energies at once.`,
                        visualKey: 'white-light-splitting'
                    },
                    {
                        id: 'absorption',
                        heading: 'The Molecule Absorbs Specific Energies',
                        body: `As the light passes through the sample, some wavelengths continue forward while others are absorbed. Absorption happens only when the light has the right energy to match an electronic transition inside the molecule.`,
                        visualKey: 'absorption'
                    },
                    {
                        id: 'beam-band',
                        heading: 'An electron moves upward',
                        body: `When a wavelength is absorbed, an electron is promoted from a lower energy level to a higher one. The instrument records which wavelengths were removed from the original beam, and those missing colors become the UV-Vis spectrum. In that pattern, we begin to see where the molecule’s electrons can move and how strongly they respond to light.`,
                        visualKey: 'beam-band'
                    },
                ],
            },
            colleague: {
                title: 'For Colleagues',
                panels: [
                    {
                        id: 'uvvisTransmissionVisual',
                        heading: 'Absorption as a Transmission Measurement',
                        body: [
                            {
                                type: "text",
                                value: `UV-Vis absorption spectroscopy converts an electronic transition into a controlled transmission experiment. A continuum source provides optical radiation, a monochromator selects a narrow wavelength band, and the instrument measures how much radiant power remains after the beam passes through the sample.`,
                            },
                            {
                                type: "text",
                                value: `At each wavelength, absorption reflects the loss of transmitted intensity caused by allowed electronic transitions, together with the practical effects of the cell, solvent, and optical path.`,
                            },
                            {
                                type: "text",
                                value: `In a double-beam instrument, this measurement is strengthened by comparing the sample channel against a reference channel rather than treating the lamp output as perfectly stable.`,
                            },
                        ],
                        visualKey: 'uvvisTransmissionVisual'
                    },
                    {
                        id: 'uvvisMonochromatorVisual',
                        heading: 'Wavelength Selection and Spectral Bandpass',
                        body: [
                            {
                                type: "text",
                                value: `Before light reaches the sample, the instrument must decide which part of the spectrum is being tested. In a scanning UV-Vis spectrophotometer, polychromatic light is directed into a monochromator, where slits, mirrors, and a diffraction grating isolate a narrow wavelength band.`,
                            },
                            {
                                type: "text",
                                value: `The grating does not simply “make color”; it controls angular dispersion, spectral order, and resolution. Narrower slits improve wavelength selectivity, but they also reduce radiant power at the detector.`,
                            },
                            {
                                type: "text",
                                value: `UV-Vis instrumentation therefore works through a constant compromise between resolution, throughput, stray light rejection, and signal-to-noise.`,
                            },
                        ],
                        visualKey: 'uvvisMonochromatorVisual'
                    },
                    {
                        id: 'uvvisAbsorbanceRatioVisual',
                        heading: 'Sample, Reference, and Absorbance',
                        body: [
                            {
                                type: "paragraph",
                                value: `The sample and reference paths give the instrument a way to separate molecular absorption from background optical losses. The reference cell accounts for solvent absorption, cuvette material, reflection losses, and source variation, so the sample signal can be interpreted as the additional attenuation caused by the analyte.`,
                            },
                            {
                                type: "paragraph",
                                value: `For an ideal absorbing solution,`,
                            },
                            {
                                type: "equation",
                                value: `A(λ) = -log_{10}\\left(\\frac{I_{t,s}(λ)}{I_{t,r}(λ)}\\right) \\approx ε(λ)cl`,
                            },
                            {
                                type: "paragraph",
                                value: `where I<sub>t,s</sub> and I<sub>t,r</sub> are the transmitted sample and reference intensities. The measured spectrum is therefore not just “missing light,” but a corrected ratio that turns optical attenuation into a chemically useful quantity.`,
                            },
                        ],
                        visualKey: 'uvvisAbsorbanceRatioVisual'
                    }, 
                    {
                        id: 'uvvisDetectorReadoutVisual',
                        heading: 'Detection, Readout, and Instrument Limits',
                        body: [
                            {
                                type: 'text',
                                value: `After the source, monochromator, and sample/reference paths have shaped the beam, the detector converts transmitted optical power into an electrical signal. In the UV-Vis model, this is the detector/readout stage: a photomultiplier tube can amplify weak transmitted light through a photoelectron cascade, producing a current or voltage that is compared between sample and reference signals and converted into A(λ).`
                            },
                            {
                                type: 'text',
                                value: `The final spectrum is therefore not only a molecular signature. Stray radiation, dark current, source flicker, detector noise, slit width, scan speed, analog to digital converter(ADC) precision, and cuvette matching all affect the absorbance trace. UV-Vis is conceptually simple but instrumentally rich: it measures how much excitation light is removed, while fluorescence begins from the absorbed population and asks what light the molecule gives back.`
                            }
                        ],
                        visualKey: 'uvvisDetectorReadoutVisual'
                    },
                ],
            },
        },
    },

    {
        id: 'fluorescence',
        label: 'Fluorescence',
        hook: 'What goes up must come down.',
        demoHref: '/specDemo/fluorescence',
        demoLabel: 'OpenFluorescence Demo',
        modes: {
            friends: {
                title: 'For Friends',
                panels: [
                    {
                        id: 'emission',
                        heading: 'The Molecule Gives Light Back',
                        body: [
                            {
                                type: 'text',
                                value: `In UV-Vis, we watched certain colors disappear from the incoming beam. Fluorescence begins from that same absorbed energy, but it asks a new question: after the molecule absorbs light, does it give any light back?`
                            },
                            {
                                type: 'text',
                                value: `The answer can be yes, but not in the exact moment or form of the original excitation. After absorbing light, the molecule briefly redistributes that energy internally, and the light we observe usually comes from a more relaxed excited state rather than from the instant of absorption itself.`
                            },
                        ],
                        visualKey: 'FluorSpecEmission'
                    },
                    {
                        id: 'redshift',
                        heading: 'The Emitted Light Usually Shifts Red',
                        body: [
                            {
                                type: 'text',
                                value: `Because some energy is lost before emission, the light that comes back out is usually lower in energy than the light that was first absorbed. This is why fluorescence often appears at longer wavelength, or more to the red, than the corresponding absorption.`
                            },
                            {
                                type: 'text',
                                value: `For many molecules, the shape of the emission spectrum can still resemble the absorption spectrum, because both are connected to the same ground and excited states. But the two are not identical: relaxation, solvent effects, and structural adjustment can all shift the emitted light away from where absorption began.`,
                            },
                        ],
                        visualKey: 'FluorSpecRedShift'
                    },
                    {
                        id: 'speclimits',
                        heading: 'Not Every Excited Molecule Fluoresces',
                        body: [
                            {
                                type: 'text',
                                value: `Once a molecule is excited, fluorescence is only one possible outcome. Some molecules release light, but others lose their energy in different ways, such as through motion, collisions, or other non-radiative pathways.`
                            },
                            {
                                type: 'text',
                                value: `This is why fluorescence spectroscopy does not show every excited molecule becoming emitted light. Instead, the excited population splits between different pathways. Fluorescence Spectroscopy tells us how much of that population survives long enough to undergo emission, and how much energy is lost before fluorescence or even phosphorescence can occur. This technique helps compare emission with other possible competing processes.`,
                            },
                        ],
                        visualKey: 'FluorSpecLimits'
                    }
                ]
            },
            colleague: {
                title: 'For Colleagues',
                panels: [
                    {
                        id: 'RelaxedPopulation',
                        heading: 'Relaxation to S₁ and emission',
                        body: [
                            {
                                type: 'text',
                                value: `Fluorescence spectroscopy begins from the same absorbed population created in UV-Vis, but it follows a different observable. Instead of asking how much excitation light is removed, it asks what light is emitted after the excited-state population relaxes within the molecule and its surroundings.
                                After absorption, the initially prepared excited-state ensemble is usually not yet in its emissive form.`
                            },
                            {
                                type: 'text',
                                value: `Vibrational relaxation and internal conversion rapidly redistribute that energy, so in room-temperature condensed-phase measurements fluorescence is observed primarily from the lowest excited singlet state, near the lowest vibrational levels of S<sub>1</sub> (Kasha’s Rule). 
                                The measured emission therefore reflects not the instant of absorption alone, but the excited-state population after ultrafast relaxation has already occurred.`
                            }
                        ],
                        visualKey: 'fluorRelaxedPopulation'
                    },
                    {
                        id: 'MirrorStokesShift',
                        heading: 'Competition between pathways',
                        body: [
                            {
                                type: 'text',
                                value: `Because fluorescence and absorption involve the same ground- and excited-state manifolds (via Einstein’s Coefficient B<sub>12</sub> = B<sub>21</sub>), the emission envelope can resemble the absorption envelope in reverse. 
                                When the excited-state geometry and vibronic structure remain similar to those of the ground state due to similar nuclear wavefunctions, the two spectra may show an approximate mirror relationship when compared on an energy or frequency scale.`
                            },
                            {
                                type: 'text',
                                value: `In practice, emission is usually shifted to lower energy than absorption. 
                                This Stokes shift reflects energy loss before photon emission, including vibrational relaxation, solvent response, and any structural reorganization that stabilizes the emissive state. 
                                When those rearrangements are small, the shift is small; when excited-state reorganization is substantial, the fluorescence maximum can undergo bathochromic (red) shift.`
                            }
                        ],
                        visualKey: 'fluorescenceMirrorStokesShift'
                    },
                    {
                        id: 'DecayPartition',
                        heading: 'Competition Between Pathways',
                        body: [
                            {
                                type: 'text',
                                value: `Once the emissive state is formed, fluorescence is only one of several possible outcomes. 
                                Radiative decay competes with internal conversion, intersystem crossing, and other  pathways. 
                                Therefore, the observed fluorescence depends on how the total excited-state population is partitioned during deactivation.`
                            },
                            {
                                type: 'equation',
                                value: String.raw`\Phi_f = \frac{k_f}{k_f + \sum_i k_i} = \frac{k_{\mathrm{rad}}}{k_{\mathrm{rad}} + k_{\mathrm{isc}} + k_{\mathrm{ic}}} = \frac{\tau_f}{\tau_{\mathrm{rad}}}`
                            },
                            {
                                type: 'text',
                                value: `Here, Φ<sub>f</sub> is the fluorescence quantum yield, k<sub>rad</sub> is the radiative decay rate, and the remaining rate constants represent competing channels. 
                                The measured fluorescence lifetime τ<sub>f</sub> therefore reflects the total decay of the excited state, while τ<sub>rad</sub> is the limiting radiative lifetime that can be observed amongst other competing pathways. 
                                In this way, fluorescence spectroscopy reports not only that an excited state exists, but how efficiently that state returns light to the detector. `
                            }
                        ],
                        visualKey: 'fluorescenceDecayPartition'
                    },
                    {
                        id: 'EmissionReadout',
                        heading: 'Energy Loss and \n Spectral Shift',
                        body: [
                            {
                                type: 'text',
                                value: `A spectrofluorometer separates excitation from emission optically before it ever turns light into data. 
                                A source such as a xenon lamp is filtered by the excitation monochromator, directed into the sample chamber, and the emitted light is collected into a separate emission channel, often at right angles to the excitation beam to reduce stray excitation light in the detector. 
                                The emission monochromator then selects the wavelength window that reaches the photomultiplier tube.`
                            },
                            {
                                type: 'text',
                                value: `The final spectrum depends on more than the fluorophore alone. 
                                Lamp intensity, slit width, monochromator throughput, detector sensitivity, polarization bias, dark counts, and correction factors all shape the measured signal. 
                                Fluorescence is therefore highly sensitive because it isolates emitted light from the much stronger excitation beam, but it is also instrumentally rich: the spectrum is only as reliable as the optical path that prepares, separates, and detects it.`
                            }
                        ],
                        visualKey: 'fluorEmissionReadout'
                    },
                ],
            },
        },
    },

    {
        id: 'nmr',
        label: 'NMR',
        hook: 'Even invisible atoms are still moving.',
        demoHref: '/specDemo/nmr',
        demoLabel: 'Open NMR Demo',
        modes: {
            friends: {
                title: 'For Friends',
                panels: [
                    {
                        id: 'magnet-motion',
                        heading: 'From Light to Magnets',
                        body: [
                            {
                                type: 'text',
                                value: `In fluorescence spectroscopy, we followed what happens after a molecule absorbs light and gives some of that light back. Nuclear Magnetic Resonance or NMR shifts the story from light to magnetism.
                                Some atomic nuclei behave like tiny magnets because they have a property called spin.`,
                            },
                            {
                                type: 'text',
                                value: `When these nuclei are placed inside a strong magnet, they can respond to radio-wave energy.
                                Instead of watching colors disappear or reappear, NMR listens to how these tiny nuclear magnets respond. This makes NMR a form of magnetic spectroscopy.`,
                            },
                        ],
                        visualKey: 'hidden-motion'
                    },
                    {
                        id: 'nuclear-neighbors',
                        heading: 'Each Nucleus Feels Its Own Neighborhood',
                        body: [
                            {
                                type: 'text',
                                value: `Even inside the same applied magnetic field, not every nuclei (N) feels the magnetic field in exactly the same way. The electrons(e) around each nucleus act like a tiny local shield. 
                                If a nucleus is strongly shielded (SHIELDED), it feels less of the applied magnetic field and in return, produces less of its own effective magnetic field. If it is weakly shielded (DESHIELDED), it feels more of the applied magnetic field and produces more of its own effective magnetic field.`,
                            }
                        ],
                        visualKey: 'NuclearNeighbors',
                    },
                    {
                        id: 'nuclear-local-structure',
                        heading: 'A Map of Local Structure',
                        body: [
                            {
                                type: 'text',
                                value: `Not every nucleus shows up in NMR.
                                NMR only works for certain nuclei that have spin, often ones with an odd mass number or an odd number of protons.`,
                            },
                        ],
                        visualKey: 'nuclearStructureMap'
                    },
                    {
                        id: 'nuclear-signals',
                        heading: 'NMR Response Signals',
                        body: [
                            {
                                type: "text",
                                value:
                                "If the nucleus is NMR-active, it can respond inside the applied magnetic field (the magnet). That response shows up as a peak in the NMR spectrum."
                            },
                            {
                                type: "text",
                                value:
                                "Where the peak appears depends on the nucleus’s electron neighborhood. A deshielded nucleus feels more of the magnetic field and shows up toward the down field. A shielded nucleus feels less of it and shows up toward the upfield."
                            },
                            {
                                type: "text",
                                value:
                                "So the visual reads like a tiny NMR story: the right kind of nucleus can respond, the magnet helps create the response, and the final clue appears as a peak."
                            }
                        ],
                        visualKey: 'nucleusResponseSignals',
                    },
                ],
            },
            colleague: {
                title: 'For Colleagues',
                panels: [
                    {
                        id: 'NuclearMagneticResonance',
                        heading: 'From Optical Excitation to Magnetic Resonance',
                        body: [
                            {
                                type: 'text',
                                value: `After UV-Vis and fluorescence, Nuclear Magnetic Resonance or NMR shifts the experiment away from optical excitation of electronic states and toward magnetic resonance of nuclear spin states.
                                NMR-active nuclei have nonzero nuclear spin and therefore a magnetic moment. This commonly occurs for isotopes such as <sup>1</sup>H and <sup>13</sup>C.`
                            },
                            {
                                type: 'text',
                                value: `Instead of using light to prepare an excited electronic population, NMR places the sample in a strong static magnetic field, B<sub>0</sub>, and uses radiofrequency radiation to drive transitions between nuclear spin energy levels.
                                When the nucleus spins, the B<sub>0</sub> splits the spin states into lower-energy α and higher-energy β levels:`,
                            },
                            {
                                type: 'equation',
                                value: String.raw`\Delta E = \gamma \hbar B_0 = h ν_0`
                            },
                            {
                                type: 'text',
                                value: `Here, γ is the gyromagnetic ratio and ν<sub>0</sub> is the Larmor frequency. NMR is therefore still spectroscopy: an external field defines an energy gap, and the instrument detects which spin transitions are accessible.`,
                            }
                        ],
                        visualKey: 'nmrResonanceTransition'
                    },
                    {
                        id: 'NuclearChemicalShift',
                        heading: 'Chemical Shift and Local Electronic Shielding',
                        body: [
                            {
                                type: 'text',
                                value: `A nucleus does not experience the applied magnetic field, B<sub>0</sub>, directly. Surrounding electrons respond to B<sub>0</sub> and create small induced fields that change the local field at the nucleus.
                                This effective field is described by:`
                            },
                            {
                                type: 'equation',
                                value: String.raw`B_{eff} = B_0 (1-σ)`
                            },
                            {
                                type: `text`,
                                value: `Here, σ is the shielding constant. A more shielded nucleus feels a smaller B<sub>eff</sub> and resonates at lower frequency, while a deshielded nucleus feels a stronger field and appears at higher chemical shift.`,
                            },
                            {
                                type: `text`,
                                value: `Chemical shift, δ, reports this displacement in ppm relative to a reference. Because shielding depends on bonding, electronegativity, hybridization, ring currents, and nearby functional groups, the NMR spectrum becomes a map of each nucleus’s local electronic environment.`,
                            },
                        ],
                        visualKey: 'nmrChemicalShiftShielding'
                    },
                    {
                        id: 'nmrInstrumentFlow',
                        heading: 'From Magnet, RF Pulse, and Probe to Spectrum',
                        body: [
                            {
                                type: 'text',
                                value: `An NMR spectrometer begins with a stable, homogeneous magnetic field. The sample sits inside the magnet bore within a probe containing RF coils tuned to the nucleus being observed.
                                A short RF pulse creates an oscillating magnetic field, B<sub>1</sub>, perpendicular to B<sub>0</sub>. This perturbs the nuclear spin ensemble, and the precessing magnetization induces a time-dependent voltage in the receiver coil.`
                            },
                            {
                                type: 'text',
                                value: `That time-domain signal, the free induction decay, is Fourier transformed into the frequency-domain NMR spectrum.
                                The final spectrum depends on both molecular structure and instrument control. Field homogeneity, shimming, lock stability, probe tuning, pulse calibration, relaxation delay, receiver gain, concentration, solvent, and reference standard all affect signal quality.`,
                            },
                        ],
                        visualKey: 'nmrInstrumentSignalFlow'
                    },
                ],
            },
        },
    },
    {
        id: 'epr',
        label: 'EPR',
        hook: 'Now we watch electron spins directly.',
        demoHref: '/specDemo/trepr',
        modes: {
            friends: {
                title: 'For Friends',
                panels: [
                    {
                        id: 'epr-electron-magnets',
                        heading: 'After excitation, something new appears',
                        body: [
                            {
                                type: 'text',
                                value: `In the NMR section, we looked at nuclei that behave like tiny magnets. Electron Paramagnetic Resonance or EPR keeps the magnetic story going, but now the tiny magnet comes from an unpaired electron.`,
                            },
                            {
                                type: 'text',
                                value: `Most electrons come in pairs, and paired electrons cancel each other out like two people pulling equally in opposite directions. When an electron is left unpaired, its magnetic behavior can be detected by EPR.`,
                            },
                            {
                                type: 'text',
                                value: `That is why EPR is especially useful for studying radicals in organic molecules and transition metal complexes, where unpaired electrons can live in metal-centered orbitals. These unpaired spins can behave in different ways: some act mostly alone, some line up together, and some pair against each other. EPR helps us study those magnetic personalities.`,
                            }
              
                        ],
                        visualKey: 'epr-electron-magnets',
                    },
                    {
                        id: 'epr-vs-nmr-resonance',
                        heading: 'Electrons reveal their spin',
                        body: [
                            {
                                type: 'text',
                                value: `EPR stands for electron paramagnetic resonance. Similar NMR, it places a sample inside a magnetic field (B<sub>0</sub>) and watches for a resonance signal.`,
                            },
                            {
                                type: 'text',
                                value: `The difference is what the instrument is listening to. NMR listens to nuclei or proton spins. EPR listens to unpaired electron spins. Because an electron is a much stronger tiny magnet than most nuclei, EPR usually uses microwaves instead of the radio waves used in NMR.`,
                            },
                            {
                                type: 'text',
                                value: `This makes EPR especially good at finding where the “active” electron is in a molecule. If a reaction involves radicals, metal centers, or electron transfer, EPR can help reveal where the unpaired electron lives and how its surroundings shape its behavior.`,

                            }
                        ],
                        visualKey: 'epr-vs-nmr-resonance',
                    },
                    {
                        id: 'epr-beer-radical-quality',
                        heading: 'A pair begins to separate',
                        body: [
                            {
                                type: 'text',
                                value: `In an EPR experiment, the magnetic field is swept until an unpaired electron responds to the microwave energy. When that match happens, the response appears as a signal in the EPR spectrum.`,
                            },
                            {
                                type: 'text',
                                value: `One real-life example is beer quality testing. As beer ages or is exposed to light and oxygen, tiny radical species can form and slowly damage the flavor. EPR can detect these radicals directly, which helps researchers measure how quickly oxidation is happening. `,
                            },
                            {
                                type: 'text',
                                value: `In a way, EPR spectrum becomes a kind of “radical fingerprint” for quality analysis. If antioxidants in the beer delay radical buildup for a longer time, the beer has better resistance to staling. This helps explain why packaging matters too: amber bottles block more harmful light than clear glass, helping protect beer from light-driven flavor damage.`,
                            },
                        ],
                        visualKey: 'epr-beer-radical-quality',
                    },
                ],
            },
            colleague: {
                title: 'For Colleagues',
                panels: [
                    {
                        id: 'epr-single-spin-system',
                        heading: 'Single-Spin Magnetic Systems',
                        body: [
                            {
                                type: 'text',
                                value: `After NMR, the magnetic resonance story shifts from nuclear spins to electron spins. Like NMR, EPR requires a magnetic moment that can interact with an applied magnetic field, B<sub>0</sub>. The key difference is that EPR observes systems with unpaired electrons.`
                            },
                            {
                                type: 'text',
                                value: `Closed-shell molecules are usually EPR-silent because paired electrons cancel their spin magnetic moments. In organic molecules, EPR-active species are often radicals. In transition-metal complexes, the signal often comes from partially filled d-orbitals with one or more unpaired d-electrons.
                                This connects to magnetism: paramagnetic systems contain unpaired spins, ferromagnetic systems involve cooperative spin alignment, and antiferromagnetic systems involve oppositely coupled spins that can cancel. One thing to note is that in ferromagnetic and antiferromagnetic materials, electrons align spontaneously via exchange interactions. Here, the starting point is the simplest EPR-active idea: a system with a detectable net electron spin.`
                            }
                        ],
                        visualKey: 'EPR-single-spin-systems',
                    },
                    {
                        id: 'epr-vs-nmr-magnetic-moment',
                        heading: 'Definition of EPR',
                        body: [
                            {
                                type: 'text',
                                value: String.raw`EPR, or electron paramagnetic resonance, is the electron-spin version of magnetic resonance spectroscopy. It is also called ESR, or electron spin resonance. Similar to NMR, it begins with a magnetic moment, \(\vec{\mu}\), placed in an external magnetic field, \(B_0\).`,
                            },
                            {
                                type: 'text',
                                value: String.raw`A magnetic moment is the “tiny magnet” associated with angular momentum. In NMR, that magnetic moment comes from the nuclear spin of both protons and neutrons. In EPR, it comes from the spin of an unpaired electron, \(\vec{S}\). Because the electron has a much larger gyromagnetic ratio, γ, than most nuclei, the proton's spin energy splitting, \(\vec{I}\), is much larger at the same B<sub>0</sub>. That is why EPR typically uses microwave radiation, while NMR uses radiofrequency radiation.`,
                            },
                            {
                                type: 'text',
                                value: `In order to understand a chemical reactions, we need to understand where the active electrons are as the electronic structure tells us the full picture of reaction mechanisms and EPR is an essential tool for unraveling details of electron behaviors.`,
                            },
                        ],
                        visualKey: 'EPR-vs-nmr-magnetic-moment',
                    },
                    {
                        id: 'epr-hyq-radical-spec',
                        heading: 'Measuring Organic Radical Systems',
                        body: [
                            {
                                type: 'text',
                                value: String.raw`EPR measures paramagnetic systems by following how an unpaired electron responds as the applied magnetic field, B<sub>0</sub>, is swept through resonance. When the microwave energy matches the field-defined spin gap, the system absorbs, producing an EPR signal.`
                            },
                            {
                                type: 'text',
                                value: String.raw`The resonance position is controlled by the g-value. For a free electron, g is close to 2.0023, but in a molecule the local electronic environment shifts this value through spin-orbit and orbital contributions. In an organic radical, the result is often described by a g-tensor rather than a single number. For the HYQ radical calculation, the principal g-values are g<sub>x</sub> = 2.0021, g<sub>y</sub> = 2.0049, and g<sub>z</sub> = 2.0077, with g<sub>iso</sub> = 2.0049. At fixed microwave frequency, larger g-values resonate at slightly lower magnetic field, so the anisotropic g-tensor helps spread and shape the frozen-solution spectrum.`
                            },
                            {
                                type: 'text',
                                value: String.raw`The fine structure within the EPR line comes from hyperfine coupling: magnetic interaction between the unpaired electron and nearby magnetic nuclei. In the HYQ radical, the most useful natural-abundance splitting pattern comes from the five <sup>1</sup>H nuclei. The calculated isotropic proton couplings are approximately A<sub>iso</sub> = −8.14, −15.71, +3.28, +3.29, and −16.82 MHz. These values describe how strongly each proton “feels” the unpaired electron spin density.`
                            },
                            {
                                type: 'text',
                                value: String.raw`In fluid solution, rapid molecular tumbling averages the orientation-dependent tensors into g<sub>iso</sub> and A<sub>iso</sub>, giving a sharper, more resolved hyperfine pattern. In a frozen or solid sample, that tumbling is removed, so the full g- and A-tensors become visible as an anisotropic line shape. This is why the same HYQ radical can be simulated as both a solution-like spectrum and a broader frozen-solution spectrum from the same ORCA-computed spin-Hamiltonian parameters.`
                            }
                        ],
                        visualKey: 'EPR-HYQRadical-spec',
                    },
                    {
                        id: 'epr-reveal-in-research',
                        heading: 'What EPR Can Reveal in Real Research',
                        body: [
                            {
                                type: 'text',
                                value: `EPR is powerful because it detects unpaired electrons directly, which makes it useful far beyond textbook radicals. In food chemistry, EPR can track radical formation during beer oxidation. By measuring how quickly radicals appear, or how long antioxidants delay radical buildup, researchers can estimate beer freshness and oxidative stability. A longer radical-quenching or “lag” time suggests stronger resistance to staling, helping breweries compare recipes, storage conditions, and packaging choices. This is one reason amber bottles are preferred over clear glass: they better reduce light-driven chemistry that can damage beer flavor.`,
                            },
                            {
                                type: 'text',
                                value: `EPR is also useful for mechanistic chemistry, especially reactions involving proton-coupled electron transfer or PCET. During PCET, electron and proton motion can create short-lived radical intermediates. EPR can follow changes in unpaired electron spin, g-value, hyperfine coupling, and reaction kinetics, helping identify where the spin density lives and how the reaction evolves. This makes EPR a bridge between structure and dynamics: it tells us what paramagnetic species formed, while ultrafast spectroscopy can later show when those species appear and decay.`,
                            }
                        ],
                        visualKey: 'EPR-research-applications',
                    },
                ],
            },
        },
    },

    {
        id: 'ultrafast-ta',
        label: 'Ultrafast Transient Absorption',
        hook: 'Now we start filming.',
        demoHref: 'specDemo/ultrafast',
        demoLabel: 'Open Ultrafast Spec Demo',
        modes: {
            friends: {
                title: 'For Friends',
                panels: [
                    {
                        id: 'ultrafast-continuation',
                        heading: 'There’s More to the Story After Absorption',
                        body: [
                            {
                                type: "text",
                                value: "UV-Vis showed us that molecules absorb specific colors of light. Fluorescence showed us that some of that absorbed energy can later come back out as light."
                            },
                            {
                                type: "text",
                                value: "Ultrafast spectroscopy looks into the hidden moment between those two ideas. In photosynthesis, this moment matters deeply: pigment molecules in chloroplasts capture sunlight and begin passing that energy toward a reaction center almost immediately, on a femtosecond (1fs = 10<sup>15</sup>s) timescale."
                            }
                        ],
                        visualKey: 'ultrafast-spec-continuation'
                    },
                    {
                        id: 'ultrafast-pump',
                        heading: 'The Pump Pulse Starts the Clock',
                        body: [
                            {
                                type: "text",
                                value: "The experiment begins with a very short flash of light called the pump pulse. This pulse excites the sample, similar to the first light-capturing step in photosynthesis."
                            },
                            {
                                type: "text",
                                value: "For plant pigments such as chlorophylls and carotenoids, that first burst of absorbed energy does not simply stay still. It can begin moving through an organized antenna system before the energy is lost as heat or fluorescence."
                            }
                        ],
                        visualKey: 'ultrafast-pump'
                    },
                    {
                        id: 'ultrafast-probe',
                        heading: 'The Probe Pulse Later Checks the Molecule',
                        body: [
                            {
                                type: "text",
                                value: "After the pump pulse, the experiment waits for a tiny chosen delay. Then a second pulse, called the probe, passes through the sample to check what changed."
                            },
                            {
                                type: "text",
                                value: "By changing the delay again and again, femtosecond ultrafast spectroscopy can follow energy transfer through photosynthetic pigments and watch for the earliest signs of charge separation at the reaction center."
                            }
                        ],
                        visualKey: 'ultrafast-probe'
                    },
                    {
                        id: 'ultrafast-evolution',
                        heading: 'Watching the Spectrum “Breathe” Through Time',
                        body: [
                            {
                                type: "text",
                                value: "As time moves forward, the spectrum can grow, fade, shift, or reshape. These changes are not random; they can reveal energy migration, relaxation, and the formation of short-lived charge-separated states."
                            },
                            {
                                type: "text",
                                value: "This makes ultrafast spectroscopy feel like watching photosynthesis begin in real time. UV-Vis shows where light is absorbed, fluorescence shows one possible ending, and ultrafast spectroscopy reveals the motion in between. From here, DFT helps connect those moving signals to orbitals, structures, and chemical meaning."
                            }
                        ],
                        visualKey: 'ultrafast-evolution'
                    }
                ]
            },
            colleague: {
                title: 'For Colleagues',
                panels: [
                    {
                        id: 'UltrafastSpecDeltaA',
                        heading: 'Signal Components in Transient Absorption',
                        body: [
                            {
                                type: "text",
                                value: String.raw`Transient absorption spectroscopy measures the change in optical density induced by photoexcitation:`
                            },
                            {
                                type: "equation",
                                value: String.raw`\Delta A(\lambda,t)=A_{\mathrm{excited}}(\lambda,t)-A_{\mathrm{ground}}(\lambda)`
                            },
                            {
                                type: "text",
                                value: `The pumped sample is compared against the unpumped ground-state sample. This difference spectrum shows how a chromophore changes after absorbing light. In photosynthetic systems, chlorophylls and carotenoids act as chromophores that capture energy and help initiate energy transfer or charge separation.`
                            },
                            {
                                type: "text",
                                value: `The ΔA signal is usually a mixture of negative and positive features. Ground-state bleach and stimulated emission appear negative because the pumped sample transmits more probe light than the ground-state reference. Excited-state absorption and product absorption appear positive because new excited or transient species create new absorption pathways.`
                            },
                        ],
                        visualKey: 'UltrafastSpecDeltaA'
                    },
                    {
                        id: 'UltrafastSpecContributions',
                        heading: 'Pulse Width, Spectral Bandwidth, and Time-Zero Artifacts',
                        body: [
                            {
                                type: "text",
                                value: String.raw`Transient absorption gains much of its power from ultrashort laser pulses, but pulse duration and spectral bandwidth are linked. For a transform-limited Gaussian pulse:`
                            },
                            {
                                type: "equation",
                                value: String.raw`\Delta t \Delta \nu \approx 0.441`
                            },
                            {
                                type: "text",
                                value: `A shorter pulse improves femtosecond time resolution, but broadens the excitation bandwidth. A longer or spectrally narrowed pulse improves selectivity, which can help isolate overlapping pigment or cofactor transitions, but reduces sensitivity to the fastest dynamics.`,
                            },
                            {
                                type: "text",
                                value: `This tradeoff does not weaken ultrafast spectroscopy; it defines its resolution. Pulse width shapes the instrument response, bandwidth shapes the excited-state ensemble, and careful calibration makes the resulting dynamics chemically meaningful. This is why later corrections, such as anisotropy control and chirp treatment, are essential for connecting transient signals to relaxation, energy transfer, and charge separation.`,
                            }
                        ],
                        visualKey: 'UltrafastSpecContributions'
                    },
                    {
                        id: 'UltrafastSpecAnisotropy',
                        heading: 'Polarization Anisotropy and Exciton Migration',
                        body: [
                            {
                                type: "text",
                                value: String.raw`Anisotropy measurements add directional information to transient absorption spectroscopy. Instead of measuring only how the spectrum changes with time, polarized pump and probe beams report how the transition dipoles of excited chromophores are oriented relative to one another. This is especially useful in photosynthetic antennae and reaction centers, where pigments are held in defined geometries and energy- or electron-transfer pathways depend on molecular arrangement.`
                            },
                            {
                                type: "equation",
                                value: String.raw`r(t)=\frac{\Delta A_{\parallel}(t)-\Delta A_{\perp}(t)}{\Delta A_{\parallel}(t)+2\Delta A_{\perp}(t)}`
                            },
                            {
                                type: "text",
                                value: String.raw`Here, \(\Delta A_{\parallel}(t)\) and \(\Delta A_{\perp}(t)\) are transient absorption signals collected with the pump and probe polarizations parallel or perpendicular to one another. In light-harvesting systems, decay of \(r(t)\) can reveal the timescale of exciton migration, exciton relaxation, or energy transfer between nearby chlorophyll pools.`
                            },
                            {
                                type: "text",
                                value: String.raw`These processes can be difficult to isolate under magic-angle conditions because they may produce only small spectral shifts in \(\Delta A\). Time-resolved anisotropy therefore provides a more sensitive way to follow ultrafast energy redistribution when the spectrum itself changes only subtly.`
                            },
                        ],
                        visualKey: 'UltrafastSpecAnisotropy'
                    },
                    {
                        id: 'UltrafastSpecChirpedProbe',
                        heading: 'White-Light Chirp, Correction, and Theory Integration',
                        body: [
                            {
                                type: "text",
                                value: `White-light ultrafast detection uses a broadband probe to follow many wavelengths at once. In a chirped-probe approach, the continuum is intentionally stretched so different wavelengths reach the sample at different delay times. A single reflected or transmitted spectrum can therefore encode part of the material’s time response.`
                            },
                            {
                                type: "text",
                                value: `Because wavelength now acts partly like a time axis, the chirp must be calibrated carefully. The wavelength-dependent time zero tells which spectral region corresponds to which delay, while amplitude corrections account for changes in sample sensitivity across the probe bandwidth.`,
                            },
                            {
                                type: "text",
                                value: `After correction, the transient map becomes mechanistic instead of only visual. In materials, the signal can be related to electronic heating, lattice heating, or strain. In molecular transient absorption, corrected bleach, emission, excited-state absorption, and product bands can then be compared with DFT, TDDFT, and electronic-structure models.`
                            },
                        ],
                        visualKey: 'UltrafastSpecChirpedProbe'
                    },
                ],
            },
        },
    },
];

export function getTextSectionById(id) {
    return spectroscopyText.find((section) => section.id === id) ?? null;
}