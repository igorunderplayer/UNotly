import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { firestore } from "../../firebase";

interface Props {
  content: string;
  onChange: (value: string) => unknown;
}

const NoteTextArea: React.FC<Props> = ({ content, onChange }) => {
  const [searchParams] = useSearchParams();

  function saveContentToDB() {
    const noteId = searchParams.get("noteId");

    if (!noteId) return;

    const docRef = doc(firestore, "notes", noteId);
    updateDoc(docRef, {
      content,
    });
  }

  useEffect(() => {
    console.log("typed");
  }, [content]);

  return (
    <>
      <textarea
        className="w-full h-full bg-transparent text-zinc-100 resize-none border-none outline-cyan-200 outline-1 p-2 text-lg whitespace-pre overflow-scroll"
        value={content}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      <button className="bg-green-300" onClick={saveContentToDB}>
        Salvar
      </button>
    </>
  );
};

export { NoteTextArea };
