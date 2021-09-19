import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ISetupCache, setupCache } from 'axios-cache-adapter'

export abstract class RequesterService {
    protected defaultParams: any;
    protected baseURL: any;

    private axios: AxiosInstance;
    private cache?: ISetupCache;

    public constructor(maxAge?: number) {
        // if maxAge is defined, we have to setup the cache, otherwhise we don't need it
        if (maxAge) {
            this.cache = setupCache({
                maxAge: maxAge
            });

            this.axios = axios.create({
                adapter: this.cache.adapter
            })
        }
        else {
            this.axios = axios.create();
        }
    }

    // make a request on a specific api, based on the baseURL with optional params
    protected async makeRequest<T>(params?: any, api?: string, config?: AxiosRequestConfig): Promise<T> {
        const paramsString: string = this.concatParams({
            ...this.defaultParams,
            ...params
        });

        // make the request and return its data
        const url: string = `${this.baseURL}/${api ? `${api}?` : ""}${paramsString}`;
        const response: AxiosResponse<T> = await this.axios.get<T>(url, config);

        return response.data;
    }

    // concatenate params, from {k1:v1,k2:v2} to k1=v1&k2=v2
    private concatParams(params: any): string {
        const res: string[] = [];
        for (const k in params) {
            res.push(`${k}=${params[k]}`);
        }

        return res.join("&");
    }
}