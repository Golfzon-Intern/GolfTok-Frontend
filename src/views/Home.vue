<template>
  <div id="home-view">
    <div class="header-container">
      <AppHeader @openModal="toggleModal"></AppHeader>
    </div>
    <div class="body-container">
      <div class="side-bar-container">
        <div class="scroll-container">
          <SideBar :isActive="this.navIndex" @openModal="toggleModal"></SideBar>
        </div>
      </div>
      <div class="trending-container">
        <PostList :postType="0" @openPage="openDetailPage" @openLoginModal="toggleModal" :key="this.$store.state.auth.userInfo"></PostList>
      </div>
    </div>
    <LoginModal v-if="isModalVisible" @close="isModalVisible = false" :isVisible="isModalVisible" @closeModal="toggleModal"> </LoginModal>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import SideBar from '@/components/SideBar.vue';
import PostList from '@/components/PostList.vue';
import LoginModal from '@/components/common/LoginModal.vue';

export default {
  data() {
    return {
      navIndex: 0,
      isModalVisible: false,
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
      this.isModalVisible = state;
    },
  },
  components: {
    AppHeader,
    SideBar,
    PostList,
    LoginModal,
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

.header-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 60px;
  background: var(--background-color);
  border-bottom: 1px solid #ced4da;
  box-sizing: border-box;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
}

.body-container {
  width: 100%;
  max-width: 1100px;
  padding-top: 60px;
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
}

.side-bar-container {
  position: relative;
  flex: 0 0 356px;
}
.side-bar-container .scroll-container {
  position: fixed;
  top: 60px;
  bottom: 0;
  width: 340px;
  padding: 0 8px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  perspective: 1px;
  perspective-origin: right top;
  z-index: 11;
}
.side-bar-container .scroll-container::-webkit-scrollbar {
  display: none;
}

.trending-container {
  width: 80%;
  padding: 24px 0;
  margin-right: 24px;
}

@media screen and (max-width: 1000px) {
  .side-bar-container {
    flex: 0 0 86px;
  }
  .side-bar-container .scroll-container {
    width: 70px;
    border-right: 1px solid #ced4da;
  }
}
</style>
