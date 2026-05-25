import {
  get,
  push,
  ref,
  remove,
  serverTimestamp,
  set,
  update,
} from "firebase/database";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, database } from "./firebase";
import { isFirebaseConfigured } from "./firebase";

function assertFirebaseConfigured() {
  if (!isFirebaseConfigured || !auth || !database) {
    throw new Error("Firebase is not configured yet. Add your Vite Firebase env variables to continue.");
  }
}

export async function signInAdmin(email, password) {
  assertFirebaseConfigured();
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  const adminSnapshot = await get(ref(database, `admins/${credentials.user.uid}`));

  if (!adminSnapshot.exists()) {
    await signOut(auth);
    throw new Error("This account is not marked as an admin in Realtime Database.");
  }

  return credentials.user;
}

export function signOutAdmin() {
  assertFirebaseConfigured();
  return signOut(auth);
}

export async function saveMessage(payload) {
  assertFirebaseConfigured();
  const messagesRef = ref(database, "messages");
  const newMessageRef = push(messagesRef);

  await set(newMessageRef, {
    ...payload,
    createdAt: serverTimestamp(),
    status: "new",
  });
}

export async function saveProject(projectId, payload) {
  assertFirebaseConfigured();
  const nextProjectId = payload.slug;
  const projectRef = ref(database, `projects/${projectId || nextProjectId}`);
  const record = {
    ...payload,
    updatedAt: serverTimestamp(),
  };

  if (!projectId) {
    record.createdAt = serverTimestamp();
  } else {
    const existingProjectSnapshot = await get(ref(database, `projects/${projectId}`));
    record.createdAt = existingProjectSnapshot.val()?.createdAt || serverTimestamp();
  }

  if (projectId && projectId !== nextProjectId) {
    await set(ref(database, `projects/${nextProjectId}`), record);
    await remove(ref(database, `projects/${projectId}`));
    return nextProjectId;
  }

  await set(projectRef, record);
  return projectRef.key;
}

export function deleteProject(projectId) {
  assertFirebaseConfigured();
  return remove(ref(database, `projects/${projectId}`));
}

export function updateMessageStatus(messageId, status) {
  assertFirebaseConfigured();
  return update(ref(database, `messages/${messageId}`), {
    status,
    updatedAt: serverTimestamp(),
  });
}
