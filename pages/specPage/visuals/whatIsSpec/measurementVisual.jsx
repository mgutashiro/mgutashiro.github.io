import './measurementVisual.css';

export default function MeasurementVisualResponse() {
    return (
        <div className="mvWrap">
            <div className="visualStage mvStage" aria-label="Measurement visual">
                <svg
                    className="mvSvg"
                    viewBox="0 0 720 480"
                    role="img"
                    aria-labelledby="mvTitle mvDesc"
                >
                    <defs>
                        <linearGradient id="mvBeamInGrad" x1="88" y1="0" x2="304" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--c-glow-2)" stopOpacity="0" />
                            <stop offset="18%" stopColor="var(--c-glow-2)" stopOpacity="0.82" />
                            <stop offset="72%" stopColor="var(--c-glow-1)" stopOpacity="0.92" />
                            <stop offset="100%" stopColor="var(--c-glow-1)" stopOpacity="0.18" />
                        </linearGradient>

                        <linearGradient id="mvBeamOutGrad" x1="420" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--c-glow-2)" stopOpacity="0.2" />
                            <stop offset="36%" stopColor="var(--c-glow-1)" stopOpacity="0.78" />
                            <stop offset="100%" stopColor="var(--c-glow-1)" stopOpacity="0.08" />
                        </linearGradient>

                        <linearGradient id="mvTraceGrad" x1="150" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--c-glow-2)" />
                            <stop offset="52%" stopColor="var(--c-glow-3)" />
                            <stop offset="100%" stopColor="var(--c-glow-1)" />
                        </linearGradient>

                        <radialGradient id="mvFieldGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--c-glow-1)" stopOpacity="0.42" />
                            <stop offset="52%" stopColor="var(--c-glow-2)" stopOpacity="0.24" />
                            <stop offset="100%" stopColor="var(--c-glow-2)" stopOpacity="0" />
                        </radialGradient>

                        <filter id="mvBlurLg" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="10" />
                        </filter>

                        <filter id="mvBlurSm" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="4" />
                        </filter>

                        {/* text path for detect signal */}
                        <path id="mvDetectPath" d="M500 178 L500 332" />
                    </defs>

                    {/* top chamber */}
                    <g className="mvTopScene" transform="translate(0 -30)">
                        <rect
                            x="56"
                            y="62"
                            width="608"
                            height="228"
                            rx="114"
                            className="mvChamberShell"
                        />
                        <rect
                            x="72"
                            y="78"
                            width="576"
                            height="196"
                            rx="98"
                            className="mvChamberCore"
                        />

                        {/* title inside top pill */}
                        <text x="360" y="108" className="mvTopTitle">
                            light hits sample
                        </text>

                        {/* light source label */}
                        <text x="118" y="162" className="mvLabel mvLightSourceLabel">
                            light source
                        </text>

                        <line
                            x1="100"
                            y1="178"
                            x2="615"
                            y2="178"
                            className="mvAtmosLine"
                        />

                        {/* incoming beam */}
                        <g className="mvIncoming">
                            <line
                                x1="88"
                                y1="178"
                                x2="304"
                                y2="178"
                                className="mvBeamInGlow"
                            />
                            <line
                                x1="88"
                                y1="178"
                                x2="304"
                                y2="178"
                                className="mvBeamInRibbon"
                            />
                            <line
                                x1="88"
                                y1="178"
                                x2="304"
                                y2="178"
                                className="mvBeamInCore"
                            />
                        </g>

                        {/* sample field */}
                        <g className="mvFieldGroup">
                            <circle cx="360" cy="178" r="58" className="mvFieldAura" />
                            <ellipse cx="360" cy="178" rx="34" ry="62" className="mvFieldLens" />
                            <ellipse cx="360" cy="178" rx="11" ry="72" className="mvFieldVeil" />
                            <circle cx="360" cy="178" r="22" className="mvFieldCore" />
                        </g>

                        <text x="360" y="246" className="mvLabel mvSampleLabel">
                            sample
                        </text>

                        {/* outgoing beam */}
                        <g className="mvOutgoing">
                            <line
                                x1="420"
                                y1="178"
                                x2="474"
                                y2="178"
                                className="mvBeamOutGlow"
                            />
                            <line
                                x1="514"
                                y1="178"
                                x2="598"
                                y2="178"
                                className="mvBeamOutGlow"
                            />

                            <line
                                x1="420"
                                y1="178"
                                x2="474"
                                y2="178"
                                className="mvBeamOutCore"
                            />
                            <line
                                x1="514"
                                y1="178"
                                x2="598"
                                y2="178"
                                className="mvBeamOutCore"
                            />

                            <line
                                x1="432"
                                y1="168"
                                x2="565"
                                y2="168"
                                className="mvBeamOutBand"
                            />
                        </g>

                        {/* detect signal line */}
                        <g className="mvDetectGroup">
                            <path d="M500 178 L500 260" className="mvDetectLineGlow" />
                            <path d="M500 178 L500 260" className="mvDetectLineCore" />
                        </g>

                        <text x="518" y="238" className="mvDetectLabel">
                            detect signal
                        </text>
                    </g>

                    {/* bottom signal box */}
                    <g className="mvSignalScene" transform="translate(0 -10)">
                        <rect
                            x="126"
                            y="300"
                            width="468"
                            height="180"
                            rx="28"
                            className="mvSignalBox"
                        />

                        <line
                            x1="154"
                            y1="390"
                            x2="566"
                            y2="390"
                            className="mvMeasureBase"
                        />

                        <path
                            d="M162 390
                                C220 390 250 390 286 389
                                C312 389 324 380 342 362
                                C356 348 366 342 382 352
                                C398 364 407 400 434 403
                                C466 406 489 378 514 346
                                C530 326 544 314 560 307"
                            className="mvGhostTrace"
                        />

                        <path
                            d="M162 390
                            C220 390 250 390 286 389
                            C312 389 324 380 342 362
                            C356 348 366 342 382 352
                            C398 364 407 400 434 403
                            C466 406 489 378 514 346
                            C530 326 544 314 560 307"
                            className="mvSpectrumGlow"
                        />

                        <path
                            d="M162 390
                            C220 390 250 390 286 389
                            C312 389 324 380 342 362
                            C356 348 366 342 382 352
                            C398 364 407 400 434 403
                            C466 406 489 378 514 346
                            C530 326 544 314 560 307"
                            className="mvSpectrumLine"
                        />

                        <text x="360" y="432" className="mvBottomText">
                            signal detected!
                        </text>
                    </g>
                </svg>
            </div>
        </div>
    );
}