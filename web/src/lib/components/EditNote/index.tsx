import { doc, updateDoc } from "firebase/firestore";
import { Note } from "../../../routes/notes";
import { firestore } from "../../firebase";
import { NoteTextArea } from "../NoteTextArea";
import { NoteTitle } from "../NoteTitle";

interface Props {
  note: Note;
}

const EditNote: React.FC<Props> = ({ note }) => {
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
    <div className="flex flex-col w-full p-2">
      <NoteTitle title={note.title} onChange={onChangeTitle} />
      <NoteTextArea content={note.content} onChange={onChangeContent} />
    </div>
  );
};

export { EditNote };
