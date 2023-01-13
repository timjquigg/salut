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

const testResults = [
  {
    business_status: "OPERATIONAL",
    formatted_address: "15566 McIvor Blvd SE, Calgary, AB T2Z 4Y2, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Star Liquor & Wine Boutique",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJ68UzZ_N3cVMRy4etvWCmN_g",
    plus_code: {
      compound_code: "W27X+4W Calgary, Alberta",
      global_code: "9528W27X+4W",
    },
    rating: 3.8,
    reference: "ChIJ68UzZ_N3cVMRy4etvWCmN_g",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 194,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "10 Copperstone St SE #107, Calgary, AB T2Z 0V4, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "ACE Liquor Discounter",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJJ1Fq0R94cVMRsm_A0_2Cw-o",
    plus_code: {
      compound_code: "W388+8G Calgary, Alberta",
      global_code: "9528W388+8G",
    },
    rating: 3.4,
    reference: "ChIJJ1Fq0R94cVMRsm_A0_2Cw-o",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 40,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "20 High St SE #20, Calgary, AB T2Z 3T8, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Liquor Depot McKenzie Towne",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJD0_yh5R3cVMRHpX8jdMapfc",
    plus_code: {
      compound_code: "W28Q+9W Calgary, Alberta",
      global_code: "9528W28Q+9W",
    },
    rating: 4.1,
    reference: "ChIJD0_yh5R3cVMRHpX8jdMapfc",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 145,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "7 Mahogany Plaza SE #1550, Calgary, AB T3M 2P8, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Sobeys Liquor Mahogany",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJ1QEnnON3cVMRHAtb2gZg2vA",
    plus_code: {
      compound_code: "V3X5+5F Calgary, Alberta",
      global_code: "9528V3X5+5F",
    },
    rating: 4.2,
    reference: "ChIJ1QEnnON3cVMRHAtb2gZg2vA",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 94,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "151 Copperpond Blvd SE, Calgary, AB T2Z 0Z7, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "ACE Liquor Discounter",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJkUZrDyR4cVMR69xyEzIU_sc",
    plus_code: {
      compound_code: "W3F9+J5 Calgary, Alberta",
      global_code: "9528W3F9+J5",
    },
    rating: 4.1,
    reference: "ChIJkUZrDyR4cVMR69xyEzIU_sc",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 61,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "80 Mahogany Rd SE #1890, Calgary, AB T3M 3K9, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "BSW Liquor",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJSf7XWfd3cVMRYNwIO1XMkvM",
    plus_code: {
      compound_code: "V3W6+46 Calgary, Alberta",
      global_code: "9528V3W6+46",
    },
    rating: 5,
    reference: "ChIJSf7XWfd3cVMRYNwIO1XMkvM",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 11,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address:
      "100 Auburn Meadows Dr SE #310, Calgary, AB T3M 2G5, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Co-op Wine Spirits Beer Auburn Bay",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJC2QTuuF3cVMR88rnXzHhtmU",
    plus_code: {
      compound_code: "V3V3+WH Calgary, Alberta",
      global_code: "9528V3V3+WH",
    },
    rating: 4.5,
    reference: "ChIJC2QTuuF3cVMR88rnXzHhtmU",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 179,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "105 Mahogany Centre SE, Calgary, AB T3M 2V6, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "5 Vines Wine, Craft Beer & Spirits - Mahogany Store",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJAYMaIdN3cVMRYVndweu6VSw",
    plus_code: {
      compound_code: "V3W7+PF Calgary, Alberta",
      global_code: "9528V3W7+PF",
    },
    rating: 4.7,
    reference: "ChIJAYMaIdN3cVMRYVndweu6VSw",
    types: [
      "liquor_store",
      "store",
      "food",
      "point_of_interest",
      "establishment",
    ],
    user_ratings_total: 100,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "4307 130 Ave SE #40, Calgary, AB T2Z 3V8, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Liquor Wellz",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJJVam1dB3cVMRKKcizCkXHjs",
    plus_code: {
      compound_code: "W2JG+4Q Calgary, Alberta",
      global_code: "9528W2JG+4Q",
    },
    rating: 4.9,
    reference: "ChIJJVam1dB3cVMRKKcizCkXHjs",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 122,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "15 Masters Dr SE, Calgary, AB T3M 2M6, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Star Liquor & Wine Boutique",
    opening_hours: { open_now: true },
    place_id: "ChIJh2WSh2WDcVMRcUt87nyZAQA",
    plus_code: {
      compound_code: "V3VQ+QH Calgary, Alberta",
      global_code: "9528V3VQ+QH",
    },
    rating: 5,
    reference: "ChIJh2WSh2WDcVMRcUt87nyZAQA",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 4,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "4915 130 Ave SE #200, Calgary, AB T2Z 4J2, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Safeway Liquor South Trail",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJ25D9lYJ3cVMRvGpoa_jNwD4",
    plus_code: {
      compound_code: "W2JM+6Q Calgary, Alberta",
      global_code: "9528W2JM+6Q",
    },
    rating: 4.1,
    reference: "ChIJ25D9lYJ3cVMRvGpoa_jNwD4",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 109,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address:
      "3451 Douglasdale Blvd SE #7, Calgary, AB T2Z 4J1, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "ACE Liquor Discounter",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJR-qhxHR3cVMRs49nk_cD7gA",
    plus_code: {
      compound_code: "W2M8+4V Calgary, Alberta",
      global_code: "9528W2M8+4V",
    },
    rating: 3.8,
    reference: "ChIJR-qhxHR3cVMRs49nk_cD7gA",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 70,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "5-90 Cranleigh Dr SE, Calgary, AB T3M 1J7, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Spirits Of Cranston",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJ9_6tcy52cVMRf0n1ym8DyVs",
    plus_code: {
      compound_code: "V2V6+FM Calgary, Alberta",
      global_code: "9528V2V6+FM",
    },
    rating: 4.3,
    reference: "ChIJ9_6tcy52cVMRf0n1ym8DyVs",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 84,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "4700 130 Ave SE Unit 300, Calgary, AB T2Z 4E7, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Real Canadian Liquor Store",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJe_ibCnh3cVMRtB3ZeLX9284",
    plus_code: {
      compound_code: "W2MM+3P Calgary, Alberta",
      global_code: "9528W2MM+3P",
    },
    rating: 4.2,
    reference: "ChIJe_ibCnh3cVMRtB3ZeLX9284",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 339,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address:
      "19489 Seton Crescent Southeast Seton Boulevard #182, Calgary, AB T3M 1T4, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Highlander Wine & Spirits Seton",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJhcQn33qdcVMRBlQeDgVzGm4",
    plus_code: {
      compound_code: "V2JR+MH Calgary, Alberta",
      global_code: "9528V2JR+MH",
    },
    rating: 4.4,
    reference: "ChIJhcQn33qdcVMRBlQeDgVzGm4",
    types: [
      "liquor_store",
      "store",
      "food",
      "point_of_interest",
      "establishment",
    ],
    user_ratings_total: 162,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "356 Cranston Rd SE #4010, Calgary, AB T3M 0S9, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Sobeys Liquor Cranston",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJXdP31YOdcVMRkrphgk8nxW0",
    plus_code: {
      compound_code: "V2JC+4P Calgary, Alberta",
      global_code: "9528V2JC+4P",
    },
    rating: 4.2,
    reference: "ChIJXdP31YOdcVMRkrphgk8nxW0",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 75,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address:
      "16648 McKenzie Lake Blvd SE, Calgary, AB T2Z 1N4, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "Canadian Liquor Store",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJW5l48Mp3cVMR13MvgUG4r1c",
    plus_code: {
      compound_code: "W236+82 Calgary, Alberta",
      global_code: "9528W236+82",
    },
    rating: 4.1,
    reference: "ChIJW5l48Mp3cVMR13MvgUG4r1c",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 23,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "4307 130 Ave SE, Calgary, AB T2Z 3V8, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "South Trail Crossing",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJ1WWi2Hd3cVMRzHyneT9OlxE",
    plus_code: {
      compound_code: "W2JH+4C Calgary, Alberta",
      global_code: "9528W2JH+4C",
    },
    rating: 4.1,
    reference: "ChIJ1WWi2Hd3cVMRzHyneT9OlxE",
    types: [
      "liquor_store",
      "store",
      "food",
      "point_of_interest",
      "establishment",
    ],
    user_ratings_total: 172,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "35 Cranford Way SE, Calgary, AB T3M 3A9, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Crescent Liquor Store (Cranston)",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJlY_3NnidcVMRPWt7uI9ZKqo",
    plus_code: {
      compound_code: "V29J+CF Calgary, Alberta",
      global_code: "9528V29J+CF",
    },
    rating: 4.7,
    reference: "ChIJlY_3NnidcVMRPWt7uI9ZKqo",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 30,
  },
  {
    business_status: "OPERATIONAL",
    formatted_address: "19645 Seton Way SE, Calgary, AB T3M 2L3, Canada",
    geometry: { location: [Object], viewport: [Object] },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "Real Canadian Liquor Store",
    opening_hours: { open_now: true },
    photos: [[Object]],
    place_id: "ChIJ1f4uPHGdcVMRxuMdBRu7fCY",
    plus_code: {
      compound_code: "V2GR+5Q Calgary, Alberta",
      global_code: "9528V2GR+5Q",
    },
    rating: 4.4,
    reference: "ChIJ1f4uPHGdcVMRxuMdBRu7fCY",
    types: ["liquor_store", "store", "point_of_interest", "establishment"],
    user_ratings_total: 192,
  },
];

export default async function handler(req, res) {
  const location = req.query;
  if (req.method === "GET") {
    const results = await getLiquoreStores(location);
    const parsedResults = results.data.results;
    console.log(parsedResults[0].geometry);
    res.json(parsedResults);
  }
}
