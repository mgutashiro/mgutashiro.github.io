import { Link } from 'react-router-dom';

export default function LaunchDemoButton({
  href,
  label = 'Open Demo',
  ariaLabel,
  className = '',
}) {
  if (!href) return null;

  const isExternal =
    href.startsWith('http://') || href.startsWith('https://');

  const buttonClassName = `launchDemoButton ${className}`.trim();

  if (isExternal) {
    return (
      <a
        href={href}
        className={buttonClassName}
        aria-label={ariaLabel ?? label}
        target="_blank"
        rel="noreferrer"
      >
        <span className="launchDemoButtonText">{label}</span>
        <span className="launchDemoButtonArrow">↗</span>
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={buttonClassName}
      aria-label={ariaLabel ?? label}
    >
      <span className="launchDemoButtonText">{label}</span>
      <span className="launchDemoButtonArrow">→</span>
    </Link>
  );
}