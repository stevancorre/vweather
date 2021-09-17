<template>
  <div class="wrapper">
    {{ temperature | formatTemperature }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class HourlyForecastWeatherCard extends Vue {
  @Prop() private hour!: string;
  @Prop() private temperature!: number;
  @Prop() private feelsLike!: number;
  @Prop() private icon!: string;
}
</script>

<style lang="scss" scoped>

</style>
