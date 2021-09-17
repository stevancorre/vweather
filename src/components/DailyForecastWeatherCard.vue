<template>
  <div class="wrapper">
    <i :class="'icon ' + icon"></i>
    <div class="weather-city">
      <span class="weather">{{ weather | capitalize }}</span>
      <span class="city">{{ city | capitalize }}</span>
    </div>
    <p class="temperature">{{ temperature | formatTemperature }}</p>
    <div class="location-picker">
      <img src="../assets/location.svg" alt="Location icon">
      <span>Change Location</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class CurrentWeatherCard extends Vue {
  @Prop() private weather!: string;
  @Prop() private city!: string;
  @Prop() private temperature!: number;
  @Prop() private icon!: string;
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 3.5em;
  left: 6em;
  
  & .icon {
    font-size: 5.1em;
    transform: translate(-0.24em, -0.15em);
    //color: #ffffff;
  }

  & .weather-city {
    display: flex;
    flex-direction: column;

    & .weather {
      font-size: 2.4em;
      font-weight: 500;
    }

    & .city {
      font-size: 1.4em;
      font-weight: 400;

      transform: translateY(-0.1em);
    }
  }

  & .temperature {
    font-size: 5.5em;
    font-weight: 800;

    margin: 0.1em 0;
  }

  & .location-picker {
    display: flex;
    align-items: center;

    cursor: pointer;

    margin: 0;

    & img {
      height: 1.3em;
    }

    & span {
      font-size: 0.9em;
      font-weight: 700;

      transform: translateX(0.2em)
    }
  }
}
</style>
