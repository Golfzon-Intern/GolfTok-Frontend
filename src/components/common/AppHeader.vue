<template>
  <div class="header-content-wrapper">
    <div class="header-logo">
      <a href="/">
        <img src="https://firebasestorage.googleapis.com/v0/b/golftok-3275c.appspot.com/o/assets%2Flogo-1.png?alt=media&token=c34366aa-9387-4d86-b9bc-9d2a992c7549" alt="logo" />
      </a>
    </div>
    <div class="search-container">
      <form action="" class="search-input">
        <input type="search" v-model="searchText" @keyup.enter="submitSearchText" />
        <span class="split"></span>
        <button type="submit" @click="submitSearchText">
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
    <div class="header-menu">
      <div class="menu-wrapper" v-if="this.$store.state.auth.userInfo">
        <button class="upload-btn" @click="clickUploadBtn">
          <i class="fas fa-cloud-upload-alt"></i>
        </button>
        <button class="user-btn">
          <i class="far fa-user-circle"></i>
        </button>
      </div>
      <div class="login-container" v-else>
        <LoginButton :styleType="0" @clickButton="openLoginModal" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginButton from '@/components/common/LoginButton.vue';

export default {
  data: function() {
    return {
      searchText: '',
    };
  },
  methods: {
    openLoginModal() {
      this.$emit('openModal', true);
      console.log('hi');
    },
    clickUploadBtn() {
      this.$router.push({
        name: 'Upload',
      });
    },
    submitSearchText() {
      event.preventDefault();
      if (this.searchText.length) {
        this.$router.push({
          name: 'SearchResult',
          params: { keyword: this.searchText },
        });
      }
    },
  },
  components: {
    // LoginModal,
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
  font-family: Helvetica, Arial, sans-serif;
  /* width: 100%;
  height: 80px;
  padding: 8px; */
  /* background: #f8f9fa; */
}

.header-logo {
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

.search-container {
  position: relative;
  display: block;
}
.search-input {
  display: flex;
  align-items: center;
  margin-top: 0;
  padding: 12px 16px;
  border-radius: 5rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  background: #f1f3f5;
}
.search-input input {
  font-weight: 400;
  font-size: 1rem;
  line-height: 22px;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  width: 292px;
  caret-color: #fe2c55;
  box-sizing: border-box;
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

.header-menu {
  display: flex;
  align-items: center;
}
.header-menu .upload-btn,
.header-menu .user-btn {
  position: relative;
  width: 42px;
  height: 42px;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
}
.header-menu .user-btn {
  margin-left: 24px;
}
.upload-btn:hover,
.user-btn:hover {
  color: #fa5252;
}

.login-container button {
  margin-left: 16px;
}
</style>
