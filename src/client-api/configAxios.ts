import axios, { InternalAxiosRequestConfig, AxiosResponse , AxiosError} from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://se2-ecommerce.herokuapp.com",
    headers: {
        "Allow-Control-Allow-Origin": "*",
        "Allow-Control-Allow-Methods": "POST, PUT, GET, HEAD, OPTIONS, DELETE"
    },
    timeout: 30000
})

axiosInstance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token") || ""

    if(token) req.headers.Authorization = `Bearer ${token}`
    return req
}, (err) => {
    console.log(err)
    return Promise.reject(err)
})

const fetchRefreshToken = async () => {
    return await axiosInstance.get("/auth/access-token").then((res) => res.data)
}

axiosInstance.interceptors.response.use((res: AxiosResponse) => {
    return res
}, async (err: AxiosError) => {
    const originalConfig = err.config
    if(err.response) {
        if(err.response.status === 401 && !originalConfig?.method) {
            const accessToken = await fetchRefreshToken()
            if(window) window.localStorage.setItem("access_token", accessToken)
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`

            return axiosInstance({
                baseURL: "http://localhost:3000/api",
                timeout: 30000,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        }
    }
})