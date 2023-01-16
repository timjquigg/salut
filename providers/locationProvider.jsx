import { createContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_VERCEL_ENV
  ? process.env.NEXT_PUBLIC_VERCEL_URL
  : process.env.NEXT_PUBLIC_SERVER_BASE_URL;

// Create a Context
export const locationContext = createContext();

// Create Component Wrapper
export default function LocationProvider(props) {
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState({});
  const [stores, setStores] = useState([]);
  const [currentStore, setCurrentStore] = useState({});

  const getStoreData = (location) => {
    console.log("Sending to API");
    const params = new URLSearchParams(location).toString();
    axios
      .get(`api/map?${params}`)
      .then((res) => {
        setStores(res.data);
      })
      .finally(() => {
        // console.log(stores);
        setPosition(location);
        setShowMap(true);
      });
  };

  const providerData = {
    showMap,
    position,
    stores,
    currentStore,
    setShowMap,
    setPosition,
    getStoreData,
    setCurrentStore,
  };

  return (
    <locationContext.Provider value={providerData}>
      {props.children}
    </locationContext.Provider>
  );
}
