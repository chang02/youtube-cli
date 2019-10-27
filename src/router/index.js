import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ViewLikeHate from '../views/ViewLikeHate.vue';
import VideoListPerCategory from '../views/VideoListPerCategory.vue';
import VideoListPerTime from '../views/VideoListPerTime.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/viewlikehate',
    name: 'viewlikehate',
    component: ViewLikeHate,
  },
  {
    path: '/videolistpercategory',
    name: 'videolistpercategory',
    component: VideoListPerCategory,
  },
  {
    path: '/videolistpertime',
    name: 'videolistpertime',
    component: VideoListPerTime,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
