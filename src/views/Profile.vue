<template>
  <div id="profile-view" :style="styleObj">
    <div class="header-container">
      <AppHeader @openModal="toggleModal"></AppHeader>
    </div>
    <div class="body-container">
      <div class="side-bar-container">
        <div class="scroll-container">
          <SideBar @openModal="toggleModal"></SideBar>
        </div>
      </div>
      <div class="contents-container">
        <header class="contents-header">
          <div class="contents-user-info">
            <div class="user-info-img">
              <b-avatar
                class="user-pic"
                :src="userInfo.userIcon"
                size="7.5rem"
              />
            </div>
            <div class="user-info-text">
              <h2 class="user-title">{{ userInfo.userName }}</h2>
              <h3 class="user-sub-title">{{ userInfo.userNickname }}</h3>
              <div class="user-follow-container" v-if="!isMine">
                <FollowButton
                  :targetId="Number(this.$route.params.userId)"
                  v-if="$store.state.auth.userInfo"
                />
              </div>
            </div>
          </div>
          <div class="contents-golf-info">
            <span class="golf-grade"
              >등급 - <b>{{ userInfo.userGrade }}</b></span
            >
            <span class="golf-handicap"
              >핸디캡 - <b>{{ userInfo.handicap }}</b></span
            >
            <span class="golf-rolmodel"
              ><b>{{ userInfo.roleModel }}</b
              >처럼 되려고 노력 중</span
            >
          </div>
          <div class="contents-count-info">
            <div class="count-wrapper">
              <strong title="Following">{{ userInfo.followingCount }}</strong>
              <span>Following</span>
            </div>
            <div class="count-wrapper">
              <strong title="Followers">{{ userInfo.followerCount }}</strong>
              <span>Followers</span>
            </div>
          </div>
          <h2 class="content-bio-info">{{ userInfo.introductionMessage }}</h2>
        </header>
        <main class="contents-main">
          <PostList
            @openPage="openDetailPage"
            @openLoginModal="toggleModal"
            :key="userId"
          />
        </main>
      </div>
    </div>
    <LoginModal
      v-if="isVisibleModal"
      @close="isVisibleModal = false"
      :isVisible="isVisibleModal"
      @closeModal="toggleModal"
    >
    </LoginModal>
  </div>
</template>

<script>
import * as profileApi from "@/api/profile";

import AppHeader from "@/components/AppHeader.vue";
import SideBar from "@/components/SideBar.vue";
import LoginModal from "@/components/common/LoginModal.vue";
import FollowButton from "@/components/common/FollowButton.vue";
import PostList from "@/components/ProfilePostList.vue";

export default {
  data() {
    return {
      userId: Number(this.$route.params.userId),
      userInfo: {},
      posts: [],
      styleObj: {},
      isVisibleModal: false,
    };
  },
  computed: {
    isMine() {
      if (this.$store.state.auth.userInfo !== null) {
        if (this.userId === this.$store.state.auth.userInfo.userId) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  watch: {
    "$route.params.userId": {
      handler: function(value) {
        this.userId = value;
        this.getUserInfo();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    /* 프로필 사용자 정보 받아오는 함수 */
    async getUserInfo() {
      const response = await profileApi.getProfileInfo(
        this.isMine,
        this.userId
      );
      this.userInfo = response.data.user;
    },
    /* 게시물 상세보기 페이지 여는 함수 */
    openDetailPage(postId) {
      this.$router.push({
        name: "PostDetail",
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
          position: "fixed",
          overflow: "hidden",
        };
      } else {
        this.styleObj = {};
      }
    },
  },
  components: {
    AppHeader,
    SideBar,
    LoginModal,
    FollowButton,
    PostList,
  },
};
</script>

<style>
#profile-view {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.contents-container {
  width: 80%;
  padding: 24px 0;
  margin-right: 24px;
}

.contents-header {
  margin-bottom: 20px;
  width: 594px;
  box-sizing: border-box;
  padding-right: 52px;
  flex: 0 0 auto;
  position: relative;
}

.contents-user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user-info-text {
  margin-left: 20px;
  flex: 1 1 0%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-info-text h2 {
  font-weight: 700;
  font-size: 2rem;
  padding-bottom: 4px;
}
.user-info-text h3 {
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.4;
  text-overflow: ellipsis;
  height: 25px;
  overflow: hidden;
  white-space: nowrap;
}

.contents-golf-info {
  margin-top: 12px;
  /* background-color: red; */
}
.contents-golf-info span {
  padding: 0 8px;
  margin-right: 8px;
  text-align: center;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.8;
  color: var(--text-sub-color);
  border-radius: 5px;
  background-color: var(--accent-sub-color);
}

.contents-count-info {
  display: flex;
  align-items: center;
  margin-top: 22px;
  color: rgba(18, 18, 18, 0.75);
}

.count-wrapper {
  margin-right: 20px;
  display: flex;
  align-items: baseline;
  direction: ltr;
}
.count-wrapper strong {
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.4;
}
.count-wrapper span {
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4;
  margin-left: 6px;
}

.content-bio-info {
  margin-top: 10px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4;
  color: rgb(18, 18, 18);
  white-space: pre-line;
}

.contents-main {
  width: 80%;
  padding: 24px 0;
  margin-right: 24px;
}
</style>
