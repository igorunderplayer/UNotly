interface Props {
  title: string;
  onChange: (value: string) => unknown;
}

const NoteTitle: React.FC<Props> = ({ title, onChange }) => {
  return (
    <div className="border-b-2 border-white text-4xl text-zinc-100 font-light pt-4 ">
      <input
        className="bg-transparent w-full h-full p-4 outline-cyan-200 outline-1"
        type="text"
        placeholder="Título da sua nota..."
        onChange={(e) => onChange(e.target.value)}
        value={title}
      />
    </div>
  );
};

export { NoteTitle };
