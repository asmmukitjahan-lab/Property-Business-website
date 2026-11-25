import { useState } from "react";
import { properties as data } from "../../data/properties";
import { PropertyContext } from "./contexts";

export function PropertyProvider({ children }) {
  const [properties] = useState(data);
  return (
    <PropertyContext.Provider value={{ properties }}>
      {children}
    </PropertyContext.Provider>
  );
}
