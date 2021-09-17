export type GeolocationResponse = {
    city: string;
    country: string;
    coords: GeolocationCoords;
}

export type GeolocationCoords = {
    latitude: number;
    longitude: number;
}