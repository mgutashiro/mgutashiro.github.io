/**
 * Positions labels in visuals (SVG or HTML).
 * Supports absolute positioning via x, y.
 *
 * Flexible for both SVG text and HTML overlays.
 */

export default function VisualLabel({
  children,
  x,
  y,
  className = '',
  as = 'text',
}) {
  if (as === 'html') {
    return (
      <span
        className={['visualLabel', className].filter(Boolean).join(' ')}
        style={{ left: x, top: y, position: 'absolute' }}
      >
        {children}
      </span>
    );
  }

  return (
    <text
      x={x}
      y={y}
      className={['visualLabelSvg', className].filter(Boolean).join(' ')}
    >
      {children}
    </text>
  );
}