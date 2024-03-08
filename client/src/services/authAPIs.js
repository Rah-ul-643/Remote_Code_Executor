import toast from "react-hot-toast";
import { endpoints } from "./apis";
import { apiConnector } from "./apiConnector";
import { setToken } from "../slices/authSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
} = endpoints

export const sendOtp = async (email) => {

    const toastId = toast.loading("Sending OTP...");
    try {
        const response = await apiConnector("POST", SENDOTP_API, {
            email
        }).catch(error => {
            console.error("apiConnector failed:", error);
            throw error;
        });

        console.log("SENOTP API RESPONSE :", response);
        if (!response.data.success) {
            const errorMessage = response.error ? response.error.message : "Unknown error";
            throw new Error(errorMessage);
        }

        toast.success("OTP sent successfully");
    }
    catch (error) {
        console.log("SENDOTP API FAILED:", error);
        toast.error("Failed to send OTP");
    }
    toast.dismiss(toastId);
}
export const register = async (formData) => {
    const toastId = toast.loading("Registering...");
    try {
        const response = await apiConnector("POST", SIGNUP_API, formData).catch(error => {
            console.error("apiConnector failed:", error);
            throw error;
        });

        console.log("SIGNUP API RESPONSE :", response);
        if (!response.data.success) {
            const errorMessage = response.error ? response.error.message : "Unknown error";
            throw new Error(errorMessage);
        }

        toast.success("Registered successfully");
    }
    catch (error) {
        console.log("SIGNUP API FAILED:", error);
        toast.error("Failed to register");
    }
    toast.dismiss(toastId);
}
export const login = async (formData,dispatch) => {
    const toastId = toast.loading("Logging in...");
    try {
        const response = await apiConnector("POST", LOGIN_API, formData).catch(error => {
            console.error("apiConnector failed:", error);
            throw error;
        });

        console.log("LOGIN API RESPONSE :", response);
        const jwt = response.data.token;
        console.log(jwt);
        dispatch(setToken(jwt));
        window.localStorage.setItem("token",jwt);
        toast.success("Logged in successfully");
        window.location.reload();
    }
    catch (error) {
        console.log("LOGIN API FAILED:", error);
        toast.error("Failed to login");
    }
    toast.dismiss(toastId);
}