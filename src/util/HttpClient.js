import axios from "axios";

const httpClient = axios.create({
  baseURL:'http://localhost:4000/api', // Replace this with your API base URL
});

// Request interceptor
httpClient.interceptors.request.use(
  (request) => {
    // Do something with the request config (e.g., add headers, authentication token)
    // For example:
    // request.headers['Authorization'] = 'Bearer sfsdfsdf';
    let token = window.localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }

    request.headers["Authorization"] = token;
    // console.log("request interceptors", token);

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Do something with the response error (e.g., error handling, logging)
    return Promise.reject(error);
  }
);

export default httpClient;
