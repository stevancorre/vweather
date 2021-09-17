import { injectable } from "inversify-props";
import { CurrentWeatherResponse } from "@/models/currentWeatherResponse";
import { OneCallResponse } from "@/models/oneCallResponse";
import { RequesterService } from "./requesterService";
import { minutesToMs } from "@/helpers/timeHelper";

export interface IOpenWeatherMapService {
    getCurrentWeatherByCity(city: string): Promise<CurrentWeatherResponse>;
    getCurrentWeatherByCoords(lon: number, lat: number): Promise<CurrentWeatherResponse>;

    oneCall(lon: number, lat: number, exclude: ("current" | "minutely" | "hourly" | "daily" | "alerts")[]): Promise<OneCallResponse>;

    getIconUrl(id: string): string;
    
    getWeatherIconClass(id: string): string;
}

@injectable()
export class OpenWeatherMapService extends RequesterService implements IOpenWeatherMapService {
    private readonly WEATHER_ICON_TABLE : any = {
        // icons: iconIds -> weatherId
        "01d": "day-sunny",
        "02d": "day-cloudy",
        "03d": "day-cloudy",
        "04d": "day-cloudy",
        "09d": "day-showers",
        "10d": "day-rain-mix",
        "11d": "day-thunderstorm",
        "13d": "day-snow",
        "50d": "day-fog",
        "01n": "night-clear",
        "02n": "night-alt-cloudy",
        "03n": "night-alt-cloudy",
        "04n": "night-alt-cloudy",
        "09n": "night-showers",
        "10n": "night-rain",
        "11n": "night-thunderstorm",
        "13n": "night-snow",
        "50n": "night-fog",
    }
    
    constructor() {
        super(minutesToMs(5));

        this.baseURL = "https://api.openweathermap.org/data/2.5";
        this.defaultParams = {
            appid: process.env.VUE_APP_OWP_APP_ID,
            units: "metric"
        };
    }

    public getWeatherIconClass(id: string): string {
        //return `wi wi-${this.WEATHER_ICON_TABLE[id]}`;
        return `wi wi-owm-${id}`
    }

    public oneCall(lon: number, lat: number, exclude: ("current" | "minutely" | "hourly" | "daily" | "alerts")[]): Promise<OneCallResponse> {
        return this.makeRequest<OneCallResponse>({
            lon: lon,
            lat: lat,
            exclude: exclude.join(",")
        }, "onecall");
    }

    public getCurrentWeatherByCity(city: string): Promise<CurrentWeatherResponse> {
        return this.makeRequest<CurrentWeatherResponse>({
            q: city
        }, "weather");
    }

    public getCurrentWeatherByCoords(lon: number, lat: number): Promise<CurrentWeatherResponse> {
        return this.makeRequest<CurrentWeatherResponse>({
            lon: lon,
            lat: lat
        }, "weather");
    }

    public getIconUrl(id: string): string {
        return `http://openweathermap.org/img/wn/${id}@2x.png`
    }
}