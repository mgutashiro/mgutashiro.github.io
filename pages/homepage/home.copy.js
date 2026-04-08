/** Centralized copy of content text for homepage */

const text = (s) => s.trim()

export const HOME_COPY = {
    about: {
        // section 2 (About Me) with multiple panels (next/back UI)
        title: 'About M.G.Utashiro (M.S.)',

        panels: [
            {
                id: 'about-01',
                body: text(`
                    Currently a theoretical chemist in training, I study how frequencies evolve and interact to shape the physical and chemical behavior we observe; from molecular spectroscopy to quantum-driven electronic processes.

                    This portfolio documents my work at the intersection of chemistry, computation, and visual communication, aiming to make complex quantum phenomena both understandable and experientially meaningful.
                    `),
            },
            {
                id: 'about-02',
                body: text(`
                     My work explores the laws of quantum mechanics through theoretical modeling, ultrafast spectroscopy, and interactive visualization to understand how excited-state dynamics shape light–matter interactions.

                     By combining science, mathematics, engineering, art, and design, I translate abstract electronic behavior into forms that can be seen, heard, and explored across disciplines.
                    `),
            },
            {
                id: 'about-03',
                body: text(`
                    This space was created to share ongoing investigations with curiosity-driven learners both within and beyond STEM.

                    Thank you for visiting!

                    ～(*'∀'*)ﾉ"♡
                    `),
            },
        ],
    },

    spec: {
        title: 'Spectroscopy',
        body: text(`
            Light is one of our most precise probes of matter.
            By observing how molecules absorb, emit, and transform energy across femtoseconds to seconds, we gain access to the dynamics that govern chemical behavior.

            This section explores ultrafast transient absorption and foundational spectroscopic techniques through interactive models and layered explanations; designed for both curious beginners and scientific colleagues.
            `)
    },

    dft: {
        title: 'DFT Calculations',
        body: text(`
            This section presents computational investigations performed in ORCA, including detailed studies of hydroquinone and excited-state behavior. Through density functional theory, we model how electrons distribute, reorganize, and influence chemical reactivity.

            Explore layered explanations in both intuitive and colleague modes, along with documented workflows and results.
            `)
    },

    portfolio: {
        title: 'Portfolio',
        body: text(`
            A collection of technical and creative builds including coding projects, interactive models, 3D work, and visual design. Developed to support research, teaching, and scientific communication, while exploring new ways to translate complex scientific ideas into engaging visual experiences.
            `)
    },
}

export default HOME_COPY