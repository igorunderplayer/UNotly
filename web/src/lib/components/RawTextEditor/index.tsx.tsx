import { ChangeEventHandler } from "react";

interface Props {
  text: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const RawTextEditor: React.FC<Props> = ({ text, onChange }) => {
  return (
    <textarea
      className="bg-transparent w-full h-full text-zinc-100 resize-none border-none outline-cyan-200 outline-1 p-2 whitespace-pre "
      value={text}
      onChange={onChange}
    ></textarea>
  );
};

export { RawTextEditor };
