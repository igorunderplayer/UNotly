import { Auth, User } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';

function useAuth(auth: Auth) {
  const [user, setUser] = useState<User | null>(null);
  const onAuthStateChange = useCallback((user: User | null) => {
    setUser(user);
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
