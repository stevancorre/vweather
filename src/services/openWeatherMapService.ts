import { injectable } from "inversify-props";
import { OneCallResponse } from "@/models/oneCallResponse";
import { RequesterService } from "./requesterService";
import { minutesToMs } from "@/helpers/timeHelper";

export interface IOpenWeatherMapService {
    // one call api
    oneCall(lon: number, lat: number, exclude: ("current" | "minutely" | "hourly" | "daily" | "alerts")[]): Promise<OneCallResponse>;

    // get WeatherIcon's class based on weather id
    getWeatherIconClass(id: string): string;
}

@injectable()
export class OpenWeatherMapService extends RequesterService implements IOpenWeatherMapService {
    constructor() { 
        // store result for 5 minutes
        super(minutesToMs(5));

        this.baseURL = "https://api.openweathermap.org/data/2.5";
        this.defaultParams = {
            appid: process.env.VUE_APP_OWP_APP_ID,
            units: "metric"
        };
    }

    // get WeatherIcon's class based on weather id
    public getWeatherIconClass(id: string): string {
        return `wi wi-owm-${id}`
    }

    // get WeatherIcon's class based on weather id
    public oneCall(lon: number, lat: number, exclude: ("current" | "minutely" | "hourly" | "daily" | "alerts")[]): Promise<OneCallResponse> {
        return this.makeRequest<OneCallResponse>({
            lon: lon,
            lat: lat,
            exclude: exclude.join(",")
        }, "onecall");
    }
}