import { createContext, useContext, useState } from "react";
import { properties as data } from "../../data/properties";

const PropertyContext = createContext();
export const useProperties = () => useContext(PropertyContext);

export function PropertyProvider({ children }) {
  const [properties] = useState(data);
  return (
    <PropertyContext.Provider value={{ properties }}>
      {children}
    </PropertyContext.Provider>
  );
}
