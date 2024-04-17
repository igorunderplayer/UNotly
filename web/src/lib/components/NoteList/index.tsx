import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNotes } from "../../hooks/useNotes";

const NoteList: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const { ownNotes, sharedNotes } = useNotes(user);

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
        {ownNotes.map((note) => (
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
