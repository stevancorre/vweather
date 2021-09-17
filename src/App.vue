<template>
  <div v-if="weather != undefined">
    <current-weather-card
      :weather="weather.current.weather[0].main"
      :temperature="weather.current.temp"
      :city="location.city"
      :icon="openWeatherMapService.getWeatherIconClass(weather.current.weather[0].id)"/>

    <div class="stats">
      <div>
        <weather-stat
          title="Humidity"
          icon="wi wi-humidity"
          iconSize="2.1em"
          :value="weather.current.humidity | formatPercentage"/>
        
        <weather-stat
          title="Air Pressure"
          icon="wi wi-barometer"
          iconSize="2.2em"
          :value="weather.current.pressure | formatPressure"/>
      </div>
      
      <div>
        <weather-stat
          title="Chances of rain"
          icon="wi wi-rain-mix"
          iconSize="2em"
          :value="weather.current.pop | formatPercentage"/>

        <!-- icon depending on wind direction -->
        <weather-stat
          title="Wind speed"
          icon="wi wi-strong-wind"
          iconSize="1.9em"
          :value="weather.current.wind_speed | formatKmh"/> 
      </div>
    </div>

    <div class="hourly-forecast">
      <hourly-forecast-weather-card
        v-for="(hourlyForecast, i) in weather.hourly"
        :key="i"
        :temperature="hourlyForecast.temp"/>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import { Inject } from "inversify-props";
import { IOpenWeatherMapService } from "./services/openWeatherMapService";
import { IGeolocationService } from "./services/geolocationService";
import { GeolocationResponse } from "./models/geolocationResponse";
import { OneCallResponse } from "./models/oneCallResponse";
import WeatherStat from "./components/WeatherStat.vue";
import CurrentWeatherCard from "./components/CurrentWeatherCard.vue";
import HourlyForecastWeatherCard from "./components/HourlyForecastWeatherCard.vue"
import DailyForecastWeatherCard from "./components/DailyForecastWeatherCard.vue"
import { minutesToMs } from "./helpers/timeHelper";

@Component({
  components: {
    CurrentWeatherCard,
    HourlyForecastWeatherCard,
    DailyForecastWeatherCard,
    WeatherStat
  },
})
export default class App extends Vue {
  private weather?: OneCallResponse;
  private location?: GeolocationResponse;

  @Inject()
  private openWeatherMapService!: IOpenWeatherMapService;

  @Inject()
  private geolocationService!: IGeolocationService;

  public created() {
    this.updateWeather();

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
        [ "minutely", "alerts" ]
      );

    this.weather = weatherAndForecast;

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

</style>
