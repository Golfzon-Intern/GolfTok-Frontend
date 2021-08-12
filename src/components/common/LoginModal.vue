<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Login
            </slot>
            <i class="fas fa-times close-btn" v-on:click="toggleVisible"></i>
          </div>

          <div class="modal-body">
            <div class="info-input">
              <p>ID</p>
              <input type="text" class="id field" v-model="userId" placeholder="이메일을 입력해주세요" />
            </div>
            <div class="info-input">
              <p>PW</p>
              <input type="password" class="pw field" v-model="userPw" placeholder="비밀번호를 입력해주세요" />
            </div>
          </div>

          <div class="modal-footer">
            <button class="login-btn" v-on:click="login()">Login</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: function() {
    return {
      userId: '',
      userPw: '',
    };
  },
  methods: {
    toggleVisible: function() {
      this.$emit('toggleVisible');
    },
    login() {
      this.$store.dispatch('auth/login', { userId: this.userId, password: this.userPw });
      this.toggleVisible();
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.close-btn {
  cursor: pointer;
}

.modal-body {
  margin: 20px 0;
}
.info-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info-input p {
  margin-bottom: 0;
  padding-left: 0;
  width: 10vw;
  font-size: 0.8rem;
}
.info-input input {
  width: 70vw;
}

.modal-footer {
  padding: 8px 12px;
}
/* .login-btn {
  margin: 0 0 0 8px;
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 2rem;
  background-color: #7950f2;
  color: #f8f9fa;
  cursor: pointer;
} */

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
