import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default function fetcher(url) {
  return axios.get(url).then((res) => res.data);
}
