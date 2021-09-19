<template>
  <!-- Weather -->
  <div v-if="weather != undefined">
    <!-- Current weather (top left) -->
    <current-weather-card
      :weather="weather.current.weather[0].main"
      :temperature="weather.current.temp"
      :city="location.city"
      :icon="
        openWeatherMapService.getWeatherIconClass(weather.current.weather[0].id)
      "
    />

    <!-- Current weather statistics (top right) -->
    <div class="stats">
      <div>
        <!-- Humidity % -->
        <weather-stat
          title="Humidity"
          icon="wi wi-humidity"
          iconSize="2.1em"
          :value="weather.current.humidity"
          suffix=" %"
        />

        <!-- Pressure PS -->
        <weather-stat
          title="Air Pressure"
          icon="wi wi-barometer"
          iconSize="2.2em"
          :value="weather.current.pressure"
          suffix=" PS"
        />
      </div>

      <!-- Chances of rain % -->
      <div>
        <weather-stat
          title="Chances of rain"
          icon="wi wi-rain-mix"
          iconSize="2em"
          :value="weather.current.pop"
          suffix=" %"
        />

        <!-- icon depending on wind direction -->
        <!-- Wind speed km/h -->
        <weather-stat
          title="Wind speed"
          icon="wi wi-strong-wind"
          iconSize="1.9em"
          :value="weather.current.wind_speed"
          suffix=" km/h"
          :decimalCount="1"
        />
      </div>
    </div>

    <!-- Hourly forecast from now to midnight -->
    <div class="hourly-forecast">
      <hourly-forecast-weather-card
        v-for="(hourlyForecast, i) in weather.hourly"
        :key="i"
        :temperature="hourlyForecast.temp"
        :feelsLike="hourlyForecast.feels_like"
        :time="hourlyForecast.dt"
      />
    </div>
  </div>

  <!-- Skeleton -->
  <div v-else></div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import { Inject } from "inversify-props";
import { unixToDate, minutesToMs } from "./helpers/timeHelper";

// services
import { IOpenWeatherMapService } from "./services/openWeatherMapService";
import { GeolocationResponse } from "./models/geolocationResponse";

// responses
import { IGeolocationService } from "./services/geolocationService";
import { OneCallResponse } from "./models/oneCallResponse";

// components
import WeatherStat from "./components/WeatherStat.vue";
import CurrentWeatherCard from "./components/CurrentWeatherCard.vue";
import HourlyForecastWeatherCard from "./components/HourlyForecastWeatherCard.vue";
import DailyForecastWeatherCard from "./components/DailyForecastWeatherCard.vue";

@Component({
  components: {
    CurrentWeatherCard,
    HourlyForecastWeatherCard,
    DailyForecastWeatherCard,
    WeatherStat,
  },
})
export default class App extends Vue {
  private weather?: OneCallResponse;
  private location?: GeolocationResponse;

  @Inject() private openWeatherMapService!: IOpenWeatherMapService;

  @Inject() private geolocationService!: IGeolocationService;

  public created() {
    this.updateWeather();

    // update weather each 10 minutes
    setInterval(this.updateWeather, minutesToMs(10));
  }

  public data() {
    return {
      weather: this.weather,
    };
  }

  private async updateWeather() {
    // 1. geolocate
    this.location = await this.geolocationService.getLocation();

    // 2. get weather
    const weatherAndForecast: OneCallResponse =
      await this.openWeatherMapService.oneCall(
        this.location.coords.longitude,
        this.location.coords.latitude,
        ["minutely", "alerts"]
      );

    this.weather = weatherAndForecast;

    // filter the hourly forecast to get only for today
    this.weather.hourly = this.weather.hourly.filter((x) => {
      const dt: Date = unixToDate(x.dt);
      const now: Date = new Date();

      return dt.getDay() == now.getDay();
    });    

    // update view
    this.$forceUpdate();
  }
}
</script>

<style lang="scss">
//@import url("../node_modules/weather-icons/css/weather-icons.min.css");
@import url("./assets/weather-icons/css/weather-icons.min.css");
@import url("./assets/weather-icons/css/weather-icons-wind.min.css");

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: 0;
}

.stats {
  position: absolute;
  top: 3em;
  right: 5em;

  & .wrapper {
    margin: 2.4em 0;
  }
}

@media screen and (max-height: 680px) {
  .stats {
    display: flex;

    & div {
      margin-left: 2em;
    }
  }
}

.hourly-forecast {
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
}
</style>
