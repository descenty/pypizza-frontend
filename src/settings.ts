// export const baseURL = "http://localhost:8000";

import axios from "axios";

// export const baseURL = "http://192.168.131.202:8000";
export const baseURL = process.env.REACT_APP_API_URL;
// export const wsURL = 'ws://192.168.131.202:8000/ws/orders/'
export const wsURL = process.env.REACT_APP_WS_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL + "/api/",
});
