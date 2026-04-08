export default function SectionLinkButton({
  to,
  label = 'Enter',
  variant = 'spec',
  kind = 'primary',      // 'primary' | 'ghost'
  icon = '→',            // simple arrow; keep lightweight
}) {
  if (!to) return null

  return (
    <a
      className="sectionLinkButton"
      data-variant={variant}
      data-kind={kind}
      href={to}
      aria-label={label}
    >
      <span className="slbLabel">{label}</span>
      <span className="slbIcon" aria-hidden="true">{icon}</span>
    </a>
  )
}