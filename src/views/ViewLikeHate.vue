<template>
  <div id="viewlikehate">
    <input type="text" placeholder="videoId" v-model="videoId">
    <div @click="getVideoInfo">불러오기</div>
    <div id="chart"
      :style="`width:${data.labels.length * 15 < 500 ? 500 : data.labels.length * 15}px`"
    >
      <line-chart
        v-if="render"
        :data="data"
        :options="options"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LineChart from '@/components/LineChart';

const url = 'http://106.10.50.201:3000';

export default {
  name: 'viewlikehate',
  components: {
    LineChart,
  },
  data() {
    return {
      videoId: 'w-6d6UGD2Lw',
      captureTime: {},
      videoData: null,
      render: false,
      data: {
        labels: [],
        datasets: [
          {
            label: 'views',
            backgroundColor: 'red',
            fill: false,
            data: [],
          },
          {
            label: 'likes',
            backgroundColor: 'green',
            fill: false,
            data: [],
          },
          {
            label: 'hates',
            backgroundColor: 'blue',
            fill: false,
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    };
  },
  async mounted() {
    const response = await axios.get(`${url}/captureTime`);
    response.data.forEach((element) => {
      this.captureTime[element.id] = element.time;
    });
  },
  methods: {
    async getVideoInfo() {
      this.render = false;
      this.data = {
        labels: [],
        datasets: [
          {
            label: 'views',
            backgroundColor: 'red',
            fill: false,
            data: [],
          },
          {
            label: 'likes',
            backgroundColor: 'green',
            fill: false,
            data: [],
          },
          {
            label: 'hates',
            backgroundColor: 'blue',
            fill: false,
            data: [],
          },
        ],
      };
      const response = await axios.get(`${url}/video/change/${this.videoId}`);
      response.data.forEach((element) => {
        const tempTime = new Date(this.captureTime[element.timeId]);
        if (tempTime.getMinutes() === 0 || tempTime.getMinutes() === 30) {
          this.data.labels.push(tempTime);
          this.data.datasets[0].data.push(element.views);
          this.data.datasets[1].data.push(element.likes);
          this.data.datasets[2].data.push(element.hates);
        }
      });
      this.render = true;
      console.log(this.data);
    },
  },
};
</script>
<style scoped>
</style>
