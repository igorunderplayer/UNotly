import { createContext, useState, useCallback, useEffect } from "react";

import { doc, setDoc } from "firebase/firestore";
import { Auth, User } from "firebase/auth";

import { firestore } from "../firebase";

export const AuthContext = createContext(
  {} as {
    user: User | null;
  },
);

interface Props {
  auth: Auth;
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ auth, children }) => {
  const [user, setUser] = useState<User | null>(null);

  const onAuthStateChange = useCallback((user: User | null) => {
    setUser(user);

    if (user) {
      const userRef = doc(firestore, "users", user.uid);

      setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      });
    }
  }, []);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChange);

    return subscriber;
  }, [auth, onAuthStateChange]);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
