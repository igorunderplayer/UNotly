import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Note } from "../../../routes/notes";
import { auth, firestore } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";

const NoteList: React.FC = () => {
  const { user } = useAuth(auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "notes"),
      or(
        where("access", "array-contains", user?.uid),
        where("owner", "==", user?.uid)
      )
    );

    const subscriber = onSnapshot(q, (snapshot) => {
      setNotes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          owner: doc.data().owner,
          title: doc.data().title,
          content: doc.data().content,
        }))
      );
    });

    return subscriber;
  }, [user]);

  function handleOnNavigate(id: string) {
    setSearchParams((state) => {
      if (id) {
        state.set("noteId", id);
      } else {
        state.delete("noteId");
      }

      return state;
    });
  }

  return (
    <nav className="h-full w-full">
      <ul className="flex flex-col p-2">
        {notes.map((note) => (
          <li
            className="p-2 bg-transparent rounded-lg transition-colors truncate text-zinc-200  hover:opacity-60 data-[selected=true]:bg-zinc-700 "
            data-selected={searchParams.get("noteId") == note.id}
            onClick={() => handleOnNavigate(note.id)}
            key={note.id}
          >
            <a>{note.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { NoteList };
