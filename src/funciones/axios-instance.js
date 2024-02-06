import axios from "axios";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const credenciales = localStorage.getItem("credenciales");
    if (!credenciales) {
      return Promise.reject("Deslogueado");
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
