<template>
  <div class="comment-list-wrapper">
    <div class="comment-item">
      <div class="comment-content">
        <div class="comment-avatar">
          <b-avatar
            class="user-pic"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
            size="2.5rem"
          />
        </div>
        <div class="content-container">
          <div class="user-info">Minsu kim</div>
          <div class="comment-text">
            <span>wow~! this video is so nice! very good!</span>
            <div class="bottom-container">
              <span class="comment-time">8/8</span>
              <span class="reply-btn">reply</span>
            </div>
          </div>
        </div>
        <div class="like-container">
          <LikeButton :targetType="'comment'" :targetId="18" :styleType="2" />
        </div>
      </div>
      <div class="more-contents">
        <div class="more-btn" v-if="isHidedReply" @click="toggleReply">
          <span class="more-text">View more replies (30)</span>
          <span class="more-icon">
            <i class="fas fa-chevron-down"></i>
          </span>
        </div>
        <childCommentList v-else @hideReply="toggleReply" />
      </div>
    </div>
  </div>
</template>

<script>
import LikeButton from '@/components/common/LikeButton.vue';
import ChildCommentList from '@/components/ChildCommentList.vue';

export default {
  data() {
    return {
      isHidedReply: true,
    };
  },
  methods: {
    toggleReply() {
      this.isHidedReply = !this.isHidedReply;
    },
  },
  components: {
    LikeButton,
    ChildCommentList,
  },
};
</script>

<style>
.comment-list-wrapper {
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  padding-top: 16px;
  overflow: scroll;
  font-family: Helvetica, Arial, sans-serif;
}

.comment-item {
  width: 100%;
  min-height: 100px;
  max-height: 120px;
  margin-bottom: 16px;
}

.comment-content {
  display: flex;
  margin-bottom: 16px;
}
.comment-avatar {
  width: 10%;
  margin-right: 12px;
  text-align: center;
}
.content-container {
  width: 80%;
}
.user-info {
  font-size: 1.125rem;
  color: #212529;
}
.comment-text {
  font-size: 1rem;
  color: #212529;
}
.bottom-container {
  margin-top: 6px;
}
.bottom-container span {
  font-size: 0.875rem;
  line-height: 20px;
  color: #212529;
  opacity: 0.5;
}
.reply-btn {
  margin-left: 16px;
}
.like-container {
  width: 10%;
}
.like-container i {
  font-size: 1.25rem;
}
.like-container p {
  font-size: 0.75rem;
}

.more-contents {
  padding-left: 12%;
}
.more-btn {
  color: #212529;
  opacity: 0.5;
  cursor: pointer;
}
.more-text:hover {
  text-decoration: underline;
}
.more-icon {
  padding-top: 4px;
  padding-left: 12px;
}
</style>
