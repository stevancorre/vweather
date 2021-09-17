import Vue from 'vue'
import App from './App.vue'

import "reflect-metadata"
import { container } from 'inversify-props'
import { IOpenWeatherMapService, OpenWeatherMapService } from './services/openWeatherMapService'
import { GeolocationService, IGeolocationService } from './services/geolocationService'

Vue.config.productionTip = false

class AppBootsrap {
  constructor() {
    this.loadDependencyContainer()
    this.loadVueApp()
  }

  private loadDependencyContainer(): void {
    container.addTransient<IOpenWeatherMapService>(OpenWeatherMapService);
    container.addTransient<IGeolocationService>(GeolocationService);
  }

  private loadVueApp(): void {
    // X°C
    Vue.filter("formatTemperature", (value: any) => this.formatInt(value, "°C"));

    // HH:MM
    Vue.filter("formatTime", (date: Date) => {
      return date.format("HH:MM");
    });

    // Capitalize Words Like This
    Vue.filter("capitalize", (text: string) => {
      return text?.split(" ")?.map(v => `${v[0].toUpperCase()}${v.substring(1)}`).join(" ") ?? "";
    });

    // X%
    Vue.filter("formatPercentage", (value: any) => this.formatInt(value, " %"));

    // X.X km/h
    Vue.filter("formatKmh", (value: any) => this.formatFloat(value, " km/h", 1));

    // X PS
    Vue.filter("formatPressure", (value: any) => this.formatInt(value, " PS"));

    new Vue({
      render: h => h(App)
    }).$mount('#app')
  }

  private formatInt(value: any, suffix: string): string {
    return this.formatNumber(value, Number.parseInt, suffix);
  }

  private formatFloat(value: any, suffix: string, decimalCount: number = 2): string {
    return this.formatNumber(value, Number.parseFloat, suffix, decimalCount); 
  }

  private formatNumber(value: any, f: any, suffix: any, decimalCount: number = 0): string {
    let n: number = f(value);
    if(Number.isNaN(n)) {
      return "Unknown";
    }

    if(decimalCount != undefined) {
      const multiplier: number = Math.pow(10, decimalCount);
      n = Math.round(n * multiplier) / multiplier;
    }
    
    return `${n.toFixed(decimalCount)}${suffix}`;
  }
}

new AppBootsrap();