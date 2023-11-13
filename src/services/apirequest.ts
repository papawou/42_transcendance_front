import axiosInstance from "@/services/AxiosInstance";
import { CancelablePromise, OpenAPIConfig } from "@/services/openapi/requests";
import { ApiRequestOptions } from "@/services/openapi/requests/core/ApiRequestOptions";

export const request = <T>(
    config: OpenAPIConfig,
    options: ApiRequestOptions
): CancelablePromise<T> => {
    return new CancelablePromise((resolve, reject, onCancel) => {
        const abortController = new AbortController();
        onCancel(() => abortController.abort());

        return axiosInstance
            .request({
                url: options.url,
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