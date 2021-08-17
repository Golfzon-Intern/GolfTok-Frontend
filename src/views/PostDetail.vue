<template>
  <div class="post-detail-wrapper">
    <div class="video-card-container" @click="setIsPlaying">
      <div class="background-image">
        <img :src="postInfo.postThumbnail" />
      </div>
      <div class="video-card-big">
        <video ref="videoRef" :src="postInfo.videoRoot" type="video/mp4" autoplay loop muted preload="metadata" :poster="postInfo.postThumbnail"></video>
        <div v-if="!isPlaying" class="play-btn">
          <i class="fas fa-play"></i>
        </div>
      </div>
      <button class="close-btn" @click="closePage">
        <i class="fas fa-times"></i>
      </button>
      <button class="mute-btn" @click="setIsMuted">
        <i v-if="isMuted" class="fas fa-volume-mute"></i>
        <i v-else class="fas fa-volume-up"></i>
      </button>
      <!-- <button v-if="!isFirst" class="arrow-left-btn">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button v-if="!isLast" class="arrow-right-btn">
        <i class="fas fa-chevron-right"></i>
      </button> -->
    </div>
    <div class="content-container">
      <div class="user-info-container">
        <div class="user-avatar">
          <b-avatar class="user-pic" :src="postInfo.userIcon" size="3rem" />
        </div>
        <div class="user-text-container">
          <p class="username">{{ postInfo.userName }}</p>
          <p class="user-nickname">{{ postInfo.userNickname }}</p>
        </div>
        <FollowButton />
      </div>
      <div class="video-info-container">
        <h4 class="location-info">
          <div class="location-decoration">
            <i class="fas fa-map-marker-alt"></i>
            {{ postInfo.locations }}
          </div>
        </h4>
        <h1 class="video-meta-title">{{ postInfo.postContent }}</h1>
        <div class="action-container">
          <div class="action-wrapper">
            <LikeButton :targetType="'post'" :targetId="postInfo.postId" :styleType="1" />
          </div>
          <div class="action-wrapper">
            <CommentButton :numOfComments="postInfo.commentCount" :styleType="1" />
          </div>
        </div>
      </div>
      <div class="comment-container">
        <CommentList :comments="comments" @toggleChildList="setIsOpened" @clickReplyParent="setReplyTo" @clickDeleteBtn="removeComment" />
      </div>
      <div class="comment-input-container">
        <CommentInput :replyTo="replyTo" @submitComment="addComment" />
      </div>
    </div>
  </div>
</template>

<script>
import * as postApi from '@/api/post';
import * as commentApi from '@/api/comment';

import FollowButton from '@/components/common/FollowButton.vue';
import LikeButton from '@/components/common/LikeButton.vue';
import CommentButton from '@/components/common/CommentButton.vue';
import CommentList from '@/components/CommentList.vue';
import CommentInput from '@/components/CommentInput.vue';

export default {
  data: function() {
    return {
      postInfo: {},
      comments: [],
      video: null,
      isHover: false,
      isMuted: true,
      isPlaying: true,
      replyTo: {},
      // isFirst: this.$route.params.isFirst,
      // isLast: this.$route.params.isLast,
    };
  },
  created() {
    this.getPostInfo();
    this.setComments();
    console.log(this.$route.params.postId);
  },
  methods: {
    async getPostInfo() {
      try {
        const response = await postApi.getPostDetail(this.$route.params.postId, 0);
        this.postInfo = response.data.postList[0];

        // console.log(this.postInfo);

        // video 태그로 추가된 동영상 정보 가져오기
        this.video = document.getElementsByTagName('video');
      } catch (error) {
        console.log(error);
      }
    },
    async setComments() {
      try {
        const response = await commentApi.getParentComments(this.$route.params.postId);
        const parents = response.data.parentList;

        for (const parent of parents) {
          const childRes = await commentApi.getChildComments(parent.commentId);
          const childList = childRes.data.childrenList;

          const parentObj = {
            ...parent,
            children: childList,
            isOpened: false,
          };
          this.comments.push(parentObj);
        }

        console.log(this.comments);
      } catch (error) {
        console.log(error);
      }
    },
    closePage() {
      this.$router.back();
    },
    setIsHover(state) {
      this.isHover = state;
    },
    setIsPlaying() {
      event.preventDefault();
      this.isPlaying = !this.isPlaying;

      if (this.isPlaying) {
        this.$refs.videoRef.play();
      } else {
        this.$refs.videoRef.pause();
      }
    },
    setIsMuted() {
      event.preventDefault();
      this.isMuted = !this.isMuted;

      if (this.isMuted) {
        this.$refs.videoRef.muted = true;
      } else {
        this.$refs.videoRef.muted = false;
      }
    },
    setIsOpened(index, state) {
      this.comments[index].isOpened = state;
    },
    async addComment(text, isChild) {
      try {
        const newObj = {
          postId: this.postInfo.postId,
          commentText: text,
          commentGroup: isChild ? isChild : 0,
          groupLayer: isChild ? 1 : 0,
        };
        const response = await commentApi.addComment(newObj);
        const newComment = response.data.comment;
        console.log(newComment);

        this.comments = [newComment, ...this.comments];
      } catch (error) {
        console.log(error);
      }
    },
    setReplyTo(userName, group) {
      console.log(userName, group);
      this.replyTo = {
        userName: userName,
        group: group,
      };
    },
    removeComment(commentId, parentIndex, index) {
      if (parentIndex) {
        // 부모 댓글 삭제
        this.comments.splice(index, 1);
      } else {
        // 자식 댓글 삭제
        this.comments[parentIndex].children.splice(index, 1);
      }
      commentApi.deleteComment(commentId);
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

<style>
.post-detail-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  background-color: #212529;
}

.video-card-container {
  padding: 0 80px;
  position: relative;
  flex: 1 1 auto;
  /* width: 60%; */
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
}

.background-image {
  position: absolute;
  width: 10%;
  height: 10%;
  filter: blur(2px);
  left: 50%;
  top: 50%;
  transform: scale(11);
  opacity: 0.3;
}
.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-card-big {
  width: 100%;
  height: 100%;
  position: relative;
}
.video-card-big video {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0px;
  transform: none;
  object-fit: contain;
}
.video-card-big .play-btn {
  height: 100%;
  cursor: pointer;
}
.video-card-big .play-btn i {
  position: absolute;
  top: 45%;
  left: 45%;
  width: 70px;
  height: 70px;
  font-size: 4rem;
  color: #fff;
}

/* .video-card-container button {
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
} */
.video-card-container button {
  cursor: pointer;
  border: none;
  background: #343a40;
  border-radius: 100%;
}
.video-card-container .close-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
}
.video-card-container .mute-btn {
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  opacity: 1;
  position: absolute;
  transition: opacity 0.3s ease 0s;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-card-container .close-btn i,
.video-card-container .mute-btn i {
  font-size: 1.25rem;
  color: #fff;
}

.content-container {
  flex: 0 0 auto;
  width: 37%;
  display: flex;
  flex-direction: column;
  background: #fff;
  z-index: 15;
  /* padding: 8px 12px; */
  /* background: #f8f9fa; */
}
.content-container p {
  font-family: Helvetica, Arial, sans-serif;
  margin-bottom: 0;
}
.user-info-container {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 32px 32px 0;
  color: rgb(22, 24, 35);
  /* height: 10%;
  padding: 4% 4% 4% 0;
  display: flex; */
}
.user-avatar {
  margin-right: 12px;
  flex: 0 0 auto;
  position: relative;
  cursor: pointer;

  /* width: 20%;
  text-align: center; */
}
.user-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 auto;
  overflow: hidden;
  margin-right: 12px;
  /* width: 50%; */
}
.username {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 25px;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}
.user-nickname {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 20px;
  margin-bottom: 0px;
}
/* .follow-btn-wrapper {
  width: 30%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.follow-btn-wrapper .follow-btn {
  position: inherit;
  width: 150px;
  height: 100%;
  border-radius: 50px;
  border: none;
  background-color: #5d5fef;
  color: #f8f9fa;
} */

.video-info-container {
  display: flex;
  flex-direction: column;
  padding: 0px 32px;
  overflow: hidden;
  flex-shrink: 0;

  /* height: 20%;
  padding: 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; */
}
.video-info-container .location-info .location-decoration {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  display: inline-block;
  font-size: 0.75rem;
  line-height: 22px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #495057;
  margin-top: 8px;
}
.video-info-container .video-meta-title {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 24px;
  color: rgb(18, 18, 18);
  flex: 0 0 auto;
  font-weight: normal;
  word-break: break-word;
  margin-bottom: 16px;
}

.action-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 0px;
  position: relative;
  flex: 0 0 auto;
  margin-bottom: 16px;

  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  height: 40px;
  line-height: 40px;
}
.action-wrapper {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.comment-container {
  width: 100%;
  flex: 1 1 auto;
  position: relative;
  display: flex;
  background-color: rgb(248, 248, 248);
  padding: 0px 32px;
  border-top: 0.5px solid rgba(18, 18, 18, 0.12);
  border-bottom: 0.5px solid rgba(18, 18, 18, 0.12);
  box-sizing: border-box;
  overflow-y: overlay;
}
.comment-input-container {
  margin: 0 32px;
  padding: 21px 0;
  background-color: #fff;
}
</style>
