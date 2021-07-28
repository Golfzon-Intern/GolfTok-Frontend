<template>
  <header class="header-box">
    <div class="header-logo">
      <a href="/">GolfTok</a>
    </div>
    <div class="header-menu">
      <template v-if="this.$store.state.auth.userInfo">
        <router-link to="/upload" class="upload-btn">
          <i class="fas fa-cloud-upload-alt"></i>
        </router-link>
        <button class="user-btn">
          <i class="far fa-user-circle"></i>
        </button>
      </template>
      <template v-else>
        <button class="loginBtn" v-on:click="toggleModal">
          Login
        </button>
      </template>
    </div>
    <login-modal v-if="isVisibleModal" @close="isVisibleModal = false" v-bind:isVisible="isVisibleModal" v-on:toggleVisible="toggleModal"> </login-modal>
  </header>
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
  },
  components: {
    'login-modal': LoginModal,
  },
};
</script>

<style>
.header-box {
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  /* background-color: lightblue; */
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
.loginBtn {
  width: 150px;
  height: 50px;
  border: none;
  border-radius: 2rem;
  background-color: #7950f2;
  color: #f8f9fa;
  cursor: pointer;
}
.upload-btn {
  margin: 0 12px;
  font-size: 2rem;
  color: #495057;
}
.user-btn {
  width: 50px;
  margin: 0 12px;
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  font-size: 2rem;
  color: #495057;
}
.upload-btn:hover,
.user-btn:hover {
  color: #5d5fef;
}
</style>
