export type CurrentWeatherResponse = {
    // City name
    name: string;

    // City geo location
    coord: {
        // City geo location, longitude
        lon: number;

        // City geo location, latitude
        lat: number;
    };

    // More info Weather condition codes
    weather: {
        // Group of weather parameters (Rain, Snow, Extreme etc.)
        main: string;
       
        // Weather condition within the group. You can get the output in your language
        description: string;
       
        // Weather icon id
        icon: string;
    }[];

    // Internal parameter
    base: string;

    // Main infos
    main: {
        // Temperature
        temp: number;

        // Temperature. This temperature parameter accounts for the human perception of weather
        feels_like: number;

        // Pressure
        pressure: number;

        // Humidity
        humidity: number;

        // Minimum temperature at the moment. This is minimal currently observed temperature
        temp_min: number;

        // Maximum temperature at the moment. This is maximal currently observed temperature
        temp_max: number;
    };

    // Wind infos
    wind: {
        // Wind speed
        speed: number;

        // Wind direction
        deg: number;
    };

    // City id
    id: number;
};