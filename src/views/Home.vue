<template>
  <div id="home-view" :style="styleObj">
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
        <PostList :postType="0" @openPage="openDetailPage"></PostList>
      </div>
    </div>
    <LoginModal v-if="isVisibleModal" @close="isVisibleModal = false" :isVisible="isVisibleModal" @closeModal="toggleModal"> </LoginModal>
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import SideBar from '@/components/SideBar.vue';
import PostList from '@/components/PostList.vue';
import LoginModal from '@/components/common/LoginModal.vue';

export default {
  data() {
    return {
      isOpenedPage: false,
      styleObj: {},
      navIndex: 0,
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
      console.log(this.$route.path);

      if (this.$route.path === '/') {
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
  background: #fff;
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
  width: 692px;
  max-width: 692px;
  padding: 24px 0;
  margin-right: 24px;
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
