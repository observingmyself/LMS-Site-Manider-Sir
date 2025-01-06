import axios from "axios";

export const googleAuth = (code) => {
    return axios.get(`http://localhost:3000/api/v1/user/google?code=${code}`, {
        withCredentials: true,
    })
}