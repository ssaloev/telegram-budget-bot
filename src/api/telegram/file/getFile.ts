import {api} from "./api";

export function getFile(fileUrl: string) {
    return api.get(fileUrl)
}