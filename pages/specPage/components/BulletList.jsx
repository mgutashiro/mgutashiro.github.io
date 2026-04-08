/**
 * Renders a list of bullet points from an array of strings.
 * Uses innerHTML to allow simple formatting (e.g. bold, subscripts).
 *
 * Returns null if empty to avoid rendering unused UI.
 * Intended for spec text panels (data-driven content).
 *
 * Note: Only used with trusted content (innerHTML).
 */

export default function BulletList({ bullets = [] }) {
  if (!bullets.length) return null;

  return (
    <ul className="bulletList">
      {bullets.map((bullet, index) => (
        <li
          key={`${bullet}-${index}`}
          dangerouslySetInnerHTML={{ __html: bullet }}
        />
      ))}
    </ul>
  );
}