import toast from "react-hot-toast";
import { endpoints } from "./apis";
import { apiConnector } from "./apiConnector";

const {
    COMPILE_API
} = endpoints

export const compileCode = async (code,input,language) => {
    const toastId = toast.loading("Compiling...");
    let output="";
    try {
        const response = await apiConnector("POST", COMPILE_API, {
            code,
            language,
            input
        }).catch(error => {
            console.error("apiConnector failed:", error);
            throw error;
        });

        console.log("COMPILE API RESPONSE :", response);
        output = response.data;

        toast.success("Compiled successfully");
        return response.data;
    }
    catch (error) {
        console.log("COMPILE API FAILED:", error);
        toast.error("Failed to compile");
        output= error.response.data;
    }
    finally{
        toast.dismiss(toastId);
    }
    
    return output;
}