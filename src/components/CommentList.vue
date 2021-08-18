<template>
  <div id="parent-comments">
    <transition-group name="list" tag="div">
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
                <span class="comment-time">{{ comment.uploadDate }}</span>
                <span class="reply-btn" @click="clickReply(comment.userName, comment.commentGroup, index)">reply</span>
              </div>
            </div>
          </div>
          <div class="action-container">
            <div v-if="loginUser === comment.userName" class="delete-btn" @click="clickDeleteBtn(comment.commentId, null, index)">
              <i class="fas fa-trash"></i>
              <strong>del</strong>
            </div>
            <LikeButton :targetType="'comment'" :targetId="comment.commentId" :styleType="2" />
          </div>
        </div>
        <div class="more-contents">
          <div class="more-btn" v-if="!comment.isOpened" @click="toggleChildList(index, true)">
            <span class="more-text">View more replies ({{ comment.childrenCount }})</span>
            <span class="more-icon">
              <i class="fas fa-chevron-down"></i>
            </span>
          </div>
          <childCommentList v-else :targetOrder="index" :childcomments="comment.children" @clickReplyChild="clickReply" @clickDelete="clickDeleteBtn" @clickHideList="toggleChildList" />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import LikeButton from '@/components/common/LikeButton.vue';
import ChildCommentList from '@/components/ChildCommentList.vue';

export default {
  data() {
    return {
      loginUser: this.$store.state.auth.userInfo.userName,
    };
  },
  props: {
    comments: [],
  },
  methods: {
    toggleChildList(index, state) {
      this.$emit('toggleChildList', index, state);
    },
    clickReply(userName, group, parentIndex) {
      this.$emit('clickReplyParent', userName, group, parentIndex);
    },
    clickDeleteBtn(commentId, parentIndex, index) {
      this.$emit('clickDeleteBtn', commentId, parentIndex, index);
    },
  },
  components: {
    LikeButton,
    ChildCommentList,
  },
};
</script>

<style>
#parent-comments {
  width: 100%;
  padding: 16px 0px;
  background-color: rgb(248, 248, 248);
}

#parent-comments .comment-item {
  margin-bottom: 16px;
  width: 100%;
}

#parent-comments .comment-content {
  padding: 0;
  margin-bottom: 16px;
  position: relative;
  display: flex;
  flex-direction: row;
}

#parent-comments .comment-avatar {
  display: block;
  cursor: pointer;
}

#parent-comments .user-pic {
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

#parent-comments .content-container {
  display: block;
  width: 70%;
  background-color: inherit;
}
#parent-comments .user-info {
  display: block;
  font-size: 1.125rem;
  line-height: 25px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: #212529;
}
#parent-comments .comment-text {
  font-size: 1rem;
  line-height: 22px;
  color: #212529;
  padding-top: 4px;
  padding-right: 10px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  word-break: break-word;
  white-space: pre-line;
}
#parent-comments .bottom-container {
  display: flex;
}
#parent-comments .comment-time {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  line-height: 20px;
  color: #212529;
  opacity: 0.5;
  margin: 6px 0px 0px;
}
#parent-comments .reply-btn {
  margin: 6px 0 0 24px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 20px;
  color: #212529;
  opacity: 0.5;
  cursor: pointer;
}

#parent-comments .action-container {
  position: absolute;
  top: 24px;
  right: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
#parent-comments .action-container .delete-btn {
  margin-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
#parent-comments .action-container .delete-btn i {
  position: relative;
  top: 8px;
  width: 32px;
  height: 32px;
  font-size: 1.15rem;
  text-align: center;
  color: #343a40;
}
#parent-comments .action-container .delete-btn strong {
  width: 100%;
  margin-top: 2px;
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #343a40;
  line-height: 17px;
  padding: 0 7px 0 8px;
}

#parent-comments .more-contents {
  padding-left: 12%;
}
#parent-comments .more-btn {
  margin-top: 14px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  line-height: 20px;
  font-weight: 600;
  position: relative;
  color: #212529;
  opacity: 0.5;
  cursor: pointer;
  display: flex;
  align-items: center;
}
#parent-comments .more-text:hover {
  text-decoration: underline;
}
#parent-comments .more-icon {
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  margin-left: 6px;
}

/* 리스트 아이템 트렌지션 효과 */
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
