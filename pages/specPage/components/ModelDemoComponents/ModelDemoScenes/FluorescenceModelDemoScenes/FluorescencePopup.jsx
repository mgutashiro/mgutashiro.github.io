import { Html } from '@react-three/drei';

function normalizePopupBlocks(body) {
    if (!body) return [];

    if (typeof body === 'string') {
        return [
            {
                type: 'text',
                value: body,
            },
        ];
    }

    if (Array.isArray(body)) {
        const firstPage = body.find((block) => block?.type === 'page');

        if (firstPage?.blocks?.length) {
            return firstPage.blocks;
        }

        return body;
    }

    if (typeof body === 'object' && Array.isArray(body.blocks)) {
        return body.blocks;
    }

    return [];
}

function getPartById(parts, partId) {
    return parts.find((part) => part.id === partId) ?? null;
}

export default function FluorescencePopup({
    parts = [],
    partId,
    mode = 'friends',
    onClose,
}) {
    const part = getPartById(parts, partId);

    if (!part) return null;

    const body =
        part.body?.[mode] ??
        part.body?.friends ??
        part.body ??
        '';

    const blocks = normalizePopupBlocks(body)
        .filter((block) => block?.type === 'text' || typeof block === 'string')
        .slice(0, 2);

    return (
        <Html fullscreen zIndexRange={[90, 0]}>
            <div className="FluorPopupOverlay">
                <section
                    className="FluorPopupCard"
                    onPointerDown={(event) => {
                        event.stopPropagation();
                    }}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <div className="FluorPopupHeader">
                        <p className="FluorPopupEyebrow">
                            {part.label}
                        </p>

                        <button
                            type="button"
                            className="FluorPopupClose"
                            onClick={onClose}
                            aria-label="Close popup"
                        >
                            ×
                        </button>
                    </div>

                    <h3 className="FluorPopupTitle">
                        {part.title}
                    </h3>

                    <div className="FluorPopupBody">
                        {blocks.map((block, index) => {
                            const value =
                                typeof block === 'string'
                                    ? block
                                    : block.value;

                            return (
                                <p key={index}>
                                    {value}
                                </p>
                            );
                        })}
                    </div>

                    <p className="FluorPopupHint">
                        Full explanation is in the side panel.
                    </p>
                </section>
            </div>
        </Html>
    );
}