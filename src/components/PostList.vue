<template>
  <div>
    <div class="list-box">
      <ul v-if="postInfos" style="list-style:none">
        <template v-for="(post, index) in postInfos">
          <li v-bind:key="index">
            <div class="video-feed-item">
              <div class="feed-item-avatar">
                <b-avatar class="user-pic" v-bind:src="post.userPic" size="4rem" />
              </div>
              <div class="feed-item-content">
                <div class="auth-info-content">
                  <h3>{{ post.userNickname }}</h3>
                  <h4>@{{ post.userName }}</h4>
                </div>
                <div class="video-meta-caption">
                  <p>{{ post.postContent }}</p>
                </div>
                <div class="item-video-container">
                  <div class="video-card-wrapper">
                    <VideoPlayer :options="post.videoOption" />
                    <!-- <router-link :to="{ name: 'testModal', params: { index: index, postId: post.postId } }"> -->
                    <div class="video-modal-btn" @click="openPostDetail(index, post.postId)">...</div>
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
                      <LikeBtn :postId="post.postId"></LikeBtn>
                    </div>
                    <div class="bar-item-wrapper" @click="openPostDetail(index, post.postId)">
                      <CommentBtn></CommentBtn>
                    </div>
                  </div>
                </div>
                <div class="item-follow-wrapper"></div>
              </div>
            </div>
          </li>
        </template>
      </ul>
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
import VideoPlayer from '@/components/common/VideoPlayer.vue';
import LikeBtn from '@/components/common/LikeBtn.vue';
import CommentBtn from '@/components/common/CommentBtn.vue';

export default {
  data: function() {
    return {
      postInfos: [],
      pageNum: 1,
      curIndex: 0,
      // isOpened: false,
    };
  },
  methods: {
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
            // console.log(postObj);
          }
          this.pageNum += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (error) {
        console.log(error);
      }
    },
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
  },
  components: {
    VideoPlayer,
    InfiniteLoading,
    LikeBtn,
    CommentBtn,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.list-box {
  width: 80vw;
}
.list-box ul {
  margin-top: 0;
  padding: 8px 12px;
}
.list-box .video-feed-item {
  padding: 8px 12px;
  margin-bottom: 12px;
  width: 100%;
  height: 450px;
  display: flex;
  border-bottom: 1px solid;
}

.feed-item-content {
  width: 100%;
}

.auth-info-content {
  display: flex;
  font-family: Helvetica, Arial, sans-serif;
}
.auth-info-content h3 {
  margin-right: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}
.auth-info-content h4 {
  font-size: 1rem;
  font-weight: 500;
  line-height: 2;
}

.video-meta-caption {
  width: 60%;
}
.video-meta-caption p {
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.item-video-container {
  position: relative;
  bottom: -30px;
  width: 60%;
  display: flex;
  align-items: flex-end;
}
.item-video-container .video-card-wrapper {
  width: 440px;
  height: 250px;
  border-radius: 30px;
  overflow: hidden;
}
.item-video-container .video-card-wrapper .video-modal-btn {
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
}
/* 
.feed-item-avatar,
.video-card-wrapper,
.item-action-bar {
  z-index: 0;
} */
</style>
