import { User } from "@/types/user";
import { getLocalStorage } from "./storage/local-storage";

export const getUserFromLocalStorage = (): User | null => {
    const USER_INFO = "user_info";
    const userString = getLocalStorage(USER_INFO);

    if (!userString) return null;

    return JSON.parse(userString);
};
