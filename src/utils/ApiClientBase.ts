import { AxiosRequestConfig, AxiosResponse } from "axios";
import authService from "./AuthService";

export class ApiClientBase {
    baseApiUrl = "https://localhost:5001";

    protected async transformOptions(options: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        const token = await authService.getAccessToken();
        options.headers = { ...options.headers, authorization: `Bearer ${token}` };
        return Promise.resolve(options);
    }

    protected transformResult(
        url: string,
        response: AxiosResponse<any>,
        processor: (response: AxiosResponse<any>) => any
    ) {
        return processor(response);
    }

    protected getBaseUrl(defaultUrl: string, baseUrl?: string) {
        return this.baseApiUrl;
    }
}
