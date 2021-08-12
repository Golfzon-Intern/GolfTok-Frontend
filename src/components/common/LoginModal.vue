<template>
  <div id="login-modal-container">
    <div class="login-modal-wrapper">
      <div class="login-modal-container">
        <div class="login-modal-header">
          <h3 class="login-modal-title">Login</h3>
          <button class="login-modal-close-btn" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="login-modal-body">
          <form>
            <h4 class="login-form-title">Username</h4>
            <div class="login-form-container">
              <input placeholder="Username" type="text" name=" id" v-model="userId" />
            </div>
            <h4 class="login-form-title">Password</h4>
            <div class="login-form-container">
              <input placeholder="Password" type="password" autocomplete=" password" name="password" v-model="userPw" />
            </div>
            <a href="#" class="login-forgot-password">Forgot Password?</a>
            <LoginButton :styleType="2" />
          </form>
        </div>

        <div class="login-modal-footer">
          <div class="signup-btn-wrapper">
            <span>Don’t have an account? </span>
            <a class="signup-btn-link" href="#">Sign up</a>
          </div>
        </div>
      </div>
    </div>
    <div class="login-modal-mask"></div>
  </div>
</template>

<script>
import LoginButton from '@/components/common/LoginButton.vue';

export default {
  data() {
    return {
      userId: '',
      userPw: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false);
    },
    login() {
      this.$store.dispatch('auth/login', { userId: this.userId, password: this.userPw });
      this.closeModal();
    },
  },
  components: {
    LoginButton,
  },
};
</script>

<style>
#login-modal-container {
  position: fixed;
  inset: 0px;
  z-index: 10010;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
}

.login-modal-mask {
  position: absolute;
  z-index: -1;
  inset: 0px;
  background: rgba(0, 0, 0, 0.5);
}

.login-modal-wrapper {
  overflow: hidden;
  display: block;
  position: relative;
  width: 472px;
  min-height: 700px;
  background: rgb(255, 255, 255);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.login-modal-container {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
}

.login-modal-header {
  width: 100%;
  height: 48px;
  font-size: 1.5rem;
  line-height: 32px;
  margin-bottom: 0;
  flex-shrink: 0;
  padding: 0 20px 90px 22px;
  color: #fff;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: relative;
}
.login-modal-header h3 {
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  line-height: 32px;
  flex: 1;
  text-align: center;
  font-weight: bolder;
  color: #000;
}
.login-modal-close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  z-index: 2;
  display: inline-flex;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  background: rgba(22, 24, 35, 0.05);
  padding-top: 6px;
  padding-left: 9px;
}
.login-modal-close-btn i {
  font-size: 1.25rem;
}

.login-modal-body {
  flex: 1;
  width: 472px;
  min-height: auto;
  background-color: #fff;
  margin: 0 auto;
  padding: 0 48px;
  box-sizing: border-box;
  position: relative;
}
.login-modal-body form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  font-size: 0.875rem;
}
.login-form-title {
  font-size: 1rem;
  line-height: 22px;
  color: #161823;
  margin-top: 24px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-form-container {
  position: relative;
  border-radius: 4px;
  background: rgba(22, 24, 35, 0.06);
  border: 1.5px solid rgba(22, 24, 35, 0.06);
  display: flex;
  justify-content: space-between;
  height: 44px;
  line-height: 44px;
  box-sizing: content-box;
}
.login-form-container input {
  padding-left: 12px;
  background: transparent;
  outline: none;
  border-radius: 4px;
  height: 100%;
  width: 100%;
  border: none;
  color: #161823;
  font-size: 1rem;
  caret-color: #fa5252;
  line-height: 100%;
  pointer-events: initial;
}
.login-forgot-password {
  margin-top: 12px;
  margin-bottom: 24px;
  display: inline-block;
  font-size: 0.75rem;
  line-height: 15px;
  color: #161823;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}
.login-forgot-password:hover {
  color: #fa5252;
}
.login-modal-body button {
  align-self: center;
}

.login-modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.signup-btn-wrapper {
  height: 64px;
  background: #fff;
  border-top: 0.5px solid rgba(22, 24, 35, 0.12);
  display: flex;
  font-size: 15px;
  line-height: 18px;
  color: #161823;
  justify-content: flex-start;
  align-items: center;
  padding: 0 24px;
}
.signup-btn-wrapper span {
  font-size: 1rem;
  line-height: 18px;
  color: #161823;
}
.signup-btn-link {
  margin-left: 5px;
  color: #fa5252;
  font-size: 15px;
  line-height: 18px;
  display: inline-block;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}
.signup-btn-link:hover {
  color: #fa5252;
  text-decoration: underline;
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
</style>
