const BASE_URL = process.env.REACT_APP_API_URL;

export const endpoints = {
    SENDOTP_API: `${BASE_URL}auth/sendotp`,
    SIGNUP_API: `${BASE_URL}auth/register`,
    LOGIN_API: `${BASE_URL}auth/login`,
    COMPILE_API: `${BASE_URL}code/compile`,
};