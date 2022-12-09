
// export const baseURL = "http://localhost:8000";

import axios from "axios";

// export const baseURL = "http://192.168.138.202:8000";
export const baseURL = "http://192.168.0.101:8000"
export const wsURL = 'ws://192.168.0.101:8000/ws/orders/'
// export const wsURL = "ws://localhost:8000/ws/orders/";



export const axiosInstance = axios.create({
  baseURL: baseURL + "/api/",
});