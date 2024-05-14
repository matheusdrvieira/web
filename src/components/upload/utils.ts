import { ExtendFile } from "./types";

export function fileTypeByUrl(fileUrl = "") {
    return (fileUrl && fileUrl.split(".").pop()) || "";
}

export function fileNameByUrl(fileUrl: string) {
    return fileUrl.split("/").pop();
}

export function fileData(file: ExtendFile | string) {
    if (typeof file === "string") {
        return {
            key: file,
            preview: file,
            name: fileNameByUrl(file),
            type: fileTypeByUrl(file),
        };
    }

    return {
        key: file.preview,
        name: file.name,
        size: file.size,
        path: file.path,
        type: file.type,
        preview: file.preview,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
    };
}
