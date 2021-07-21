<template>
  <header class="headerBox">
    <div class="header-logo">
      <a href="#">GolfTok</a>
    </div>
    <div class="header-menu">
      <router-link to="/upload">Upload</router-link>
      <button class="loginBtn" v-on:click="toggleModal">
        Login
      </button>
    </div>
    <login-modal
      v-if="isVisibleModal"
      @close="isVisibleModal = false"
      v-bind:isVisible="isVisibleModal"
      v-on:toggleVisible="toggleModal"
    >
    </login-modal>
  </header>
</template>

<script>
import LoginModal from './common/LoginModal.vue';

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
.headerBox {
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  background-color: lightblue;
}
.header-logo {
  display: flex;
  width: 20vw;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}
.header-logo a {
  color: #7950f2;
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
</style>
