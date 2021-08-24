<template>
  <div id="following-feed-view" :style="styleObj">
    <div class="header-container">
      <AppHeader></AppHeader>
    </div>
    <div class="body-container">
      <div class="side-bar-container">
        <div class="scroll-container">
          <SideBar :isActive="this.navIndex" @openModal="toggleModal"></SideBar>
        </div>
      </div>
      <div class="trending-container">
        <PostList :postType="1" @openPage="openDetailPage"></PostList>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import SideBar from '@/components/SideBar.vue';
import PostList from '@/components/PostList.vue';

export default {
  data() {
    return {
      isOpenedPage: false,
      styleObj: {},
      navIndex: 1,
    };
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출
    $route: 'checkIsOpenedPage',
  },
  methods: {
    openDetailPage(postId) {
      this.$router.push({
        name: 'PostDetail',
        params: { postId: postId },
      });
    },
    checkIsOpenedPage() {
      if (this.$route.path === '/following') {
        this.isOpenedPage = false;
      } else {
        this.isOpenedPage = true;
      }

      if (this.isOpenedPage) {
        this.styleObj = {
          position: 'fixed',
          overflow: 'hidden',
        };
      } else {
        this.styleObj = {};
      }
    },
  },
  components: {
    AppHeader,
    SideBar,
    PostList,
  },
};
</script>

<style>
#following-feed-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
