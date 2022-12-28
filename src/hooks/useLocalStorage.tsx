import { useState, useEffect } from "react";

export const useLocalStorage: Function = (key: string, defaultValue: []) => {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)!) ?? defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};
