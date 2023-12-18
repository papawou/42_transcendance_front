import axios from "axios";

import type { ApiRequestOptions } from "@/services/openapi/requests/core/ApiRequestOptions";
import { CancelablePromise } from "@/services/openapi/requests/core/CancelablePromise";
import type { OpenAPIConfig } from "@/services/openapi/requests/core/OpenAPI";
import axiosInstance from "@/services/AxiosInstance";

const source = axios.CancelToken.source();

export const request = <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions
): CancelablePromise<T> => {
  return new CancelablePromise((resolve, reject, onCancel) => {
    onCancel(() => {
      console.log("canceL")
      source.cancel("The user aborted a request.")
    });

    return axiosInstance
      .request({
        url: options.url,
        data: options.body,
        method: options.method,
        cancelToken: source.token,
      })
      .then((res) => {
        console.log("res", res)
        resolve(res?.data ?? null);
      })
      .catch((error) => {
        console.log("error", error)
        reject(error);
      });
  });
};