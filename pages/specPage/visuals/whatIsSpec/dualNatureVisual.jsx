import './dualNatureVisual.css';

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  lane: ((i % 3) - 1).toString(),
  size: (0.9 + (i % 4) * 0.08).toFixed(2),
}));

const WAVES = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  lane: ((i % 2) - 0.5).toString(),
  scale: (0.96 + (i % 2) * 0.08).toFixed(2),
}));

function DualDish() {
  return (
    <div className="dualDish">
      <div className="dualDishShadow" />
      <div className="dualDishBase" />
      <div className="dualDishRim" />
      <div className="dualDishTop" />
      <div className="dualDishShine" />
    </div>
  );
}

function DualWaveGlyph() {
  return (
    <svg
      className="dualWaveSVG"
      viewBox="0 0 84 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="dualWavePath"
        d="M0 12
           C 7 3, 14 3, 21 12
           S 35 21, 42 12
           S 56 3, 63 12
           S 77 21, 84 12"
      />
    </svg>
  );
}

export default function DualNatureVisualResponse() {
  return (
    <div className="dualNatureVisualStage" aria-hidden="true">
      <div className="dualAura dualAuraL" />
      <div className="dualAura dualAuraR" />

      <div className="dualScene">
        <div className="dualHit dualHitParticles" />
        <div className="dualHit dualHitWaves" />

        <div className="dualBeam dualBeamIn dualBeamParticles">
          {PARTICLES.map((particle) => (
            <span
              key={`particle-in-${particle.id}`}
              className="dualParticle dualParticleIn"
              style={{
                '--i': particle.id,
                '--lane': particle.lane,
                '--size': particle.size,
              }}
            />
          ))}
        </div>

        <div className="dualBeam dualBeamOut dualBeamParticles">
          {PARTICLES.map((particle) => (
            <span
              key={`particle-out-${particle.id}`}
              className="dualParticle dualParticleOut"
              style={{
                '--i': particle.id,
                '--lane': particle.lane,
                '--size': particle.size,
              }}
            />
          ))}
        </div>


        <div className="dualBeam dualBeamWaves dualBeamIn">
          {WAVES.map((wave) => (
            <span
              key={`wave-in-${wave.id}`}
              className="dualWave dualWaveIn"
              style={{
                '--i': wave.id,
                '--lane': wave.lane,
                '--scale': wave.scale,
              }}
            >
              <DualWaveGlyph />
            </span>
          ))}
        </div>

        <div className="dualBeam dualBeamWaves dualBeamOut ">
          {WAVES.map((wave) => (
            <span
              key={`wave-out-${wave.id}`}
              className="dualWave dualWaveOut"
              style={{
                '--i': wave.id,
                '--lane': wave.lane,
                '--scale': wave.scale,
              }}
            >
              <DualWaveGlyph />
            </span>
          ))}
        </div>

        <DualDish />
      </div>
    </div>
  );
}