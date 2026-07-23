import HYQDensityVisual from "./panels/HYQDensityVisual";
import PlaceholderVisual from "./panels/PlaceholderVisual";

export const studyVisualRegistry = {
    density: {
        Component: HYQDensityVisual,
        className: "dft-visual--hyq-density",
    },
    default: {
        Component: PlaceholderVisual,
        className: "dft-visual--placeholder",
    },
};

function getCandidateKeys({ chapter, evidenceTab, state }) {
    switch (chapter?.id) {
        case "density":
            return [`density:${state?.theoryIndex ?? 0}`, "density"];
        case "pcet":
            return [`pcet:${state?.pathway ?? "cpet"}`, "pcet"];
        case "evidence":
            return [
                evidenceTab?.id ? `evidence:${evidenceTab.id}` : null,
                "evidence",
            ];
        default:
            return [chapter?.id];
    }
}

export function resolveStudyVisual(context) {
    const key = getCandidateKeys(context).find(
        (candidate) => candidate && studyVisualRegistry[candidate]
    );

    return studyVisualRegistry[key] ?? studyVisualRegistry.default;
}