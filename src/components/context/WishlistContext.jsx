import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pj-wishlist")) || [];
    } catch {
      return [];
    }
  });
  useEffect(
    () => localStorage.setItem("pj-wishlist", JSON.stringify(ids)),
    [ids],
  );
  const toggle = (id) =>
    setIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  return (
    <WishlistContext.Provider value={{ ids, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
}
