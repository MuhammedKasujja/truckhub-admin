import axios from "axios";

const apiClient = axios.create({ baseURL: `${process.env.BACKEND_URL}` });

apiClient.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    // console.error("Error.....", error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    console.error("ApiError.....", error);
    if (error.code === "ECONNREFUSED") {
      error.response = {
        data: {
          success: false,
          error: {
            code: "ECONNREFUSED",
            message: "Could not connect to server",
          },
        },
      };
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
