import { useEffect, useState } from "react";
import { get, ref, runTransaction } from "firebase/database";
import { database, isFirebaseConfigured } from "../lib/firebase";

const VISITOR_SESSION_KEY = "portfolio-visitor-counted";

export function useVisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isFirebaseConfigured || !database) {
      return undefined;
    }

    const countRef = ref(database, "analytics/visitors/count");

    async function updateVisitorCount() {
      const hasCountedVisit = window.sessionStorage.getItem(VISITOR_SESSION_KEY);

      if (!hasCountedVisit) {
        await runTransaction(countRef, (currentValue) => (currentValue || 0) + 1);
        window.sessionStorage.setItem(VISITOR_SESSION_KEY, "true");
      }

      const snapshot = await get(countRef);
      setCount(snapshot.val() || 0);
    }

    updateVisitorCount();
  }, []);

  return count;
}
