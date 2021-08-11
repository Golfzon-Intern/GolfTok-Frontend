<template>
  <div class="post-list-wrapper">
    <div v-if="postInfos" class="video-feed-container">
      <div class="video-feed-item" v-for="(post, index) in postInfos" v-bind:key="index">
        <a href="#" class="feed-item-avatar">
          <b-avatar class="user-pic" v-bind:src="post.authorAvatar" size="3.5rem" />
        </a>
        <div class="feed-item-content">
          <div class="author-info-content">
            <a href="#">
              <h3 class="author-uniqueId">{{ post.authorNick }}</h3>
            </a>
            <a href="#">
              <h4 class="author-nickname">@{{ post.authorName }}</h4>
            </a>
          </div>
          <div class="item-location-info">
            <h4>
              <div class="location-decoration">
                <i class="fas fa-map-marker-alt"></i>
                {{ post.location }}
              </div>
            </h4>
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
                <div class="video-card-bg">
                  <div class="video-card" @mouseenter="setIsHover(true, index)" @mouseleave="setIsHover(false, index)">
                    <video ref="videoRef" :src="post.videoRoot" type="video/mp4" autoplay loop muted preload="metadata" :poster="post.Thumbnail"></video>
                    <span class="style-layer-mask"></span>
                    <div class="volume-btn" :style="[post.isHover ? { opacity: '1' } : { opacity: '0' }]" @click="setIsMuted(index)">
                      <i v-if="post.isMuted" class="fas fa-volume-mute"></i>
                      <i v-else class="fas fa-volume-up"></i>
                    </div>
                    <div class="play-btn" :style="[post.isHover ? { opacity: '1' } : { opacity: '0' }]" @click="setIsPlayed(index)">
                      <i v-if="post.isPlayed" class="fas fa-pause"></i>
                      <i v-else class="fas fa-play"></i>
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
                <LikeButton :targetType="'post'" :targetId="post.postId" :targetOrder="index" :styleType="0" @updateLiked="setLikeCount"></LikeButton>
                <strong>{{ post.likeCount }}</strong>
              </div>
              <div class="bar-item-wrapper" @click="openPostDetail(index, post.postId)">
                <CommentButton :styleType="0"></CommentButton>
                <strong>{{ post.commentCount }}</strong>
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
    };
  },
  props: {
    postType: {
      type: Number,
      default: 0,
    },
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
        let response;

        if (this.postType === 0) {
          response = await postApi.getPosts(this.pageNum);
        } else {
          response = await postApi.getFowPosts(this.pageNum);
        }

        const posts = response.data.allPostList;

        if (posts.length) {
          for (const post of posts) {
            const postObj = {
              postId: post.postId,
              postContent: post.postContent,
              videoRoot: post.videoRoot,
              Thumbnail: post.postThumbnail,
              location: post.locations,
              likeCount: post.likeCount,
              commentCount: post.commentCount,
              authorId: post.userId,
              authorName: post.userName,
              authorNick: post.userNickname,
              authorAvatar: post.userIcon,
              isHover: false,
              isMuted: true,
              isPlayed: true,
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
      // const postsLen = this.postInfos.length;
      // let isFirst = false;
      // let isLast = false;

      // if (index === 0) {
      //   isFirst = true;
      // } else if (index === postsLen) {
      //   isLast = true;
      // }

      // this.$router.push({
      //   name: 'PostDetail',
      //   params: {
      //     postId: postId,
      //     isFirst: isFirst,
      //     isLast: isLast,
      //   },
      // });

      this.$emit('openPage', postId);

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
          this.postInfos[i].isPlayed = true;
        } else {
          // console.log('pausevideo');
          this.$refs.videoRef[i].pause();
          this.postInfos[i].isPlayed = false;
        }
      }
    },
    setIsHover(state, index) {
      this.postInfos[index].isHover = state;
    },
    setIsPlayed(index) {
      event.preventDefault();
      this.postInfos[index].isPlayed = !this.postInfos[index].isPlayed;

      if (this.postInfos[index].isPlayed) {
        this.$refs.videoRef[index].play();
      } else {
        this.$refs.videoRef[index].pause();
      }
    },
    setIsMuted(index) {
      event.preventDefault();
      this.postInfos[index].isMuted = !this.postInfos[index].isMuted;

      if (this.postInfos[index].isMuted) {
        this.$refs.videoRef[index].muted = true;
      } else {
        this.$refs.videoRef[index].muted = false;
      }
    },
    setLikeCount(state, index) {
      if (state) {
        this.postInfos[index].likeCount += 1;
      } else {
        this.postInfos[index].likeCount -= 1;
      }

      console.log(this.postInfos[index].likeCount);
    },
    setCommentCount(state, index) {
      if (state) {
        this.postInfos[index].commentCount += 1;
      } else {
        this.postInfos[index].commentCount -= 1;
      }

      console.log(this.postInfos[index].commentCount);
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

.location-decoration {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  display: inline-block;
  font-size: 0.875rem;
  line-height: 22px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #495057;
  /* margin-bottom: 0; */
}
.location-decoration i {
  /* margin-right: 5px; */
  width: 18px;
  height: 18px;
  position: relative;
  left: 4px;
}

.video-meta-caption {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 22px;
  color: #343a40;
  flex: 0 0 auto;
  margin-bottom: 8px;
  margin-right: 150px;
  word-break: break-word;
}
/* .video-meta-caption p {
  font-weight: normal;
  font-size: 0.875rem;
} */
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

.item-location-info {
  margin-top: 4px;
  margin-bottom: 12px;
  max-width: 45vw;
  position: relative;
  overflow: hidden;
}
.item-location-info h4 {
  margin: 0;
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
.video-card-bg {
  width: 100%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  /* background-image: url(https://firebasestorage.googleapis.com/v0/b/golftok-3275c.appspot.com/o/sample_video%2Fsample-stamp-grunge-texture-vector-260nw-1389188336.jpeg?alt=media&token=733fe998-be3e-45e6-b62a-92352a8888c3); */
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
.volume-btn,
.play-btn {
  opacity: 1;
  position: absolute;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.volume-btn {
  bottom: 12px;
  right: 12px;
  font-size: 1.25rem;
}
.play-btn {
  bottom: 12px;
  left: 12px;
}

.item-action-bar {
  position: absolute;
  right: -13%;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  z-index: 1;
}
.bar-item-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  margin-top: 4px;
}
.bar-item-wrapper strong {
  width: 100%;
  display: inline-block;
  text-align: center;
  margin-top: 4px;
  color: #343a40;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 17px;
  padding: 0 7px 0 8px;
}
</style>
