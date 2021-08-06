<template>
  <div class="header-box">
    <div class="header-logo">
      <a href="/">GolfTok</a>
    </div>
    <div class="header-menu">
      <template v-if="this.$store.state.auth.userInfo">
        <button class="upload-btn" @click="clickUploadBtn">
          <i class="fas fa-cloud-upload-alt"></i>
        </button>
        <button class="user-btn">
          <i class="far fa-user-circle"></i>
        </button>
      </template>
      <template v-else>
        <button class="login-btn" v-on:click="toggleModal">
          Login
        </button>
      </template>
    </div>
    <LoginModal v-if="isVisibleModal" @close="isVisibleModal = false" v-bind:isVisible="isVisibleModal" v-on:toggleVisible="toggleModal"> </LoginModal>
  </div>
</template>

<script>
import LoginModal from '@/components/common/LoginModal.vue';

export default {
  data: function() {
    return {
      isVisibleModal: false,
    };
  },
  methods: {
    toggleModal: function() {
      this.isVisibleModal = !this.isVisibleModal;
    },
    clickUploadBtn() {
      this.$router.push({
        name: 'Upload',
      });
    },
  },
  components: {
    LoginModal,
  },
};
</script>

<style>
.header-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 8px;
  background: #f8f9fa;
}
.header-logo {
  display: flex;
  width: 20vw;
  align-items: center;
  justify-content: center;
}
.header-logo a {
  text-decoration-line: none;
  font-size: 2.5rem;
  font-weight: 800;
  font-family: 'Nunito', sans-serif;
  color: black;
  -webkit-text-stroke: 1px #5d5fef;
}
.header-logo a:hover {
  color: black;
}
.header-menu {
  display: flex;
  width: 20vw;
  align-items: center;
  justify-content: center;
}
.header-menu button {
  border: none;
}
.login-btn {
  width: 150px;
  height: 50px;
  border-radius: 2rem;
  background-color: #7950f2;
  color: #f8f9fa;
  cursor: pointer;
}
.upload-btn {
  margin: 0 12px;
  font-size: 2rem;
  color: #495057;
  background: none;
}
.user-btn {
  width: 50px;
  margin: 0 12px;
  background: none;
  font-size: 2rem;
  color: #495057;
}
.upload-btn:hover,
.user-btn:hover {
  color: #5d5fef;
}
</style>
