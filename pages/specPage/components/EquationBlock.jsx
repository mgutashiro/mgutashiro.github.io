/**
 * Renders LaTeX equations using KaTeX.
 * Converts input string → HTML and injects into DOM.
 *
 * display = true → block equation, false → inline.
 *
 * Note: Uses innerHTML (safe here via KaTeX parsing).
 */

import katex from 'katex';

export default function EquationBlock({ value, display = true }) {
  const html = katex.renderToString(value, {
    throwOnError: false,
    displayMode: display,
  });

  return (
    <div
      className="equationBlock"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}