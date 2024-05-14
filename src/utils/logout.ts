import axiosInstance from "@/service/axios";
import { removeLocalStorage } from "./storage/local-storage";
import { removeSessionStorage } from "./storage/session-storage";

export const logout = () => {
    const ACCESS_TOKEN = "access_token";
    const USER_INFO = "user_info";

    removeSessionStorage(ACCESS_TOKEN);

    removeLocalStorage(USER_INFO);

    delete axiosInstance.defaults.headers.common.Authorization;
};
