"use client";
import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  let savedValue = localStorage.getItem(key);
  try {
    savedValue = JSON.parse(savedValue);
  } catch {}

  const [state, setState] = useState(savedValue || initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
