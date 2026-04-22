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
            body: `Light is a strang thing. Sometimes it flows like a wave, and sometimes it arrives in tiny packets, like particles.`,
            visualKey: 'dual-nature'
          },
          {
            id: `interaction`,
            heading: `When light touches matter`,
            body: `When light touches matter, even something as small as a molecule, it doesn’t leave things untouched; energy is exchanged, motion begins, and something shifts, even if we can’t see it with our eyes.`,
            visualKey: 'interaction'
          },
          {
            id: `measurement`,
            heading: `Spectroscopy is how we notice`,
            body: `Spectroscopy is simply our way of noticing, of shining light, listening carefully, and watching how matter responds. Every instrument you’ll see here is built around the same quiet idea; send in light, let it interact, and measure what changed.`,
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
                value: `The exact form of this interaction measurement depends on the spectroscopy method being used; electric-dipole coupling in UV-Vis and fluorescence, magnetic interactions in TREPR, and more elaborate pump-probe interactions in ultrafast transient absorption methods. What changes from technique to technique is not the underlying framework, but the nature of the perturbation, the timescale over which it acts, and the observable chosen at the detector.`
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
                value: `A measurable signal requires more than a formally allowed transition. The observed response depends both on the population of the initial state and on how effectively the perturbation couples the initial and final wavefunctions. Spectroscopic intensity is therefore shaped not only by the symmetry and structure of the states themselves, but also by their occupation, whether that population is thermal, photo-prepared, spin-polarized, or evolving in time.`
              },
              {
                type: 'equation',
                value: String.raw`W_{i \to f} \propto P_i \left| \left\langle \Psi_f \middle| \hat{H}_1 \middle| \Psi_i \right\rangle \right|^2`
              },
              {
                type: 'text',
                value: `Here, \\(P_i\\) represents the population of the initial state, while the matrix element expresses how strongly the perturbation operator couples \\(\\Psi_i\\) and \\(\\Psi_f\\). This is why instrumentation matters so deeply: the source prepares the relevant field, the experiment helps determine which states are occupied, and the detector records only the portion of that induced response that becomes measurable. What spectroscopists observe is therefore not simply molecular structure in isolation, but structure filtered through population, coupling strength, and experimental design.`
              },
              {
                type: 'text',
                tone: 'note',
                value: `*For clarity, this panel uses a framework equation rather than a fully expanded rate law. Detailed notes and references are linked at the bottom of the page.*`
              }
            ],
            visualKey: 'transition-probability-population'
          },
          {
            id: 'unified-spectroscopic-framework',
            heading: 'A Unified Spectroscopic Framework',
            body: [
              {
                type: 'text',
                value: `Although different techniques appear very different experimentally, they share the same principle: a source prepares a field, the sample responds through its allowed quantum couplings, a discriminator separates the relevant outgoing signal, and a detector converts that response into something measurable. The specific operator, selection rules, and readout change from method to method, but the logic remains the same.`
              },
              {
                type: 'text',
                value: `In that sense, spectroscopy does not directly measure absolute energies; it measures observable consequences of energy differences, couplings, and state evolution. Whether the axis is wavelength, frequency, magnetic field, or delay time, the experiment is still probing how quantized states are connected and how that connectivity becomes visible through measurement.`
              }
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
            heading: 'A range of light',
            body: `We begin by shining light across a range of colors. Instead of a single color, the molecule is given many possible energies to interact with.`,
            visualKey: 'white-light-splitting'
          },
          {
            id: 'absorption',
            heading: 'The molecule quietly chooses',
            body: `Some colors pass through, while others are absorbed. When certain wavelengths are pulled in, they disappear from the transmitted light.`,
            visualKey: 'absorption'
          },
          {
            id: 'electron-jump',
            heading: 'An electron moves upward',
            body: `When a color is absorbed, an electron moves from one energy level to another, like stepping up to a higher ledge. The color taken in reflects the size of that energy gap.`,
            visualKey: 'electron-jump'
          },
          {
            id: 'spectrum-forms',
            heading: 'The pattern becomes a spectrum',
            body: `By watching which colors are missing, we begin to map where electrons can go and how the molecule holds its energy. What disappears from the light reappears as structure in the graph.`,
            visualKey: 'spectrum-forms'
          }
        ]
      },

      colleague: {
        title: 'For Colleagues',
        panels: [
          {
            id: 'resonant-excitation',
            heading: 'Resonant electronic excitation',
            body: [
              {
                type: 'text',
                value: `Absorption occurs when the photon energy matches the gap between states,`
              },
              {
                type: 'equation',
                value: String.raw`h \nu = E_{excited} - E_{ground}`
              },
              {
                type: 'text',
                value: `promoting an electron into an excited configuration.`
              }
            ],
            visualKey: 'resonant-excitation'
          },
          {
            id: 'beer-lambert',
            heading: 'Macroscopic absorbance',
            body: [
              {
                type: 'text',
                value: `The attenuation of transmitted light is described by`
              },
              {
                type: 'equation',
                value: String.raw`A = \varepsilon c l`
              },
              {
                type: 'text',
                value: `linking macroscopic absorbance to concentration, path length, and molar absorptivity.`
              }
            ],
            visualKey: 'beer-lambert'
          },
          {
            id: 'transition-allowance',
            heading: 'Intensity and transition allowance',
            body: [
              {
                type: 'text',
                value: `Spectral intensity depends on how strongly a transition couples to light and whether it is symmetry-allowed.`
              }
            ],
            bullets: [
              'Transition dipole moment controls intensity',
              'Oscillator strength reflects transition probability',
              'Selection rules determine whether a transition is allowed'
            ],
            visualKey: 'transition-allowance'
          }
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
            id: 'excited-state',
            heading: 'After absorption',
            body: `After taking in light, the molecule does not hold that energy forever. It enters an excited state, glowing softly, holding more energy than before.`,
            visualKey: 'excited-state'
          },
          {
            id: 'relaxation',
            heading: 'Energy settles downward',
            body: `That energy begins to relax step by step. Some of it is lost along the way, fading out gently as the system settles into a lower state.`,
            visualKey: 'relaxation'
          },
          {
            id: 'emission',
            heading: 'A softer light returns',
            body: `Sometimes, a small part of that energy is released as light. It comes back softer, shifted in color, like an echo of what first came in.`,
            visualKey: 'emission'
          }
        ]
      },

      colleague: {
        title: 'For Colleagues',
        panels: [
          {
            id: 'kasha-relaxation',
            heading: 'Relaxation to S₁ and emission',
            body: [
              {
                type: 'text',
                value: `Following electronic excitation, the system undergoes rapid vibrational relaxation to the lowest excited singlet state, from which radiative decay occurs in accordance with Kasha’s rule.`
              }
            ],
            visualKey: 'kasha-relaxation'
          },
          {
            id: 'quantum-yield',
            heading: 'Competition between pathways',
            body: [
              {
                type: 'text',
                value: `The efficiency of fluorescence is captured by the quantum yield,`
              },
              {
                type: 'equation',
                value: String.raw`\Phi = \frac{k_r}{k_r + k_{nr}}`
              },
              {
                type: 'text',
                value: `which reflects the competition between radiative and non-radiative decay pathways.`
              }
            ],
            visualKey: 'quantum-yield'
          },
          {
            id: 'stokes-shift',
            heading: 'Energy loss and spectral shift',
            body: [
              {
                type: 'text',
                value: `Internal conversion and vibrational relaxation redistribute energy prior to emission. As a result, the emitted photon is lower in energy, producing a characteristic Stokes shift.`
              }
            ],
            bullets: [
              'Fluorescence originates from S₁ → S₀ after relaxation',
              'Quantum yield reflects competition between k_r and k_{nr}',
              'Emission is red-shifted due to prior vibrational relaxation',
              'Observed intensity depends on both population and decay pathways'
            ],
            visualKey: 'stokes-shift'
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
