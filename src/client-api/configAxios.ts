import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    // const token = localStorage.getItem("access_token") || "";

    if (req?.url?.includes("login") || req?.url?.includes("register")) {
      if (req?.data?.email === "superadmin@gmail.com" && req?.data?.password === "1234") {
        localStorage?.setItem("isAdmin", JSON.stringify(true));
      }
    }

    // if (token) req.headers.Authorization = `Bearer ${token}`;
    req.headers["Content-Type"] = "application/json";
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

// const fetchRefreshToken = async () => {
//     return await axiosInstance.get("/auth/access-token").then((res) => res.data)
// }

// axiosInstance.interceptors.response.use((res: AxiosResponse) => {
//     return res
// }, async (err: AxiosError) => {
//     const originalConfig = err.config
//     if(err.response) {
//         if(err.response.status === 401 && !originalConfig?.method) {
//             const accessToken = await fetchRefreshToken()
//             if(window) window.localStorage.setItem("access_token", accessToken)
//             axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`

//             return axiosInstance({
//                 baseURL: "http://localhost:3000/api",
//                 timeout: 30000,
//                 headers: {
//                     'Authorization': `Bearer ${accessToken}`
//                 }
//             })
//         }
//     }
// })

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (
      res?.config?.url?.includes("/login") ||
      res?.config?.url?.includes("/register")
    ) {
      localStorage.setItem("access_token", res?.data?.data?.id);
    }
    return res;
  },
  async (err: AxiosError) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && !originalConfig?.method) {
        window.location.replace("/");
      }
    }
  }
);

export const axiosImageInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 30000,
});
