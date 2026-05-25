import { syncPlayerProgress } from "../../services/firebase/playerProgress";

const DB_NAME = "monster-chef-academy";
const STORE_NAME = "platform-save";
const SAVE_KEY = "current-player";

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      resolve(null);
      return;
    }

    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

class SaveManager {
  async load() {
    try {
      const db = await openDatabase();
      if (!db) return null;
      return await new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const request = transaction.objectStore(STORE_NAME).get(SAVE_KEY);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch {
      const fallback = localStorage.getItem(SAVE_KEY);
      return fallback ? JSON.parse(fallback) : null;
    }
  }

  async save(payload) {
    const stampedPayload = {
      ...payload,
      sync: {
        ...payload.sync,
        status: payload.sync.online ? "Saved locally" : "Saved offline",
        pending: payload.sync.online ? 0 : (payload.sync.pending || 0) + 1,
      },
      updatedAt: new Date().toISOString(),
    };

    try {
      const db = await openDatabase();
      if (db) {
        await new Promise((resolve, reject) => {
          const transaction = db.transaction(STORE_NAME, "readwrite");
          transaction.objectStore(STORE_NAME).put(stampedPayload, SAVE_KEY);
          transaction.oncomplete = resolve;
          transaction.onerror = () => reject(transaction.error);
        });
      }
      localStorage.setItem(SAVE_KEY, JSON.stringify(stampedPayload));
      if (payload.sync.online) {
        await syncPlayerProgress(stampedPayload);
      }
      return stampedPayload;
    } catch {
      localStorage.setItem(SAVE_KEY, JSON.stringify(stampedPayload));
      return stampedPayload;
    }
  }

  merge(localSave, remoteSave) {
    if (!remoteSave) return localSave;
    if (!localSave) return remoteSave;
    return new Date(remoteSave.updatedAt || 0) > new Date(localSave.updatedAt || 0) ? remoteSave : localSave;
  }
}

export const saveManager = new SaveManager();
