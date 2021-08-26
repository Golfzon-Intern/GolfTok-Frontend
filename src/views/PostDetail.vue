<template>
  <div id="post-detail-view">
    <div class="video-card-container">
      <div class="background-image">
        <img :src="postInfo.postThumbnail" />
      </div>
      <div class="video-card-big">
        <video ref="videoRef" :src="postInfo.videoRoot" type="video/mp4" autoplay loop muted preload="metadata" :poster="postInfo.postThumbnail" @click="setIsPlaying"></video>
        <div v-if="!isPlaying" class="play-btn" @click="setIsPlaying">
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
        <FollowButton :targetId="postInfo.userId" />
      </div>
      <div class="user-golf-container">
        <span class="golf-grade"
          >등급 - <b>{{ postInfo.userGrade }}</b></span
        >
        <span class="golf-handicap"
          >핸디캡 - <b>{{ postInfo.handicap }}</b></span
        >
        <span class="golf-rolmodel"
          ><b>{{ postInfo.roleModel }}</b
          >처럼 되려고 노력 중</span
        >
      </div>
      <div class="video-info-container">
        <div class="location-info" v-if="postInfo.locations">
          <h4>
            <div class="info-text-decoration">
              <i class="fas fa-map-marker-alt"></i>
              {{ postInfo.locations }}
            </div>
          </h4>
        </div>
        <div class="club-info" v-if="postInfo.golfClub && postInfo.golfClub.length">
          <h4>
            <div class="info-text-decoration">
              <div class="club-info-tags">
                <i class="fas fa-thumbs-up"></i>
                <span v-for="(tag, id) of postInfo.golfClub" :key="id">
                  <a :href="`/search/${tag.substring(1)}`">{{ tag }}</a>
                </span>
              </div>
            </div>
          </h4>
        </div>
        <h1 class="video-meta-title" v-html="postInfo.postContent" />
        <div class="action-container">
          <div class="action-wrapper">
            <LikeButton :targetType="'post'" :targetId="Number(this.$route.params.postId)" :styleType="1"></LikeButton>
          </div>
          <div class="action-wrapper">
            <CommentButton :targetId="Number(this.$route.params.postId)" :updateState="commentState" :styleType="1"></CommentButton>
          </div>
        </div>
      </div>
      <button class="content-modal-btn" @click="setIsContentModalVisible(true)">
        View content
        <i class="fas fa-chevron-down"></i>
      </button>
      <div class="comment-list-container">
        <CommentList :comments="comments" @toggleChildList="setIsOpened" @clickReplyParent="setReplyTo" @clickDeleteBtn="removeComment" />
      </div>
      <div class="comment-input-container">
        <CommentInput :replyTo="replyTo" @submitComment="addComment" />
      </div>
    </div>
    <div v-if="isContentModalVisible" class="content-modal-container">
      <div class="content-modal-header">
        <h3 class="content-modal-header-title">Content</h3>
        <button class="content-modal-close-btn" @click="setIsContentModalVisible(false)">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="content-modal-body">
        <div class="content-modal-user-wrapper">
          <span class="golf-grade"
            >등급 - <b>{{ postInfo.userGrade }}</b></span
          >
          <span class="golf-handicap"
            >핸디캡 - <b>{{ postInfo.handicap }}</b></span
          >
          <span class="golf-rolmodel"
            ><b>{{ postInfo.roleModel }}</b
            >처럼 되려고 노력 중</span
          >
        </div>
        <div class="content-modal-video-wrapper">
          <div class="location-info" v-if="postInfo.locations">
            <h4>
              <div class="info-text-decoration">
                <i class="fas fa-map-marker-alt"></i>
                {{ postInfo.locations }}
              </div>
            </h4>
          </div>
          <div class="club-info" v-if="postInfo.golfClub && postInfo.golfClub.length">
            <h4>
              <div class="info-text-decoration">
                <div class="club-info-tags">
                  <i class="fas fa-thumbs-up"></i>
                  <span v-for="(tag, id) of postInfo.golfClub" :key="id">
                    <a :href="`/search/${tag.substring(1)}`">{{ tag }}</a>
                  </span>
                </div>
              </div>
            </h4>
          </div>
          <h1 class="video-meta-title" v-html="postInfo.postContent" />
          <!-- <div class="action-container">
            <div class="action-wrapper">
              <LikeButton :targetType="'post'" :targetId="Number(this.$route.params.postId)" :styleType="1"></LikeButton>
            </div>
            <div class="action-wrapper">
              <CommentButton :targetId="Number(this.$route.params.postId)" :updateState="commentState" :styleType="1"></CommentButton>
            </div>
          </div> -->
        </div>
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
      commentState: null, // 댓글 작성: 1, 댓글 삭제: 0
      isContentModalVisible: false,
    };
  },
  created() {
    this.getPostInfo();
    this.setComments();
  },
  watch: {
    commentState: 'test',
  },
  methods: {
    test() {
      console.log('post detail watch');
    },
    async getPostInfo() {
      try {
        const response = await postApi.getPostDetail(this.$route.params.postId, 0);
        const data = response.data.postList[0];

        if (data) {
          const postObj = {
            ...data,
            postContent: this.separateHashtag(data.postContent, 0),
            golfClub: this.separateHashtag(data.golfClub, 1),
          };

          console.log(postObj.golfClub.length);

          this.postInfo = postObj;
        }

        // video 태그로 추가된 동영상 정보 가져오기
        this.video = document.getElementsByTagName('video');
      } catch (error) {
        console.log(error);
      }
    },
    separateHashtag(text, type) {
      let newText = text;
      if (!newText) return type ? [] : '';

      if (type) {
        // 텍스트에 해시태그만 있는 경우
        const newTags = newText.split(' ');
        return newTags;
      }

      let hashReg = /#(\w+|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+)/g;
      newText = newText.toString().replace(hashReg, '<a href="/search/$1" style="text-decoration:none; color:#fa5252;">#$1</a>');
      return newText;
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
            children: childList ? childList : [],
            isOpened: false,
          };
          this.comments.push(parentObj);
        }
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
    async addComment(text, isChild, parentIndex) {
      try {
        const newObj = {
          postId: this.postInfo.postId,
          commentText: text,
          commentGroup: isChild ? isChild : 0,
          groupLayer: isChild ? 1 : 0,
        };
        const response = await commentApi.addComment(newObj);

        if (isChild) {
          // 추가하려는 댓글이 대댓글(자식 댓글)일 경우
          const newComment = response.data.comment;

          this.comments[parentIndex].children.push(newComment);
          this.setIsOpened(parentIndex, true);
        } else {
          // 추가하려는 댓글이 댓글(부모 댓글)일 경우
          const newComment = {
            ...response.data.comment,
            children: [],
            isOpened: false,
          };
          console.log(newComment);

          this.comments = [newComment, ...this.comments];
        }

        this.commentState = {
          id: response.data.comment.commentId,
          state: 1,
        };
        console.log('post detail state');
        console.log(this.commentState);

        // console.log(this.comments);
      } catch (error) {
        console.log(error);
      }
    },
    setReplyTo(userName, group, parentIndex) {
      this.replyTo = {
        userName: userName,
        group: group,
        parentIndex: parentIndex,
      };
    },
    removeComment(commentId, parentIndex, index) {
      console.log('remove');
      if (parentIndex !== null) {
        // 부모 인덱스가 있으면 (자식 댓글이라는 의미)
        // 자식 댓글 삭제
        this.comments[parentIndex].children.splice(index, 1);
      } else {
        // 부모 댓글 삭제
        this.comments.splice(index, 1);
      }

      this.commentState = {
        id: commentId,
        state: 0,
      };
      commentApi.deleteComment(commentId);
    },
    setIsContentModalVisible(state) {
      this.isContentModalVisible = state;
      console.log('hi');
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
#post-detail-view {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #212529;
}

.video-card-container {
  padding: 0 80px;
  position: relative;
  flex: 1 1 auto;
  z-index: -1;
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
  position: absolute;
  top: 45%;
  left: 42.5%;
  width: 70px;
  height: 70px;
  cursor: pointer;
  font-size: 4rem;
  color: #fff;
}

.video-card-container button {
  width: 40px;
  height: 40px;
  border: none;
  background: #343a40;
  border-radius: 100%;
  font-size: 1.25rem;
  color: #fff;
}
.video-card-container .close-btn {
  position: absolute;
  top: 20px;
  left: 20px;
}
.video-card-container .close-btn i {
  position: relative;
  top: 2px;
}
.video-card-container .mute-btn {
  bottom: 20px;
  right: 20px;
  position: absolute;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-container {
  flex: 0 0 auto;
  width: 37%;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  z-index: 15;
}
.content-container p {
  margin-bottom: 0;
}

.user-info-container {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 32px 32px 0;
  color: var(--text-main-color);
}

.user-avatar {
  margin-right: 12px;
  flex: 0 0 auto;
  position: relative;
  cursor: pointer;
}

.user-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 auto;
  overflow: hidden;
  margin-right: 12px;
}
.username {
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.25;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}
.user-nickname {
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 0px;
}

.user-golf-container {
  width: 100%;
  display: flex;
  margin-top: 8px;
  margin-bottom: 12px;
  padding-left: 32px;
}
.user-golf-container span {
  padding: 0 8px;
  margin-right: 8px;
  text-align: center;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.8;
  color: var(--text-sub-color);
  border-radius: 5px;
  background-color: var(--accent-sub-color);
}
.golf-grade {
  min-width: 30px;
}
.golf-handicap {
  min-width: 70px;
}
.golf-rolmodel {
  min-width: 170px;
}

.video-info-container {
  display: flex;
  flex-direction: column;
  padding: 0px 32px;
  overflow: hidden;
  flex-shrink: 0;
}

.location-info {
  max-width: 100%;
  position: relative;
  overflow: hidden;
}
.location-info h4 {
  margin: 0;
}
.info-text-decoration {
  font-weight: 600;
  display: inline-block;
  font-size: 0.875rem;
  line-height: 1.5;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--text-sub-color);
}
.info-text-decoration i {
  width: 18px;
  height: 18px;
  position: relative;
  left: 4px;
  text-align: center;
  margin-right: 4px;
}

.club-info {
  max-width: 100%;
  position: relative;
  overflow: hidden;
}
.club-info-tags {
  display: flex;
  flex-flow: row wrap;
  min-height: 30px;
}
.club-info-tags i {
  position: relative;
  top: 5px;
  margin-right: 4px;
}
.club-info-tags a {
  padding: 6px;
  margin: 0 5px;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: var(--supplement-color);
  border-radius: 4px;
  color: var(--text-sub-color);
}
.club-info-tags a:hover {
  color: var(--accent-main-color);
}

.video-meta-title {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-main-color);
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
  font-weight: 600;
  font-size: 0.875rem;
  height: 40px;
}
.action-wrapper {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.content-modal-btn {
  display: none;
}

.comment-list-container {
  width: 100%;
  flex: 1 1 auto;
  position: relative;
  display: flex;
  background-color: var(--supplement-color);
  padding: 0px 32px;
  border-top: 0.5px solid rgba(18, 18, 18, 0.12);
  border-bottom: 0.5px solid rgba(18, 18, 18, 0.12);
  box-sizing: border-box;
  overflow-y: overlay;
}
.comment-input-container {
  margin: 0 32px;
  padding: 21px 0;
  background-color: var(--background-color);
}

@media screen and (max-width: 1000px) {
  #post-detail-view {
    flex-direction: column;
  }

  .video-card-container {
    width: 100%;
    height: 35vh;
  }

  .content-container {
    width: 100%;
    height: 65vh;
  }

  .user-golf-container,
  .video-info-container .location-info,
  .video-info-container .club-info,
  .video-info-container .video-meta-title {
    display: none;
  }

  .user-info-container {
    margin-bottom: 12px;
    padding: 18px 32px 0;
    align-items: flex-start;
  }

  .content-modal-btn {
    display: block;
    width: 150px;
    margin-bottom: 12px;
    position: absolute;
    top: 350px;
    right: 15px;
    z-index: 10;
    border: none;
    background-color: var(--background-color);
    color: var(--accent-main-color);
    opacity: 0.7;
    font-size: 0.875rem;
  }
  .content-modal-btn i {
    margin-left: 12px;
  }

  .content-modal-container {
    position: absolute;
    bottom: 0;
    left: 1%;
    width: 98%;
    height: 63vh;
    padding: 12px 24px;
    z-index: 50;
    border-radius: 12px 12px 0 0;
    box-shadow: 2px 0px 5px 2px rgba(22, 22, 22, 0.4);
    background-color: var(--background-color);
  }

  .content-modal-header {
    height: 40px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ced4da;
  }

  .content-modal-header-title {
    font-size: 1.5rem;
    line-height: 1.3;
    font-weight: bolder;
    color: var(--text-main-color);
  }

  .content-modal-close-btn {
    width: 32px;
    height: 32px;
    padding-top: 2px;
    padding-left: 9px;
    border-radius: 50%;
    border: none;
    background: rgba(22, 24, 35, 0.05);
    font-size: 1.25rem;
  }

  .content-modal-user-wrapper {
    margin-bottom: 12px;
  }
  .content-modal-user-wrapper span {
    padding: 0 8px;
    text-align: center;
    margin-right: 8px;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.8;
    color: var(--text-sub-color);
    border-radius: 5px;
    background-color: var(--accent-sub-color);
  }

  .video-card-big .play-btn {
    width: 32px;
    height: 32px;
    font-size: 2rem;
  }

  .video-card-container button {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }
  .video-card-container .close-btn i {
    top: 0px;
  }
}
</style>
