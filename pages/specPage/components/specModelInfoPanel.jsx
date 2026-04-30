import { useEffect, useMemo, useState } from 'react';
import EquationBlock from './EquationBlock'; // adjust path if needed

function SpecModelBodyBlock({ block }) {
    if (typeof block === 'string') {
        return (
            <p className="SpecModelPartBodyText">
                {block}
            </p>
        );
    }

    if (!block || typeof block !== 'object') {
        return null;
    }

    if (block.type === 'text') {
        return (
            <p className="SpecModelPartBodyText">
                {block.value}
            </p>
        );
    }

    if (block.type === 'equation') {
        return (
            <div className="SpecModelPartEquation">
                <EquationBlock value={block.value} />
            </div>
        );
    }

    return null;
}

function normalizeModelPages(body) {
    if (!body) return [];

    if (typeof body === 'string') {
        return [
            [
                {
                    type: 'text',
                    value: body,
                },
            ],
        ];
    }

    if (Array.isArray(body)) {
        const isPagedBody = body.some((block) => block?.type === 'page');

        if (isPagedBody) {
            return body
                .filter((page) => page?.type === 'page')
                .map((page) => (
                    Array.isArray(page.blocks) ? page.blocks : []
                ));
        }

        return [body];
    }

    if (typeof body === 'object' && Array.isArray(body.blocks)) {
        return [body.blocks];
    }

    return [];
}

export default function SpecModelInfoPanel({
    config,
    activePart,
    mode = 'friends',
}) {
    const [pageIndex, setPageIndex] = useState(0);

    const body =
        activePart?.body?.[mode] ??
        activePart?.body?.friends ??
        activePart?.body ??
        '';

    const pages = useMemo(() => normalizeModelPages(body), [body]);

    const currentBlocks = pages[pageIndex] ?? pages[0] ?? [];
    const pageCount = pages.length;
    const hasMultiplePages = pageCount > 1;

    const isOverview = activePart?.id === 'overview';

    useEffect(() => {
        setPageIndex(0);
    }, [activePart?.id, mode]);

    if (!config || !activePart) return null;

    const goPrevious = () => {
        setPageIndex((current) => Math.max(current - 1, 0));
    };

    const goNext = () => {
        setPageIndex((current) => Math.min(current + 1, pageCount - 1));
    };

    return (
        <aside className="SpecModelInfoPanel">
            <h2 className="SpecModelPartTitle">
                {activePart.title}
            </h2>

            <div className="SpecModelPartBody">
                {currentBlocks.map((block, index) => (
                    <SpecModelBodyBlock
                        key={`${block?.type ?? 'text'}-${index}`}
                        block={block}
                    />
                ))}
            </div>

            {hasMultiplePages && (
                <div className="SpecModelPager">
                    <button
                        type="button"
                        className="SpecModelPagerButton"
                        onClick={goPrevious}
                        disabled={pageIndex === 0}
                    >
                        Back
                    </button>

                    <span className="SpecModelPagerCount">
                        {pageIndex + 1} / {pageCount}
                    </span>

                    <button
                        type="button"
                        className="SpecModelPagerButton"
                        onClick={goNext}
                        disabled={pageIndex === pageCount - 1}
                    >
                        Next
                    </button>
                </div>
            )}

            {isOverview && (
                <p className="SpecModelInteractionHint">
                    <span className="SpecHintDesktop">
                        Click parts to learn more!
                    </span>
                    <span className="SpecHintMobile">
                        Tap parts to learn more!
                    </span>
                </p>
            )}
        </aside>
    );
}