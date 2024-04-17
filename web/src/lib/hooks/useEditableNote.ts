import { doc, updateDoc } from "firebase/firestore";
import { Note } from "../../routes/notes";
import { firestore } from "../firebase";

function useEditableNote(note: Note) {
  function updateTitle(title: string)  {
    if (title.length >= 1) {
        const docRef = doc(firestore, "notes", note.id);
        updateDoc(docRef, {
          title,
        });
      } else {
        console.log("ue");
      }
  }

  function updateContent(content: string ) {
    const docRef = doc(firestore, "notes", note.id);
        updateDoc(docRef, {
          content,
        });
  }
    

  return {
    updateTitle,
    updateContent
  };
}

export { useEditableNote };
