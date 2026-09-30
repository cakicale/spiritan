"use client";

export function createBrowserStore(key: string, storage: "localStorage" | "sessionStorage", empty: string) {
  let memory = empty;
  let canPersist = true;
  const eventName = `${key}:changed`;

  function read() {
    if (typeof window === "undefined") return empty;
    if (canPersist) {
      try { memory = window[storage].getItem(key) ?? empty; }
      catch { canPersist = false; }
    }
    return memory;
  }

  function write(value: string) {
    memory = value;
    try { if (canPersist) window[storage].setItem(key, value); }
    catch { canPersist = false; }
    window.dispatchEvent(new Event(eventName));
  }

  function subscribe(onChange: () => void) {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) {
        memory = event.newValue ?? empty;
        onChange();
      }
    };
    window.addEventListener(eventName, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(eventName, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }

  return { read, write, subscribe, serverSnapshot: () => empty };
}
