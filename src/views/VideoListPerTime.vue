<template>
  <div id="videolistpertime">
    <div>
      <input type="number" v-model="startTimeId">
      <input type="number" v-model="endTimeId">
      <button @click="getVideoList">가져오기</button>
    </div>
    <div v-if="render">
      <div v-for="i in range(startTimeId, endTimeId, 1)" v-bind:key="i">
        <h1>timeId: {{i}} - {{new Date(captureTime[i])}}</h1>
        <div style="display: flex; flex-wrap:wrap;">
          <div v-for="vi in video[i]" v-bind:key="`${vi.videoId}_${i}`"
            @click="$router.push(`/viewlikehate2/${vi.videoId}`)"
            style="cursor:pointer; width: 250px;"
          >
            {{vi.videoId}} / {{vi.category}}
          </div>
        </div>
        <br>
        <div>{{statistic[i]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const url = `http://${process.env.VUE_APP_API_URL}:3000`;

export default {
  name: 'videolistpertime',
  components: {
    // LineChart,
  },
  data() {
    return {
      render: false,
      startTimeId: 1,
      endTimeId: 10,
      captureTime: {},
      video: {},
      statistic: {},
    };
  },
  async mounted() {
    const response = await axios.get(`${url}/captureTime`);
    response.data.forEach((element) => {
      this.captureTime[element.id] = element.time;
    });
  },
  methods: {
    async getVideoList() {
      this.render = false;
      this.video = {};
      this.statistic = {};
      const response = await axios.get(`${url}/popular/statistic?startTimeId=${this.startTimeId}&endTimeId=${this.endTimeId}`);
      // eslint-disable-next-line
      for (const element of response.data) {
        this.statistic[element.timeId] = element.statistic;
        // eslint-disable-next-line
        const response2 = await axios.get(`${url}/popular?timeId=${element.timeId}`);
        this.video[element.timeId] = response2.data;
      }
      this.render = true;
    },
    range(start, stop, step) {
      // eslint-disable-next-line
      start = parseInt(start);
      // eslint-disable-next-line
      stop = parseInt(stop);
      return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    },
  },
};
</script>
<style scoped>
#videoListPerTime {
  display: flex;
  flex-direction: column;
}
</style>
