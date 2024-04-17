import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { Note } from "../../routes/notes";
import { firestore } from "../firebase";

function useNote(noteId?: string | null) {
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (!noteId) {
      setNote(null);
      return;
    }

    const docRef = doc(firestore, "notes", noteId);

    const subscriber = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      if (!data) return;
      setNote({
        id: snapshot.id,
        owner: data.owner,
        title: data.title,
        content: data.content,
      });
    });

    return subscriber;
  }, [noteId]);

  return {
    note,
  };
}

export { useNote };
