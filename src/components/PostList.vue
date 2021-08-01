<template>
  <div>
    <div class="list-box">
      <ul v-if="postInfos" style="list-style:none">
        <template v-for="(post, index) in postInfos">
          <li v-bind:key="index">
            <div class="post-header">
              <div class="user-infos">
                <b-avatar class="user-pic" v-bind:src="post.userPic" size="4rem"></b-avatar>
                <div class="user-text">
                  <h3>{{ post.userNickname }}</h3>
                  <p>@{{ post.userName }}</p>
                </div>
              </div>
            </div>
            <div class="post-body">
              <p style="width: 50%">{{ post.postContent }}</p>
              <div class="media-box">
                <VideoPlayer :options="post.videoOption" />
                <div class="reaction-box">
                  <i class="far fa-heart"></i>
                  <p>{{ post.likeCount }}</p>
                  <i class="far fa-comment"></i>
                  <p>{{ post.commentCount }}</p>
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import * as postApi from '@/api/post';
import VideoPlayer from '@/components/common/VideoPlayer.vue';

export default {
  data: function() {
    return {
      postInfos: [],
      pageNum: 1,
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
              userPic: post.userIcon,
              userNickname: post.userNickname,
              userName: post.userName,
              postContent: post.postContent,
              likeCount: post.likeCount,
              commentCount: post.commentCount,
              videoOption: {
                autoplay: true,
                controls: true,
                sources: [
                  {
                    src: post.videoRoot,
                    type: 'video/mp4',
                  },
                ],
                width: 450,
                height: 250,
              },
            };

            this.postInfos.push(postObj);
            console.log(postObj);
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
  },
  components: {
    VideoPlayer,
    InfiniteLoading,
  },
};
</script>

<style scoped>
.list-box {
  width: 80vw;
}
.list-box ul {
  margin-top: 0;
  padding: 8px 12px;
}
.list-box li {
  padding: 8px 12px;
  height: 430px;
  border-bottom: 1px solid;
}
.user-infos {
  display: flex;
}
.user-pic {
  margin-right: 12px;
}
h3,
p {
  font-family: Helvetica, Arial, sans-serif;
}
.user-text h3 {
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 1.5rem;
  font-weight: 600;
}
.user-text p {
  margin: 0;
}
.post-body {
  display: block;
}
.post-body p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.media-box {
  display: flex;
  margin: 30px 0;
}
.reaction-box {
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.reaction-box i {
  font-size: 1.75rem;
}
.reaction-box p {
  text-align: center;
}
</style>
