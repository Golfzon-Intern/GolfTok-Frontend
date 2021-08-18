import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Upload from '@/views/Upload.vue';
import PostDetail from '@/views/PostDetail.vue';
import FollowingFeed from '@/views/FollowingFeed.vue';
import SearchResult from '@/views/SearchResult.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload,
    },
    {
      path: '/following',
      name: 'Following',
      component: FollowingFeed,
    },
    {
      path: '/post/:postId',
      name: 'PostDetail',
      component: PostDetail,
    },
    {
      path: '/search/:keyword',
      name: 'SearchResult',
      component: SearchResult,
    },
  ],
});

export default router;
