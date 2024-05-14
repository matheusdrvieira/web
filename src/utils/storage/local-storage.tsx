export const setLocalStorage = (key:string, value:string) => {
    try {
        if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
            window.localStorage.setItem(key, value);
        }
    } catch (err) {
        console.error(err);
    }
};

export const removeLocalStorage = (key:string) => {
    try {
        if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
            window.localStorage.removeItem(key);
        }
    } catch (err) {
        console.error(err);
    }
};

export const getLocalStorage = (key:string) => {
    try {
        if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
            return window.localStorage.getItem(key);
        }
    } catch (err) {
        console.error(err);
    }
};
