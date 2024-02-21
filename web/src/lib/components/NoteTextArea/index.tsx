import { ChangeEvent, useEffect, useState } from "react";
import { RenderType } from "../EditNote/index.tsx";
import { MarkdownText } from "../MarkdownText/index.tsx";
import { RawTextEditor } from "../RawTextEditor/index.tsx.tsx";
interface Props {
  content: string;
  renderType: RenderType;
  onChange: (value: string) => unknown;
}

const NoteTextArea: React.FC<Props> = ({ content, onChange, renderType }) => {
  const [text, setText] = useState("");

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    onChange(e.target.value);
  }

  useEffect(() => {
    setText(content);
  }, [content]);

  useEffect(() => {
    console.log("typed");
  }, [content]);

  if (renderType == "raw") {
    return (
      <div className="flex flex-grow">
        <RawTextEditor text={text} onChange={handleChange} />
      </div>
    );
  }

  if (renderType == "both") {
    return (
      <div className="flex flex-grow flex-row overflow-hidden">
        <div className="w-1/2">
          <RawTextEditor text={text} onChange={handleChange} />
        </div>

        <div className="w-1/2 overflow-scroll">
          <MarkdownText text={text} />
        </div>
      </div>
    );
  }

  if (renderType == "preview") {
    return (
      <div className="flex flex-grow overflow-scroll">
        <MarkdownText text={text} />
      </div>
    );
  }
};

export { NoteTextArea };
