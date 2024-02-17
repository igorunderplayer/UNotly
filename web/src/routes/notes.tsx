import { NoteSidebar } from "../lib/components/NoteSidebar";
import { NoteTextArea } from "../lib/components/NoteTextArea";
import { NoteTitle } from "../lib/components/NoteTittle";

const NotesPage: React.FC = () => {
  return (
    <main className="flex w-screen h-screen bg-zinc-900">
      <NoteSidebar />

      <div className="flex flex-col w-full p-2">
        <NoteTitle />
        <NoteTextArea />
      </div>
    </main>
  );
};

export { NotesPage };
