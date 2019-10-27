<template>
  <div id="home">
    <div style="display: flex; flex-direction: column; width: 300px;">
      <button @click="$router.push('/viewlikehate')">조회수, 좋아요, 싫어요</button>
      <button @click="$router.push('/videolistpercategory')">카테고리 별 동영상 목록</button>
      <button @click="$router.push('/videolistpertime')">시간 별 인기 동영상 목록 및 통계</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>
<style scoped>
#chart {
  width: 500px;
}
</style>
