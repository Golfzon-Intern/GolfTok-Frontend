<template>
  <div class="post-list-wrapper">
    <div v-if="postInfos" class="video-feed-container">
      <div class="video-feed-item" v-for="(post, index) in postInfos" v-bind:key="index">
        <a href="#" class="feed-item-avatar">
          <b-avatar class="user-pic" v-bind:src="post.userPic" size="3.5rem" />
        </a>
        <div class="feed-item-content">
          <div class="author-info-content">
            <a href="#">
              <h3 class="author-uniqueId">{{ post.userNickname }}</h3>
            </a>
            <a href="#">
              <h4 class="author-nickname">@{{ post.userName }}</h4>
            </a>
          </div>
          <div class="video-meta-caption">
            <strong>{{ post.postContent }}</strong>
          </div>
          <div class="item-follow-wrapper">
            <FollowButton />
          </div>
          <div class="item-video-container">
            <div class="item-video-wrapper">
              <a href="#" class="video-card-wrapper">
                <div class="image-card">
                  <div class="video-card" @mouseenter="setIsHover(true)" @mouseleave="setIsHover(false)">
                    <video
                      ref="videoRef"
                      src="https://firebasestorage.googleapis.com/v0/b/golftok-3275c.appspot.com/o/sample_video%2Fproduction%20ID_4128811.mp4?alt=media&token=58a91ac0-9899-48bb-8864-e15c84118d28"
                      type="video/mp4"
                      autoplay
                      loop
                      muted
                      preload="metadata"
                    ></video>
                    <span class="style-layer-mask"></span>
                    <div class="volume-btn" :style="volumnBtnStyle">
                      <i v-if="isMuted" class="fas fa-volume-up"></i>
                      <i v-else class="fas fa-volume-mute"></i>
                    </div>
                    <div class="play-btn" :style="playBtnStyle">
                      <i v-if="isPlayed" class="fas fa-play"></i>
                      <i v-else class="fas fa-pause"></i>
                    </div>
                  </div>
                </div>
              </a>
              <!-- <VideoPlayer :options="post.videoOption" /> -->
              <!-- <router-link :to="{ name: 'testModal', params: { index: index, postId: post.postId } }"> -->
              <!-- <div class="video-modal-btn" @click="openPostDetail(index, post.postId)">...</div> -->
              <!-- </router-link> -->
            </div>
            <div class="item-action-bar">
              <div class="bar-item-wrapper">
                <!-- <div class="bar-item-img">
                        <i class="far fa-heart"></i>
                      </div>
                      <div class="bar-item-text">
                        <strong>{{ post.likeCount }}</strong>
                      </div> -->
                <LikeButton :targetType="'post'" :targetId="post.postId" :styleType="0"></LikeButton>
              </div>
              <div class="bar-item-wrapper" @click="openPostDetail(index, post.postId)">
                <CommentButton :styleType="0"></CommentButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
    <router-view>
      <PostDetail />
    </router-view>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import * as postApi from '@/api/post';

// import VideoPlayer from '@/components/common/VideoPlayer.vue';
import LikeButton from '@/components/common/LikeButton.vue';
import CommentButton from '@/components/common/CommentButton.vue';
import FollowButton from '@/components/common/FollowButton.vue';

export default {
  data: function() {
    return {
      postInfos: [],
      pageNum: 1,
      curIndex: 0,
      videos: [],
      isVideoHover: false,
      isMuted: false,
      isPlayed: false,
      // volumnBtnStyle: {},
      // playBtnStyle: {},
      // isOpened: false,
    };
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    volumnBtnStyle() {
      if (this.isVideoHover) {
        return {
          opacity: '1',
        };
      } else {
        return {
          opacity: '0',
        };
      }
    },
    playBtnStyle() {
      if (this.isVideoHover) {
        return {
          opacity: '1',
        };
      } else {
        return {
          opacity: '0',
        };
      }
    },
  },
  methods: {
    // 무한 스크롤링
    async infiniteHandler($state) {
      try {
        const response = await postApi.getPosts(this.pageNum);
        const posts = response.data.allPostList;

        if (posts.length) {
          for (const post of posts) {
            const postObj = {
              postId: post.postId,
              userPic: post.userIcon,
              userNickname: post.userNickname,
              userName: post.userName,
              postContent: post.postContent,
              location: post.location,
              likeCount: post.likeCount,
              commentCount: post.commentCount,
              videoOption: {
                autoplay: false,
                controls: true,
                sources: [
                  {
                    src: post.videoRoot,
                    type: 'video/mp4',
                  },
                ],
                width: 440,
                height: 250,
              },
            };

            this.postInfos.push(postObj);
          }
          this.pageNum += 1;
          $state.loaded();
        } else {
          $state.complete();
        }

        // video 태그로 추가된 동영상 정보 가져오기
        this.videos = document.getElementsByTagName('video');
      } catch (error) {
        console.log(error);
      }
    },
    // 게시물 상세보기
    openPostDetail(index, postId) {
      const postsLen = this.postInfos.length;
      let isFirst = false;
      let isLast = false;

      if (index === 0) {
        isFirst = true;
      } else if (index === postsLen) {
        isLast = true;
      }

      this.$router.push({
        name: 'PostDetail',
        params: {
          postId: postId,
          isFirst: isFirst,
          isLast: isLast,
        },
      });

      this.curIndex = index;
    },
    // 스크롤에 따라 동영상 자동재생
    handleScroll() {
      const fraction = 0.8;

      for (let i = 0; i < this.videos.length; i++) {
        const video = this.videos[i];
        let x = 0,
          y = 0,
          w = video.offsetWidth,
          h = video.offsetHeight,
          r, //right
          b, //bottom
          visibleX,
          visibleY,
          visible,
          parent;

        parent = video;
        while (parent && parent !== document.body) {
          x += parent.offsetLeft;
          y += parent.offsetTop;
          parent = parent.offsetParent;
        }

        r = x + parseInt(w);
        b = y + parseInt(h);

        visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
        visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

        visible = (visibleX * visibleY) / (w * h);

        if (visible > fraction) {
          // console.log(this.$refs.videoRef[i]);
          this.$refs.videoRef[i].play();
        } else {
          // console.log('pausevideo');
          this.$refs.videoRef[i].pause();
        }
      }
    },
    setIsHover(state) {
      this.isVideoHover = state;
      console.log('hover');
    },
  },
  components: {
    // VideoPlayer,
    InfiniteLoading,
    LikeButton,
    CommentButton,
    FollowButton,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

.video-feed-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.video-feed-item {
  width: 50vw;
  max-width: 50vw;
  position: relative;
  padding: 20px 0;
  border-bottom: 0.5px solid #ced4da;
  background: forestgreen;

  /* padding: 8px 12px;
  margin-bottom: 12px;
  width: 100%;
  height: 450px;
  display: flex;
  border-bottom: 1px solid; */
}

.feed-item-avatar {
  float: left;
  position: relative;
  cursor: pointer;
  color: inherit;
  width: 56px;
  height: 56px;
  border-color: #ced4da 0.12;
  z-index: 10;
}

.feed-item-content {
  position: relative;
  margin-left: 68px;
  width: 100%;
}

.author-info-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-flow: row wrap;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  margin-right: 150px;
  font-family: Helvetica, Arial, sans-serif;
}
.author-info-content h3 {
  margin-right: 4px;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 24px;
  margin-bottom: 0;
}
.author-info-content h4 {
  line-height: 28px;
  font-weight: 400;
  font-size: 0.875rem;
  margin-bottom: 0;
}

.video-meta-caption {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 22px;
  color: #343a40;
  flex: 0 0 auto;
  margin-bottom: 0;
  margin-right: 150px;
  word-break: break-word;
}
.video-meta-caption strong {
  font-weight: normal;

  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 2; */
  /* -webkit-box-orient: vertical; */
}

.item-follow-wrapper {
  position: absolute;
  right: 0;
  top: 8px;
}

.item-video-container {
  position: relative;
  display: inline-block;

  /*   
  bottom: -30px;
  width: 60%;
  display: flex;
  align-items: flex-end; */
}
.item-video-wrapper {
  width: 35vw;
  height: 40vh;
  position: relative;
}
.video-card-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #343a40;
  border-radius: 8px;
  justify-content: center;
}
.image-card {
  width: 100%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  background-image: url(https://firebasestorage.googleapis.com/v0/b/golftok-3275c.appspot.com/o/sample_video%2Fsample-stamp-grunge-texture-vector-260nw-1389188336.jpeg?alt=media&token=733fe998-be3e-45e6-b62a-92352a8888c3);
  background-color: black;
  background-size: 35vw;
}
.video-card {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.video-card video {
  width: 35vw;
  display: block;
  height: 100%;
  object-fit: cover;
}
.style-layer-mask {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 200px;
  pointer-events: none;
  background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
}
.volume-btn {
  opacity: 1;
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  background-color: blue;
}
.play-btn {
  opacity: 1;
  position: absolute;
  bottom: 12px;
  left: 12px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
}
/* .item-video-container .item-video-wrapper .video-modal-btn {
  position: relative;
  bottom: 190px;
  width: 100%;
  height: 160px;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
  cursor: pointer;
}
.bar-item-wrapper {
  width: 56px;
  margin-bottom: 12px;
  cursor: pointer;
} */
/* 
.feed-item-avatar,
.item-video-wrapper,
.item-action-bar {
  z-index: 0;
} */
</style>
