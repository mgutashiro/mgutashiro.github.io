import '../shared/visualShared.css';
import './dual-natureVisual.css';

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

function Dish() {
  return (
    <div className="dualDish">
      <div className="dualDish__shadow" />
      <div className="dualDish__base" />
      <div className="dualDish__rim" />
      <div className="dualDish__top" />
      <div className="dualDish__shine" />
    </div>
  );
}

function WaveGlyph() {
  return (
    <svg
      className="dualWave__svg"
      viewBox="0 0 84 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="dualWave__path"
        d="M0 12
           C 7 3, 14 3, 21 12
           S 35 21, 42 12
           S 56 3, 63 12
           S 77 21, 84 12"
      />
    </svg>
  );
}

export default function DualNatureVisual() {
  return (
    <div className="dualNatureVisual" aria-hidden="true">
      <div className="dualAura dualAura--left" />
      <div className="dualAura dualAura--right" />

      <div className="dualScene">
        <div className="dualHit dualHit--particles" />
        <div className="dualHit dualHit--waves" />

        <div className="dualBeam dualBeam--in dualBeam--particles">
          {PARTICLES.map((particle) => (
            <span
              key={`particle-in-${particle.id}`}
              className="dualParticle dualParticle--in"
              style={{
                '--i': particle.id,
                '--lane': particle.lane,
                '--size': particle.size,
              }}
            />
          ))}
        </div>

        <div className="dualBeam dualBeam--out dualBeam--particles">
          {PARTICLES.map((particle) => (
            <span
              key={`particle-out-${particle.id}`}
              className="dualParticle dualParticle--out"
              style={{
                '--i': particle.id,
                '--lane': particle.lane,
                '--size': particle.size,
              }}
            />
          ))}
        </div>

        <div className="dualBeam dualBeam--in dualBeam--waves">
          {WAVES.map((wave) => (
            <span
              key={`wave-in-${wave.id}`}
              className="dualWave dualWave--in"
              style={{
                '--i': wave.id,
                '--lane': wave.lane,
                '--scale': wave.scale,
              }}
            >
              <WaveGlyph />
            </span>
          ))}
        </div>

        <div className="dualBeam dualBeam--out dualBeam--waves">
          {WAVES.map((wave) => (
            <span
              key={`wave-out-${wave.id}`}
              className="dualWave dualWave--out"
              style={{
                '--i': wave.id,
                '--lane': wave.lane,
                '--scale': wave.scale,
              }}
            >
              <WaveGlyph />
            </span>
          ))}
        </div>

        <Dish />
      </div>
    </div>
  );
}