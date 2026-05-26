/**
 * renders LaTex equations using KaTex
 * convert input string -> block equation, false -> inline
 */
import katex from 'katex'

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