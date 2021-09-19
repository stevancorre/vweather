export type OneCallResponse = {
    // City geo location, longitude
    lon: number;

    // City geo location, latitude
    lat: number;

    // Current weather
    current: {
        // Temperature
        temp: number;

        // Temperature. This temperature parameter accounts for the human perception of weather
        feels_like: number;

        // Pressure
        pressure: number;

        // Humidity
        humidity: number;

        // Wind speed
        wind_speed: number;

        // Probability of precipitation
        pop: number;

        weather: {
            // Group of weather parameters (Rain, Snow, Extreme etc.)
            main: string;
           
            // Weather condition within the group. You can get the output in your language
            description: string;
           
            // Weather icon id
            icon: string;
        }[];
    }

    // Hourly forecast
    hourly: {
        // Delta time
        dt: number;

        // Temperature
        temp: number;

        // Temperature. This temperature parameter accounts for the human perception of weather
        feels_like: number;

        // Pressure
        pressure: number;

        // Humidity
        humidity: number;

        // Wind speed
        wind_speed: number;

        weather: {
            // Group of weather parameters (Rain, Snow, Extreme etc.)
            main: string;
           
            // Weather condition within the group. You can get the output in your language
            description: string;
           
            // Weather icon id
            icon: string;
        }[];
    }[];

    // Daily forecast
    daily: {
        // Temperature
        temp: {
            // Day temperature
            day: number;
            
            // Min daily temperature
            min: number;

            // Max daily temperature
            max: number;

            // Night temperature
            night: number;

            // Evening temperature
            eve: number;

            // Morning temperature
            morn: number;
        };

        // Temperature. This temperature parameter accounts for the human perception of weather
        feels_like: {
            // Day temperature
            day: number;

            // Night temperature
            night: number;

            // Evening temperature
            eve: number;

            // Morning temperature
            morn: number;            
        }

        // Pressure
        pressure: number;

        // Humidity
        humidity: number;

        // Wind speed
        wind_speed: number;

        // Probability of precipitation
        pop: number;

        weather: {
            // Group of weather parameters (Rain, Snow, Extreme etc.)
            main: string;
           
            // Weather condition within the group. You can get the output in your language
            description: string;
           
            // Weather icon id
            icon: string;
        }[];
    }
};