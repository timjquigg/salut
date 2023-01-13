const { Client } = require("@googlemaps/google-maps-services-js");
const axios = require("axios");
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
// const baseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";

const client = new Client({});

const getLiquoreStores = async (location) => {
  const args = {
    params: {
      key: apiKey,
      keyword: "Liquor wine beer Store",
      location: { lat: location.latitude, lng: location.longitude },
      radius: 5000,
    },
  };

  return client.placesNearby(args).then((res) => {
    return res;
  });
};

export default async function handler(req, res) {
  const location = req.query;
  if (req.method === "GET") {
    const results = await getLiquoreStores(location);
    const parsedResults = results.data.results;
    console.log(parsedResults[0].geometry);
    res.json(parsedResults);
  }
}
