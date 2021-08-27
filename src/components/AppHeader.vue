<template>
  <div class="header-content-wrapper">
    <div class="header-logo">
      <a href="/">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/golftok-3275c.appspot.com/o/assets%2Flogo-1.png?alt=media&token=c34366aa-9387-4d86-b9bc-9d2a992c7549"
          alt="logo"
        />
      </a>
    </div>
    <div class="search-input-container">
      <form class="search-input">
        <input
          type="search"
          v-model="searchText"
          @keyup.enter="submitSearchText"
          placeholder="Search #golf ..."
        />
        <span class="split"></span>
        <button type="submit" @click="submitSearchText">
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
    <div class="header-menu">
      <button class="search-modal-btn" @click="toggleSearchModal">
        <i class="fas fa-search"></i>
      </button>
      <div class="menu-wrapper" v-if="this.$store.state.auth.userInfo">
        <button class="upload-cloud-btn" @click="openUploadPage">
          <i class="fas fa-cloud-upload-alt"></i>
        </button>
        <button class="user-pic-btn" @click="openProfilePage">
          <b-avatar :src="userImg" size="2rem" />
        </button>
      </div>
      <div class="login-container" v-else>
        <LoginButton :styleType="0" @clickButton="openLoginModal" />
      </div>
    </div>
    <div v-if="isModalVisible" class="search-modal-container">
      <form class="search-modal-input" @submit="submitSearchText">
        <input
          type="search"
          v-model="searchText"
          @keyup.enter="submitSearchText"
          placeholder="Search #golf ..."
        />
      </form>
      <button class="search-modal-submit" @click="submitSearchText">
        Search
      </button>
    </div>
  </div>
</template>

<script>
import * as profileApi from "@/api/profile";
import EventBus from "@/lib/eventBus";

import LoginButton from "@/components/common/LoginButton.vue";

const USER_DEFAULT_IMG =
  "https://firebasestorage.googleapis.com/v0/b/golftok-3275c.appspot.com/o/user_photo%2Fuser_photo_default.jpeg?alt=media&token=087db47b-26ea-4317-9bde-f6c7ac53c76d";

export default {
  data: function() {
    return {
      userImg: USER_DEFAULT_IMG,
      searchText: "",
      isModalVisible: false,
    };
  },
  created() {
    this.getUserInfo();

    EventBus.$on("login-success", () => {
      this.getUserInfo();
      console.log("login success header");
    });
  },
  methods: {
    /* 프로필 사용자 정보 받아오는 함수 */
    async getUserInfo() {
      const response = await profileApi.getProfileInfo(true);
      this.userImg = response.data.user.userIcon
        ? response.data.user.userIcon
        : USER_DEFAULT_IMG;
    },
    /* 로그인 모달 여는 함수 */
    openLoginModal() {
      this.$emit("openModal", true);
    },
    /* 업로드 페이지 여는 함수 */
    openUploadPage() {
      this.$router
        .push({
          name: "Upload",
        })
        .catch((error) => {
          this.$router.go(this.$router.currentRoute);
          throw error;
        });
    },
    /* 프로필 페이지 여는 함수 */
    openProfilePage(event) {
      event.preventDefault();

      this.$router
        .push({
          name: "Profile",
          params: { userId: this.$store.state.auth.userInfo.userId },
        })
        .catch((error) => {
          this.$router.go(this.$router.currentRoute);
          throw error;
        });
    },
    /* 검색 함수 */
    submitSearchText(event) {
      event.preventDefault();

      if (this.searchText.length) {
        this.$router
          .push({
            name: "SearchResult",
            params: { keyword: this.searchText },
          })
          .catch((error) => {
            this.$router.go(this.$router.currentRoute);
            throw error;
          });
      }
    },
    /* 검색 모달 보이는 여부 설정 함수 */
    toggleSearchModal() {
      this.isModalVisible = !this.isModalVisible;
    },
  },
  components: {
    LoginButton,
  },
};
</script>

<style>
.header-content-wrapper {
  width: 100%;
  height: 100%;
  padding: 0;
  max-width: 1100px;
  padding-left: 20px;
  padding-right: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  width: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.header-logo a {
  position: relative;
  flex: 0 0 auto;
  display: block;
  width: 100%;
  height: 42px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
}
.header-logo img {
  height: 42px;
}

.search-input-container {
  position: relative;
  display: block;
}
.search-input {
  position: relative;
  margin-top: 0;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-radius: 5rem;
  overflow: hidden;
  z-index: 1;
  background: var(--supplement-color);
}
.search-input input {
  width: 292px;
  box-sizing: border-box;
  padding: 0;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4;
  border: none;
  background: transparent;
  outline: none;
  caret-color: var(--accent-main-color);
}
.search-input input::placeholder {
  color: var(--text-sub-color);
  opacity: 0.5;
}
.split {
  width: 1px;
  height: 28px;
  margin: -3px 0;
  background: #495057;
}
.search-input button {
  padding: 11px 16px 11px 12px;
  margin: -12px -16px;
  margin-left: 0;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
}

.search-modal-btn {
  display: none;
  background-color: var(--background-color);
  border: none;
}

.menu-wrapper {
  width: 100px;
  display: flex;
  justify-content: space-around;
  /* background-color: blueviolet; */
}
.menu-wrapper button {
  position: relative;
  top: 0;
  width: 42px;
  height: 42px;
  padding: 0;
  background: var(--background-color);
  border: none;
  cursor: pointer;
}

.upload-cloud-btn {
  top: 4px;
  color: var(--text-sub-color);
}
.upload-cloud-btn i {
  position: relative;
  top: 2px;
  font-size: 1.5rem;
}

.login-container button {
  margin-left: 16px;
}

.search-modal-container {
  display: none;
}

@media screen and (max-width: 768px) {
  .search-input {
    display: none;
  }

  .search-modal-btn {
    position: absolute;
    top: 19px;
    right: 130px;
    display: block;
    z-index: 10;
  }

  .search-modal-container {
    position: absolute;
    left: 0;
    bottom: -121px;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--supplement-color);
    z-index: 10;
  }

  .search-modal-input {
    position: relative;
    margin-top: 0;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    border-radius: 5rem;
    overflow: hidden;
    box-shadow: 4px 5px 5px rgba(24, 24, 24, 0.1);
    z-index: 1;
    background: var(--background-color);
  }
  .search-modal-input input {
    width: 292px;
    box-sizing: border-box;
    padding: 0;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4;
    border: none;
    background: transparent;
    outline: none;
    caret-color: var(--accent-main-color);
  }
  .search-modal-input input::placeholder {
    color: var(--text-sub-color);
    opacity: 0.5;
  }
  .search-modal-submit {
    margin-left: 12px;
    border: none;
    background-color: inherit;
    color: var(--text-sub-color);
    opacity: 0.7;
  }
}
</style>
