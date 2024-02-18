import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  content: string;
  onChange: (value: string) => unknown;
}

const NoteTextArea: React.FC<Props> = ({ content, onChange }) => {
  const [text, setText] = useState("");

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    onChange(e.target.value);
  }

  useEffect(() => {
    setText(content);
  }, [content]);

  useEffect(() => {
    console.log("typed");
  }, [content]);

  return (
    <textarea
      className="w-full h-full bg-transparent text-zinc-100 resize-none border-none outline-cyan-200 outline-1 p-2 text-lg whitespace-pre overflow-scroll"
      value={text}
      onChange={handleChange}
    ></textarea>
  );
};

export { NoteTextArea };
