<template>
  <div id="child-comments">
    <div class="comment-content" v-for="(comment, index) in childcomments" v-bind:key="index">
      <div class="comment-avatar">
        <b-avatar class="user-pic" :src="comment.userIcon" size="1.5rem" />
      </div>
      <div class="comment-content-container">
        <div class="user-info">{{ comment.userNickname }}</div>
        <div class="comment-text">
          <span>{{ comment.commentText }}</span>
          <div class="bottom-container">
            <span class="comment-time">{{ comment.uploadDate }}</span>
            <span class="reply-btn" @click="clickReply(comment.userName, comment.commentGroup)">reply</span>
          </div>
        </div>
      </div>
      <div class="action-container">
        <div v-if="loginUser === comment.userName" class="delete-btn" @click="clickDel(comment.commentId, index)">
          <i class="fas fa-trash"></i>
          <strong>del</strong>
        </div>
        <LikeButton :targetType="'comment'" :targetId="comment.commentId" :styleType="2" />
      </div>
    </div>

    <div class="hide-btn" @click="clickHide">
      <span class="hide-text">Hide</span>
      <span class="hide-icon">
        <i class="fas fa-chevron-up"></i>
      </span>
    </div>
  </div>
</template>

<script>
import LikeButton from '@/components/common/LikeButton.vue';

export default {
  data() {
    return {
      loginUser: this.$store.state.auth.userInfo.userName,
    };
  },
  props: {
    targetOrder: {
      type: Number,
      default: 0,
    },
    childcomments: [],
  },
  methods: {
    clickReply(userName, group) {
      this.$emit('clickReplyChild', userName, group, this.targetOrder);
    },
    clickDel(commentId, index) {
      this.$emit('clickDelete', commentId, this.targetOrder, index);
    },
    clickHide() {
      this.$emit('clickHideList', this.targetOrder, false);
    },
  },
  components: {
    LikeButton,
  },
};
</script>

<style scoped>
#child-comments .bottom-container {
  display: flex;
  margin-bottom: 0px;
}

#child-comments .hide-btn {
  margin-top: 14px;
  font-size: 0.875rem;
  line-height: 1.4;
  font-weight: 600;
  position: relative;
  color: var(--text-main-color);
  opacity: 0.5;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 9%;
}

#child-comments .hide-text:hover {
  text-decoration: underline;
}
#child-comments .hide-icon {
  position: relative;
  top: 1px;
  font-size: 1rem;
  margin-left: 6px;
}

@media screen and (max-width: 1000px) {
  #child-comments .hide-btn {
    padding-left: 36px;
  }
}
</style>
