<template>
  <div id="videolistpercategory" v-if="render">
    <div class="category-box" v-for="(value, key) in videos" v-bind:key="key">
      <h1>{{key}}({{value.length}})</h1>
      <div>
        <span v-for="videoId in value" v-bind:key="videoId">
          {{videoId}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const url = 'http://106.10.50.201:3000';

export default {
  name: 'videolistpercategory',
  components: {
    // LineChart,
  },
  data() {
    return {
      videos: {},
      render: false,
    };
  },
  async mounted() {
    const categories = ['영화/애니메이션', '인물/블로그', '엔터테인먼트', '뉴스/정치', '스포츠', '음악', '코미디', '과학기술', 'nona ivon', '여행/이벤트', '교육', '동물', '비영리/사회운동', '게임', '노하우/스타일', 'inkinews', '연령 제한 동영상(커뮤니티 가이드 기준)'];
    // eslint-disable-next-line
    for (const category of categories) {
      // eslint-disable-next-line
      const response = await axios.get(`${url}/videos?category='${category}'`);
      this.videos[category] = response.data.map(element => element.videoId);
    }
    this.render = true;
  },
  methods: {
  },
};
</script>
<style scoped>
#videolistpercategory {
  display: flex;
  flex-direction: column;
}
.category-box {
  display: flex;
  flex-direction: column;
}
</style>
