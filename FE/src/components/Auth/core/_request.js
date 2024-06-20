import { axiosGet } from "../../../config/axios";

export function getUserByToken() {
    return axiosGet('auth')
}