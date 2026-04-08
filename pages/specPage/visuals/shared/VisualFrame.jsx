/**
 * Reusable layout wrapper for visuals.
 * Provides title, subtitle, caption, and content area.
 *
 * Keeps visual components styled consistently.
 */

import './visualShared.css';

export default function VisualFrame({
  title,
  subtitle,
  caption,
  children,
  className = '',
}) {
  const classes = ['visualFrame', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {(title || subtitle) && (
        <header className="visualFrameHeader">
          {subtitle ? <p className="visualFrameSubtitle">{subtitle}</p> : null}
          {title ? <h3 className="visualFrameTitle">{title}</h3> : null}
        </header>
      )}

      <div className="visualFrameBody">
        {children}
      </div>

      {caption ? <p className="visualFrameCaption">{caption}</p> : null}
    </div>
  );
}