import DOMPurify from "dompurify";
import { marked } from "marked";

interface Props {
  text: string;
}

const MarkdownText: React.FC<Props> = ({ text }) => {
  return (
    <div
      className="prose prose-zinc max-w-none w-full h-full prose-invert bg-transparent p-4 whitespace-pre"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked.parse(text).toString()),
      }}
    ></div>
  );
};

export { MarkdownText };
