import { useState } from "react";
import { Note } from "../../../routes/notes";
import { NoteTextArea } from "../NoteTextArea";
import { NoteTitle } from "../NoteTitle";
import { useEditableNote } from "../../hooks/useEditableNote";

interface Props {
  note: Note;
}

export type RenderType = "raw" | "preview" | "both";

const EditNote: React.FC<Props> = ({ note }) => {
  const [renderType, setRenderType] = useState<RenderType>("raw");
  const { updateTitle, updateContent } = useEditableNote(note);

  return (
    <div className="flex flex-col h-full w-full p-2">
      <NoteTitle title={note.title} onChange={updateTitle} />
      <NoteTextArea
        renderType={renderType}
        content={note.content}
        onChange={updateContent}
      />

      <div className="flex flex-row h-16 w-full p-2 items-center">
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

export { EditNote };
