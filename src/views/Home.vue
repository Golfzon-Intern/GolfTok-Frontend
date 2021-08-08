<template>
  <div id="home-view" :style="styleObj">
    <div class="home-header-wrap">
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

.home-header-wrap {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
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
