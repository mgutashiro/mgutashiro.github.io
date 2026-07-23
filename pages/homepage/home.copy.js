/** Centralized copy of content text for homepage */

const text = (s) => s.trim()

export const HOME_COPY = {
    about: {
        // section 2 (About Me) with multiple panels (next/back UI)
        title: 'About Graveyard Chemist',

        panels: [
            {
                id: 'about-01',
                body: text(`
Graveyard Chemist is a platform that bridges science, computation, and visual design together to make complex scientific ideas more understandle and accessible by integrating different mediums. 

The goal is to translate abstract concepts into experiences that invite curiosity.                
            `),
            },
            {
                id: 'about-02',
                body: text(`
Across my work, I use different disciplines and mediums to strengthen my theoretical thinking and communicate ideas through a modernist lens.

Philosophy, classical literature, illustration, and design also shape how I approach abstraction; reminding me that understanding depends not only on finding an answer, but on expressing it clearly and meaningfully.
                `),
            },
            {
                id: 'about-03',
                body: text(`
Let science, philosophy, technology, and creativity meet; guided by curiosity, dedication, and a little room for wonder.

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

            Learn the story and theory of DFT and explore layered explanations in both intuitive and colleague modes, along with documented workflows and results.
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