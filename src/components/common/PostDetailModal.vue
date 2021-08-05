<template>
  <div class="background-container">
    <div class="video-card-container">
      <div class="video-card">
        <video v-bind:src="postInfo.videoRoot"></video>
      </div>
      <button class="close-btn" @click="closeModal">
        <i class="far fa-times-circle"></i>
      </button>
      <button v-if="!isFirst" class="arrow-left-btn" @click="goToPrev">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button v-if="!isLast" class="arrow-right-btn" @click="goToNext">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div class="content-container">
      <div class="user-info-container">
        <div class="user-avatar">
          <!-- <b-avatar class="user-pic" v-bind:src="" size="4rem" /> -->
        </div>
        <div class="user-text-container">
          <h2 class="username">joie.huiju</h2>
          <h2 class="user-nickname">joie kim</h2>
        </div>
        <div class="follow-btn-wrap">
          <button class="follow-btn">follow</button>
        </div>
      </div>
      <div class="video-info-container">
        <h1 class="video-meta-title">{{ postInfo.postContent }}</h1>
        <div class="action-container">
          <div class="action-wrap">
            <!-- <i class="far fa-heart"></i>
            <strong>{{ postInfo.likeCount }}</strong> -->
            <LikeBtn></LikeBtn>
          </div>
          <div class="action-wrap">
            <CommentBtn></CommentBtn>
          </div>
        </div>
      </div>
      <div class="comment-container">
        comment list
      </div>
      <div class="comment-input-container">comment input</div>
    </div>
  </div>
</template>

<script>
import * as postApi from '@/api/post';

import LikeBtn from '@/components/common/LikeBtn.vue';
import CommentBtn from '@/components/common/CommentBtn.vue';

export default {
  data: function() {
    return {
      postInfo: {},
      isFirst: this.$route.params.isFirst,
      isLast: this.$route.params.isLast,
    };
  },
  created() {
    this.getPostInfo();
  },
  methods: {
    async getPostInfo() {
      const response = await postApi.getPostDetail(this.$route.params.postId);
      this.postInfo = response.data.postList[0];
    },
    closeModal() {
      this.$router.push('/');
    },
  },
  components: {
    LikeBtn,
    CommentBtn,
  },
};
</script>

<style scoped>
.background-container {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #212529;
}

.video-card-container {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-card {
  width: 100%;
  height: 40%;
}
.video-card video {
  width: 100%;
  height: 100%;
}
button {
  position: absolute;
}
.close-btn {
  top: 0;
  left: 0;
  margin: 8px 12px;
  border: none;
  background: none;
}
.close-btn i {
  font-size: 2rem;
  color: #dee2e6;
}
.arrow-left-btn {
  top: 50%;
  left: 0;
  margin: 8px 12px;
  border: none;
  background: none;
}
.arrow-left-btn i {
  font-size: 2rem;
  color: #dee2e6;
}
.arrow-right-btn {
  top: 50%;
  right: 40%;
  margin: 8px 12px;
  border: none;
  background: none;
}
.arrow-right-btn i {
  font-size: 2rem;
  color: #dee2e6;
}

.content-container {
  width: 40%;
  padding: 8px 12px;
  background: #f8f9fa;
}
.user-info-container {
  height: 10%;
  display: flex;
}
.user-avatar {
  width: 20%;
}
.user-text-container {
  width: 50%;
}
.user-text-container h1,
h2,
p {
  font-family: Helvetica, Arial, sans-serif;
}
.username {
  font-size: 1.5rem;
  font-weight: 600;
}
.user-nickname {
  font-size: 1.25rem;
  font-weight: 500;
}
.follow-btn-wrap {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.follow-btn-wrap .follow-btn {
  position: inherit;
}

.video-info-container {
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.video-meta-title {
  font-size: 1.75rem;
}
.action-container {
  height: 30%;
  display: flex;
  align-items: center;
}

.comment-container {
  height: 60%;
  background: cornflowerblue;
}
.comment-input-container {
  height: 10%;
  background: chartreuse;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* display: table; */
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  /* display: table-cell; */
  /* vertical-align: middle; */
  display: flex;
}

/* .modal-container {
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
.login-btn {
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

/* .modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */
</style>
