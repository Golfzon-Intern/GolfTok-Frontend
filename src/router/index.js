import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Upload from '@/views/Upload.vue';
import PostDetail from '@/views/PostDetail.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{ path: ':postId', component: PostDetail, name: 'PostDetail' }],
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload,
    },
  ],
});

export default router;
