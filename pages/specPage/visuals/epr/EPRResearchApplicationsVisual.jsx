import './EPRResearchApplicationsVisual.css';
import React, { useId } from "react";
import isohumuloneRxnScheme from "/src/assets/SVG/isohumuloneRxnScheme.svg";

const VB = {
    width: 900,
    height: 560,
};

const BG_PAD = 24;

const BG_FRAME = {
    x: BG_PAD,
    y: BG_PAD,
    width: VB.width - BG_PAD * 2,
    height: VB.height - BG_PAD * 2,
    rx: 24,

};

const SCHEME_NATIVE = {
    width: 512,
    height: 342,
};

const SCHEME_SLOT = {
    x: 82,
    y: 78,
    width: 736,
    height: 350,
};

const BEER_BLOOM_PATH = "M84.2032 39.5378V42.5179L84.3694 44.8357L84.8681 47.1535L82.575 45.7673L80.9528 44.2611L79.6186 42.9204L78.4506 41.2929L77.4488 39.3787L76.2036 36.5599L75.3904 33.9894L74.494 31.5623L73.6584 29.3613L72.535 26.9948L71.0019 24.0104L69.5073 21.6217L68.0737 19.4592L66.6177 17.6662L65.0178 15.7904L63.2739 13.8319L61.7349 12.1822L59.8856 10.7366L57.7262 9.49491L55.3782 8.90951L57.2497 9.98563L58.584 11.3263L59.8351 12.8104L60.9809 14.8074L61.5285 16.8428L62.3195 19.7828L62.8448 22.1877L63.3256 25.3317L63.6016 28.1668L63.839 30.4062L63.9933 32.7889L64.0645 35.315L64.1357 37.8412L64.434 40.3067L64.7545 42.4027L65.219 44.5815L65.8883 47.0692L66.7847 49.4963L67.6425 51.3277L69.0762 53.4902L67.6143 53.032L65.2886 52.0771L63.2731 50.9182L60.9697 49.5937L58.9764 48.0653L57.1494 46.2501L55.6104 44.6004L53.9496 42.4985L52.3497 40.6227L50.545 38.438L48.3692 36.2311L46.3015 34.4056L44.0949 32.9156L42.4781 31.7567L40.317 30.4322L37.491 28.9422L34.3326 27.6487L31.839 26.7899L28.8641 26.4588L31.0079 27.6487L33.8339 29.3221L35.8287 30.9289L38.156 33.7433L39.8183 36.5578L41.4807 39.5378L42.8106 42.0212L44.0949 45.4979L45.4466 48.8883L46.9574 52.2422L48.795 55.7624L50.5776 58.0997L52.7088 61.0456L54.8237 63.0264L57.1494 63.9813L54.0757 64.3168L52.5084 64.3714L50.3044 63.8688L48.1835 63.2228L46.4337 62.599L43.1002 61.0646L39.418 59.1385L34.9551 56.5724L31.7656 55.1208L28.8641 53.8348L26.0208 53.1135L23.0286 52.6169L19.8701 52.2857L16.7116 51.9829H13.6037L9.42897 52.6718L12.8297 53.0599L16.7116 53.9413L18.9122 55.2658L22.5299 57.9147L25.5221 60.5636L28.246 63.6588L30.5657 65.9485L33.8339 69.007L36.9923 71.9871L40.8157 75.4638L44.6392 77.616L48.6272 78.8544L47.2973 79.5166L45.635 80.0133L43.4739 80.51L41.6894 80.8254L39.6903 81.0191L37.5248 80.926L34.4511 80.5905L31.8092 80.0067L29.2505 79.5663L26.9188 79.1865L24.2992 78.9722L21.3018 78.9405L18.4774 79.0351L15.8801 79.1904L13.593 79.5496L11.1619 79.9916L8.58687 80.5164L6.38287 81.0191L4.20113 81.8912L2.04167 83.1329L0.358643 84.8653L2.23017 83.7892L4.06312 83.3087L5.97921 82.9717L8.28861 82.982L10.3323 83.5274L13.2844 84.3151L15.6383 85.0645L18.6127 86.2218L21.216 87.4013L23.282 88.3162L25.0938 88.9788L27.3261 90.1805L29.5583 91.3821L31.8514 92.3577L33.8343 93.1292L35.9611 93.8179L38.459 94.4845L41.0178 94.9249L43.0392 95.1008L45.6366 94.9455L44.5071 95.9773L42.5139 97.5057L40.4984 98.6646L38.195 99.9891L35.8693 100.944L33.3774 101.612L31.1734 102.115L28.5152 102.496L26.0841 102.938L23.282 103.402L20.275 104.176L17.6614 105.296L15.3357 106.251L13.3202 107.41L11.7657 108.468L9.05264 110.41L6.27875 112.579L3.64883 114.665L2.52534 117.031L4.14754 115.525L7.02681 113.869L10.0115 112.727L13.6997 112.135L16.3547 112.533L19.7772 112.477L22.3137 112.548L26.2957 113.126L29.8845 113.356L33.5564 113.73L37.4553 114.165L40.8779 114.109L44.1405 113.73L46.634 113.275L48.6272 111.746L47.382 114.565L46.6459 115.944L45.6366 117.019L43.1383 118.515L41.7209 119.713L38.7199 121.82L35.2039 124.033L30.741 126.599L27.884 128.624L25.3149 130.484L23.0783 132.917L21.3345 134.876L19.1424 138.048L17.5648 140.293L15.7823 142.847L14.6871 146.918L16.4473 143.994L18.479 141.87L21.7902 139.966L25.2454 137.98L29.2601 136.627L33.1308 135.357L36.2817 134.501L39.3109 134.098L43.143 133.424L48.795 132.084L53.3252 129.665L56.7743 125.892L56.6081 128.21L56.2756 129.7L55.7769 131.852L55.2782 133.674L54.447 135.495L53.2834 137.316L51.4548 139.799L49.6262 141.786L47.9639 143.773L46.4678 145.594L44.9716 147.746L43.143 150.56L41.8132 153.044L40.6495 155.362L39.8183 157.514L38.9871 159.832L38.156 162.315L37.491 164.467L37.1586 166.785V169.268L37.8235 171.586V169.434L38.3222 167.613L38.9871 165.792L40.1508 163.805L41.6469 162.315L43.808 160.163L45.6366 158.507L48.1301 156.52L50.4574 154.865L52.286 153.54L54.2808 152.216L56.4419 150.892L58.6029 149.567L60.5978 148.243L62.2601 146.918L63.9225 145.428L65.7511 143.607L67.4134 141.62L68.577 139.965L69.7407 137.647L70.0732 139.137L70.4056 141.62V143.938V146.587L70.0732 149.07L69.4082 151.554L68.7433 153.706L67.7459 156.189L66.9147 158.507L65.9173 161.156L65.0861 164.136L64.7536 166.951L64.4212 169.434V171.752V174.07L64.7536 177.381L65.2523 180.857L65.751 184.169L67.2472 186.321L66.7485 184.169V180.857L67.2472 177.712L68.577 174.235L70.0732 171.586L71.7355 168.606L73.0654 166.454L75.5589 163.308L77.5537 160.328L79.7148 157.348L81.8759 154.269L84.0369 151.057L85.5331 147.746L86.198 144.931L85.8655 142.448L87.6941 144.931L88.5253 146.256L89.1902 148.408L89.6889 150.56L90.0214 152.382L90.3539 156.024L90.5201 160.163V165.295L90.8526 168.772L91.1851 171.917L92.1825 175.063L93.0136 177.546L94.676 181.023L95.8397 183.506L97.1695 186.321L100.162 189.301L98.4994 186.321L97.6682 183.506V179.698V175.725L98.4994 171.586L99.3306 167.613L100.162 164.467L101.325 161.653L102.655 158.01L103.486 153.706L103.653 148.309L103.486 144.782L103.123 142.448L105.055 143.75L106.185 144.782L107.807 146.288L109.141 147.629L110.309 149.257L111.311 151.171L112.556 153.99L113.369 156.56L114.266 158.987L115.101 161.188L116.225 163.555L117.758 166.539L119.252 168.928L120.686 171.09L122.142 172.883L123.742 174.759L125.486 176.718L127.025 178.367L128.874 179.813L131.033 181.055L133.381 181.64L131.51 180.564L130.176 179.223L128.924 177.739L127.779 175.742L127.231 173.707L126.44 170.767L125.915 168.362L125.434 165.218L125.158 162.383L124.921 160.143L124.766 157.761L124.695 155.234L124.624 152.708L124.326 150.243L124.005 148.147L123.541 145.968L122.871 143.48L121.975 141.053L121.117 139.222L119.683 137.059L121.145 137.517L123.471 138.472L125.486 139.631L127.79 140.956L129.783 142.484L131.61 144.299L133.149 145.949L134.81 148.051L136.41 149.927L138.215 152.111L140.39 154.318L142.671 156.012L144.665 157.541L146.68 158.7L148.696 159.859L151.741 161.227L155.014 162.536L158.142 163.761L160.762 163.547L158.641 162.901L155.762 161.245L153.276 159.242L150.918 156.357L149.362 153.742L147.602 150.818L146.395 148.595L144.907 144.872L143.313 141.661L141.802 138.307L140.23 134.727L138.47 131.803L136.339 128.857L134.224 126.877L131.898 125.922L134.972 125.586L136.54 125.532L138.744 126.034L140.864 126.68L142.614 127.304L145.948 128.838L149.63 130.765L154.093 133.331L157.282 134.782L160.184 136.068L163.418 136.781L165.993 137.306L169.847 137.61L172.589 137.848L175.701 138.108L179.788 137.018L176.366 136.961L173.503 136.271L170.192 134.367L166.737 132.381L163.553 129.594L160.514 126.891L158.194 124.601L156.328 122.19L153.826 119.222L150.498 116.353L145.216 112.551L139.726 110.894L141.056 110.232L142.718 109.735L144.879 109.239L146.664 108.923L148.663 108.73L150.828 108.823L153.902 109.158L156.544 109.742L159.103 110.182L161.434 110.562L164.054 110.776L167.415 110.946L170.24 110.852L172.837 110.696L175.124 110.337L177.555 109.895L180.13 109.37L182.334 108.868L184.516 107.996L186.676 106.754L188.359 105.022L186.487 106.098L184.654 106.578L182.738 106.915L180.429 106.905L178.385 106.359L175.433 105.572L173.079 104.822L170.105 103.665L167.501 102.486L165.435 101.571L163.286 100.512L161.054 99.3107L158.822 98.109L156.529 97.1335L154.546 96.362L152.419 95.6732L149.921 95.0066L147.362 94.5662L145.341 94.3903L142.743 94.5456L143.873 93.5139L145.866 91.9854L147.882 90.8265L150.185 89.5021L152.511 88.5471L155.003 87.879L157.207 87.3764L159.865 86.9949L162.296 86.5529L165.098 86.0887L168.105 85.3156L170.719 84.1951L173.044 83.2402L175.06 82.0813L177.075 80.9224L179.788 78.98L182.562 76.8116L185.192 74.7259L186.316 72.3594L184.693 73.8656L181.814 75.5212L178.83 76.6638L175.141 77.2552L172.09 77.2892L168.667 77.3455L166.131 77.2746L162.149 76.6967L158.56 76.4662L154.888 76.0924L150.989 75.6579L147.567 75.7141L143.939 76.0793L141.159 76.913L139.166 78.4415L140.411 75.6226L141.148 74.2435L142.687 72.5939L144.309 71.0876L145.726 69.8903L148.727 67.7824L152.243 65.5696L156.706 63.0035L159.563 60.9784L162.132 59.1188L164.369 56.6858L166.113 54.7272L168.305 51.5551L169.882 49.3098L171.665 46.7555L172.76 42.6847L171 45.6085L168.968 47.7326L165.657 49.6365L162.202 51.6232L158.187 52.9758L154.316 54.2456L151.165 55.1015L148.136 55.5051L144.304 56.1792L140.145 57.6146L134.198 60.2694L130.749 64.0416L130.915 61.7238L131.248 60.2338L131.746 58.0815L132.245 56.2604L133.076 54.4393L134.24 52.6182L136.069 50.1348L137.897 48.1481L139.56 46.1614L141.056 44.3403L142.552 42.188L144.38 39.3736L145.71 36.8902L146.874 34.5724L147.705 32.4202L148.536 30.1024L149.367 27.619L150.032 25.4668L150.365 23.149V20.6656L149.7 18.3478V20.5001L149.201 22.3212L148.536 24.1423L147.373 26.129L145.876 27.619L143.715 29.7713L141.887 31.4268L139.393 33.4135L137.066 35.0691L135.237 36.3935L133.243 37.718L131.082 39.0425L128.92 40.3669L126.926 41.8569L125.263 43.1814L123.601 44.6714L121.772 46.4925L120.11 48.4792L118.946 50.1348L117.783 52.4526L117.45 50.9626L117.118 48.4792V46.1614V43.5125L117.45 41.0291L118.115 38.5458L118.78 36.3935L119.778 33.9102L120.609 31.5924L121.606 28.9435L122.437 25.9634L122.77 23.149L123.102 20.6656V18.3478V16.03L122.77 12.7189L122.271 9.24216L121.772 5.93102L120.276 3.77878L120.775 5.93102V9.24216L120.276 12.3878L118.946 15.8645L117.45 18.5134L115.788 21.4934L114.458 23.6456L111.964 26.7912L109.97 29.7713L107.809 32.7513L105.481 35.8969L103.819 38.8769L102.323 42.188L101.658 45.0025L101.99 47.4859L100.162 45.0025L99.3306 43.6781L98.6656 41.5258L98.1669 39.3736L97.8345 37.5524L97.502 33.9102L97.3358 29.7713V24.639L97.0033 21.1623L96.6708 18.0167L95.8397 14.8698L95.0085 12.2209L93.5124 8.90976L92.3487 6.26084L90.6864 3.61322L88.1928 0.300781L89.3565 3.61322L90.0214 6.92307L90.1876 10.2355V14.2089L89.3565 18.3478L88.5253 22.3212L87.6941 25.4668L86.5305 28.2812L85.2006 31.9235L84.3694 36.228L84.2032 39.5378Z";

function makeIds(rawId) {
    const clean = rawId.replace(/:/g, "-");

    return {
        bg: `EPRResearchApps-bg-${clean}`,
        bgGlow: `EPRResearchApps-bgGlow-${clean}`,
        panelGlow: `EPRResearchApps-panelGlow-${clean}`,
        stroke: `EPRResearchApps-stroke-${clean}`,
        beerBloom: `EPRResearchApps-beerBloom-${clean}`,
    };
}

function GradientDefs({ ids }) {
    return (
        <defs>
            <linearGradient
                id={ids.bg}
                x1={BG_FRAME.x}
                y1={BG_FRAME.y}
                x2={BG_FRAME.x + BG_FRAME.width}
                y2={BG_FRAME.y + BG_FRAME.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--surface)" />
                <stop offset="58%" stopColor="var(--bg)" />
                <stop offset="100%" stopColor="var(--surface-2)" />
            </linearGradient>

            <radialGradient
                id={ids.bgGlow}
                cx="50%"
                cy="48%"
                r="65%"
            >
                <stop offset="0%" stopColor="var(--accent-2-glow)" />
                <stop offset="85%" stopColor="transparent" />
            </radialGradient>

            <linearGradient
                id={ids.stroke}
                x1="80"
                y1="80"
                x2="820"
                y2="480"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="50%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-3)" />
            </linearGradient>

            <filter
                id={ids.panelGlow}
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
            >
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <radialGradient
                id={ids.beerBloom}
                cx="50%"
                cy="45%"
                r="70%"
            >
                <stop offset="0%" stopColor="var(--accent-4)" />
                <stop offset="48%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-3)" />
            </radialGradient>
        </defs>
    )
}

function BackgroundPanel ({ ids }) {
    return (
        <g className="EPRResearchApps_Background">
            <rect
                {...BG_FRAME}
                fill={`url(#${ids.bg})`}
                stroke="var(--border)"
                strokeWidth="1.2"
            />
            <rect
                {...BG_FRAME}
                fill={`url(#${ids.bgGlow})`}
                opacity="0.28"
            />
            <rect
                x={BG_FRAME.x + 12}
                y={BG_FRAME.y + 12}
                width={BG_FRAME.width - 24}
                height={BG_FRAME.height - 24}
                rx={BG_FRAME.height - 24}
                fill="none"
                stroke={`url(#${ids.stroke})`}
                strokeWidth="1.1"
                opacity="0.38"
            />
        </g>
    );
}

function fitBoxToSlot(nativeBox, slotBox) {
    const nativeRatio = nativeBox.width / nativeBox.height;
    const slotRatio = slotBox.width / slotBox.height;

    const width =
        nativeRatio > slotRatio
            ? slotBox.width
            : slotBox.height * nativeRatio;
    
    const height = 
        nativeRatio > slotRatio
            ? slotBox.width / nativeRatio
            : slotBox.height;
    
    return {
        x: slotBox.x + (slotBox.width - width) / 2,
        y: slotBox.y + (slotBox.height - height) / 2,
        width,
        height,
    };
}

function makeSchemeLayout() {
    const image = fitBoxToSlot(SCHEME_NATIVE, SCHEME_SLOT);

    return {
        image
    };
}

function PanelTitle() {
    return (
        <text
            className="EPRResearchApps_Title"
            x={VB.width / 2}
            y="90"
            textAnchor="middle"
        >
            Radical Degradation Pathway
        </text>
    );
}

function ReactionSchemeLabel({
    x,
    y,
    children,
    anchor = "middle",
    variant = "main",
}) {
    return (
        <text
            className={`EPRResearchApps_SchemeLabel EPRResearchApps_SchemeLabel--${variant}`}
            x={x}
            y={y}
            textAnchor={anchor}
        >
            {children}
        </text>
    );
}

function ReactionSchemeLabels({ layout }) {
    const { image } = layout;

    return (
        <g className="EPRResearchApps_SchemeLabels">
            <ReactionSchemeLabel
                x={image.x + 130}
                y={image.y + 215}
            >
                Isohumulone
            </ReactionSchemeLabel>

            <ReactionSchemeLabel
                x={image.x + 150}
                y={image.y + 355}
                variant="product"
            >
                <tspan x={image.x + 150} dy="0">
                    3-methylbut-
                </tspan>
                <tspan x={image.x + 200} dy="1.2em">
                    2-ene-1-thiol
                </tspan>
            </ReactionSchemeLabel>
        </g>
    );
}

function SchemeAsset({ ids }) {
    const layout = makeSchemeLayout();

    return (
        <g className="EPRResearchApps_SchemeLayer" transform="scale(1.1 1.1) translate(-50, 10)">
            <image
                className="EPRResearchApps_SchemeImage"
                href={isohumuloneRxnScheme}
                {...layout.image}
                preserveAspectRatio="xMidYMid meet"
            />

            <ReactionSchemeLabels layout={layout} />
        </g>
    );
}

function BeerBloomDraw({ ids }) {
    return (
        <g
            className="EPRResearchApps_BeerBloomLayer"
            transform="translate(400 180) scale(0.35)"
            opacity="0.8"
        >
            <path
                className="EPRResearchApps_BeerBloom"
                d={BEER_BLOOM_PATH}
                fill={`url(#${ids.beerBloom})`}
                stroke="none"
            />
        </g>
    );
}

export default function EPRResearchApplicationsVisual({
    className="",
}) {
    const rawId = useId();
    const ids = makeIds(rawId);

    return (
        <figure className={`EPRResearchApps ${className}`}>
            <svg
                className="EPRResearchApps_SVG"
                viewBox={`0 0 ${VB.width} 550`}
                role="img"
            >
                <GradientDefs ids={ids} />
                <BackgroundPanel ids={ids} />
                <BeerBloomDraw ids={ids} />
                <PanelTitle />
                <SchemeAsset ids={ids} />
            </svg>

            <figcaption className="EPRResearchApps_Caption">
                <span className="EPRResearchApps_CaptionText">
                    Proposed radical pathway for the formation of lightstruck flavor in beer. Upon exposure to visible light, photosensitized degradation of isohumulone can generate radical intermediates that ultimately lead to the intensely aroma-active thiol, 3-methylbut-2-ene-1-thiol. Time-resolved EPR provides direct mechanistic insight by detecting the transient radical species involved in this photochemical process.
                </span>

                <a
                    className="EPRResearchApps_ReferenceLine"
                    href="https://www.researchgate.net/publication/11599435_Mechanism_for_formation_of_the_lightstruck_flavor_in_beer_revealed_by_time-resolved_electron_paramagnetic_resonance"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Read more about the study by Burns et al! 
                </a>
            </figcaption>
        </figure>
    )
}