import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {logError} from "../utils/log";
import {API_BOT, BOT_TOKEN} from "../config";

export class APICommon {
    private client: AxiosInstance;

    constructor(baseURL: string = API_BOT, config?: AxiosRequestConfig) {
        this.client = axios.create({
            baseURL,
            timeout: 10000,
            ...config,
        });

        this.client.interceptors.request.use(
            (config) => {

                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                logError('API Error:', error?.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    public static createUrl(beforePath: string = '') {
        return `${API_BOT}${beforePath}/bot${BOT_TOKEN}/`
    }

    public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const res: AxiosResponse<T> = await this.client.get(url, config);
        return res.data;
    }

    public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const res: AxiosResponse<T> = await this.client.post(url, data, config);
        return res.data;
    }

    public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const res: AxiosResponse<T> = await this.client.put(url, data, config);
        return res.data;
    }

    public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const res: AxiosResponse<T> = await this.client.delete(url, config);
        return res.data;
    }
}
