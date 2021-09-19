<template>
  <div class="wrapper">
    <div class="icon">
      <i :class="icon" :style="{'font-size':iconSize}"></i>
    </div>
    
    <div class="stat">
      <span class="title">{{ title }}</span>
      <span class="value">
        <animated-value
          :value="value"
          :decimalCount="decimalCount"
          :suffix="suffix"/>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AnimatedValue from "./AnimatedValue.vue";

@Component({
  components: {
    AnimatedValue
  }
})
// Used to display a weather stat (humidy, pressure etc)
export default class WeatherStat extends Vue {
  // properties
  @Prop() private title!: string;
  @Prop() private icon!: string;
  @Prop() private iconSize!: string;

  @Prop() private value!: number;
  @Prop() private suffix!: string;
  @Prop({ default: 0 }) private decimalCount!: number;
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;

  & .icon {
    width: 2em;
    text-align: center;

    transform: translateY(0.1em);
  }

  & .stat {
    display: flex;
    flex-direction: column;

    margin-left: 0.9em;

    & .title {
      font-size: 1.2em;
    }

    & .value {
      font-size: 2.1em;
      font-weight: 600;
    }
  }
}
</style>
