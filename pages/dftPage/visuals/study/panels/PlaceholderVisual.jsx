import "./PlaceholderVisual.css";

export default function PlaceholderVisual({ activeChapter }) {
    return (
        <>
            <div
                className="dft-ring__track"
                style={{
                    "--ring-rotation": `${activeChapter * -72}deg`,
                }}
                aria-hidden="true"
            />

            <div className="dft-molecule-placeholder" aria-hidden="true">
                <span className="dft-atom dft-atom--one" />
                <span className="dft-atom dft-atom--two" />
                <span className="dft-atom dft-atom--three" />
                <span className="dft-atom dft-atom--four" />

                <span className="dft-bond dft-bond--one" />
                <span className="dft-bond dft-bond--two" />
                <span className="dft-bond dft-bond--three" />
            </div>

            <div className="dft-visual__placeholder-note">
                Three.js / Blender placeholder
            </div>
        </>
    );
}