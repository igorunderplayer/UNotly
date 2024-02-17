import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const NoteList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes] = useState([
    {
      title: "Notinha",
      id: "21",
    },
    {
      title: "Notinha",
      id: "212",
    },
    {
      title: "Notinha",
      id: "213",
    },
    {
      title: "Notinha",
      id: "214",
    },
  ]);

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
            className="p-2 bg-transparent rounded-lg transition-colors hover:opacity-60 data-[selected=true]:bg-zinc-700"
            data-selected={searchParams.get("noteId") == note.id}
            onClick={() => handleOnNavigate(note.id)}
            key={note.id}
          >
            <a className="text-zinc-200">{note.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { NoteList };
