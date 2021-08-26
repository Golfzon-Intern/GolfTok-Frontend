<template>
  <div id="search-result-view" :style="styleObj">
    <div class="header-container">
      <AppHeader @openModal="toggleModal"></AppHeader>
    </div>
    <div class="body-container">
      <div class="side-bar-container">
        <div class="scroll-container">
          <SideBar @openModal="toggleModal"></SideBar>
        </div>
      </div>
      <div class="results-container">
        <SearchResultList :keyword="this.$route.params.keyword" @openLoginModal="toggleModal" @openPage="openDetailPage"></SearchResultList>
      </div>
    </div>
    <LoginModal v-if="isVisibleModal" @close="isVisibleModal = false" :isVisible="isVisibleModal" @closeModal="toggleModal"> </LoginModal>
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import SideBar from '@/components/SideBar.vue';
import SearchResultList from '@/components/SearchResultList.vue';
import LoginModal from '@/components/common/LoginModal.vue';

export default {
  data() {
    return {
      isOpenedPage: false,
      styleObj: {},
      isVisibleModal: false,
    };
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출
    $route: 'checkIsOpenedPage',
    isVisibleModal: 'checkIsOpenedPage',
  },
  methods: {
    openDetailPage(postId) {
      this.$router.push({
        name: 'PostDetail',
        params: { postId: postId },
      });
    },
    checkIsOpenedPage() {
      if (this.$route.path === '/search') {
        this.isOpenedPage = false;
      } else {
        this.isOpenedPage = true;
      }

      if (this.isOpenedPage || this.isVisibleModal) {
        this.styleObj = {
          position: 'fixed',
          overflow: 'hidden',
        };
      } else {
        this.styleObj = {};
      }
    },
    toggleModal(state) {
      this.isVisibleModal = state;
    },
  },
  components: {
    AppHeader,
    SideBar,
    SearchResultList,
    LoginModal,
  },
};
</script>

<style>
#search-result-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.results-container {
  width: 80%;
  padding: 24px 0;
  margin-right: 24px;
}
</style>
