import toast from "react-hot-toast";
import { endpoints } from "./apis";
import { apiConnector } from "./apiConnector";

const {
    COMPILE_API
} = endpoints

export const compileCode = async (code, input) => {
    const toastId = toast.loading("Compiling...");
    try {
        const response = await apiConnector("POST", COMPILE_API, {
            code,
            input
        }).catch(error => {
            console.error("apiConnector failed:", error);
            throw error;
        });

        console.log("COMPILE API RESPONSE :", response);
        if (!response.data.success) {
            const errorMessage = response.error ? response.error.message : "Unknown error";
            throw new Error(errorMessage);
        }

        toast.success("Compiled successfully");
        return response.data;
    }
    catch (error) {
        console.log("COMPILE API FAILED:", error);
        toast.error("Failed to compile");
    }
    toast.dismiss(toastId);
    return null;
}