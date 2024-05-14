import { HOST_API } from "@/config-global";

export function concatImgUrl(url: string | undefined) {
    if (!url) return;

    return HOST_API?.concat(url);
}
