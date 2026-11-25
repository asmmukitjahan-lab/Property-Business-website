import { useCallback, useEffect, useState } from "react";
import { WishlistContext } from "./contexts";

const STORAGE_KEY = "pj-wishlist";

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed)
        ? parsed.filter((id) => typeof id === "number")
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Ignore storage quota errors in restricted browsing modes
    }
  }, [ids]);

  const toggle = useCallback((id) => {
    setIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }, []);

  const clear = useCallback(() => setIds([]), []);

  return (
    <WishlistContext.Provider value={{ ids, toggle, clear }}>
      {children}
    </WishlistContext.Provider>
  );
}
