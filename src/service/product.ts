import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { } from "next/navigation";
import axiosInstance from "./axios";
import { endpoints } from "./endpoints";

export class ProductClient {
    router?: AppRouterInstance;

    constructor(router?: AppRouterInstance) {
        this.router = router;
    }

    async fetchProducts(active: boolean | undefined, page: number, size: number, filter: string) {
        const response = await axiosInstance.get(endpoints.product.list, {
            params: {
                isActive: active,
                page: page,
                size: size,
                filter: filter
            }
        });

        return response.data;
    }
}
