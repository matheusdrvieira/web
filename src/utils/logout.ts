import axiosInstance from "@/service/axios";

export const logout = () => {
    const ACCESS_TOKEN = "access_token";
    const USER_INFO = "user_info";

    sessionStorage.removeItem(ACCESS_TOKEN);

    localStorage.removeItem(USER_INFO);

    delete axiosInstance.defaults.headers.common.Authorization;
};
