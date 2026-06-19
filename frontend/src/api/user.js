import { jwtDecode } from "jwt-decode";

export function getCurrentUserId() {

    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const decoded = jwtDecode(token);

    console.log("DECODED:", decoded);

    return decoded.user_id;
}