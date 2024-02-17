import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/hooks/useAuth";

import { Link } from "react-router-dom";

const RootPage: React.FC = () => {
  const { user } = useAuth(auth);
  return (
    <main>
      <h1>This is the root route!! 😀</h1>

      {!user ? (
        <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
          Logar com google
        </button>
      ) : (
        <div>
          <p>Olá {user.displayName}</p>

          <Link to="/notes">O</Link>
        </div>
      )}
    </main>
  );
};

export { RootPage };
