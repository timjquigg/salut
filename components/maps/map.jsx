import { useMemo, useContext } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { locationContext } from "../../providers/locationProvider";

export default function Map() {
  const { position, stores, currentStore, setCurrentStore } =
    useContext(locationContext);
  const center = useMemo(() => {
    return { lat: position.latitude, lng: position.longitude };
  }, [position]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const handleClick = (store) => {
    // console.log(store);
    setCurrentStore(store);
  };

  const markers = stores.map((el) => {
    return (
      <MarkerF
        position={el.geometry.location}
        key={el.place_id}
        clickable={true}
        onClick={() => {
          handleClick(el);
        }}
        icon={{
          url: "https://www.svgrepo.com/show/24152/dark-liquor-in-bottle.svg",
          scaledSize: {
            width: 40,
            height: 40,
          },
        }}
        title={el.name}
      />
    );
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100%", padding: "1rem" }}
        clickableIcons={false}
      >
        <MarkerF position={center} title="You are here" />
        {markers}
      </GoogleMap>
    </>
  );
}
