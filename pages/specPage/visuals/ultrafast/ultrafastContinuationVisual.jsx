import './ultrafastContinuationVisual.css';
import React, { useId } from "react";

const VB = {
  width: 960,
  height: 560,
};

const BG_PAD = 26;

const BG_FRAME = {
  x: BG_PAD,
  y: BG_PAD,
  width: VB.width - BG_PAD * 2,
  height: VB.height - BG_PAD * 2,
  rx: 28,
};

const MG_DECOR = {
  x: 56,
  y: 130,
  scale: 0.4,
};

const SUN_DECOR = {
  x: 34,
  y: 40,
  scale: 0.6,
};

const LEAF_DECOR = {
  x: 70,
  y: 100,
  scale: 0.6,
};

const LHC_BASE = {
  cx: 560,
  cy: 285,
  rx: 250,
  ry: 186,
  innerRx: 126,
  innerRy: 74,
};

const LEAF_TO_LHC_LINES = {
  dash: "10 8",
  strokeWidth: 2.2,
};

function makeSafeId(id) {
  return id.replace(/:/g, "-");
}

function BackgroundDefs({ ids }) {
  return (
    <defs>
      <linearGradient
        id={ids.bgWash}
        x1="0"
        y1="0"
        x2="0"
        y2={VB.height}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="var(--surface)" />
        <stop offset="58%" stopColor="var(--bg)" />
        <stop offset="100%" stopColor="var(--surface-2)" />
      </linearGradient>

      <radialGradient
        id={ids.bgGlow}
        cx={VB.width * 0.5}
        cy={VB.height * 0.42}
        r={VB.width * 0.55}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="var(--accent-2-glow)" />
        <stop offset="48%" stopColor="color-mix(in oklab, var(--accent) 22%, transparent)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      <linearGradient
        id={ids.border}
        x1={BG_FRAME.x}
        y1={BG_FRAME.y}
        x2={BG_FRAME.x + BG_FRAME.width}
        y2={BG_FRAME.y + BG_FRAME.height}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="var(--accent-2)" />
        <stop offset="52%" stopColor="var(--accent)" />
        <stop offset="100%" stopColor="var(--accent-3)" />
      </linearGradient>

            <radialGradient
        id={ids.sunCore}
        cx="84"
        cy="84"
        r="86"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="color-mix(in oklab, var(--lightMetal) 72%, white 28%)" />
        <stop offset="50%" stopColor="var(--lightMetal)" />
        <stop offset="100%" stopColor="var(--copper)" />
      </radialGradient>

      <radialGradient
        id={ids.sunGlow}
        cx="84"
        cy="84"
        r="120"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="color-mix(in oklab, var(--lightMetal) 40%, transparent)" />
        <stop offset="55%" stopColor="color-mix(in oklab, var(--copper) 24%, transparent)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      <linearGradient
        id={ids.arrowGradA}
        x1={LHC_BASE.cx - 130}
        y1={LHC_BASE.cy + 95}
        x2={LHC_BASE.cx}
        y2={LHC_BASE.cy}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="var(--accent-2)" />
        <stop offset="55%" stopColor="var(--accent-4)" />
        <stop offset="100%" stopColor="var(--accent)" />
      </linearGradient>

      <linearGradient
        id={ids.arrowGradB}
        x1={LHC_BASE.cx + 130}
        y1={LHC_BASE.cy - 95}
        x2={LHC_BASE.cx}
        y2={LHC_BASE.cy}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="var(--accent-2)" />
        <stop offset="5%" stopColor="var(--accent-4)" />
        <stop offset="100%" stopColor="var(--accent)" />
      </linearGradient>

      <filter
        id={ids.arrowGlow}
        x="-30%"
        y="-30%"
        width="160%"
        height="160%"
      >
        <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function BackgroundPanel({ ids }) {
  return (
    <g className="ultrafastContinuationVisual_BackgroundPanel">
      <rect
        x={BG_FRAME.x}
        y={BG_FRAME.y}
        width={BG_FRAME.width}
        height={BG_FRAME.height}
        rx={BG_FRAME.rx}
        fill={`url(#${ids.bgWash})`}
      />

      <rect
        x={BG_FRAME.x}
        y={BG_FRAME.y}
        width={BG_FRAME.width}
        height={BG_FRAME.height}
        rx={BG_FRAME.rx}
        fill={`url(#${ids.bgGlow})`}
        opacity="0.82"
      />

      <rect
        x={BG_FRAME.x}
        y={BG_FRAME.y}
        width={BG_FRAME.width}
        height={BG_FRAME.height}
        rx={BG_FRAME.rx}
        fill="none"
        stroke={`url(#${ids.border})`}
        strokeWidth="1.5"
        opacity="0.72"
      />
    </g>
  );
}


function MagnifyingGlass({
  x = MG_DECOR.x,
  y = MG_DECOR.y,
  scale = MG_DECOR.scale,
}) {
  return (
    <g
      className="MagnifyingGlass"
      transform={`translate(${x} ${y}) scale(${scale})`}
      aria-hidden="true"
    >
      <path
        className="MGHandleBase"
        d="M102.859 180.878L95.9989 192.501L112.415 202.129L119.194 190.201L102.859 180.878Z"
        fill="var(--lightMetal)"
      />
      <path
        className="MGBase"
        d="M81.7893 78.9261C103.416 41.536 151.26 28.757 188.65 50.3841C226.04 72.0112 238.819 119.854 217.192 157.244C195.565 194.634 147.721 207.413 110.331 185.786C72.9413 164.159 60.1625 116.316 81.7893 78.9261Z"
        fill="var(--lightMetal)"
      />
      <path
        className="MGHandle"
        d="M92.0218 189.993L116.797 204.44L80.2566 267.445L77.2108 270.938L73.6631 272.558L69.3288 273.72L64.8021 272.924L60.5599 270.714L56.9954 267.319L54.6443 262.259L54.318 257.326L55.7907 252.915L92.0218 189.993Z"
        fill="var(--copper)"
      />
      <path
        className="MGGlass"
        d="M132.757 55.3627C167.703 45.999 203.558 66.5233 212.849 101.195C222.139 135.867 201.349 171.569 166.404 180.933C131.458 190.297 95.6026 169.772 86.3123 135.1C77.022 100.429 97.8117 64.7263 132.757 55.3627Z"
        fill="color-mix(in oklab, var(--accent-2) 22%, white 78%)"
        opacity="0.34"
        stroke="color-mix(in oklab, var(--accent-2) 45%, white 55%)"
        strokeWidth="1.6"
      />
      <path
        className="MGTint"
        d="M105.208 126.696L104.123 131.269L102.995 133.219L100.839 133.796L98.7444 133.369L97.244 131.466L96.3381 128.085L95.6364 123.002L95.6116 116.75L96.0381 109.718L97.4099 103.751L100.014 97.4534L102.925 91.0733L106.7 85.4502L111.871 80.1117L118.583 74.3606L126.013 70.0636L133.774 66.996L139.625 65.4281L143.815 66.2819L146.239 67.9381L149.301 70.7412L150.701 75.966L149.534 80.2317L146.106 83.4559L141.035 85.4734L133.891 88.376L127.302 92.118L122.499 96.3695L118.395 100.763L113.245 107.414L109.779 112.954L107.032 119.949L105.208 126.696Z"
        fill="color-mix(in oklab, white 82%, var(--accent-2) 18%)"
        opacity="0.55"
      />
    </g>
  );
}

function Sun({ x = SUN_DECOR.x, y = SUN_DECOR.y, scale = SUN_DECOR.scale, ids }) {
  return (
    <g
      className="SunDecor"
      transform={`translate(${x} ${y}) scale(${scale})`}
      aria-hidden="true"
    >
      {/* soft glow behind the sun */}
      <circle
        cx="94"
        cy="92"
        r="92"
        fill={`url(#${ids.sunGlow})`}
        opacity="0.9"
      />

      <path
        className="SunShape"
        d="M84.2032 39.5378V42.5179L84.3694 44.8357L84.8681 47.1535L82.575 45.7673L80.9528 44.2611L79.6186 42.9204L78.4506 41.2929L77.4488 39.3787L76.2036 36.5599L75.3904 33.9894L74.494 31.5623L73.6584 29.3613L72.535 26.9948L71.0019 24.0104L69.5073 21.6217L68.0737 19.4592L66.6177 17.6662L65.0178 15.7904L63.2739 13.8319L61.7349 12.1822L59.8856 10.7366L57.7262 9.49491L55.3782 8.90951L57.2497 9.98563L58.584 11.3263L59.8351 12.8104L60.9809 14.8074L61.5285 16.8428L62.3195 19.7828L62.8448 22.1877L63.3256 25.3317L63.6016 28.1668L63.839 30.4062L63.9933 32.7889L64.0645 35.315L64.1357 37.8412L64.434 40.3067L64.7545 42.4027L65.219 44.5815L65.8883 47.0692L66.7847 49.4963L67.6425 51.3277L69.0762 53.4902L67.6143 53.032L65.2886 52.0771L63.2731 50.9182L60.9697 49.5937L58.9764 48.0653L57.1494 46.2501L55.6104 44.6004L53.9496 42.4985L52.3497 40.6227L50.545 38.438L48.3692 36.2311L46.3015 34.4056L44.0949 32.9156L42.4781 31.7567L40.317 30.4322L37.491 28.9422L34.3326 27.6487L31.839 26.7899L28.8641 26.4588L31.0079 27.6487L33.8339 29.3221L35.8287 30.9289L38.156 33.7433L39.8183 36.5578L41.4807 39.5378L42.8106 42.0212L44.0949 45.4979L45.4466 48.8883L46.9574 52.2422L48.795 55.7624L50.5776 58.0997L52.7088 61.0456L54.8237 63.0264L57.1494 63.9813L54.0757 64.3168L52.5084 64.3714L50.3044 63.8688L48.1835 63.2228L46.4337 62.599L43.1002 61.0646L39.418 59.1385L34.9551 56.5724L31.7656 55.1208L28.8641 53.8348L26.0208 53.1135L23.0286 52.6169L19.8701 52.2857L16.7116 51.9829H13.6037L9.42897 52.6718L12.8297 53.0599L16.7116 53.9413L18.9122 55.2658L22.5299 57.9147L25.5221 60.5636L28.246 63.6588L30.5657 65.9485L33.8339 69.007L36.9923 71.9871L40.8157 75.4638L44.6392 77.616L48.6272 78.8544L47.2973 79.5166L45.635 80.0133L43.4739 80.51L41.6894 80.8254L39.6903 81.0191L37.5248 80.926L34.4511 80.5905L31.8092 80.0067L29.2505 79.5663L26.9188 79.1865L24.2992 78.9722L21.3018 78.9405L18.4774 79.0351L15.8801 79.1904L13.593 79.5496L11.1619 79.9916L8.58687 80.5164L6.38287 81.0191L4.20113 81.8912L2.04167 83.1329L0.358643 84.8653L2.23017 83.7892L4.06312 83.3087L5.97921 82.9717L8.28861 82.982L10.3323 83.5274L13.2844 84.3151L15.6383 85.0645L18.6127 86.2218L21.216 87.4013L23.282 88.3162L25.0938 88.9788L27.3261 90.1805L29.5583 91.3821L31.8514 92.3577L33.8343 93.1292L35.9611 93.8179L38.459 94.4845L41.0178 94.9249L43.0392 95.1008L45.6366 94.9455L44.5071 95.9773L42.5139 97.5057L40.4984 98.6646L38.195 99.9891L35.8693 100.944L33.3774 101.612L31.1734 102.115L28.5152 102.496L26.0841 102.938L23.282 103.402L20.275 104.176L17.6614 105.296L15.3357 106.251L13.3202 107.41L11.7657 108.468L9.05264 110.41L6.27875 112.579L3.64883 114.665L2.52534 117.031L4.14754 115.525L7.02681 113.869L10.0115 112.727L13.6997 112.135L16.3547 112.533L19.7772 112.477L22.3137 112.548L26.2957 113.126L29.8845 113.356L33.5564 113.73L37.4553 114.165L40.8779 114.109L44.1405 113.73L46.634 113.275L48.6272 111.746L47.382 114.565L46.6459 115.944L45.6366 117.019L43.1383 118.515L41.7209 119.713L38.7199 121.82L35.2039 124.033L30.741 126.599L27.884 128.624L25.3149 130.484L23.0783 132.917L21.3345 134.876L19.1424 138.048L17.5648 140.293L15.7823 142.847L14.6871 146.918L16.4473 143.994L18.479 141.87L21.7902 139.966L25.2454 137.98L29.2601 136.627L33.1308 135.357L36.2817 134.501L39.3109 134.098L43.143 133.424L48.795 132.084L53.3252 129.665L56.7743 125.892L56.6081 128.21L56.2756 129.7L55.7769 131.852L55.2782 133.674L54.447 135.495L53.2834 137.316L51.4548 139.799L49.6262 141.786L47.9639 143.773L46.4678 145.594L44.9716 147.746L43.143 150.56L41.8132 153.044L40.6495 155.362L39.8183 157.514L38.9871 159.832L38.156 162.315L37.491 164.467L37.1586 166.785V169.268L37.8235 171.586V169.434L38.3222 167.613L38.9871 165.792L40.1508 163.805L41.6469 162.315L43.808 160.163L45.6366 158.507L48.1301 156.52L50.4574 154.865L52.286 153.54L54.2808 152.216L56.4419 150.892L58.6029 149.567L60.5978 148.243L62.2601 146.918L63.9225 145.428L65.7511 143.607L67.4134 141.62L68.577 139.965L69.7407 137.647L70.0732 139.137L70.4056 141.62V143.938V146.587L70.0732 149.07L69.4082 151.554L68.7433 153.706L67.7459 156.189L66.9147 158.507L65.9173 161.156L65.0861 164.136L64.7536 166.951L64.4212 169.434V171.752V174.07L64.7536 177.381L65.2523 180.857L65.751 184.169L67.2472 186.321L66.7485 184.169V180.857L67.2472 177.712L68.577 174.235L70.0732 171.586L71.7355 168.606L73.0654 166.454L75.5589 163.308L77.5537 160.328L79.7148 157.348L81.8759 154.269L84.0369 151.057L85.5331 147.746L86.198 144.931L85.8655 142.448L87.6941 144.931L88.5253 146.256L89.1902 148.408L89.6889 150.56L90.0214 152.382L90.3539 156.024L90.5201 160.163V165.295L90.8526 168.772L91.1851 171.917L92.1825 175.063L93.0136 177.546L94.676 181.023L95.8397 183.506L97.1695 186.321L100.162 189.301L98.4994 186.321L97.6682 183.506V179.698V175.725L98.4994 171.586L99.3306 167.613L100.162 164.467L101.325 161.653L102.655 158.01L103.486 153.706L103.653 148.309L103.486 144.782L103.123 142.448L105.055 143.75L106.185 144.782L107.807 146.288L109.141 147.629L110.309 149.257L111.311 151.171L112.556 153.99L113.369 156.56L114.266 158.987L115.101 161.188L116.225 163.555L117.758 166.539L119.252 168.928L120.686 171.09L122.142 172.883L123.742 174.759L125.486 176.718L127.025 178.367L128.874 179.813L131.033 181.055L133.381 181.64L131.51 180.564L130.176 179.223L128.924 177.739L127.779 175.742L127.231 173.707L126.44 170.767L125.915 168.362L125.434 165.218L125.158 162.383L124.921 160.143L124.766 157.761L124.695 155.234L124.624 152.708L124.326 150.243L124.005 148.147L123.541 145.968L122.871 143.48L121.975 141.053L121.117 139.222L119.683 137.059L121.145 137.517L123.471 138.472L125.486 139.631L127.79 140.956L129.783 142.484L131.61 144.299L133.149 145.949L134.81 148.051L136.41 149.927L138.215 152.111L140.39 154.318L142.671 156.012L144.665 157.541L146.68 158.7L148.696 159.859L151.741 161.227L155.014 162.536L158.142 163.761L160.762 163.547L158.641 162.901L155.762 161.245L153.276 159.242L150.918 156.357L149.362 153.742L147.602 150.818L146.395 148.595L144.907 144.872L143.313 141.661L141.802 138.307L140.23 134.727L138.47 131.803L136.339 128.857L134.224 126.877L131.898 125.922L134.972 125.586L136.54 125.532L138.744 126.034L140.864 126.68L142.614 127.304L145.948 128.838L149.63 130.765L154.093 133.331L157.282 134.782L160.184 136.068L163.418 136.781L165.993 137.306L169.847 137.61L172.589 137.848L175.701 138.108L179.788 137.018L176.366 136.961L173.503 136.271L170.192 134.367L166.737 132.381L163.553 129.594L160.514 126.891L158.194 124.601L156.328 122.19L153.826 119.222L150.498 116.353L145.216 112.551L139.726 110.894L141.056 110.232L142.718 109.735L144.879 109.239L146.664 108.923L148.663 108.73L150.828 108.823L153.902 109.158L156.544 109.742L159.103 110.182L161.434 110.562L164.054 110.776L167.415 110.946L170.24 110.852L172.837 110.696L175.124 110.337L177.555 109.895L180.13 109.37L182.334 108.868L184.516 107.996L186.676 106.754L188.359 105.022L186.487 106.098L184.654 106.578L182.738 106.915L180.429 106.905L178.385 106.359L175.433 105.572L173.079 104.822L170.105 103.665L167.501 102.486L165.435 101.571L163.286 100.512L161.054 99.3107L158.822 98.109L156.529 97.1335L154.546 96.362L152.419 95.6732L149.921 95.0066L147.362 94.5662L145.341 94.3903L142.743 94.5456L143.873 93.5139L145.866 91.9854L147.882 90.8265L150.185 89.5021L152.511 88.5471L155.003 87.879L157.207 87.3764L159.865 86.9949L162.296 86.5529L165.098 86.0887L168.105 85.3156L170.719 84.1951L173.044 83.2402L175.06 82.0813L177.075 80.9224L179.788 78.98L182.562 76.8116L185.192 74.7259L186.316 72.3594L184.693 73.8656L181.814 75.5212L178.83 76.6638L175.141 77.2552L172.09 77.2892L168.667 77.3455L166.131 77.2746L162.149 76.6967L158.56 76.4662L154.888 76.0924L150.989 75.6579L147.567 75.7141L143.939 76.0793L141.159 76.913L139.166 78.4415L140.411 75.6226L141.148 74.2435L142.687 72.5939L144.309 71.0876L145.726 69.8903L148.727 67.7824L152.243 65.5696L156.706 63.0035L159.563 60.9784L162.132 59.1188L164.369 56.6858L166.113 54.7272L168.305 51.5551L169.882 49.3098L171.665 46.7555L172.76 42.6847L171 45.6085L168.968 47.7326L165.657 49.6365L162.202 51.6232L158.187 52.9758L154.316 54.2456L151.165 55.1015L148.136 55.5051L144.304 56.1792L140.145 57.6146L134.198 60.2694L130.749 64.0416L130.915 61.7238L131.248 60.2338L131.746 58.0815L132.245 56.2604L133.076 54.4393L134.24 52.6182L136.069 50.1348L137.897 48.1481L139.56 46.1614L141.056 44.3403L142.552 42.188L144.38 39.3736L145.71 36.8902L146.874 34.5724L147.705 32.4202L148.536 30.1024L149.367 27.619L150.032 25.4668L150.365 23.149V20.6656L149.7 18.3478V20.5001L149.201 22.3212L148.536 24.1423L147.373 26.129L145.876 27.619L143.715 29.7713L141.887 31.4268L139.393 33.4135L137.066 35.0691L135.237 36.3935L133.243 37.718L131.082 39.0425L128.92 40.3669L126.926 41.8569L125.263 43.1814L123.601 44.6714L121.772 46.4925L120.11 48.4792L118.946 50.1348L117.783 52.4526L117.45 50.9626L117.118 48.4792V46.1614V43.5125L117.45 41.0291L118.115 38.5458L118.78 36.3935L119.778 33.9102L120.609 31.5924L121.606 28.9435L122.437 25.9634L122.77 23.149L123.102 20.6656V18.3478V16.03L122.77 12.7189L122.271 9.24216L121.772 5.93102L120.276 3.77878L120.775 5.93102V9.24216L120.276 12.3878L118.946 15.8645L117.45 18.5134L115.788 21.4934L114.458 23.6456L111.964 26.7912L109.97 29.7713L107.809 32.7513L105.481 35.8969L103.819 38.8769L102.323 42.188L101.658 45.0025L101.99 47.4859L100.162 45.0025L99.3306 43.6781L98.6656 41.5258L98.1669 39.3736L97.8345 37.5524L97.502 33.9102L97.3358 29.7713V24.639L97.0033 21.1623L96.6708 18.0167L95.8397 14.8698L95.0085 12.2209L93.5124 8.90976L92.3487 6.26084L90.6864 3.61322L88.1928 0.300781L89.3565 3.61322L90.0214 6.92307L90.1876 10.2355V14.2089L89.3565 18.3478L88.5253 22.3212L87.6941 25.4668L86.5305 28.2812L85.2006 31.9235L84.3694 36.228L84.2032 39.5378Z"
        fill={`url(#${ids.sunCore})`}
        stroke="color-mix(in oklab, var(--copper) 68%, var(--lightMetal) 32%)"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Leaf({
  x = LEAF_DECOR.x,
  y = LEAF_DECOR.y,
  scale = LEAF_DECOR.scale,
}) {
  return (
    <g
      className="LeafDecor"
      transform={`translate(${x} ${y}) scale(${scale})`}
      aria-hidden="true"
    >
      <path
        d="M6.5 211.016V216.016L10 213.016L13 211.016L17 209.016L21.5 206.516L27 205.016L34 203.516L42.5 202.516L50.5 202.016L58.5 201.516L66 200.516L73.5 199.016L85.5 196.516L95.5 193.016L106.5 189.016L117 184.516L127 179.016L136.5 173.016L146 166.016L155 158.016L163 150.016L170 141.016L177 131.016L183 119.516L187.5 108.016L191.5 96.0156L194.5 81.5156L196 69.5156L197 56.5156V47.0156V36.0156V27.0156V17.0156V7.51562V1.01562L190.5 6.01562L180.5 11.5156L170.5 15.0156L164.5 17.0156L156.5 19.0156L152.5 19.5156L145.5 20.5156L141 21.5156L133.5 22.5156L128 23.0156L123 23.5156L118.5 24.0156L112.5 25.0156L106.5 26.0156L101 27.0156L97 28.0156L93 29.0156L88 30.5156L85 31.5156L81.5 33.0156L77 35.0156L73.5 36.5156L70.5 38.0156L67 40.0156L63 42.5156L58.5 45.5156L55.5 47.5156L51 51.0156L46.5 54.5156L42.5 58.0156L39.5 61.0156L35 66.0156L31 70.5156L27 75.5156L23.5 80.5156L20 86.0156L17.5 90.5156L14 97.0156L10.5 104.516L8 111.516L6 118.016L4 126.016L2.5 133.016L1.5 139.016L1 146.016L0.5 153.516V160.516V167.516L1 173.016L2 181.516L3.5 189.016L4.5 195.016L6 204.016L6.5 211.016Z"
        fill="color-mix(in oklab, var(--accent-4) 58%, var(--accent-2) 42%)"
        stroke="color-mix(in oklab, var(--accent-4) 40%, var(--bg) 60%)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </g>
  );
}

function LightHarvestCenterBase({
  cx = LHC_BASE.cx,
  cy = LHC_BASE.cy,
  rx = LHC_BASE.rx,
  ry = LHC_BASE.ry,
  innerRx = LHC_BASE.innerRx,
  innerRy = LHC_BASE.innerRy,
}) {
  const maskId = `lhc-base-mask-${makeSafeId(useId())}`;
  const ringFill = "color-mix(in oklab, var(--accent-4) 58%, var(--accent-2) 42%)";
  const miniEllipseFill = "color-mix(in oklab, var(--accent-4) 72%, var(--bg) 28%)";
  const innerMiniFill = "color-mix(in oklab, var(--accent-4) 62%, var(--accent-2) 38%)";

  const innerEllipses = [
    { cx: cx + 60, cy: cy + 35, rx: 33, ry: 20 },
    { cx: cx - 60, cy: cy - 35, rx: 33, ry: 20 },
    { cx: cx + 60, cy: cy - 35, rx: 33, ry: 20 },
    { cx: cx - 60, cy: cy + 35, rx: 33, ry: 20 },
  ];

  const outerEllipses = [
    { cx: cx, cy: cy + 135, rx: 33, ry: 20 },
    { cx: cx, cy: cy - 135, rx: 33, ry: 20 },
    { cx: cx - 190,  cy: cy, rx: 33, ry: 20 },
    { cx: cx + 190,  cy: cy, rx: 33, ry: 20 },
    { cx: cx + 130, cy: cy + 95, rx: 33, ry: 20 },
    { cx: cx + 130, cy: cy - 95, rx: 33, ry: 20 },
    { cx: cx - 130, cy: cy + 95, rx: 33, ry: 20 },
    { cx: cx - 130, cy: cy - 95, rx: 33, ry: 20 },
  ];

  const rcEllipse = { cx: cx, cy: cy, rx: 33, ry: 20 };

  return (
    <g className="LightHarvestCenterBase" aria-hidden="true">
      <defs>
        <mask
          id={maskId}
          x={cx - rx - 10}
          y={cy - ry - 10}
          width={rx * 2 + 20}
          height={ry * 2 + 20}
          maskUnits="userSpaceOnUse"
        >
          {/* white = visible */}
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="white" />

          {/* black = transparent cutout */}
          <ellipse cx={cx} cy={cy} rx={innerRx} ry={innerRy} fill="black" />
        </mask>
      </defs>

      {/* outer soft base */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={ringFill}
        fillOpacity="0.18"
        stroke="color-mix(in oklab, var(--accent-4) 46%, var(--bg) 54%)"
        strokeWidth="1.4"
        mask={`url(#${maskId})`}
      />

      {/* inner open center */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={innerRx}
        ry={innerRy}
        fill="none"
        stroke="color-mix(in oklab, var(--accent-2) 62%, var(--text) 38%)"
        strokeWidth="1.1"
        opacity="0.55"
      />

      {innerEllipses.map((item, i) => (
        <ellipse
          key={`inner-ellipse-${i}`}
          cx={item.cx}
          cy={item.cy}
          rx={item.rx}
          ry={item.ry}
          fill={innerMiniFill}
          fillOpacity="0.3"
          stroke="color-mix(in oklab, var(--accent-2) 40%, var(--bg) 60%)"
          strokeWidth="0.9"
        />
      ))}
      {outerEllipses.map((item, i) => (
        <ellipse
          key={`outer-ellipse-${i}`}
          cx={item.cx}
          cy={item.cy}
          rx={item.rx}
          ry={item.ry}
          fill={miniEllipseFill}
          fillOpacity="0.58"
          stroke="color-mix(in oklab, var(--accent-4) 52%, var(--bg) 48%)"
          strokeWidth="0.8"
        />
      ))}

      <ellipse
        className="RC"
        cx={rcEllipse.cx}
        cy={rcEllipse.cy}
        rx={rcEllipse.rx}
        ry={rcEllipse.ry}
        fill="color-mix(in oklab, var(--accent-3) 78%, white 22%)"
        fillOpacity="0.88"
        stroke="color-mix(in oklab, var(--accent-3) 62%, var(--text) 38%)"
        strokeWidth="1"
      />

    </g>
  );
}

function makeArrowHeadFromBase(x1, y1, baseX, baseY, length = 20, width = 14) {
  const dx = baseX - x1;
  const dy = baseY - y1;
  const mag = Math.hypot(dx, dy) || 1;

  const ux = dx / mag;
  const uy = dy / mag;

  // perpendicular direction
  const px = -uy;
  const py = ux;

  // tip goes forward from the base center
  const tipX = baseX + ux * length;
  const tipY = baseY + uy * length;

  // base corners centered at baseX, baseY
  const leftX = baseX + px * (width / 2);
  const leftY = baseY + py * (width / 2);

  const rightX = baseX - px * (width / 2);
  const rightY = baseY - py * (width / 2);

  return `${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`;
}

function HarvestEnergyArrow({ cx = LHC_BASE.cx, cy = LHC_BASE.cy, ids }) {
  const p1 = { x: cx - 130, y: cy + 95 };
  const p2 = { x: cx, y: cy + 135 };
  const p3 = { x: cx - 60, y: cy + 35 };
  const p4 = { x: cx - 15, y: cy + 10 };

  const arrowPath = `
    M ${p1.x} ${p1.y}
    L ${p2.x} ${p2.y}
    L ${p3.x} ${p3.y}
    L ${p4.x} ${p4.y}
  `;

  const arrowHeadPoints = makeArrowHeadFromBase(
    p3.x,
    p3.y,
    p4.x,
    p4.y,
    20,
    14
  );

  const q1 = { x: cx + 130, y: cy - 95 };
  const q2 = { x: cx + 190, y: cy };
  const q3 = { x: cx + 60, y: cy + 35 };
  const q4 = { x: cx + 20, y: cy + 10 };

  const arrowPathB = `
    M ${q1.x} ${q1.y}
    L ${q2.x} ${q2.y}
    L ${q3.x} ${q3.y}
    L ${q4.x} ${q4.y}
  `;

  const arrowHeadB = makeArrowHeadFromBase(
    q3.x,
    q3.y,
    q4.x,
    q4.y,
    20,
    14
  );

  return (
    <g className="HarvestEnergyArrow" aria-hidden="true">
      <path
        d={arrowPath}
        fill="none"
        stroke={`url(#${ids.arrowGradA})`}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.22"
        filter={`url(#${ids.arrowGlow})`}
      />
      <path
        d={arrowPath}
        fill="none"
        stroke={`url(#${ids.arrowGradA})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={arrowHeadPoints}
        fill="color-mix(in oklab, var(--accent) 78%, white 22%)"
        opacity="0.96"
        filter={`url(#${ids.arrowGlow})`}
      />

      <path
        d={arrowPathB}
        fill="none"
        stroke={`url(#${ids.arrowGradB})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.28"
        filter={`url(#${ids.arrowGlow})`}
      />
      <path
        d={arrowPathB}
        fill="none"
        stroke={`url(#${ids.arrowGradB})`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={arrowHeadB}
        fill="color-mix(in oklab, var(--accent) 72%, white 28%)"
        opacity="0.98"
        filter={`url(#${ids.arrowGlow})`}
      />
    </g>
  );
}

function PeripheralHarvestArrows({ cx = LHC_BASE.cx, cy = LHC_BASE.cy, ids }) {
  // end point of the path = arrow tip location in local coordinates
  const END = { x: 133.158, y: 158.5 };
  const HEAD_FROM = { x: 125.92, y: 149.471 };

  // target tip locations
  const tipA = { x: cx - 130, y: cy + 95 };
  const tipB = { x: cx + 130, y: cy - 95 };

  // const rotA = desiredAngleA - baseAngle;
  const rotB = -30;

  // arrowhead geometry in local coordinates
  const headLength = 10;
  const headWidth = 8.5;

  const dx = END.x - HEAD_FROM.x;
  const dy = END.y - HEAD_FROM.y;
  const mag = Math.hypot(dx, dy) || 1;

  const ux = dx / mag;
  const uy = dy / mag;

  const px = -uy;
  const py = ux;
  const shaftEnd = {
    x: END.x - ux * headLength,
    y: END.y - uy * headLength,
  };

  const arrowPathD = `
    M0.157837 15.8486
    L46.3007 0.5
    H51.7293
    L49.015 6.82
    L18.2531 34.8086
    L15.5388 40.2257
    H20.9674
    L60.7769 25.78
    H66.2055
    L62.5864 30.2943
    L34.5388 56.4771
    L30.9197 61.8943
    H34.5388
    L74.3483 48.3514
    L82.4912 46.5457
    L77.0626 53.7686
    L49.015 79.0486
    L46.3007 82.66
    H51.7293
    L90.634 69.1171
    L95.1578 68.2143
    L93.3483 72.7286
    L64.3959 96.2029
    L60.7769 101.62
    L68.015 100.717
    L101.491 87.1743
    L107.825 86.2714
    L106.015 91.6886
    L78.8721 119.677
    L77.0626 124.191
    H82.4912
    L115.967 110.649
    L122.301 109.746
    L118.682 116.066
    L93.3483 139.54
    L91.5388 144.957
    L96.0626 146.763
    H118.682
    L122.301 147.666
    L125.92 149.471
    L${shaftEnd.x} ${shaftEnd.y}
  `;

  const leftX = shaftEnd.x + px * (headWidth / 2);
  const leftY = shaftEnd.y + py * (headWidth / 2);

  const rightX = shaftEnd.x - px * (headWidth / 2);
  const rightY = shaftEnd.y - py * (headWidth / 2);

  const arrowHeadPoints = `${END.x},${END.y} ${leftX},${leftY} ${rightX},${rightY}`;

  const shaftGlow = "color-mix(in oklab, var(--accent-4) 72%, white 28%)";
  const shaftCore = "color-mix(in oklab, var(--accent-4) 88%, white 12%)";
  const headFill = "color-mix(in oklab, var(--accent-4) 78%, white 22%)";
  const headStroke = "color-mix(in oklab, var(--accent-4) 58%, white 42%)";

  return (
    <g className="PeripheralHarvestArrows" aria-hidden="true">
      {/* Arrow A */}
      <g transform={`translate(${tipA.x - END.x} ${tipA.y - END.y})`}>
        <path
          d={arrowPathD}
          fill="none"
          stroke={shaftGlow}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.26"
          filter={`url(#${ids.arrowGlow})`}
        />
        <path
          d={arrowPathD}
          fill="none"
          stroke={shaftCore}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          points={arrowHeadPoints}
          fill={headFill}
          stroke={headStroke}
          strokeWidth="1"
          opacity="0.96"
          filter={`url(#${ids.arrowGlow})`}
        />
      </g>

      {/* Arrow B */}
      <g transform={`translate(${tipB.x - END.x} ${tipB.y - END.y})`}>
        <g transform={`rotate(${rotB} ${END.x} ${END.y})`}>
          <path
            d={arrowPathD}
            fill="none"
            stroke={shaftGlow}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.26"
            filter={`url(#${ids.arrowGlow})`}
          />
          <path
            d={arrowPathD}
            fill="none"
            stroke={shaftCore}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points={arrowHeadPoints}
            fill={headFill}
            stroke={headStroke}
            strokeWidth="1"
            opacity="0.96"
            filter={`url(#${ids.arrowGlow})`}
          />
        </g>
      </g>
    </g>
  );
}

function LeafToLHCGuides({
  leafX = LEAF_DECOR.x,
  leafY = LEAF_DECOR.y,
  leafScale = LEAF_DECOR.scale,
  cx = LHC_BASE.cx,
  cy = LHC_BASE.cy,
}) {
  const lines = [
    {
      x1: leafX + 200 * leafScale,
      y1: leafY + 4 * leafScale,
      x2: cx,
      y2: cy - 190,
    },
    {
      x1: leafX + 10 * leafScale,
      y1: leafY + 218 * leafScale,
      x2: cx - 138,
      y2: cy + 160,
    },
  ];

  return (
    <g className="LeafToLHCGuides" aria-hidden="true">
      {lines.map((line, i) => (
        <line
          key={`leaf-to-lhc-guide-${i}`}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          fill="none"
          stroke="color-mix(in oklab, var(--accent-4) 58%, var(--accent-2) 42%)"
          strokeWidth={LEAF_TO_LHC_LINES.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={LEAF_TO_LHC_LINES.dash}
          opacity="0.62"
        />
      ))}
    </g>
  );
}

const LABEL_POSITIONS = {
  photosynthesis: { x: 280, y: 60, rotate: -8 },

  lightHarvestingCenter: { x: LHC_BASE.cx + 100, y: LHC_BASE.cy + 200 },

  reactionCenter: { x: LHC_BASE.cx, y: LHC_BASE.cy - 10 },

  lightEnergy: { x: LHC_BASE.cx - 255, y: LHC_BASE.cy - 60 },
  chlorophyll: { x: LHC_BASE.cx + 280, y: LHC_BASE.cy },
  core: { x: LHC_BASE.cx - 85, y: LHC_BASE.cy - 5 },
};

function VisualLabel({
  x,
  y,
  children,
  rotate = 0,
  anchor = "middle",
  size = 18,
  weight = "var(--w-semibold)",
  lines,
}) {
  return (
    <text
      className="UltrafastContinuation_Label"
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="middle"
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      fill="var(--text)"
      fontFamily="var(--font-tech)"
      fontSize={size}
      fontWeight={weight}
      letterSpacing="0.035em"
    >
      {lines
        ? lines.map((line, i) => (
            <tspan key={line} x={x} dy={i === 0 ? "-0.5em" : "1em"}>
              {line}
            </tspan>
          ))
        : children}
    </text>
  );
}

function UltrafastContinuationLabels() {
  return (
    <g className="UltrafastContinuation_Labels" aria-hidden="true">
      <VisualLabel
        x={LABEL_POSITIONS.photosynthesis.x}
        y={LABEL_POSITIONS.photosynthesis.y}
        size={32}
        anchor="start"
      >
        PHOTOSYNTHESIS ZOOMED IN
      </VisualLabel>

      <VisualLabel
        x={LABEL_POSITIONS.lightHarvestingCenter.x}
        y={LABEL_POSITIONS.lightHarvestingCenter.y}
        size={22}
      >
        Light Harvesting Center
      </VisualLabel>

      <VisualLabel
        x={LABEL_POSITIONS.reactionCenter.x}
        y={LABEL_POSITIONS.reactionCenter.y}
        size={18}
        lines={["Reaction", "Center"]}
      />

      <VisualLabel
        x={LABEL_POSITIONS.lightEnergy.x}
        y={LABEL_POSITIONS.lightEnergy.y}
        size={22}
      >
        Light Energy
      </VisualLabel>

      <VisualLabel
        x={LABEL_POSITIONS.chlorophyll.x}
        y={LABEL_POSITIONS.chlorophyll.y}
        size={22}
        lines={["Plant", "Pigments"]}
      />

      <VisualLabel
        x={LABEL_POSITIONS.core.x}
        y={LABEL_POSITIONS.core.y}
        size={22}
      >
        core
      </VisualLabel>
    </g>
  );
}

export default function UltrafastContinuationVisual() {
  const uid = makeSafeId(useId());

  const ids = {
    bgWash: `ultrafast-continuation-bg-wash-${uid}`,
    bgGlow: `ultrafast-continuation-bg-glow-${uid}`,
    border: `ultrafast-continuation-border-${uid}`,
    sunCore: `ultrafast-continuation-sun-core-${uid}`,
    sunGlow: `ultrafast-continuation-sun-glow-${uid}`,
    arrowGradA: `ultrafast-continuation-arrow-grad-a-${uid}`,
    arrowGradB: `ultrafast-continuation-arrow-grad-b-${uid}`,
    arrowGlow: `ultrafast-continuation-arrow-glow-${uid}`,
  };

  return (
    <figure className="ultrafastContinuationVisual_Figure">
      <svg
        className="ultrafastContinuationVisual_Svg"
        viewBox={`0 0 ${VB.width} ${VB.height}`}
        role="img"
      >

        <BackgroundDefs ids={ids} />
        <BackgroundPanel ids={ids} />
        <Leaf />
        <Sun ids={ids} />
        <LightHarvestCenterBase />
        <HarvestEnergyArrow cx={LHC_BASE.cx} cy={LHC_BASE.cy} ids={ids} />
        <LeafToLHCGuides />
        <MagnifyingGlass />
        <PeripheralHarvestArrows ids={ids} />
        <UltrafastContinuationLabels />

      </svg>
    </figure>
  );
}