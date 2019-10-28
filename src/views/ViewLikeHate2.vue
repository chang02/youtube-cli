<template>
  <div id="viewlikehate">
    <h2>조회수, 좋아요, 싫어요</h2>
    <line-chart
      v-if="render"
      :data="data"
      :options="options"
      :width="data.labels.length * 15 < 500 ? 500 : data.labels.length * 15"
      :height="800"
    />
    <h2>rank</h2>
    <line-chart
      v-if="render"
      :data="data2"
      :options="options2"
      :width="data.labels.length * 15 < 500 ? 500 : data2.labels.length * 15"
      :height="800"
    />
    <h2>인기동영상에 올라와있던 시간</h2>
    <div v-if="render" style="display: flex; flex-wrap: wrap;">
      <div v-for="timeId in popularTime.timeIds" v-bind:key="timeId.timeId" style="width: 400px;">
        {{new Date(captureTime[timeId.timeId])}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LineChart from '@/components/LineChart';

const url = `http://${process.env.VUE_APP_API_URL}:3000`;

export default {
  name: 'viewlikehate',
  components: {
    LineChart,
  },
  props: ['videoId'],
  data() {
    return {
      captureTime: {},
      popularTime: null,
      rank: null,
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
      data2: {
        labels: [],
        datasets: [
          {
            label: 'rank',
            backgroundColor: 'red',
            fill: false,
            data: [],
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
      options2: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              reverse: true,
              min: 1,
              max: 50,
            },
          }],
        },
      },
    };
  },
  async mounted() {
    const response = await axios.get(`${url}/captureTime`);
    response.data.forEach((element) => {
      this.captureTime[element.id] = element.time;
    });
    const response2 = await axios.get(`${url}/video/change/${this.videoId}`);
    response2.data.forEach((element) => {
      const tempTime = new Date(this.captureTime[element.timeId]);
      if (tempTime.getMinutes() === 0 || tempTime.getMinutes() === 30) {
        this.data.labels.push(tempTime);
        this.data.datasets[0].data.push(element.views);
        this.data.datasets[1].data.push(element.likes);
        this.data.datasets[2].data.push(element.hates);
      }
    });
    const response3 = await axios.get(`${url}/video/popularTime/${this.videoId}`);
    this.popularTime = response3.data;
    const response4 = await axios.get(`${url}/rank/${this.videoId}`);
    response4.data.forEach((element) => {
      const tempTime = new Date(this.captureTime[element.timeId]);
      if (tempTime.getMinutes() === 0 || tempTime.getMinutes() === 30) {
        this.data2.labels.push(tempTime);
        this.data2.datasets[0].data.push(element.rank);
      }
    });
    this.render = true;
  },
};
</script>
