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
import axios from 'axios';
import VideoPlayer from '../components/common/VideoPlayer.vue';

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
    getVideoInfo: function() {
      let tempInfos = [];

      const instance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      });

      instance
        .get('/golftok/main?userId=1')
        .then(function(response) {
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
              };
              tempInfos.push(postObj);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      this.postInfos = tempInfos;
      console.log(this.postInfos);
    },
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
