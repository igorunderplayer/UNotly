import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function handleRegisterSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: name,
      });
      navigate("/notes");
    } catch (err) {
      // TODO: Error handling
      console.error(err);
    }
  }

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/notes");
    } catch (err) {
      // TODO: Error handling
      console.error(err);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-zinc-900 gap-4 lg:flex-row">
      <div className="flex flex-col items-center bg-zinc-800 rounded-xl p-4 gap-2 w-80">
        <h2 className="text-zinc-100 font-light text-xl p-2">Registrar com</h2>

        <form
          onSubmit={handleRegisterSubmit}
          className="flex flex-col gap-2 w-full"
        >
          <input
            className="bg-zinc-900 rounded-md p-2 text-zinc-200 outline-cyan-200 outline-1"
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-zinc-900 rounded-md p-2 text-zinc-200 outline-cyan-200 outline-1"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-zinc-900 rounded-md p-2 text-zinc-200 outline-cyan-200 outline-1"
            type="password"
            placeholder="Senha"
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />

          <small className="text-red-200 font-light">
            {password.length < 6
              ? "* A senha deve possuir no mínimo 6 caracteres."
              : ""}
          </small>

          <button
            className="bg-indigo-200 text-zinc-950 p-2 rounded-md hover:opacity-60 disabled:opacity-40"
            type="submit"
            disabled={password.length < 6}
          >
            Registrar
          </button>
        </form>

        <div className="flex flex-row w-full items-center">
          <hr className="w-1/2 bg-zinc-400" />
          <span className="px-2 text-zinc-400">ou</span>
          <hr className="w-1/2 bg-zinc-400" />
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="bg-blue-600 text-zinc-50 p-2 rounded-md hover:opacity-60"
            onClick={signInWithGoogle}
          >
            Registrar com Google
          </button>
        </div>

        <span className="font-light text-zinc-400 text-sm p-2">
          Já possui uma conta? faça login{" "}
          <Link className="text-purple-200" to="/login">
            aqui
          </Link>
        </span>
      </div>
    </main>
  );
};

export { RegisterPage };
