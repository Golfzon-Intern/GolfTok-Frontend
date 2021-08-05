import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Upload from '@/views/Upload.vue';
import PostDetailModal from '@/components/common/PostDetailModal.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{ path: ':postId', component: PostDetailModal, name: 'PostDetailModal' }],
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload,
    },
  ],
});

export default router;
