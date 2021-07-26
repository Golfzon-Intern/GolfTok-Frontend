<template>
  <div>
    <div class="listBox">
      <ul v-if="postInfos" style="list-style:none">
        <template v-for="(post, index) in postInfos">
          <li v-bind:key="index">
            <p>userNicname: {{ post.userNickname }}</p>
            <p>userId: {{ post.userId }}</p>
            <video-player :options="post.videoOption" />
            <p>Like: {{ post.likeCount }}</p>
            <p>Comment: {{ post.commentCount }}</p>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import * as postApi from '@/api/post';
import VideoPlayer from '@/components/common/VideoPlayer.vue';

export default {
  data: function() {
    return {
      postInfos: [],
    };
  },
  created: function() {
    this.getVideoInfo();
  },
  methods: {
    async getVideoInfo() {
      try {
        const response = await postApi.getPost();

        const posts = response.data.todayPostList;
        const resLen = posts.length;

        if (resLen > 0) {
          for (let i = 0; i < resLen; i++) {
            const postObj = {
              userNickname: posts[i].userNickname,
              userId: posts[i].userId,
              postContent: posts[i].postContent,
              likeCount: posts[i].likeCount,
              commentCount: posts[i].commentCount,
              videoOption: {
                autoplay: false,
                controls: true,
                sources: [
                  {
                    src: posts[i].videoRoot,
                    type: 'video/mp4',
                  },
                ],
                width: 400,
                height: 200,
              },
            }; // postObj
            this.postInfos.push(postObj);
          } // for
        } // if
      } catch (error) {
        console.log(error);
      }
    }, // getVideoInfo()
  },
  components: {
    'video-player': VideoPlayer,
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
