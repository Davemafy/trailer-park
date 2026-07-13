import { useState, useEffect } from "react";

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MovieCreatorDB", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("keyValuePairs")) {
        db.createObjectStore("keyValuePairs");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export function useIndexedDB<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    openDB()
      .then((db) => {
        const transaction = db.transaction("keyValuePairs", "readonly");
        const store = transaction.objectStore("keyValuePairs");
        const request = store.get(key);

        request.onsuccess = () => {
          if (request.result !== undefined) {
            setState(request.result);
          }
          setIsLoaded(true);
        };
      })
      .catch((err) => {
        console.error("IndexedDB load error:", err);
        setIsLoaded(true);
      });
  }, [key]);

  // Save data asynchronously on update
  useEffect(() => {
    if (!isLoaded) return;

    openDB()
      .then((db) => {
        const transaction = db.transaction("keyValuePairs", "readwrite");
        const store = transaction.objectStore("keyValuePairs");
        store.put(state, key);
      })
      .catch((err) => console.error("IndexedDB save error:", err));
  }, [key, state, isLoaded]);

  return [state, setState, isLoaded] as const;
}
