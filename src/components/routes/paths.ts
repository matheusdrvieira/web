const AUTH = "/auth";
const DASHBOARD = "/dashboard";
const PRODUCT = "/product";

export const paths = {
    auth: {
        signin: `${AUTH}/signin`,
        signup: `${AUTH}/signup`,
        verify: `${AUTH}/verify`,
        forgot: {
            mail: `${AUTH}/forgot`,
            password: `${AUTH}/forgot/password`
        }
    },
    dashboard: {
        home: `${DASHBOARD}/home`,
        job: `${DASHBOARD}/job`,
    },
    product: {
        create: `${DASHBOARD}${PRODUCT}/new`,
        list: `${DASHBOARD}${PRODUCT}/list`,
        edit: (id: string) => `${DASHBOARD}${PRODUCT}/${id}/edit`
    },
};
