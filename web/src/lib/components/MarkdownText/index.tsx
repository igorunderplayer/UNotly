import DOMPurify from "dompurify";
import { marked } from "marked";

interface Props {
  text: string;
}

const MarkdownText: React.FC<Props> = ({ text }) => {
  return (
    <div
      className="h-full w-full prose prose-zinc max-w-none prose-invert bg-transparent p-4 whitespace-pre overflow-scroll"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked.parse(text).toString()),
      }}
    ></div>
  );
};

export { MarkdownText };
