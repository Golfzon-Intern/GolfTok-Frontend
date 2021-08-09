<template>
  <div id="home-view" :style="styleObj">
    <div class="home-header-container">
      <AppHeader></AppHeader>
    </div>
    <div class="home-contents-wrap">
      <div class="side-menu-wrap">
        <SideMenu></SideMenu>
      </div>
      <div class="post-list-wrap">
        <PostList></PostList>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import SideMenu from '@/components/SideMenu.vue';
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
    SideMenu,
    PostList,
  },
};
</script>

<style>
/* #home-view {
  position: fixed;
  overflow: hidden;
} */

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
}

.side-menu-wrap {
  position: sticky;
  top: 80px;
  left: 0;
  height: 85vh;
}
</style>
