import "./StudyVisualPanel.css";
import { resolveStudyVisual } from "./visualRegistry";

function joinClassNames(...classNames) {
    return classNames.filter(Boolean).join(" ");
}

export default function StudyVisualPanel({
    chapter,
    activeChapter,
    evidenceTab,
    mode,
    state
}) {
    const config = resolveStudyVisual({ chapter, evidenceTab, state });
    const VisualComponent = config.Component;
    const visualLabel =
        chapter.id === "evidence" ? evidenceTab.visual : chapter.visual;

    return (
        <figure
            className="dft-visual-stack"
            aria-label={`${chapter.nav} visual`}
        >
            <div
                className={joinClassNames(
                    "dft-visual",
                    config.className
                )}
            >
                <VisualComponent
                    chapter={chapter}
                    activeChapter={activeChapter}
                    evidenceTab={evidenceTab}
                    mode={mode}
                    state={state}
                />
            </div>

            {visualLabel && (
                <figcaption className="dft-visual__label">
                    {visualLabel}
                </figcaption>
            )}
        </figure>
    );
}