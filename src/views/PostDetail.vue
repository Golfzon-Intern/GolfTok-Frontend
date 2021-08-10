<template>
  <div class="background-container">
    <div class="video-card-container">
      <div class="video-card">
        <video :src="postInfo.videoRoot" type="video/mp4" autoplay="true" controls="controls"></video>
      </div>
      <button class="close-btn" @click="closePage">
        <i class="fas fa-times"></i>
      </button>
      <button v-if="!isFirst" class="arrow-left-btn">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button v-if="!isLast" class="arrow-right-btn">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div class="content-container">
      <div class="user-info-container">
        <div class="user-avatar">
          <b-avatar
            class="user-pic"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
            size="3rem"
          />
        </div>
        <div class="user-text-container">
          <p class="username">joie.huiju</p>
          <p class="user-nickname">joie kim</p>
        </div>
        <!-- <div class="follow-btn-wrap">
          <button class="follow-btn">follow</button>
        </div> -->
        <FollowButton />
      </div>
      <div class="video-info-container">
        <p class="video-meta-title">{{ postInfo.postContent }}</p>
        <div class="action-container">
          <div class="action-wrap">
            <!-- <i class="far fa-heart"></i>
            <strong>{{ postInfo.likeCount }}</strong> -->
            <LikeButton :targetType="'post'" :targetId="postInfo.postId" :styleType="1" />
          </div>
          <div class="action-wrap">
            <CommentButton :styleType="1" />
          </div>
        </div>
      </div>
      <div class="comment-container">
        <CommentList />
      </div>
      <div class="comment-input-container">
        <CommentInput />
      </div>
    </div>
  </div>
</template>

<script>
import * as postApi from '@/api/post';

import FollowButton from '@/components/common/FollowButton.vue';
import LikeButton from '@/components/common/LikeButton.vue';
import CommentButton from '@/components/common/CommentButton.vue';
import CommentList from '@/components/CommentList.vue';
import CommentInput from '@/components/CommentInput.vue';

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
    closePage() {
      this.$router.push({
        name: 'Home',
      });
    },
  },
  components: {
    LikeButton,
    CommentButton,
    CommentList,
    CommentInput,
    FollowButton,
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
.video-card-container button {
  position: absolute;
  width: 45px;
  height: 45px;
  margin: 8px 12px;
  border: none;
  background: #343a40;
  border-radius: 40px;
}
.video-card-container i {
  font-size: 1.5rem;
  color: #f8f9fa;
}
.close-btn {
  top: 0;
  left: 0;
}
.arrow-left-btn {
  top: 50%;
  left: 0;
}
.arrow-right-btn {
  top: 50%;
  right: 40%;
}

.content-container {
  width: 40%;
  /* padding: 8px 12px; */
  background: #f8f9fa;
}
.content-container p {
  font-family: Helvetica, Arial, sans-serif;
  margin-bottom: 0;
}
.user-info-container {
  height: 10%;
  padding: 4% 4% 4% 0;
  display: flex;
}
.user-avatar {
  width: 20%;
  text-align: center;
}
.user-text-container {
  width: 50%;
}
.username {
  font-size: 1.25rem;
  font-weight: 600;
}
.user-nickname {
  font-size: 1rem;
  font-weight: 500;
}
/* .follow-btn-wrap {
  width: 30%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.follow-btn-wrap .follow-btn {
  position: inherit;
  width: 150px;
  height: 100%;
  border-radius: 50px;
  border: none;
  background-color: #5d5fef;
  color: #f8f9fa;
} */

.video-info-container {
  height: 20%;
  padding: 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.video-meta-title {
  font-size: 1.25rem;
}
.action-container {
  height: 30%;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}
.action-wrap {
  margin-right: 16px;
}

.comment-container {
  height: 60%;
  background: #f1f3f5;
  border-top: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
}
.comment-input-container {
  height: 10%;
  margin: 0 32px;
  padding: 21px 0;
}
</style>
