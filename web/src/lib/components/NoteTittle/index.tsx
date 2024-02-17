const NoteTitle: React.FC = () => {
  return (
    <div className="border-b-2 border-white text-4xl text-zinc-100 font-light pt-4 ">
      <input
        className="bg-transparent w-full h-full p-4 outline-none"
        type="text"
        placeholder="Título da sua nota..."
      />
    </div>
  );
};

export { NoteTitle };
