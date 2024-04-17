import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { auth, firestore } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import { DeleteForever } from "../../icons/DeleteForever";
import { NoteAdd } from "../../icons/NoteAdd";
import { TabClose } from "../../icons/TabClose";
import { NoteList } from "../NoteList";

const NoteSidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const { user } = useAuth();

  async function handleAddNote() {
    if (!user) return;
    const ref = collection(firestore, "notes");

    const doc = await addDoc(ref, {
      owner: user.uid,
      title: "Nova nota...",
      content: "",
      access: [],
      createdAt: serverTimestamp(),
    });

    setSearchParams((state) => {
      state.set("noteId", doc.id);

      return state;
    });
  }

  function handleCloseNote() {
    setSearchParams((state) => {
      state.delete("noteId");
      return state;
    });
  }

  async function handleDeleteNote() {
    const noteId = searchParams.get("noteId");

    if (!noteId) return;

    const noteRef = doc(collection(firestore, "notes"), noteId);

    // TODO: dont use native prompt
    if (confirm("Você tem certeza que quer deletar esta nota?")) {
      await deleteDoc(noteRef);
    }
  }

  if (!open) {
    return (
      <aside className="bg-zinc-800 w-14 h-full flex flex-col rounded-r-xl justify-between p-2">
        <div className="flex flex-col">
          <button
            className="text-zinc-400 text-center font-semibold text-lg p-2"
            onClick={() => setOpen(true)}
          >
            <span>-&gt;</span>
          </button>
        </div>

        <div className="flex flex-col">
          <div className="rounded-full overflow-hidden w-8 h-8">
            <img className="w-full h-full" src={user?.photoURL ?? ""} alt="" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="bg-zinc-800 w-72 h-full rounded-r-xl flex flex-col justify-between">
      <div className="flex flex-row justify-between p-2">
        <h2 className="text-zinc-400 text-center font-semibold text-lg p-2">
          UNotly
        </h2>

        <div className="flex flex-row gap-2">
          <button onClick={handleAddNote}>
            <NoteAdd />
          </button>

          <button onClick={handleCloseNote}>
            <TabClose />
          </button>

          <button onClick={handleDeleteNote}>
            <DeleteForever />
          </button>
        </div>

        <button
          className="text-zinc-400 text-center font-semibold text-lg p-2"
          onClick={() => setOpen(false)}
        >
          <span>&lt;-</span>
        </button>
      </div>

      <NoteList />

      <div className="bg-zinc-950 p-3 rounded-t-xl rounded-br-xl flex flex-row justify-between align-middle">
        <div className="rounded-full overflow-hidden w-12 h-12">
          <img className="w-full h-full" src={user?.photoURL ?? ""} alt="" />
        </div>

        <div>
          <button className="text-white" onClick={() => auth.signOut()}>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export { NoteSidebar };
