import { ChangeEvent, useEffect, useState } from "react";
import { MarkdownText } from "../MarkdownText/index.tsx";
import { RawTextEditor } from "../RawTextEditor/index.tsx";
interface Props {
  content: string;
  onChange: (value: string) => unknown;
}

type RenderType = "raw" | "preview" | "both";

const NoteTextArea: React.FC<Props> = ({ content, onChange }) => {
  const [text, setText] = useState("");

  const [renderType, setRenderType] = useState<RenderType>("raw");

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

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full h-full">
        {renderType == "both" && (
          <>
            <RawTextEditor text={text} onChange={handleChange} />
            <MarkdownText text={text} />
          </>
        )}

        {renderType == "raw" && (
          <>
            <RawTextEditor text={text} onChange={handleChange} />
          </>
        )}

        {renderType == "preview" && (
          <>
            <MarkdownText text={text} />
          </>
        )}
      </div>

      <div className="flex flex-row w-full p-2 items-center">
        <div className="flex flex-row divide-x divide-zinc-800 ">
          <button
            className="p-2  bg-zinc-200 hover:opacity-60 rounded-l-lg"
            onClick={() => setRenderType("raw")}
          >
            Editar
          </button>
          <button
            className="p-2  bg-zinc-200 hover:opacity-60"
            onClick={() => setRenderType("preview")}
          >
            Preview
          </button>
          <button
            className="p-2  bg-zinc-200 hover:opacity-60 rounded-r-lg"
            onClick={() => setRenderType("both")}
          >
            Ambos
          </button>
        </div>
      </div>
    </div>
  );
};

export { NoteTextArea };
