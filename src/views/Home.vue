<template>
  <div id="home-view" :style="styleObj">
    <div class="home-header-container">
      <AppHeader></AppHeader>
    </div>
    <div class="home-contents-wrap">
      <div class="side-bar-container">
        <SideBar></SideBar>
      </div>
      <div class="trending-container">
        <PostList></PostList>
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
    };
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출
    $route: 'checkIsOpenedPage',
  },
  methods: {
    checkIsOpenedPage() {
      this.isOpenedPage = !this.isOpenedPage;

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

.home-contents-wrap {
  display: flex;
  width: 100%;
  max-width: 1100px;
  margin-top: 60px;
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
}

.side-bar-container {
  position: fixed;
  top: 60px;
  left: unset;
  bottom: 0;
  width: 25vw;
  padding: 0 8px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  perspective: 1px;
  perspective-origin: right top;
  z-index: 11;

  /* height: 100%; */
  background: #fff;
  /* top: 80px;
  left: 0;
  height: 85vh; */
}
</style>
