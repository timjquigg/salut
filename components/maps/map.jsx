import { useMemo, useContext, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { locationContext } from "../../providers/locationProvider";

export default function Map() {
  const { position, stores } = useContext(locationContext);
  const center = { lat: position.latitude, lng: position.longitude };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    console.log(stores);
  }, [stores]);

  // const markers = stores.map(el => {
  //   return (
  //     <Marker position={}
  //   )
  // })

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={13}
      center={center}
      mapContainerStyle={{ width: "70%", height: "70%" }}
    ></GoogleMap>
  );
}
