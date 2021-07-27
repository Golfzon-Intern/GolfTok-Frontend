<template>
  <div>
    <div class="listBox">
      <ul v-if="postInfos" style="list-style:none">
        <template v-for="(post, index) in postInfos">
          <li v-bind:key="index">
            <p>userNicname: {{ post.userNickname }}</p>
            <p>userId: {{ post.userId }}</p>
            <VideoPlayer :options="post.videoOption" />
            <p>Like: {{ post.likeCount }}</p>
            <p>Comment: {{ post.commentCount }}</p>
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
        const response = await postApi.getPost(this.pageNum);
        const posts = response.data.todayPostList;

        if (posts.length) {
          for (const post of posts) {
            const postObj = {
              userNickname: post.userNickname,
              userId: post.userId,
              postContent: post.postContent,
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
                width: 400,
                height: 200,
              },
            };

            this.postInfos.push(postObj);
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

<style>
.listBox {
  width: 80vw;
}
.listBox ul,
p {
  margin-top: 0;
  padding: 8px 12px;
}
.listBox li {
  margin-bottom: 8px;
  border: 2px solid black;
}
</style>
