import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database, isFirebaseConfigured } from "../lib/firebase";

export function useRealtimeValue(path, initialValue = null) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !database) {
      setData(initialValue);
      setLoading(false);
      return undefined;
    }

    const dbRef = ref(database, path);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        setData(snapshot.val() ?? initialValue);
        setLoading(false);
      },
      (eventError) => {
        setError(eventError);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [path]);

  return { data, loading, error };
}
