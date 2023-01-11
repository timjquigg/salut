const axios = require("axios");

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const baseUrl =
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters";

const searchTerm = "Liquor Store";

const getLiquoreStores = async (location) => {
  const results = await axios.get(url, params);

  return results;
};

export default async function handler(req, res) {
  const location = new URLSearchParams(req.query).toString();
  if (req.method === "GET") {
    console.log(req.query);

    res.send("Received");
  }
}

// module.exports = { getLiquoreStores };
