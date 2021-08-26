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
import AppHeader from '@/components/AppHeader.vue';
import SideBar from '@/components/SideBar.vue';
import PostList from '@/components/PostList.vue';

export default {
  data() {
    return {
      navIndex: 1,
    };
  },
  methods: {
    /* 게시물 상세보기 페이지 여는 함수 */
    openDetailPage(postId) {
      this.$router.push({
        name: 'PostDetail',
        params: { postId: postId },
      });
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
