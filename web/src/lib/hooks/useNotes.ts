import { User } from "firebase/auth";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { firestore } from "../firebase";
import { Note } from "../../routes/notes";

function useNotes(user?: User | null) {
  const [ownNotes, setOwnNotes] = useState<Note[]>([])
  const [sharedNotes, setSharedNotes] = useState<Note[]>([])

  const getOwnNotes = useCallback(() => {
    if (!user) return () => {};

    const q = query(
      collection(firestore, "notes"),
      where("owner", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const subscriber = onSnapshot(q, (snapshot) => {
      setOwnNotes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          owner: doc.data().owner,
          title: doc.data().title,
          content: doc.data().content,
        }))
      );
    });

    return subscriber
  }, [user]);

  const getSharedNotes = useCallback(() => {
    if (!user) return () => {};

    const q = query(
      collection(firestore, "notes"),
      where("access", "array-contains", user.uid),
      orderBy("createdAt", "desc")
    );

    const subscriber = onSnapshot(q, (snapshot) => {
      setSharedNotes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          owner: doc.data().owner,
          title: doc.data().title,
          content: doc.data().content,
        }))
      );
    });

    return subscriber;
  }, [user]);

  useEffect(() => {
    const ownNotesSubscriber = getOwnNotes()
    const sharedNotesSubscriber = getSharedNotes()

    return () => {
      ownNotesSubscriber()
      sharedNotesSubscriber()
    }
  }, [user, getOwnNotes, getSharedNotes])

  return {
      ownNotes,
      sharedNotes
  }
}

export { useNotes };
