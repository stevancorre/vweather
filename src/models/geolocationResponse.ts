export type GeolocationResponse = {
    // City
    city: string;

    // Country code (ex: FR)
    country: string;

    // Coords
    coords: GeolocationCoords;
}

export type GeolocationCoords = {
    latitude: number;
    longitude: number;
}