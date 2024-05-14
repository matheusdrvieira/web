const SESSIONS_BASE_PATH = "/sessions";
const USERS_BASE_PATH = "/users";
const PRODUCTS_BASE_PATH = "/products";
const ADDRESSES_BASE_PATH = "/addresses";
const CATEGORIES_BASE_PATH = "/categories";
const MAILS_BASE_PATH = "/mails";

export const endpoints = {
    auth: {
        login: `${SESSIONS_BASE_PATH}`,
        register: `${USERS_BASE_PATH}`,
        verify: `${USERS_BASE_PATH}`,
        forgot: `${USERS_BASE_PATH}/forgot/password`,
        resetPassword: `${USERS_BASE_PATH}/reset/password`,
    },
    mail: {
        resend: `${MAILS_BASE_PATH}/resend`,
    },
    category: {
        list: CATEGORIES_BASE_PATH
    },
    address: {
        find: {
            cep: `${ADDRESSES_BASE_PATH}/discovery`
        }
    },
    product: {
        create: PRODUCTS_BASE_PATH,
        update: (id: string) => `${PRODUCTS_BASE_PATH}/${id}`,
        patch: (id: string) => `${PRODUCTS_BASE_PATH}/${id}/status`,
        list: `${PRODUCTS_BASE_PATH}`,
        get: (id?: string) => `${PRODUCTS_BASE_PATH}/${id}`,
    },
};
