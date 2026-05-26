/** 
 * Renders a bullet point list from array of strings
 * uses innerHTML to alloy simple formatting
 * returns null if empty
 */
export default function BulletList({ bullets = [] }) {
    if (!bullets.length) return null;

    return (
        <ul className="bulletList">
            {bullets.map((bullet, index) => (
                <li
                    key={`${bullet} - ${index}`}
                    dangerouslySetInnerHTML={{ __html: bullet }}
                />
            ))}
        </ul>
    );
}