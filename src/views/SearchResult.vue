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
import AppHeader from '@/components/AppHeader.vue';
import SideBar from '@/components/SideBar.vue';
import SearchResultList from '@/components/SearchResultList.vue';
import LoginModal from '@/components/common/LoginModal.vue';

export default {
  data() {
    return {
      styleObj: {},
      isVisibleModal: false,
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
    /* 로그인 모달 보이는 여부 설정하는 함수 */
    toggleModal(state) {
      this.isVisibleModal = state;

      // 만약 로그인 모달이 열렸다면
      // 검색 결과 페이지가 스크롤 되지 않도록 함
      if (this.isVisibleModal) {
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
