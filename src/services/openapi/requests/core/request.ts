import axiosInstance from "@/services/AxiosInstance";
import { CancelablePromise, OpenAPIConfig } from "@/services/openapi/requests";
import { ApiRequestOptions } from "@/services/openapi/requests/core/ApiRequestOptions";
import { isDef } from "@/technical/isDef";

export const request = <T>(
    config: OpenAPIConfig,
    options: ApiRequestOptions
): CancelablePromise<T> => {
    return new CancelablePromise((resolve, reject, onCancel) => {
        const abortController = new AbortController();
        onCancel(() => abortController.abort());

        let url = options.url
        if (isDef(options.path)) {
            for(const [key, value] of Object.entries(options.path)) {
                const regex = new RegExp(`\\{${key}\\}`, "g")
                url = url.replace(regex, value)
            }
        }
        return axiosInstance
            .request({
                url: url,
                data: options.body,
                method: options.method,
                signal: abortController.signal
            })
            .then((res) => {
                resolve(res?.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};