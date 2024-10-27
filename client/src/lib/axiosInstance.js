import axios from 'axios'

const baseUrl = import.meta.env.MODE === "development" ? 'http://localhost:5000' : '/';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
})