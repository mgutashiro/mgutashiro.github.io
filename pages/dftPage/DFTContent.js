export const PAGE_META = [
    [
        "Focus",
        "Hydroquinone, DFT, TDDFT, PCET, and organic radical behavior",
    ],
    [
        "Qualification",
        "M.S. & B.S. in Chemistry, with a focus in Photochemical Science",
    ],
    [
        "Tools",
        "ORCA 6, Avogadro, Chimera, VMD, Python, Blender, Three.js, and React",
    ],
    [
        "Project Purpose",
        "Investigate hydroquinone’s role as a quenching agent in PCET reactions and translate the calculation outputs into visual and auditory experiences.",
    ],
];

export const CHAPTERS = [
    {
        id: "density",
        nav: "DFT",
        number: "01",
        visual: "Structure → density → properties",
        content: {
            friends: {
                eyebrow: "Why DFT exists",
                title: "How can we study many electrons without tracking every detail?",
                summary:
                "Electrons influence one another, so a complete many-electron description becomes difficult very quickly. Density functional theory replaces that overwhelming object with a more manageable map of where electron density is distributed.",
            },
            colleague: {
                eyebrow: "Density functional theory",
                title: "From the many-electron wavefunction to an electron-density framework",
                summary:
                "DFT reformulates the ground-state electronic-structure problem around the three-dimensional density ρ(r). Hohenberg–Kohn establishes the density as the governing variable; Kohn–Sham theory makes the framework computationally practical through a noninteracting reference system and an approximate exchange-correlation functional.",
            },
        },
    },
    {
        id: "pcet",
        nav: "PCET",
        number: "02",
        visual: "Electron + proton motion",
        content: {
            friends: {
                eyebrow: "Why hydroquinone matters",
                title: "Why move an electron and a proton together?",
                summary:
                "Moving only charge or only a proton can create an unfavorable intermediate. In proton-coupled electron transfer, both motions influence the same reaction and can reduce that energetic cost. Hydroquinone is a useful model because it can donate both and form a measurable radical product.",
            },
            colleague: {
                eyebrow: "Proton-coupled electron transfer",
                title: "HYQ as a model donor in excited-state PCET",
                summary:
                "Hydroquinone is not required for all PCET chemistry, but it is a useful mechanistic model: its proton and electron-transfer coordinates are coupled, its behavior changes with protonation and environment, and oxidation can produce a semiquinone-type open-shell species accessible to computation and EPR comparison.",
            },
        },
    },
    {
        id: "orca",
        nav: "ORCA",
        number: "03",
        visual: "Question → model → evidence",
        content: {
            friends: {
                eyebrow: "The calculation engine",
                title: "Software does not discover the answer by itself",
                summary:
                "A calculation begins with a chemical question. I choose a molecular model, let the structure relax, check that the result is stable, calculate relevant properties, and compare the outputs before deciding what they mean.",
            },
            colleague: {
                eyebrow: "ORCA 6 workflow",
                title: "A connected workflow from model construction to property prediction",
                summary:
                "ORCA provides one environment for geometry optimization, SCF and frequency validation, TDDFT, density and orbital analysis, and open-shell magnetic properties. Its value is not automation alone, but the ability to carry a theoretical question through a traceable sequence of approximations and validation steps.",
            },
        },
    },
    {
        id: "evidence",
        nav: "HYQ Evidence",
        number: "04",
        visual: "Calculated HYQ properties",
        content: {
            friends: {
                eyebrow: "My HYQ calculations",
                title: "What can one small molecule reveal?",
                summary:
                "The same HYQ model can be examined from several angles: its relaxed structure, how it vibrates, how it absorbs light, and where unpaired spin appears after oxidation. Together, those views connect molecular structure to properties that experiments can observe.",
            },
            colleague: {
                eyebrow: "HYQ computational evidence",
                title: "Geometry, vibrational, excited-state, and radical-state results",
                summary:
                "The calculation set connects an optimized ground-state structure with normal-mode validation, functional-dependent TDDFT transitions, and an open-shell radical model. The goal is not to claim a complete bimolecular mechanism, but to establish molecular evidence relevant to HYQ participation in PCET.",
            },
        },
    },
    {
        id: "meaning",
        nav: "Meaning",
        number: "05",
        visual: "Evidence with limits",
        content: {
            friends: {
                eyebrow: "Interpretation",
                title: "What does the computation let us say?",
                summary:
                "The calculations narrow the possibilities. They show plausible structures and properties and help explain what experimental signals might mean. They do not prove that every ruthenium–HYQ system follows one universal pathway.",
            },
            colleague: {
                eyebrow: "Interpretation and limitations",
                title: "Mechanistic relevance without overclaiming",
                summary:
                "These calculations support structure–property interpretation and comparison with spectroscopy, but HYQ-only calculations do not establish a full bimolecular rate law or uniquely distinguish CPET from stepwise ET–PT or PT–ET pathways. That requires an appropriately defined reaction coordinate and comparison under matched experimental conditions.",
            },
        },
    },
];

export const THEORY_STEPS = [
    {
        id: "many-electron",
        short: "Many-electron problem",
        visual: "Ball-and-stick HYQ placeholder",
        friends: {
            title: "The full problem grows too quickly",
            body:
                "Every electron responds to the nuclei and to every other electron. A complete wavefunction contains far more information than most practical chemical questions require.",
            bullets: ["Many interacting particles", "Too much information to visualize directly", "Density offers a smaller description"],
        },
        colleague: {
            title: "The many-electron Schrödinger equation",
            body:
                "Within the Born–Oppenheimer approximation, the electronic wavefunction still depends on 3N spatial variables before spin is considered. The computational burden rises steeply with electron number, motivating a reformulation in terms of ρ(r).",
            bullets: ["Interacting-electron Hamiltonian", "High-dimensional Ψ", "Three-dimensional ρ(r)"],
            equation: "Ĥₑ Ψ = Eₑ Ψ",
        },
    },
    {
        id: "hk",
        short: "Hohenberg–Kohn",
        visual: "Electron-density cloud placeholder",
        friends: {
            title: "The density contains the ground-state story",
            body:
                "In principle, the ground-state electron density determines the system’s ground-state properties. The correct density is the one that gives the lowest energy.",
            bullets: ["Density determines the system", "Energy is a functional of density", "The ground state minimizes that energy"],
        },
        colleague: {
            title: "The Hohenberg–Kohn theorems",
            body:
                "The ground-state density determines the external potential up to an additive constant, and therefore determines the Hamiltonian and ground-state observables. A variational principle identifies the ground-state density through minimization of E[ρ].",
            bullets: ["ρ(r) ↔ vₑₓₜ(r)", "Ground-state observables are density functionals", "E[ρ] is variational"],
            equation: "E₀ = minρ E[ρ]",
        },
    },
    {
        id: "ks",
        short: "Kohn–Sham DFT",
        visual: "Orbital / density layer placeholder",
        friends: {
            title: "A practical stand-in makes DFT usable",
            body:
                "Kohn and Sham introduced easier, noninteracting electrons that reproduce the same density. The difficult leftover physics is collected into an exchange-correlation approximation.",
            bullets: ["Solve simpler orbital equations", "Recover the target density", "Approximate the missing interactions"],
        },
        colleague: {
            title: "The Kohn–Sham construction",
            body:
                "Kohn–Sham DFT decomposes the energy into noninteracting kinetic, external, Coulomb, and exchange-correlation terms. Practical accuracy therefore depends strongly on the selected functional and on whether the chemical problem matches that approximation’s strengths.",
            bullets: ["Tₛ[ρ]", "Hartree contribution", "Approximate Eₓc[ρ]"],
            equation: "E[ρ] = Tₛ[ρ] + Vₑₓₜ[ρ] + J[ρ] + Eₓc[ρ]",
        },
    },
];

export const DFT_SCOPE = {
    strong: ["Optimized geometries", "Relative energetics", "Densities and selected orbitals", "Vibrations and many molecular properties"],
    dependent: ["Excitation energies", "Charge-transfer descriptions", "Open-shell states", "Solvation and reaction barriers"],
    limit: "A calculation is not, by itself, proof of a complete experimental mechanism.",
};

export const PCET_STEPS = [
    "Light prepares the ruthenium MLCT excited state",
    "Excited Ru encounters hydroquinone",
    "Electron and proton transfer become coupled",
    "Radical products reveal the transfer event",
];

export const PCET_PATHWAYS = [
    { id: "etpt", label: "ET → PT", detail: "Electron transfer followed by proton transfer" },
    { id: "ptet", label: "PT → ET", detail: "Proton transfer followed by electron transfer" },
    { id: "cpet", label: "CPET", detail: "Concerted proton–electron transfer" },
];

export const ORCA_PIPELINE = [
    { friends: "Draw the molecule", colleague: "Coordinates / charge / multiplicity" },
    { friends: "Choose the rules", colleague: "Functional / basis / solvation / numerical settings" },
    { friends: "Let the structure relax", colleague: "Geometry optimization" },
    { friends: "Check that it is stable", colleague: "Frequency and SCF validation" },
    { friends: "Ask specific questions", colleague: "TDDFT / density / spin / EPR properties" },
    { friends: "Compare the answers", colleague: "Sensitivity analysis and experimental comparison" },
];

export const ORCA_LAYERS = [
    {
        title: "Decision layer",
        friends: "What molecule am I describing, and what assumptions am I choosing?",
        colleague: "Functional, basis set, charge, multiplicity, solvent model, and numerical settings.",
    },
    {
        title: "Calculation layer",
        friends: "Did the structure settle, and did the calculation finish cleanly?",
        colleague: "SCF behavior, optimization steps, convergence, and vibrational validation.",
    },
    {
        title: "Evidence layer",
        friends: "Which calculated properties answer the chemical question?",
        colleague: "Geometry, normal modes, spectra, density, spin density, g tensor, and hyperfine terms.",
    },
];

export const EVIDENCE_TABS = [
    {
        id: "vibrations",
        label: "Structure + vibrations",
        visual: "Normal-mode HYQ animation placeholder",
        friends: {
            title: "Does the optimized molecule behave like a stable structure?",
            body:
                "A frequency calculation checks the optimized geometry and describes coordinated atomic motions. The web animation will use real displacement vectors, slowed down and exaggerated so each motion can be seen.",
            metrics: ["Selected mode: ring breathing", "Frequency: [add verified value]", "Display amplitude: exaggerated"],
        },
        colleague: {
            title: "Optimized geometry and normal-mode validation",
            body:
                "The planned Blender/Three.js animation will interpolate the positive and negative displacement vectors of selected normal modes rather than adding decorative random motion. Confirmed real frequencies support a local minimum; any imaginary mode must be investigated before interpretation.",
            metrics: ["rᵢ(t) = rᵢ,₀ + Aqᵢ sin(ωt)", "Mode frequency: [add verified value]", "Animation timescale is nonphysical and disclosed"],
        },
    },
    {
        id: "density",
        label: "Electronic structure",
        visual: "Density / orbital surface placeholder",
        friends: {
            title: "Where is the electronic structure concentrated?",
            body:
                "Structure shows where the nuclei are; density and orbital views show where electronic behavior is concentrated. The final viewer will switch between the molecule, total density, and a small set of useful orbital views.",
            metrics: ["Optimized neutral HYQ", "Total density", "Selected HOMO/LUMO or NTO view"],
        },
        colleague: {
            title: "Ground-state density and selected orbital representations",
            body:
                "The interface will compare the optimized structure with total density and carefully selected orbital or electrostatic-potential surfaces. Isovalue presets and a phase legend will prevent the visualization from implying more certainty than the calculation provides.",
            metrics: ["Three isovalue presets", "Orbital phase legend", "Optional electrostatic-potential surface"],
        },
    },
    {
        id: "excited",
        label: "Excited state",
        visual: "TDDFT spectrum placeholder",
        friends: {
            title: "Why do two models predict different colors of light?",
            body:
                "The predicted excitation changes when the exchange-correlation model changes. Comparing B3LYP and PBE0 shows that the functional is part of the interpretation, not merely a software setting.",
            metrics: ["B3LYP S1: 4.423 eV / 280 nm", "Oscillator strength: 0.162", "PBE0 S1: about 3.153 eV / 393 nm"],
        },
        colleague: {
            title: "Functional sensitivity in the TDDFT result",
            body:
                "The B3LYP and PBE0 calculations place the first relevant transition in substantially different energy regions. The final page should connect each spectral stick to an NTO or difference-density view when available, rather than reducing every excitation to a single HOMO→LUMO label.",
            metrics: ["B3LYP S1: 4.423 eV / 280 nm, f = 0.162", "PBE0 S1: ≈3.153 eV / 393 nm", "Values should be rechecked against final output before publication"],
        },
    },
    {
        id: "radical",
        label: "HYQ radical",
        visual: "Spin-density + EPR placeholder",
        friends: {
            title: "What changes after HYQ loses an electron?",
            body:
                "The radical calculation shows where the unpaired electron is distributed. Its magnetic properties create a bridge between an invisible electronic change and an EPR signal that can be measured.",
            metrics: ["Spin-density surface", "giso ≈ 2.00508", "Selected proton hyperfine couplings"],
        },
        colleague: {
            title: "Open-shell spin distribution and magnetic parameters",
            body:
                "The unrestricted HYQ radical model provides a spin-density distribution and calculated g tensor that can be compared with EPR observables. This is a property-level connection to the PCET product, not proof of a unique formation pathway.",
            metrics: ["gx 2.00210 · gy 2.00499 · gz 2.00815", "giso 2.00508", "Hyperfine values: add selected verified protons"],
        },
    },
];

export const SUPPORTS = [
    "A stable optimized structural model after frequency validation",
    "Coordinated vibrational behavior",
    "Functional-dependent excited-state predictions",
    "The distribution of unpaired spin in the radical",
    "Magnetic parameters that can be compared with EPR",
    "Molecular properties relevant to HYQ participation in PCET",
];

export const LIMITS = [
    "One universal Ru–HYQ reaction mechanism",
    "A complete bimolecular rate law",
    "A definitive CPET versus stepwise pathway without reaction-coordinate and kinetic work",
    "Direct experimental agreement under unmatched conditions",
    "The claim that hydroquinone is required for all PCET chemistry",
];

export const REFERENCES = [
    {
        label: "Ru–hydroquinone excited-state PCET literature example",
        href: "https://pubs.acs.org/doi/abs/10.1021/jp200381n",
    },
    {
        label: "ORCA manual",
        href: "https://www.faccts.de/docs/orca/manual/",
    },
];
