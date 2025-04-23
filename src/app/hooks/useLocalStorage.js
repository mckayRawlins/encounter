import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  let savedValue;
  if (typeof window !== "undefined") {
    savedValue = localStorage.getItem(key);
  }
  try {
    savedValue = JSON.parse(savedValue);
  } catch {}

  const [state, setState] = useState(savedValue || initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}
