import { useContext } from "react";
import { PropertyContext, WishlistContext } from "../components/context/contexts";

export function useProperties() {
  return useContext(PropertyContext);
}

export function useWishlist() {
  return useContext(WishlistContext);
}
