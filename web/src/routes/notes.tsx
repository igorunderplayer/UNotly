import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { EditNote } from "../lib/components/EditNote";
import { NoteSidebar } from "../lib/components/NoteSidebar";
import { auth, firestore } from "../lib/firebase";
import { useAuth } from "../lib/hooks/useAuth";
export interface Note {
  id: string;
  owner: string;
  title: string;
  content: string;
}

const NotesPage: React.FC = () => {
  const { user } = useAuth(auth);
  const [note, setNote] = useState<Note | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const noteId = searchParams.get("noteId");

    if (!noteId) return;

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
  }, [searchParams]);

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center w-screen h-screen bg-zinc-900 ">
        <h1 className="text-3xl font-light text-zinc-100 p-8">
          You must be logged in to access this page
        </h1>
        <Link className="text-zinc-200" to="/">
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="flex w-screen h-screen bg-zinc-900">
      <NoteSidebar />

      {!!note && <EditNote note={note} />}
    </main>
  );
};

export { NotesPage };
