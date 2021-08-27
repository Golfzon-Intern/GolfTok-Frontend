<template>
  <div class="profile-posts-wrapper">
    <header class="profile-feed-header">
      <h3>Posts</h3>
    </header>
    <div class="profile-feed-container">
      <div class="profile-feed-item" v-for="(post, index) in postInfos" :key="index" @mouseenter="setIsHover(true, index)" @mouseleave="setIsHover(false, index)" @click="openPostDetail(post.postId)">
        <div class="profile-video-card">
          <img :src="post.postThumbnail" alt="thumbnail" />
        </div>
        <div class="profile-video-mask" v-if="post.isHover">
          <div class="profile-info-wrapper">
            <i class="fas fa-heart"></i>
            <strong>{{ post.likeCount }}</strong>
          </div>
          <div class="profile-info-wrapper">
            <i class="fas fa-comment"></i>
            <strong>{{ post.commentCount }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as profileApi from '@/api/profile';
import * as likeApi from '@/api/like';
import * as commnetApi from '@/api/comment';

export default {
  data() {
    return {
      userId: Number(this.$route.params.userId),
      postInfos: [],
    };
  },
  computed: {
    isMine() {
      if (this.$store.state.auth.userInfo !== null) {
        if (this.userId === this.$store.state.auth.userInfo.userId) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  //   watch: {
  //   '$route.params.userId': {
  //     handler: function(value) {
  //       this.userId = value;
  //       this.getUserInfo();
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  created() {
    this.getPostInfo();
  },
  methods: {
    /* 프로필 게시물 정보 받아오는 함수 */
    async getPostInfo() {
      const response = await profileApi.getProfilePost(this.isMine, this.userId);
      const posts = response.data.postList;

      if (posts.length) {
        for (const post of posts) {
          const likeRes = await likeApi.getPostLike(post.postId);
          const commentRes = await commnetApi.getNumOfComments(post.postId);

          const postObj = {
            ...post,
            likeCount: likeRes.data.likeCount,
            commentCount: commentRes.data.commentCount,
            isHover: false,
          };

          this.postInfos.push(postObj);
        }
      }
    },
    /* hover 했을 때, 호출되는 함수 */
    setIsHover(state, index) {
      this.postInfos[index].isHover = state;
    },
    /* 게시물 상세보기 페이지 여는 함수 */
    openPostDetail(postId) {
      if (this.$store.state.auth.userInfo) {
        this.$emit('openPage', postId);
      } else {
        this.$emit('openLoginModal', true);
      }
    },
  },
};
</script>

<style>
.profile-posts-wrapper {
  width: 100%;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}

.profile-feed-header {
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 12px;
  border-bottom: 1px solid #ced4da;
}

.profile-feed-container {
  display: flex;
  flex-wrap: wrap;
}

.profile-feed-item {
  position: relative;
  width: 48%;
  min-height: 25vh;
  max-height: 35vh;
  margin-right: 2%;
  margin-bottom: 12px;
  overflow: hidden;
  background-color: rgba(24, 24, 24, 0.9);
}

.profile-video-card {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-video-card img {
  height: 100%;
}

.profile-video-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(18, 18, 18, 0.5);
}

.profile-info-wrapper {
  margin-right: 24px;
  color: #fff;
  font-size: 1.25rem;
}
.profile-info-wrapper i {
  margin-right: 8px;
}
.profile-info-wrapper strong {
  font-weight: 500;
}

@media screen and (max-width: 768px) {
  .profile-feed-item {
    width: 100%;
    margin-right: 0;
  }
}
</style>
