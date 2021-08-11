<template>
  <div id="home-view" :style="styleObj">
    <div class="home-header-container">
      <AppHeader></AppHeader>
    </div>
    <div class="home-contents-wrapper">
      <div class="side-bar-container">
        <SideBar :isActive="this.navIndex"></SideBar>
      </div>
      <div class="trending-container">
        <PostList :postType="0" @openPage="openDetailPage"></PostList>
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
      navIndex: 0,
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
      console.log(this.$route.path);

      if (this.$route.path === '/') {
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
#home-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.home-header-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #ced4da;
  box-sizing: border-box;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
}

.home-contents-wrapper {
  width: 100%;
  max-width: 1100px;
  margin-top: 60px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: space-between;
}

.side-bar-container {
  position: fixed;
  top: 60px;
  bottom: 0;
  width: 25vw;
  padding: 0 8px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  perspective: 1px;
  perspective-origin: right top;
  z-index: 11;
  background: #fff;
}
.side-bar-container::-webkit-scrollbar {
  display: none;
}

.trending-container {
  position: relative;
  left: 26vw;
  width: 50vw;
  padding: 24px 0;
  margin-right: 24px;
  background: #fff;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #e9ecef;
  border-radius: 8px;
}
</style>
