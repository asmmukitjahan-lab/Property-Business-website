import { createContext } from "react";

export const PropertyContext = createContext({ properties: [] });
export const WishlistContext = createContext({
  ids: [],
  toggle: () => {},
  clear: () => {},
});
