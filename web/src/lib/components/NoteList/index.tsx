import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Note } from "../../../routes/notes";
import { firestore } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";

const NoteList: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState<Note[]>([]);
  const [sharedNotes, setSharedNotes] = useState<Note[]>([]);

  const getSharedNotes = useCallback(() => {
    if (!user) return () => {};

    const q = query(
      collection(firestore, "notes"),
      where("access", "array-contains", user.uid),
      orderBy("createdAt", "desc"),
    );

    const subscriber = onSnapshot(q, (snapshot) => {
      setSharedNotes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          owner: doc.data().owner,
          title: doc.data().title,
          content: doc.data().content,
        })),
      );
    });

    return subscriber;
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "notes"),
      where("owner", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const subscriber = onSnapshot(q, (snapshot) => {
      setNotes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          owner: doc.data().owner,
          title: doc.data().title,
          content: doc.data().content,
        })),
      );
    });

    const sharedNotesSubscriber = getSharedNotes();

    return () => {
      subscriber();
      sharedNotesSubscriber();
    };
  }, [getSharedNotes, user]);

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
    <nav className="flex flex-col items center h-full w-full">
      <span className="text-zinc-400 text-sm p-2">Suas notas</span>
      <ul className="flex flex-col p-2">
        {notes.map((note) => (
          <li
            className="p-2 bg-transparent rounded-lg transition-colors truncate text-zinc-200 cursor-pointer hover:opacity-60 data-[selected=true]:bg-zinc-700 "
            data-selected={searchParams.get("noteId") == note.id}
            onClick={() => handleOnNavigate(note.id)}
            key={note.id}
          >
            <a>{note.title}</a>
          </li>
        ))}
      </ul>

      <span className="text-zinc-400 text-sm p-2">Notas compartilhadas</span>

      <ul className="flex flex-col p-2">
        {sharedNotes.map((note) => (
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
