import { Auth, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { firestore } from '../firebase';

function useAuth(auth: Auth) {
  const [user, setUser] = useState<User | null>(null);
  const onAuthStateChange = useCallback((user: User | null) => {
    setUser(user);

    if (user) {
      const userRef = doc(firestore, "users", user.uid)

      setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email
      })
    }
  }, []);
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChange);

    return subscriber;
  }, [auth,onAuthStateChange]);

  return {
    user
  }
}

export { useAuth };

