<template>
  <div>
    <div class="side-bar-wrap">
      <div class="upper-contents">
        <div class="nav-wrap">
          <a href="/" class="nav-item">
            <i class="fas fa-home"></i>
            <h2 class="nav-name">For You</h2>
          </a>
          <a href="/" class="nav-item">
            <i class="fas fa-user-friends"></i>
            <h2 class="nav-name">Following</h2>
          </a>
        </div>
        <div v-if="!this.$store.state.auth.userInfo" class="login-wrap">
          <span>Log in to follow creators, like videos, and view comments.</span>
          <button type="button" class="login-btn">Log in</button>
        </div>
        <div class="user-list">
          <div class="user-list-header">
            <span>Suggested accounts</span>
            <a href="#" class="see-all">
              <span>See all</span>
            </a>
          </div>
          <a href="#" class="user-item">
            <span class="user-item-inner">
              <div class="user-avatar">
                <b-avatar
                  class="user-pic"
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
                  size="2rem"
                />
              </div>
              <div class="user-infos">
                <h4 class="user-title">joie_kim</h4>
                <p class="user-desc">김희주 joie</p>
              </div>
            </span>
          </a>
        </div>
        <div v-if="this.$store.state.auth.userInfo" class="user-list">
          <div class="user-list-header">
            <span>Following accounts</span>
            <a href="#" class="see-all">
              <span>See all</span>
            </a>
          </div>
          <a href="#" class="user-item">
            <span class="user-item-inner">
              <div class="user-avatar">
                <b-avatar
                  class="user-pic"
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
                  size="2rem"
                />
              </div>
              <div class="user-infos">
                <h4 class="user-title">joie_kim</h4>
                <p class="user-desc">김희주 joie</p>
              </div>
            </span>
          </a>
        </div>
      </div>
      <div class="bottom-wrap">
        <span class="copyright">&copy; 2021 GolfTok</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.side-bar-wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
}

.nav-wrap {
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
  color: #5d5fef;
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
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 700;
  margin-left: 8px;
  font-size: 1.125rem;
  line-height: 32px;
}

.login-wrap {
  position: relative;
  padding: 20px 8px 24px 8px;
  margin: 0;
}
/* .login-wrap ::before {
  content: '';
  position: absolute;
  height: 1px;
  left: 8px;
  right: 8px;
  background: #ced4da;
  transform: scaleY(0.5);
  top: 0;
} */
.login-wrap span {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 22px;
  color: #868e96;
  /* position: relative;
  padding: 20px 8px 24px 8px;
  margin: 0; */
}
.login-wrap .login-btn {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  margin-left: 0;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
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
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  padding: 16px 8px 8px 8px;
  margin-bottom: 0;
  font-size: 0.875rem;
  line-height: 20px;
  text-align: left;
  color: #495057;
}
.user-list-header .see-all {
  height: 20px;
  margin-top: 8px;
  margin-bottom: 0;
  padding-left: 8px;
  padding-right: 8px;
  text-decoration: none;
  cursor: pointer;
}
.user-list-header .see-all span {
  color: #7950f2;
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
  font-family: Helvetica, Arial, sans-serif;
}
.user-item-inner .user-infos h4 {
  font-weight: 700;
  color: #212529;
  display: flex;
  align-items: center;
  height: 22px;
  margin-top: 6px;
  margin-bottom: 0;
  margin-right: 4px;
  font-size: 1rem;
  line-height: 22px;
  max-width: 260px;
}
.user-item-inner .user-infos p {
  font-weight: 400;
  color: #495057;
  display: flex;
  align-items: center;
  height: 15px;
  margin-right: 4px;
  font-size: 0.75rem;
  line-height: 15px;
  max-width: 260px;
}

.bottom-wrap {
  position: relative;
  padding: 16px 8px 24px 8px;
  width: auto;
  box-sizing: border-box;
}
.bottom-wrap span {
  color: #868e96;
  font-family: Helvetica, Arial, sans-serif;
  margin-bottom: 12px;
  margin-right: 6px;
  margin-top: 5px;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 12px;
}

.upper-contents .login-wrap::before,
.user-list::before,
.bottom-wrap::before {
  content: '';
  position: absolute;
  height: 1px;
  left: 8px;
  right: 8px;
  background: #ced4da;
  transform: scaleY(0.5);
  top: 0;
}
</style>
