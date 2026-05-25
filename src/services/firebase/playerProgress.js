import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ensureAnonymousUser, firestore, isFirebaseConfigured } from "./app";

export async function syncPlayerProgress(progress) {
  if (!isFirebaseConfigured || !firestore) return { skipped: true };
  const user = await ensureAnonymousUser();
  if (!user) return { skipped: true };

  const ref = doc(firestore, "players", user.uid);
  await setDoc(
    ref,
    {
      ...progress,
      uid: user.uid,
      syncedAt: serverTimestamp(),
    },
    { merge: true },
  );
  return { synced: true };
}

export async function loadRemoteProgress() {
  if (!isFirebaseConfigured || !firestore) return null;
  const user = await ensureAnonymousUser();
  if (!user) return null;
  const snapshot = await getDoc(doc(firestore, "players", user.uid));
  return snapshot.exists() ? snapshot.data() : null;
}
