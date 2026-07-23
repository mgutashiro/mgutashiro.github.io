import { useId, useMemo } from "react";
import skullSvgRaw from "/src/assets/SVG/Skull.svg?raw";
import "./SkullLogo.css";

function joinClassNames(...classNames) {
    return classNames.filter(Boolean).join(" ");
}

function getSvgInnerMarkup(svgText) {
    const match = svgText.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/i);
    return match?.[1] ?? svgText;
}

function getSvgViewBox(svgText) {
    const match = svgText.match(/\bviewBox=(['"])(.*?)\1/i);
    return match?.[2] ?? "0 0 1129 1098";
}

function getPathData(svgText, id) {
    const elementPattern = new RegExp(
        `<path\\b(?=[^>]*\\bid=(['"])${id}\\1)[^>]*>`,
        "i"
    );
    const pathElement = svgText.match(elementPattern)?.[0];
    const dMatch = pathElement?.match(/\bd=(['"])([\s\S]*?)\1/i);

    return dMatch?.[2] ?? "";
}

function namespaceSvgMarkup(svgText, prefix) {
    const innerMarkup = getSvgInnerMarkup(svgText);

    const withNamespacedIds = innerMarkup.replace(
        /\bid=(['"])([^'"]+)\1/g,
        (_, quote, id) => `id=${quote}${prefix}-${id}${quote}`
    );

    return withNamespacedIds
        .replace(
            /\b(href|xlink:href)=(['"])#([^'"]+)\2/g,
            (_, attribute, quote, id) =>
                `${attribute}=${quote}#${prefix}-${id}${quote}`
        )
        .replace(
            /url\(#([^)]+)\)/g,
            (_, id) => `url(#${prefix}-${id})`
        );
}


export default function SkullLogo({
    className = "",
    size = "nav",
    state = "idle",
    decorative = true,
    title = "Graveyard Chemist skull logo",
}) {
    const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
    const prefix = `graveyard-skull-${reactId || "logo"}`;

    const viewBox = useMemo(
        () => getSvgViewBox(skullSvgRaw),
        []
    );

    const skullBasePath = useMemo(
        () => getPathData(skullSvgRaw, "SkullBase"),
        []
    );

    const skullMarkup = useMemo(
        () => namespaceSvgMarkup(skullSvgRaw, prefix),
        [prefix]
    );

    const ids = useMemo(
        () => ({
            liquidMask: `${prefix}-liquid-mask`,
            glassGradient: `${prefix}-glass-gradient`,
            liquidGradient: `${prefix}-liquid-gradient`,
            metalGradient: `${prefix}-metal-gradient`,
            spillGradient: `${prefix}-spill-gradient`,
            title: `${prefix}-title`,
        }),
        [prefix]
    );

    return (
        <span
            className={joinClassNames(
                "skull-logo",
                `skull-logo--${size}`,
                className
            )}
            data-state={state}
            aria-hidden={decorative ? "true" : undefined}
        >
            <svg
                className="skull-logo__svg"
                viewBox={viewBox}
                preserveAspectRatio="xMidYMid meet"
                role={decorative ? undefined : "img"}
                aria-labelledby={decorative ? undefined : ids.title}
                focusable="false"
                style={{
                    "--skull-glass-gradient": `url(#${ids.glassGradient})`,
                    "--skull-metal-gradient": `url(#${ids.metalGradient})`,
                }}
            >
                {!decorative && <title id={ids.title}>{title}</title>}

                <defs>
                    <radialGradient
                        id={ids.glassGradient}
                        cx="40%"
                        cy="26%"
                        r="84%"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--skull-logo-glass-highlight)"
                            stopOpacity="0.2"
                        />
                        <stop
                            offset="54%"
                            stopColor="var(--skull-logo-glass-mid)"
                            stopOpacity="0.08"
                        />
                        <stop
                            offset="100%"
                            stopColor="var(--skull-logo-glass-shadow)"
                            stopOpacity="0.16"
                        />
                    </radialGradient>

                    <linearGradient
                        id={ids.metalGradient}
                        x1="102"
                        y1="48"
                        x2="1045"
                        y2="1054"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--skull-logo-metal-shadow)"
                        />
                        <stop
                            offset="24%"
                            stopColor="var(--skull-logo-metal-copper)"
                        />
                        <stop
                            offset="52%"
                            stopColor="var(--skull-logo-metal-brass)"
                        />
                        <stop
                            offset="72%"
                            stopColor="var(--skull-logo-metal-flash)"
                        />
                        <stop
                            offset="100%"
                            stopColor="var(--skull-logo-metal-copper)"
                        />
                    </linearGradient>

                    <linearGradient
                        id={ids.liquidGradient}
                        x1="205"
                        y1="585"
                        x2="948"
                        y2="1084"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--skull-logo-liquid-cyan)"
                        />
                        <stop
                            offset="23%"
                            stopColor="var(--skull-logo-liquid-violet)"
                        />
                        <stop
                            offset="54%"
                            stopColor="var(--skull-logo-liquid-purple)"
                        />
                        <stop
                            offset="76%"
                            stopColor="var(--skull-logo-liquid-pink)"
                        />
                        <stop
                            offset="100%"
                            stopColor="var(--skull-logo-liquid-wine)"
                        />
                    </linearGradient>

                    <linearGradient
                        id={ids.spillGradient}
                        x1="820"
                        y1="620"
                        x2="1760"
                        y2="650"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--skull-logo-liquid-cyan)"
                        />
                        <stop
                            offset="42%"
                            stopColor="var(--skull-logo-liquid-violet)"
                        />
                        <stop
                            offset="74%"
                            stopColor="var(--skull-logo-liquid-pink)"
                        />
                        <stop
                            offset="100%"
                            stopColor="var(--skull-logo-liquid-wine)"
                        />
                    </linearGradient>

                    <mask
                        id={ids.liquidMask}
                        x="0"
                        y="0"
                        width="1129"
                        height="1098"
                        maskUnits="userSpaceOnUse"
                        maskContentUnits="userSpaceOnUse"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="1129"
                            height="1098"
                            fill="black"
                        />

                        <path
                            d={skullBasePath}
                            fill="white"
                            stroke="black"
                            strokeWidth="34"
                            strokeLinejoin="round"
                        />
                    </mask>
                </defs>

                <g className="skull-logo__artboard">
                    <g
                        className="skull-logo__liquid-mask"
                        mask={`url(#${ids.liquidMask})`}
                    >
                        <g className="skull-logo__liquid">
                            <path
                                className="skull-logo__liquid-body"
                                d="M-40 622C128 586 300 665 478 629C675 590 850 671 1168 608V1140H-40Z"
                                fill={`url(#${ids.liquidGradient})`}
                            />

                            <path
                                className="skull-logo__liquid-surface"
                                d="M-40 622C128 586 300 665 478 629C675 590 850 671 1168 608"
                            />
                        </g>
                    </g>

                    <path
                        className="skull-logo__inner-wall"
                        d={skullBasePath}
                    />

                    <g
                        className="skull-logo__asset"
                        dangerouslySetInnerHTML={{ __html: skullMarkup }}
                    />

                    <path
                        className="skull-logo__shell-highlight"
                        d="M845 138C946 188 1023 287 1069 404"
                    />

                    <path
                        className="skull-logo__shell-highlight skull-logo__shell-highlight--warm"
                        d="M49 760C141 813 250 861 371 891"
                    />
                </g>

                <path
                    className="skull-logo__spill-stream"
                    d="M812 635C1010 672 1146 603 1324 643C1486 680 1607 641 1764 661"
                    stroke={`url(#${ids.spillGradient})`}
                />
            </svg>
        </span>
    );
}