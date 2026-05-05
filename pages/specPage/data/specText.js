/**
 * Main content source for all spectroscopy sections.
 * Defines text, panels, modes, equations, and bullets.
 *
 * Structured for data-driven rendering across spec components.
 *
 * Includes helper to fetch section by id.
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
              { type: 'text', value: `
Spectroscopic signals reflect not every imaginable state change, but the subset of transitions that successfully couple into measurement. A transition is observable when its transition dipole moment is nonzero. This is determined by the interaction operator, the symmetry of the initial and final wavefunctions, and their corresponding overlap. In centrosymmetric systems, some transitions are orbitally forbidden, and if the transition-moment integral lacks the totally symmetric representation, no measurable intensity will generally appear. 

In the usual Born-Oppenheimer applied Franck-Condon picture, the nuclei are treated as effectively fixed during the much faster electronic transition, so observed intensity is shaped by vibrational overlap as well as electronic selection rules. Yet in situations where spin-orbit or other nonadiabatic couplings become important, this clean separation becomes incomplete, and techniques such as TREPR can reveal the spin-dependent consequences of those couplings in the excited state. 
                ` }
            ],
            visualKey: 'spectroscopic-observables'
          }
        ],
        // bullets: []
      }
    }
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
                What changes from technique to technique is not the underlying framework, but the nature of the perturbation, the timescale over which it acts, and the observable chosen at the detector.
                `
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
        // bullets: []
      }
    }
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
        ]
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
            bullets: [
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
        ]
      }
    }
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
            bullets: [],
            visualKey: 'fluorEmissionReadout'
          }
        ]
      }
    }
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
            id: 'hidden-motion',
            heading: 'Hidden motion beneath stillness',
            body: `Even when nothing seems to be happening, the atoms inside a molecule are not still. Their nuclei carry a quiet magnetism, gently moving in ways we cannot see.`,
            visualKey: 'hidden-motion'
          },
          {
            id: 'alignment',
            heading: 'A magnetic field brings order',
            body: `When we place the system in a magnetic field, those tiny magnets begin to align, like compass needles settling into place.`,
            visualKey: 'alignment'
          },
          {
            id: 'perturbation',
            heading: 'A small push sets them in motion',
            body: `A short pulse nudges them out of alignment. Instead of snapping back immediately, they begin a smooth, circular motion.`,
            visualKey: 'precession'
          },
          {
            id: 'signal-spectrum',
            heading: 'The motion becomes a signal',
            body: `As they move, they create a faint, oscillating signal. When we listen carefully, that motion transforms into a spectrum that reveals structure beneath what we see.`,
            visualKey: 'signal-spectrum'
          }
        ]
      },

      colleague: {
        title: 'For Colleagues',
        panels: [
          {
            id: 'zeeman-splitting',
            heading: 'Zeeman splitting under B₀',
            body: [
              {
                type: 'text',
                value: `In an external magnetic field, nuclear spin states undergo Zeeman splitting with an energy separation given by`
              },
              {
                type: 'equation',
                value: String.raw`\Delta E = \gamma \hbar B_0`
              }
            ],
            visualKey: 'zeeman-splitting'
          },
          {
            id: 'larmor-precession',
            heading: 'Larmor precession',
            body: [
              {
                type: 'text',
                value: `These spin states precess about the applied field at the Larmor frequency,`
              },
              {
                type: 'equation',
                value: String.raw`\omega = \gamma B_0`
              }
            ],
            visualKey: 'larmor-precession'
          },
          {
            id: 'chemical-shift',
            heading: 'Chemical shift and local environment',
            body: [
              {
                type: 'text',
                value: `The local electronic environment modifies the effective field experienced by each nucleus, producing chemical shifts that encode structural information.`
              }
            ],
            bullets: [
              'Zeeman splitting defines accessible spin transitions',
              'Larmor frequency governs resonance condition',
              'Chemical shift arises from electronic shielding effects',
              'Observed signal reflects local structural environment'
            ],
            visualKey: 'chemical-shift'
          }
        ]
      }
    }
  },

  {
    id: 'epr',
    label: 'TREPR',
    hook: 'Now we watch electron spins directly.',
    demoHref: '/specDemo/trepr',
    modes: {
      friends: {
        title: 'For Friends',
        panels: [
          {
            id: 'after-excitation',
            heading: 'After excitation, something new appears',
            body: `After light has done its work, something new can form, often too fleeting to see by other means. The molecule shifts, and new, reactive pieces begin to emerge.`,
            visualKey: 'after-excitation'
          },
          {
            id: 'spin-appears',
            heading: 'Electrons reveal their spin',
            body: `Each electron carries a tiny magnetic identity called spin. As these states form, subtle differences begin to appear, like small arrows pointing in different directions.`,
            visualKey: 'spin-appears'
          },
          {
            id: 'radical-pair',
            heading: 'A pair begins to separate',
            body: `These electrons can form radical pairs, drifting apart but still connected. Their spins can align or oppose each other, shaping how they evolve.`,
            visualKey: 'radical-pair'
          },
          {
            id: 'epr-signal',
            heading: 'The motion becomes a pattern',
            body: `As these spins move and interact, they create a changing signal. It feels less like a still image and more like catching a moment that is constantly unfolding.`,
            visualKey: 'epr-signal'
          }
        ]
      },

      colleague: {
        title: 'For Colleagues',
        panels: [
          {
            id: 'spin-hamiltonian',
            heading: 'Spin Hamiltonian and energy structure',
            body: [
              {
                type: 'text',
                value: `Following photoexcitation, transient radical pairs form with spin states that evolve under the spin Hamiltonian,`
              },
              {
                type: 'equation',
                value: String.raw`\hat{H} = g\mu_B B S + D S^2`
              },
              {
                type: 'text',
                value: `where Zeeman and zero-field splitting terms define the energy landscape.`
              }
            ],
            visualKey: 'spin-hamiltonian'
          },
          {
            id: 'spin-dynamics',
            heading: 'Time-dependent spin evolution',
            body: [
              {
                type: 'text',
                value: `The resulting spin polarization reflects both the initial formation mechanism and subsequent evolution of the radical pair.`
              }
            ],
            visualKey: 'spin-dynamics'
          },
          {
            id: 'time-resolved-signal',
            heading: 'Time-resolved signal formation',
            body: [
              {
                type: 'text',
                value: `Because this process unfolds in time, TREPR directly captures the evolution of spin populations following excitation, encoding both electronic structure and dynamical pathways.`
              }
            ],
            bullets: [
              'Radical pairs form following photoinduced processes',
              'Spin Hamiltonian governs energy levels and evolution',
              'Zero-field splitting reflects anisotropic interactions',
              'Spin polarization evolves in time after excitation',
              'TREPR resolves transient spin dynamics'
            ],
            visualKey: 'time-resolved-signal'
          }
        ]
      }
    }
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
            id: 'pump',
            heading: 'A first pulse starts the motion',
            body: `Up until now, we have been catching moments. Here, a first pulse of light strikes the molecule and immediately excites it, beginning the process we want to follow.`,
            visualKey: 'pump'
          },
          {
            id: 'delay',
            heading: 'Time becomes part of the experiment',
            body: `A second pulse does not arrive right away. By shifting the delay between the two pulses, we choose when to ask the system what has changed.`,
            visualKey: 'delay'
          },
          {
            id: 'probe',
            heading: 'The probe asks what is different',
            body: `The probe pulse passes through after that short wait. What it sees depends on when it arrives, so each delay reveals a different moment in the system’s evolution.`,
            visualKey: 'probe'
          },
          {
            id: 'evolution',
            heading: 'The spectrum begins to move',
            body: `As the delay changes again and again, the signal shifts and reshapes over time. It becomes less about what happened once, and more about watching the system evolve in real time.`,
            visualKey: 'evolution'
          }
        ]
      },

      colleague: {
        title: 'For Colleagues',
        panels: [
          {
            id: 'delta-a',
            heading: 'Differential absorption signal',
            body: [
              {
                type: 'text',
                value: `The transient absorption signal is defined as`
              },
              {
                type: 'equation',
                value: String.raw`\Delta A = A_{excited} - A_{ground}`
              },
              {
                type: 'text',
                value: `capturing the difference between the pumped and unpumped system.`
              }
            ],
            visualKey: 'delta-a'
          },
          {
            id: 'spectral-contributions',
            heading: 'Resolved contributions to ΔA',
            body: [
              {
                type: 'text',
                value: `The measured spectrum arises from overlapping contributions that reflect population changes and allowed transitions across the evolving energy landscape.`
              }
            ],
            bullets: [
              'Ground-State Bleach (GSB): depletion of ground-state population reduces absorption, giving negative ΔA at ground-state wavelengths',
              'Stimulated Emission (SE): probe-induced emission increases transmitted intensity, producing negative ΔA, typically red-shifted',
              'Excited-State Absorption (ESA): excited states absorb further, producing positive ΔA at higher-lying transitions',
              'Product Absorption: transient or long-lived species absorb the probe, giving positive ΔA alongside corresponding bleach'
            ],
            visualKey: 'spectral-contributions'
          },
          {
            id: 'chirped-probe',
            heading: 'Chirped probe and time-resolved readout',
            body: [
              {
                type: 'text',
                value: `A chirped supercontinuum probe maps different wavelengths onto slightly different arrival times, intertwining spectral and temporal information within a single measurement.`
              }
            ],
            visualKey: 'chirped-probe'
          }
        ]
      }
    }
  }
];

export function getTextSectionById(id) {
  return spectroscopyText.find((section) => section.id === id) ?? null;
}
