import { injectable } from "inversify-props";
import { RequesterService } from "./requesterService";
import { GeolocationCoords, GeolocationResponse } from "@/models/geolocationResponse";
import { minutesToMs } from "@/helpers/timeHelper";

export interface IGeolocationService {
    // get the current users's location (city, country and coords)
    getLocation(): Promise<GeolocationResponse>;

    // get the current users's position (coords)
    getPosition(): Promise<GeolocationCoords>;
}

@injectable()
export class GeolocationService extends RequesterService implements IGeolocationService {
    constructor() {
        // store result for 30 minutes
        super(minutesToMs(30));

        this.baseURL = "https://eu1.locationiq.com/v1";
        this.defaultParams = {
            key: process.env.VUE_APP_LOCATIONIQ_TOKEN,
            format: "json"
        };
    }

    // get the current users's location (city, country and coords)
    public async getLocation(): Promise<GeolocationResponse> {
        const coords: GeolocationCoords = await this.getPosition();

        return this.makeRequest({
            lat: coords.latitude,
            lon: coords.longitude
        }, "reverse.php").then((response: any) => {
            return {
                city: response.address.municipality,
                country: response.address.country,
                coords: coords
            }
        });
    }

    // get the current users's position (coords)
    public getPosition(options?: PositionOptions): Promise<GeolocationCoords> {
        // "trick" to use navigator.geolocation.getCurrentPosition as a promise
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((data: GeolocationPosition) => {
                resolve({
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                });
            }, reject, options);
        });
    }
}