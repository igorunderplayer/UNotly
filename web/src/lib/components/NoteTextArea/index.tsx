import { doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { firestore } from "../../firebase";

interface Props {
  content: string;
  onChange: (value: string) => unknown;
}

const NoteTextArea: React.FC<Props> = ({ content, onChange }) => {
  const [searchParams] = useSearchParams();

  const [text, setText] = useState("");

  function saveContentToDB() {
    const noteId = searchParams.get("noteId");

    if (!noteId) return;

    const docRef = doc(firestore, "notes", noteId);
    updateDoc(docRef, {
      content,
    });
  }

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
    <>
      <textarea
        className="w-full h-full bg-transparent text-zinc-100 resize-none border-none outline-cyan-200 outline-1 p-2 text-lg whitespace-pre overflow-scroll"
        value={text}
        onChange={handleChange}
      ></textarea>
      <button className="bg-green-300" onClick={saveContentToDB}>
        Salvar
      </button>
    </>
  );
};

export { NoteTextArea };
