import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Note } from "../../../routes/notes";
import { firestore } from "../../firebase";
import { NoteTextArea } from "../NoteTextArea";
import { NoteTitle } from "../NoteTitle";

interface Props {
  note: Note;
}

export type RenderType = "raw" | "preview" | "both";

const EditNote: React.FC<Props> = ({ note }) => {
  const [renderType, setRenderType] = useState<RenderType>("raw");
  function onChangeTitle(title: string) {
    console.log(title, note.id);

    if (title.length >= 1) {
      const docRef = doc(firestore, "notes", note.id);
      updateDoc(docRef, {
        title,
      });
    } else {
      console.log("ue");
    }
  }

  function onChangeContent(content: string) {
    console.log(content, note.id);

    const docRef = doc(firestore, "notes", note.id);
    updateDoc(docRef, {
      content,
    });
  }

  return (
    <div className="flex flex-col h-full w-full p-2">
      <NoteTitle title={note.title} onChange={onChangeTitle} />
      <NoteTextArea
        renderType={renderType}
        content={note.content}
        onChange={onChangeContent}
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
