<template>
  <span>
    {{ displayValue }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { easing, TEasing } from "ts-easing";
import { randomize, withNDecimals } from "../helpers/numberHelper";

@Component({})
// Component used to animate values (like temperature, humidity etc)
export default class AnimatedValue extends Vue {
  // default values
  private readonly deltaTime = 50;
  private readonly randomDeltaTime = 5;

  private readonly deltaT = 0.025;
  private readonly randomDeltaT = 0.01;

  private readonly fromT = 0.3;
  private readonly randomFromT = 0;

  private readonly function: TEasing = easing.inOutSine;

  // properties
  @Prop() private value!: any;
  @Prop() private suffix!: string;
  @Prop({ default: 0 }) private decimalCount!: number;

  private displayValue: string = "";

  // called on component creation
  private created() {
    // randomize settings
    const deltaTime: number = randomize(this.deltaTime, this.randomDeltaTime);
    const deltaT: number = randomize(this.deltaT, this.randomDeltaT);
    const fromT: number = randomize(this.fromT, this.randomFromT);

    // if no value provided, just display "Unknown"
    if(this.value == undefined) {
      this.displayValue = "Unknown";
      return;
    }

    let t: number = fromT;

    // interate each <deltaTime> milliseconds
    const intervalId: number = setInterval(() => {
      // get the value at t on the function (t E [0;1])
      const value: number = this.value * this.function(t);
      
      // display the value with the correct decimal count with the suffix
      this.displayValue = `${withNDecimals(value, this.decimalCount)}${this.suffix}`;

      // if we reached the end of the "animation"
      if (t >= 1) {
        // display the real value and stop the interval
        this.displayValue = `${withNDecimals(value, this.decimalCount)}${this.suffix}`;
        clearInterval(intervalId);
      }

      // increase t and force the render
      t += deltaT;
      this.$forceUpdate();
    }, deltaTime);
  }
}
</script>