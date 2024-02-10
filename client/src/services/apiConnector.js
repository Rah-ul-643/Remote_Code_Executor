import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params, token) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? { ...headers, Authorization: `Bearer ${token}` } : { Authorization: `Bearer ${token}` },
        params: params ? params : null,
    });
}