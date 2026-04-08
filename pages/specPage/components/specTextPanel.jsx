import EquationBlock from './EquationBlock';
import BulletList from './BulletList';
import {
  normalizeContentBlocks,
  normalizeTextBlock,
} from '../utils/renderSpecContent';

export default function SpecTextPanel({ panel }) {
  if (!panel) return null;

  const isStringBody = typeof panel.body === 'string';
  const bodyBlocks = isStringBody ? [] : normalizeContentBlocks(panel.body);
  const bullets = panel.bullets ?? [];

  return (
    <div className="specTextPanel">
      {panel.heading && (
        <h3 className="specPanelHeading">{panel.heading}</h3>
      )}

      {isStringBody && (
        <p className="specParagraph">
          {normalizeTextBlock(panel.body)}
        </p>
      )}

      {!isStringBody &&
        bodyBlocks.map((block, index) => {
          if (block.type === 'equation') {
            return <EquationBlock key={index} value={block.value} />;
          }

          return (
            <p
              key={index}
              className="specParagraph"
              dangerouslySetInnerHTML={{ __html: block.value }}
            />
          );
        })}

      {bullets.length > 0 && <BulletList bullets={bullets} />}
    </div>
  );
}