export const setSessionStorage = (key:string, value:string) => {
    try {
        if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
            window.sessionStorage.setItem(key, value);
        }
    } catch (err) {
        console.error(err);
    }
};

export const removeSessionStorage = (key:string) => {
    try {
        if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
            window.sessionStorage.removeItem(key);
        }
    } catch (err) {
        console.error(err);
    }
};

export const getSessionStorage = (key:string) => {
    try {
        if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
            return window.sessionStorage.getItem(key);
        }
    } catch (err) {
        console.error(err);
    }
};
