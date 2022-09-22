<template>
  <DoughnutChart :chartData="testData" :width="200" :height="200" />
</template>

<script>
import { ref, toRef } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  props: {
    labels: {
      type: Array,
      required: true,
      default: () => [],
    },
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    data_background_color: {
      type: Array,
      required: false,
      default: () => ["#2C4A52", "#537072", "#8E9B97"],
    },
  },
  components: { DoughnutChart },
  setup(props) {
    const labels = toRef(props, "labels");
    const data = toRef(props, "data");
    const bgColor = toRef(props, "data_background_color");

    const testData = ref({
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: bgColor,
        },
      ],
    });

    return { testData };
  },
};
</script>
