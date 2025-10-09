import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "../services/authService";

export type DecodedToken = {
    UserInfo?: {
        id: string,
        roles: string[],
        username: string,
        branches: {branchId: string, branchName: string}[]
    };
    exp?: number;        // expiration timestamp
    iat?: number;        // issued at timestamp
    // [key: string]: any;  // allow other custom fields
};




/**
 * Decode the current access token stored in authService.
 * Returns null if token is missing or invalid.
 */
export default function decodeToken() : DecodedToken | null {
    const token = getAccessToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded;
    } catch (err) {
        console.error("Invalid JWT token:", err);
        return null;
    }
}
