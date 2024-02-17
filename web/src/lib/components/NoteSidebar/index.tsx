import { NoteList } from "../NoteList";

const NoteSidebar: React.FC = () => {
  return (
    <aside className="bg-zinc-800 w-72 h-full rounded-r-xl flex flex-col justify-between">
      <h2 className="text-zinc-400 text-center font-semibold text-lg p-3">
        UNotly
      </h2>

      <NoteList />

      <div className="bg-zinc-950 p-3 rounded-t-xl rounded-br-xl flex flex-row align-middle">
        <div className="rounded-full overflow-hidden w-12 h-12">
          <img
            className="w-full h-full"
            src="https://github.com/igorunderplayer.png"
            alt=""
          />
        </div>
      </div>
    </aside>
  );
};

export { NoteSidebar };
