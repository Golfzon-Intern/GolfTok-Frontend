<template>
  <div class="side-bar-wrapper">
    <div class="side-scroll-wrapper">
      <div class="upper-contents">
        <div class="nav-wrapper">
          <div
            class="nav-item"
            :class="{ navActive: isActive === 0 }"
            @click="handleNavigation(0)"
          >
            <i class="fas fa-home"></i>
            <h2 class="nav-name">For You</h2>
          </div>
          <div
            class="nav-item"
            :class="{ navActive: isActive === 1 }"
            @click="handleNavigation(1)"
          >
            <i class="fas fa-user-friends"></i>
            <h2 class="nav-name">Following</h2>
          </div>
        </div>
        <div v-if="!this.$store.state.auth.userInfo" class="login-wrapper">
          <span
            >Log in to follow creators, like videos, and view comments.</span
          >
          <LoginButton :styleType="1" />
        </div>
        <div class="user-list">
          <div class="user-list-header">
            <span>Suggested accounts</span>
          </div>
          <a
            :href="`/profile/${user.userId}`"
            class="user-item"
            v-for="(user, index) in recommendations"
            :key="index"
          >
            <span class="user-item-inner">
              <div class="user-avatar">
                <b-avatar class="user-pic" :src="user.userIcon" size="2rem" />
              </div>
              <div class="user-infos">
                <h4 class="user-title">{{ user.userName }}</h4>
                <p class="user-desc">{{ user.userNickname }}</p>
              </div>
              <div class="user-grade">
                <span>{{ user.userGrade }}</span>
              </div>
            </span>
          </a>
          <div class="see-all">
            <p>See all</p>
          </div>
        </div>
        <div v-if="this.$store.state.auth.userInfo" class="user-list">
          <div class="user-list-header">
            <span>Following accounts</span>
          </div>
          <a
            :href="`/profile/${user.userId}`"
            class="user-item"
            v-for="(user, index) in followings"
            :key="index"
          >
            <span class="user-item-inner">
              <div class="user-avatar">
                <b-avatar class="user-pic" :src="user.userIcon" size="2rem" />
              </div>
              <div class="user-infos">
                <h4 class="user-title">{{ user.userName }}</h4>
                <p class="user-desc">{{ user.userNickname }}</p>
              </div>
              <div class="user-grade">
                <span>{{ user.userGrade }}</span>
              </div>
            </span>
          </a>
          <div class="see-all">
            <p>See all</p>
          </div>
        </div>
      </div>
      <div class="bottom-wrapper">
        <span class="copyright">&copy; 2021 GolfTok</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as friendApi from "@/api/friend";
import EventBus from "@/lib/eventBus";

import LoginButton from "@/components/common/LoginButton.vue";

export default {
  data() {
    return {
      recommendations: [],
      followings: [],
      isHover: false,
    };
  },
  props: {
    isActive: {
      type: Number,
      default: null,
    },
  },
  created() {
    this.getRecommended();
    this.getFollowing();

    EventBus.$on("login-success", () => {
      this.getRecommended();
      this.getFollowing();
      console.log("login success sidebar");
    });
  },
  methods: {
    /* 내비게이션 핸들러 함수 */
    handleNavigation(state) {
      if (state) {
        if (this.$store.state.auth.userInfo) {
          this.$router
            .push({
              name: "Following",
            })
            .catch((error) => {
              this.$router.go(this.$router.currentRoute);
              throw error;
            });
        } else {
          this.openLoginModal();
        }
      } else {
        this.$router
          .push({
            name: "Home",
          })
          .catch((error) => {
            this.$router.go(this.$router.currentRoute);
            throw error;
          });
      }
    },
    /* 로그인 모달 여는 함수 */
    openLoginModal() {
      this.$emit("openModal", true);
    },
    /* 추천 계정 정보 받아오는 함수 */
    async getRecommended() {
      try {
        const response = await friendApi.getRecFriendShort();
        this.recommendations = response.data.recommendList;
      } catch (error) {
        console.log(error);
      }
    },
    /* 팔로잉 계정 정보 받아오는 함수 */
    async getFollowing() {
      try {
        const response = await friendApi.getFowFriendShort();
        this.followings = response.data.followingList;
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    LoginButton,
  },
};
</script>

<style>
.side-bar-wrapper {
  height: 100%;
  width: 340px;
  box-sizing: border-box;
  padding-top: 20px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}

.side-scroll-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
  padding-top: 20px;
}

.nav-wrapper {
  padding: 0;
  margin-bottom: 8px;
}

.nav-item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  color: #212529;
}
.nav-item:hover {
  /* color: #fa5252; */
  background-color: #f8f9fa;
}
.navActive {
  color: #fa5252;
}
.nav-item i {
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
  overflow: hidden;
}
.nav-item h2 {
  font-weight: 700;
  margin-left: 8px;
  font-size: 1.125rem;
  line-height: 1.7;
}

.login-wrapper {
  position: relative;
  padding: 20px 8px 24px 8px;
  margin: 0;
}
.login-wrapper span {
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.3;
  color: var(--text-sub-color);
  opacity: 0.5;
}
.login-wrapper button {
  margin-top: 20px;
  margin-left: 0;
}

.user-list {
  padding: 0 0 16px;
  width: 100%;
  position: relative;
  box-sizing: border-box;
}

.user-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.user-list-header span {
  font-weight: 600;
  padding: 16px 8px 8px 8px;
  margin-bottom: 0;
  font-size: 0.875rem;
  line-height: 1.4;
  text-align: left;
  color: var(--text-sub-color);
}

.user-list .user-item {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
.user-item-inner {
  height: 48px;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  cursor: pointer;
}
.user-item-inner:hover {
  background-color: #f8f9fa;
}
.user-item-inner .user-avatar {
  width: 32px;
  height: 32px;
}
.user-item-inner .user-infos {
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 48px;
  padding-left: 0;
}
.user-item-inner .user-infos h4 {
  font-weight: 700;
  color: var(--text-main-color);
  display: flex;
  align-items: center;
  height: 22px;
  margin-top: 6px;
  margin-bottom: 0;
  margin-right: 4px;
  font-size: 1rem;
  line-height: 1.4;
  max-width: 260px;
}
.user-item-inner .user-infos p {
  font-weight: 400;
  color: var(--text-sub-color);
  display: flex;
  align-items: center;
  height: 15px;
  margin-right: 4px;
  font-size: 0.75rem;
  line-height: 1.25;
  max-width: 260px;
}

.user-grade {
  position: relative;
  bottom: 8px;
  min-width: 30px;
  height: 20px;
  padding: 0 8px;
  margin-left: 8px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: var(--supplement-color);
}
.user-grade span {
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--text-sub-color);
  text-align: center;
  margin: 0;
}

.see-all {
  height: 20px;
  margin-top: 8px;
  margin-bottom: 0;
  padding-left: 8px;
  padding-right: 8px;
  text-decoration: none;
  cursor: pointer;
}
.see-all p {
  color: var(--accent-main-color);
}

.bottom-wrapper {
  position: relative;
  padding: 16px 8px 24px 8px;
  width: auto;
  box-sizing: border-box;
}
.bottom-wrapper span {
  color: var(--text-sub-color);
  opacity: 0.5;
  margin-bottom: 12px;
  margin-right: 6px;
  margin-top: 5px;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 0.85;
}

.upper-contents .login-wrapper::before,
.user-list::before,
.bottom-wrapper::before {
  content: "";
  position: absolute;
  height: 1px;
  left: 8px;
  right: 8px;
  background: #ced4da;
  transform: scaleY(0.5);
  top: 0;
}

@media screen and (max-width: 1000px) {
  .side-scroll-wrapper {
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .nav-item,
  .user-item-inner {
    width: 50px;
  }

  .nav-item h2 {
    display: none;
  }

  .login-wrapper {
    display: none;
  }

  .user-list-header {
    display: none;
  }

  .user-item-inner .user-infos {
    display: none;
  }

  .user-grade {
    display: none;
  }

  .see-all {
    display: none;
  }

  .bottom-wrapper span {
    width: 36px;
    margin-left: 2px;
    display: block;
    font-size: 0.5rem;
  }
}
</style>
