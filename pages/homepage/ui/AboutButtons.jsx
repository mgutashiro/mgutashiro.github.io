export default function AboutButtons({
  index,
  total,
  onBack,
  onNext,
}) {
  const isFirst = index === 0
  const isLast = index === total - 1

  return (
    <div className="aboutControls" aria-label="About panel controls">
      <button
        type="button"
        className="aboutNavButton aboutNavButton--back"
        onClick={onBack}
        disabled={isFirst}
        aria-label="Back"
      >
        <span className="aboutNavButton__label aboutNavButton__label--left">
          Back
        </span>

        <span className="aboutNavButton__circle" aria-hidden="true">
          <span className="aboutNavButton__glow" />
          <span className="aboutNavButton__triangle aboutNavButton__triangle--left" />
        </span>
      </button>

      <button
        type="button"
        className="aboutNavButton aboutNavButton--next"
        onClick={onNext}
        disabled={isLast}
        aria-label="Next"
      >
        <span className="aboutNavButton__circle" aria-hidden="true">
          <span className="aboutNavButton__glow" />
          <span className="aboutNavButton__triangle aboutNavButton__triangle--right" />
        </span>

        <span className="aboutNavButton__label aboutNavButton__label--right">
          Next
        </span>
      </button>
    </div>
  )
}