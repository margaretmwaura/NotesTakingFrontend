import axios from "axios";

let Api = axios.create({
  baseURL: "http://localhost:8400/"
});

Api.defaults.withCredentials = true;

export default Api;
