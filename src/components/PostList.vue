<template>
  <div class="post-list-wrapper">
    <div v-if="postInfos" class="video-feed-container">
      <div
        class="video-feed-item"
        v-for="(post, index) in postInfos"
        :key="index"
      >
        <a :href="`/profile/${post.userId}`" class="feed-item-avatar">
          <b-avatar class="user-pic" :src="post.userIcon" />
        </a>
        <div class="feed-item-content">
          <div class="author-info-content">
            <a :href="`/profile/${post.userId}`">
              <h3 class="author-uniqueId">{{ post.userNickname }}</h3>
            </a>
            <a :href="`/profile/${post.userId}`">
              <h4 class="author-nickname">@{{ post.userName }}</h4>
            </a>
          </div>
          <div class="author-golf-info">
            <span class="golf-grade"
              >등급 - <b>{{ post.userGrade }}</b></span
            >
            <span class="golf-handicap"
              >핸디캡 - <b>{{ post.handicap }}</b></span
            >
            <span class="golf-rolmodel"
              ><b>{{ post.roleModel }}</b
              >처럼 되려고 노력 중</span
            >
          </div>
          <div class="location-info" v-if="post.locations">
            <div class="info-text-decoration">
              <i class="fas fa-map-marker-alt"></i>
              {{ post.locations }}
            </div>
          </div>
          <div class="club-info" v-if="post.golfClub.length">
            <div class="info-text-decoration">
              <div class="club-info-tags">
                <i class="fas fa-thumbs-up"></i>
                <span v-for="(tag, id) of post.golfClub" :key="id">
                  <a :href="`/search/${tag.substring(1)}`">{{ tag }}</a>
                </span>
              </div>
            </div>
          </div>
          <div class="video-meta-caption">
            <strong v-html="post.postContent" />
          </div>
          <div v-if="!postType" class="item-follow-wrapper">
            <FollowButton
              :targetId="post.userId"
              v-if="$store.state.auth.userInfo"
            />
          </div>
          <div class="item-video-container">
            <div class="item-video-wrapper">
              <div
                class="video-card"
                @mouseenter="setIsHover(true, index)"
                @mouseleave="setIsHover(false, index)"
              >
                <video
                  ref="videoRef"
                  :src="post.videoRoot"
                  type="video/mp4"
                  autoplay
                  loop
                  muted
                  preload="metadata"
                  :poster="post.Thumbnail"
                  @click="openPostDetail(post.postId, false)"
                ></video>
                <span class="style-layer-mask"></span>
                <div
                  class="volume-btn"
                  :style="[post.isHover ? { opacity: '1' } : { opacity: '0' }]"
                  @click="toggleVideoMute(index)"
                >
                  <i v-if="post.isMuted" class="fas fa-volume-mute"></i>
                  <i v-else class="fas fa-volume-up"></i>
                </div>
                <div
                  class="play-btn"
                  :style="[post.isHover ? { opacity: '1' } : { opacity: '0' }]"
                  @click="toggleVideoPlay(index)"
                >
                  <i v-if="post.isPlaying" class="fas fa-pause"></i>
                  <i v-else class="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div class="item-action-bar">
              <div class="bar-item-wrapper">
                <LikeButton
                  :targetType="'post'"
                  :targetId="post.postId"
                  :styleType="0"
                ></LikeButton>
              </div>
              <div
                class="bar-item-wrapper"
                @click="openPostDetail(post.postId, true)"
              >
                <CommentButton
                  :targetId="post.postId"
                  :styleType="0"
                ></CommentButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import EventBus from "@/lib/eventBus";
import * as postApi from "@/api/post";

import LikeButton from "@/components/common/LikeButton.vue";
import CommentButton from "@/components/common/CommentButton.vue";
import FollowButton from "@/components/common/FollowButton.vue";

export default {
  data: function() {
    return {
      postInfos: [],
      pageNum: 1,
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
    window.addEventListener("scroll", this.handleScroll);
    EventBus.$on("login-success", () => {
      this.postInfos = [];
      this.getPostInfos(1);
      console.log("login success postlist");
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    volumnBtnStyle() {
      if (this.isVideoHover) {
        return {
          opacity: "1",
        };
      } else {
        return {
          opacity: "0",
        };
      }
    },
    playBtnStyle() {
      if (this.isVideoHover) {
        return {
          opacity: "1",
        };
      } else {
        return {
          opacity: "0",
        };
      }
    },
  },
  methods: {
    /* 무한스크롤링 핸들러 함수 (게시물 정보 받아옴) */
    async infiniteHandler($state) {
      try {
        const flag = this.getPostInfos(this.pageNum);

        if (flag) {
          this.pageNum += 1;
          $state.loaded();
        } else {
          $state.complete();
        }

        // video 태그로 추가된 동영상 정보 가져오기
        this.videos = document.getElementsByTagName("video");
      } catch (error) {
        console.log(error);
      }
    },
    /* 게시물 정보 받아오는 함수 */
    async getPostInfos(numOfPage) {
      let response;
      let posts;

      if (this.postType === 0) {
        response = await postApi.getPosts(numOfPage);
        posts = response.data.allPostList;
      } else {
        response = await postApi.getFowPosts(numOfPage);
        posts = response.data.postList;
      }

      if (posts.length) {
        for (const post of posts) {
          const postObj = {
            ...post,
            postContent: this.separateHashtag(post.postContent, 0),
            golfClub: this.separateHashtag(post.golfClub, 1),
            isHover: false,
            isMuted: true,
            isPlaying: true,
          };
          this.postInfos.push(postObj);
        }

        return true;
      } else {
        return false;
      }
    },
    /* 게시물에 있는 해시태그 분리하는 함수 */
    separateHashtag(text, type) {
      let newText = text;
      if (!newText) return type ? [] : "";

      if (type) {
        // 텍스트에 해시태그만 있는 경우
        const newTags = newText.split(" ");
        return newTags;
      }

      let hashReg = /#(\w+|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+)/g;
      newText = newText
        .toString()
        .replace(
          hashReg,
          '<a href="/search/$1" style="text-decoration:none; color:#fa5252;">#$1</a>'
        );
      return newText;
    },
    /* 게시물 상세보기 페이지 여는 함수 */
    openPostDetail(postId, isComment) {
      if (isComment && !this.$store.state.auth.userInfo) {
        // 로그인 모달 열기
        this.$emit("openLoginModal", true);
      } else {
        this.$emit("openPage", postId);
      }
    },
    /* 스크롤 핸들러 함수 (스크롤 될 때, 동영상 자동재생) */
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

        visibleX = Math.max(
          0,
          Math.min(
            w,
            window.pageXOffset + window.innerWidth - x,
            r - window.pageXOffset
          )
        );
        visibleY = Math.max(
          0,
          Math.min(
            h,
            window.pageYOffset + window.innerHeight - y,
            b - window.pageYOffset
          )
        );

        visible = (visibleX * visibleY) / (w * h);

        if (visible > fraction) {
          this.$refs.videoRef[i].play();
          this.postInfos[i].isPlaying = true;
        } else {
          this.$refs.videoRef[i].pause();
          this.postInfos[i].isPlaying = false;
        }
      }
    },
    /* hover 했을 때, 호출되는 함수 */
    setIsHover(state, index) {
      this.postInfos[index].isHover = state;
    },
    /* 비디오 재생, 일시정지 설정하는 함수 */
    toggleVideoPlay(index) {
      event.preventDefault();
      this.postInfos[index].isPlaying = !this.postInfos[index].isPlaying;

      if (this.postInfos[index].isPlaying) {
        this.$refs.videoRef[index].play();
      } else {
        this.$refs.videoRef[index].pause();
      }
    },
    /* 비디오 음소거 설정하는 함수 */
    toggleVideoMute(index) {
      event.preventDefault();
      this.postInfos[index].isMuted = !this.postInfos[index].isMuted;

      if (this.postInfos[index].isMuted) {
        this.$refs.videoRef[index].muted = true;
      } else {
        this.$refs.videoRef[index].muted = false;
      }
    },
  },
  components: {
    InfiniteLoading,
    LikeButton,
    CommentButton,
    FollowButton,
  },
};
</script>

<style>
.post-list-wrapper {
  width: 100%;
}

.video-feed-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.video-feed-item {
  width: 100%;
  position: relative;
  padding: 20px 0;
  border-bottom: 0.5px solid #ced4da;
}

.feed-item-avatar {
  float: left;
  position: relative;
  cursor: pointer;
}
.feed-item-avatar .user-pic {
  width: 56px;
  height: 56px;
  z-index: 10;
}

.feed-item-content {
  position: relative;
  margin-left: 68px;
}

.author-info-content {
  margin-right: 150px;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-flow: row wrap;
  cursor: default;
}
.author-info-content a {
  text-decoration: none;
  color: var(--text-main-color);
}
.author-info-content a:hover {
  color: var(--text-main-color);
  text-decoration: underline;
}
.author-info-content h3 {
  margin-right: 4px;
  margin-bottom: 0;
  font-weight: 700;
  font-size: 1.125rem;
}
.author-info-content h4 {
  font-size: 0.875rem;
  margin-bottom: 0;
  font-weight: 400;
  line-height: 1.7;
}

.author-golf-info {
  width: 100%;
  display: flex;
  margin-bottom: 24px;
}
.author-golf-info span {
  padding: 0 8px;
  margin-right: 12px;
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

.location-info {
  max-width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 4px;
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
  color: var(--text-main-color);
}

.video-meta-caption {
  font-size: 1rem;
  line-height: 1.4;
  color: var(--text-main-color);
  flex: 0 0 auto;
  margin-top: 24px;
  margin-bottom: 12px;
  margin-right: 150px;
  word-break: break-word;
}
.video-meta-caption strong {
  font-weight: normal;
}

.item-follow-wrapper {
  position: absolute;
  right: 0;
  top: 0;
}

.item-video-container {
  position: relative;
  width: 70%;
  display: flex;
}

.item-video-wrapper {
  width: 100%;
  height: 35vh;
  min-height: 250px;
  /* max-height: 400px; */
  position: relative;
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  background-color: black;
  background-size: 35vw;
  overflow: hidden;
  border-radius: 12px;
}
.video-card {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.video-card video {
  width: 100%;
  /* height: 100%; */
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
  right: -56px;
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

@media screen and (max-width: 768px) {
  .feed-item-avatar .user-pic {
    width: 42px;
    height: 42px;
    z-index: 10;
  }

  .feed-item-content {
    margin-left: 48px;
  }

  .author-info-content {
    flex-direction: column;
    margin-left: 4px;
    margin-bottom: 8px;
  }

  .bar-item-wrapper .like-wrapper .like-icon,
  .bar-item-wrapper .comment-wrapper .comment-icon {
    width: 32px !important;
    height: 32px !important;
    margin-top: 4px !important;
    font-size: 1.25rem !important;
  }

  .bar-item-wrapper .like-wrapper strong,
  .bar-item-wrapper .comment-wrapper strong {
    font-size: 0.75rem !important;
  }
}

@media screen and (max-width: 500px) {
  .author-golf-info {
    justify-content: space-between;
  }
  .author-golf-info span {
    margin-right: 0;
  }

  .item-video-container {
    width: 100%;
    flex-direction: column;
  }

  .item-action-bar {
    position: relative;
    left: 0;
    display: flex;
    flex-direction: row;
  }
}
</style>
