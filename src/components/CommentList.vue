<template>
  <div class="comment-list-wrapper">
    <div class="comment-item" v-for="(comment, index) in comments" v-bind:key="index">
      <div class="comment-content">
        <div class="comment-avatar">
          <b-avatar class="user-pic" :src="comment.userIcon" size="2.5rem" />
        </div>
        <div class="content-container">
          <div class="user-info">{{ comment.userNickname }}</div>
          <div class="comment-text">
            <span>{{ comment.commentText }}</span>
            <div class="bottom-container">
              <span class="comment-time">{{ comment.commentGroup }}</span>
              <span class="reply-btn">reply</span>
            </div>
          </div>
        </div>
        <div class="like-container">
          <LikeButton :targetType="'comment'" :targetId="comment.commentId" :styleType="2" />
        </div>
      </div>
      <div class="more-contents">
        <div class="more-btn" v-if="isHidedReply" @click="toggleReply">
          <span class="more-text">View more replies ({{ comment.childrenCount }})</span>
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
import * as commentApi from '@/api/comment';

import LikeButton from '@/components/common/LikeButton.vue';
import ChildCommentList from '@/components/ChildCommentList.vue';

export default {
  data() {
    return {
      comments: [],
      isHidedReply: true,
    };
  },
  props: {
    postId: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.getComments();
  },
  methods: {
    async getComments() {
      const response = await commentApi.getParentComments(this.postId);
      this.comments = response.data.parentList;
    },
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
  padding-top: 16px;

  /* min-height: 100%;
  max-height: 100%;
  overflow: scroll;
  font-family: Helvetica, Arial, sans-serif; */
}

.comment-item {
  margin-bottom: 16px;
  width: 100%;

  /* min-height: 100px;
  max-height: 120px; */
}

.comment-content {
  padding: 0;
  margin-bottom: 16px;
  position: relative;
  display: flex;
}

.comment-avatar {
  display: block;
  cursor: pointer;
}
.user-pic {
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  margin-right: 12px;
  padding: 0;
  position: relative;
  overflow: hidden;
  text-align: center;
  line-height: 32px;
}

.content-container {
  display: block;

  /* width: 80%; */
}

.user-info {
  display: block;
  font-size: 1.125rem;
  line-height: 25px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: #212529;
}

.comment-text {
  font-size: 1rem;
  line-height: 22px;
  color: #212529;
  padding-top: 4px;
  padding-right: 40px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  word-break: break-word;
  white-space: pre-line;
}
.bottom-container {
  display: flex;
  font-family: Helvetica, Arial, sans-serif;
  /* margin-top: 6px; */
}
/* .bottom-container span {
  font-size: 0.875rem;
  line-height: 20px;
  color: #212529;
  opacity: 0.5;
} */
.comment-time {
  display: block;
  font-size: 0.875rem;
  line-height: 20px;
  color: #212529 0.5;
}
.reply-btn {
  margin: 6px 0 0 24px;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 20px;
  color: #212529 0.5;
  cursor: pointer;

  /* margin-left: 16px; */
}

.like-container {
  position: absolute;
  top: 24px;
  right: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20px;

  /* width: 10%; */
}
/* .like-container i {
  font-size: 1.25rem;
} */
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
