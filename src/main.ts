import Vue from 'vue'
import App from './App.vue'

import "reflect-metadata"
import { container } from 'inversify-props'
import { IOpenWeatherMapService, OpenWeatherMapService } from './services/openWeatherMapService'
import { GeolocationService, IGeolocationService } from './services/geolocationService'
import { unixToDate } from './helpers/timeHelper'

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
        Vue.filter("formatTemperature", (value: any) => {
            const temp: number = Number.parseInt(value);
            if(Number.isNaN(temp)) {
                return "Unknown";
            }

            return `${temp}°C`;
        });

        // Capitalize Words Like This
        Vue.filter("capitalize", (text: string) => {
            return text?.split(" ")?.map(v => `${v[0].toUpperCase()}${v.substring(1)}`).join(" ") ?? "";
        });

        // HH
        Vue.filter("formatHour", (value: any) => {
            return `${unixToDate(Number.parseInt(value)).format("HH")}h`;
        });

        new Vue({
            render: h => h(App)
        }).$mount('#app')
    }
}

new AppBootsrap();