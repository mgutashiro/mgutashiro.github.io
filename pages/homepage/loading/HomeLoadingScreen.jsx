import { useEffect, useState } from 'react';
import ElevatorRig from '../ui/ElevatorRig';
import './HomeLoadingScreen.css';

const BOOT_TOTAL_MS = 10000;

const TYPE_LINES = [
    {
        key: 'mount',
        text: '> Mounting BreedingPhotons.imo',
        start: 1800,
        duration: 2300,
    },
    {
        key: 'extract',
        text: '>Extracting aesther_packets.dat',
        start: 4100,
        duration: 2400,
    },
    {
        key: 'tea',
        text: '> ./Initiating_tea_protocol_1964.exe',
        start: 6500,
        duration: 2300,
    },
];

function clamp01(value) {
    return Math.max(0, Math.min(1, value));
}

function typeByTime(text, elapsed, start, duration) {
    if (elapsed < start) return '';

    const t = clamp01((elapsed - start) / duration);
    const count = Math.floor(text.length * t);

    return text.slice(0, count);
}

function getDotCount(elapsed) {
    if (elapsed >= 1200) return 3;
    if (elapsed >= 800) return 2;
    if (elapsed >= 400) return 1;
    return 0;
}

export default function HomeLoadingScreen({ onComplete }) {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const startTime = performance.now();
        let rafId = null;
        const tick = (now) => {
            const nextElapsed = Math.min(now - startTime, BOOT_TOTAL_MS);
            setElapsed(nextElapsed);

            if (nextElapsed < BOOT_TOTAL_MS) {
                rafId = requestAnimationFrame(tick);
                return;
            }

            onComplete?.();
        };

        rafId = requestAnimationFrame(tick);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [onComplete]);

    const dotCount = getDotCount(elapsed);
    const dots = dotCount > 0 
        ? ` ${Array.from({ length: dotCount }, () => '.').join(' ')}` 
        : '';

    const bootFrame = {
        bootLine: `Boot sequence:${dots}`,
        showKernel: elapsed >= 1300,
        typedLines: TYPE_LINES.map((line) => ({
            ...line,
            visibleText: typeByTime(line.text, elapsed, line.start, line.duration),
            isActive: elapsed >= line.start && elapsed < line.start + line.duration,
            isDone: elapsed >= line.start + line.duration,
        })),
    };

    return (
        <div className="HomePageGrid HomeBootGrid" data-loading="true">
            <aside id="elevatorSpace" className="elevatorLane HomeBootElevatorLane">
                <ElevatorRig
                    phase="loading"
                    activeId="intro"
                    progress={0}
                    loadingProgress={elapsed / BOOT_TOTAL_MS}
                />
            </aside>

            <div className="HomePageMainSpace HomeBootMainSpace">
                <main className="HomeBootTerminal" aria-label="Boot loading sequence">
                    <p className="HomeBootTerminal__line">
                        {bootFrame.bootLine}
                        {elapsed < 1000 ? <span className="HomeBootTerminal__cursor" /> : null}
                    </p>

                    <p className={`HomeBootTerminal__line ${bootFrame.showKernel ? 'isVisible' : 'isHidden'}`}>
                        alchemy_kernel.sys
                    </p>

                    {bootFrame.typedLines.map((line) => (
                        <p
                            key={line.key}
                            className={`HomeBootTerminal__line ${line.visibleText ? 'isVisible' : 'isHidden'}`}
                        >
                            {line.visibleText}
                            {line.isActive ? <span className="HomeBootTerminal__cursor" /> : null}
                        </p>
                    ))}
                </main>
            </div>
        </div>
    );
}