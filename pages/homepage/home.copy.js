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
I am a theoretical chemist in training with a background in spectroscopy, computation, and scientific communication. My work focuses on how light, energy, and electronic structure interact to shape the physical and chemical behavior we observe, from molecular spectroscopy to quantum-level processes.

This portfolio gathers my work at the intersection of chemistry, computation, and visual design, with the goal of making complex scientific ideas more understandable, engaging, and meaningful.
                `),
            },
            {
                id: 'about-02',
                body: text(`
My projects explore the behavior of matter through theoretical modeling, computational analysis, and interactive visualization, with a particular interest in how structure, energy, and motion shape chemical behavior.

An additional passion for philosophy and classical literature has also shaped the way I think about abstraction, interpretation, and theory. Across chemistry, mathematics, coding, and design, I enjoy studying difficult problems and translating abstract ideas into forms that can be seen, explored, and more easily understood.
                `),
            },
            {
                id: 'about-03',
                body: text(`
                    This space was built for both technical and non-technical visitors: for those looking at my research and professional work, and for those who simply want to know how I think, build, and learn. I hope it offers a welcoming glimpse into the questions that move me, the work I care about, and the idea that both science and art begin in the same place; a desire to understand what it means to see the world clearly.
                    
                    Thank you for stopping by!
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
            This section presents computational investigations performed in ORCA, including detailed studies of hydroquinone and excited-state behavior. Through density functional theory, I model how electrons distribute, reorganize, and influence chemical reactivity.

            Explore layered explanations in both intuitive and colleague modes, along with documented workflows and results.
            `)
    },

    philosophy: {
        title: 'The Philosophy Crypt',
        body: text(`
            Here, among the static glow and candle-smoke of old ideas, I keep a record of my readings through classical literature, philosophy, and the darker chambers of the human mind. 
            
            This is not a shelf of reviews, but a growing archive of mini essays on suffering, morality, rebellion, love, fate, and the shifting line between good and wickedness. Step inside the margin and follow the questions that refuse to stay buried.
            `)
    },
}

export default HOME_COPY