<template>
  <div id="parent-comments">
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
          <LikeButton :targetId="comment.commentId" :targetOrder="index" :styleType="2" @updateLiked="setLikeCount" />
          <p>{{ comment.likeCount }}</p>
        </div>
      </div>
      <div class="more-contents">
        <div class="more-btn" v-if="!comment.isOpenedReply" @click="toggleReply(index)">
          <span class="more-text">View more replies ({{ comment.childrenCount }})</span>
          <span class="more-icon">
            <i class="fas fa-chevron-down"></i>
          </span>
        </div>
        <childCommentList v-else :targetOrder="index" @hideReply="toggleReply" />
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
      try {
        const response = await commentApi.getParentComments(this.postId);
        const data = response.data.parentList;

        if (data.length) {
          for (const item of data) {
            const commentObj = {
              ...item,
              isOpenedReply: false,
            };

            this.comments.push(commentObj);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    toggleReply(index) {
      this.comments[index].isOpenedReply = !this.comments[index].isOpenedReply;
    },
    setLikeCount(state, index) {
      if (state) {
        // await likeApi.addCommentLike(this.targetId);
        this.comments[index].likeCount += 1;
      } else {
        // await likeApi.deleteCommentLiked(this.targetId);
        this.comments[index].likeCount -= 1;
      }
    },
    setCommentCount(state, index) {
      if (state) {
        this.comments[index].commentCount += 1;
      } else {
        this.comments[index].commentCount -= 1;
      }
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
  padding-top: 16px;
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

#parent-comments .like-container {
  position: absolute;
  top: 24px;
  right: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20px;
}
#parent-comments .like-container p {
  font-size: 0.75rem;
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
</style>
