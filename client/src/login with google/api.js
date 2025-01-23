import axios from "axios";
import { baseURL } from "../constant/constant"
export const googleAuth = (code) => {
    return axios.get(`${baseURL}/api/v1/user/google?code=${code}`, {
        withCredentials: true,
    })
}