import { User } from "@/types/user";

export const getLocalStorage = (): User | null => {
    const USER_INFO = "user_info";
    const userString = localStorage.getItem(USER_INFO);

    if (!userString) return null;

    return JSON.parse(userString);
};
