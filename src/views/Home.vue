<template>
  <div id="homeView">
    <AppHeader></AppHeader>
    <div class="contents">
      <SideMenu></SideMenu>
      <PostList></PostList>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import SideMenu from '@/components/SideMenu.vue';
import PostList from '@/components/PostList.vue';

export default {
  components: {
    AppHeader: AppHeader,
    SideMenu: SideMenu,
    PostList: PostList,
  },
};
</script>

<style>
.contents {
  display: flex;
  width: 100%;
}
</style>
