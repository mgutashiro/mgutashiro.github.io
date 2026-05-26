/** render text content for a section panel
 * supports paragraphs, equation(katex) and bullet lists
 * handles both string and structured content (blocks)
 * uses normalization helper for consistent rendering
 */
import EquationBlock from './EquationBlock';
import BulletList from './BulletList';
import { normalizeContentBlocks, normalizeTextBlock } from '../utils/renderSpecContent';
import InlineMathText from './InlineMathText';

export default function SpecTextPanel ({ panel }) {
    if (!panel) return null;

    const isStringBody = typeof panel.body === 'string';
    const bodyBlocks = isStringBody ? [] : normalizeContentBlocks(panel.body);
    const bullets = panel.bullets ?? [];

    return (
        <div className="specpageTextPanel">
            {panel.heading && (
                <h3 className="specpagePanelHeading">{panel.heading}</h3>
            )}

            {isStringBody && (
                <p className="specpageParagraph">
                    {normalizeTextBlock(panel.body)}
                </p>
            )}

            {!isStringBody && bodyBlocks.map((block, index) => {
                if (block.type === 'equation') {
                    return <EquationBlock key={index} value={block.value} />;
                }

                return (
                    <p
                        key={index}
                        className={`specp  ageParagraph ${block.tone === 'note' ? 'specpageParagraph--note' : ''}`}
                    >
                        <InlineMathText value={block.value} />
                    </p>
                );
            })}

            {bullets.length > 0 && <BulletList bullets={bullets} />}
        </div>
    )
}