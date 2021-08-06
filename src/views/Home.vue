<template>
  <div id="home-view">
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
      isOpenedPage: true,
    };
  },
  components: {
    AppHeader,
    SideMenu,
    PostList,
  },
};
</script>

<style>
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
