import { Link } from "react-router-dom";

const RootPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-zinc-900 ">
      <h1 className="text-zinc-100 font-light text-2xl p-4">
        Welcome, this is not the final root page
      </h1>
      <nav className="bg-zinc-800 rounded-lg flex flex-col gap-2 text-zinc-950 p-4">
        <Link className="bg-cyan-200 p-2 rounded-md" to="/notes">
          Go to notes &gt;
        </Link>
        <Link className="bg-emerald-200 p-2 rounded-md" to="/login">
          Go to login &gt;
        </Link>
        <Link className="bg-purple-200 p-2 rounded-md" to="/register">
          Go to register &gt;
        </Link>
      </nav>
    </main>
  );
};

export { RootPage };
