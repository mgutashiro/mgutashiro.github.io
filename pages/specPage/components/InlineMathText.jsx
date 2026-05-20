import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function InlineMathText({ value }) {
    const parts = value.split(/(\\\(.*?\\\))/g);

    return (
        <>
            {parts.map((part, index) => {
                const mathMatch = part.match(/^\\\((.*?)\\\)$/);

                if (mathMatch) {
                    return <InlineMath key={index} math={mathMatch[1]} />;
                }

                return (
                    <span
                        key={index}
                        dangerouslySetInnerHTML={{ __html: part }}
                    />
                );
            })}
        </>
    );
}