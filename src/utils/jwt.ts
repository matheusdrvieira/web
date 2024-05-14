import axiosInstance from "@/service/axios";
import { User } from "@/types/user";

export function jwtDecode(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join("")
    );

    return JSON.parse(jsonPayload);
}

export const setSession = (access_token: string | null) => {
    const ACCESS_TOKEN = "access_token";
    const USER_INFO = "user_info";

    if (access_token) {
        sessionStorage.setItem(ACCESS_TOKEN, access_token);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;

        const user = jwtDecode(access_token);

        localStorage.setItem(USER_INFO, JSON.stringify(user));

        return user;
    } else {
        sessionStorage.removeItem(ACCESS_TOKEN);

        localStorage.removeItem(USER_INFO);

        delete axiosInstance.defaults.headers.common.Authorization;
    }
};

export function getUser(): User | null {
    const ACCESS_TOKEN = "access_token";
    const access_token = sessionStorage.getItem(ACCESS_TOKEN);

    if (!access_token) return null;

    return jwtDecode(access_token);
}
