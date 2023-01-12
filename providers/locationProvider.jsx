import { createContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

// Create a Context
export const locationContext = createContext();

// Create Component Wrapper
export default function LocationProvider(props) {
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState({});

  const getStoreData = (location) => {
    setPosition(location);
    console.log("position:", position);
    console.log("Sending to API");
    const params = new URLSearchParams(position).toString();
    console.log(params);
    axios.get(`api/map?${params}`).then((res) => {
      console.log(res);
    });
  };

  const providerData = {
    showMap,
    position,
    setShowMap,
    setPosition,
    getStoreData,
  };

  return (
    <locationContext.Provider value={providerData}>
      {props.children}
    </locationContext.Provider>
  );
}
