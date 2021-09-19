<template>
  <div class="wrapper">
    <span class="hour">{{ time | formatHour }}</span>
    <span class="temperature">{{ temperature | formatTemperature }}</span>
    <span class="feels-like">Feels like {{ feelsLike | formatTemperature }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
// Used to dispay the hourly forecast (bottom of the screen)
export default class HourlyForecastWeatherCard extends Vue {
  // properties
  @Prop() private time!: string;
  @Prop() private temperature!: number;
  @Prop() private feelsLike!: number;
}
</script>

<style lang="scss" scoped>
.wrapper {
  outline: 1px solid red;
}
</style>
