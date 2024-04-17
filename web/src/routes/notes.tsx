import { Link, useSearchParams } from "react-router-dom";
import { EditNote } from "../lib/components/EditNote";
import { NoteSidebar } from "../lib/components/NoteSidebar";
import { useAuth } from "../lib/hooks/useAuth";
import { useNote } from "../lib/hooks/useNote";
export interface Note {
  id: string;
  owner: string;
  title: string;
  content: string;
}

const NotesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");

  const { user } = useAuth();
  const { note } = useNote(noteId);

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
