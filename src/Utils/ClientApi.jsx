import axios from "axios";

const ClientApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
})

ClientApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
  
      return config;
    },
    (error) => {
      return console.error(error);
    }
  );

export default ClientApi