const RAW = [
    {
        id: "intro",
        label: "Intro",
        route: null,
        hasFrame: false,
        hasCTA: false,
    },
    {
        id: "about",
        label: "About",
        route: null,
        hasFrame: true,
        hasCTA: false,
    },
    {
        id: "spec",
        label: "Spectroscopy",
        route: "/pages/specPage",
        hasFrame: true,
        hasCTA: true,
        ctaLabel: "Follow the pulse",
    },
    {
        id: "dft",
        label: "DFT",
        route: "/pages/dftPage",
        hasFrame: true,
        hasCTA: true,
        ctaLabel: "Enter the Calc",
    },
    {
        id: "portfolio",
        label: "Portfolio",
        route: "/pages/portfolioPage",
        hasFrame: true,
        hasCTA: true,
        ctaLabel: "See the Work",
    },
    {
        id: "meme",
        label: "Meme",
        route: null,
        hasFrame: false,
        hasCTA: false,
    },
]

const N = RAW.length
const step = 1 / (N - 1) // IMPORTANT: N-1 because scroll max = (N-1)*vh

export const HOME_SECTIONS = RAW.map((s, i) => {
  const a = i * step
  const b = i === N - 1 ? 1 : (i + 1) * step
  return { ...s, t: [Number(a.toFixed(4)), Number(b.toFixed(4))] }
})