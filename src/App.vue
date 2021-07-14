<template>
  <div class="video">
    <h1>This is a video page</h1>
    <ul v-if="videoOptions" style="list-style:none">
      <template v-for="(option, index) in videoOptions">
        <li v-bind:key="index">
          <video-player :options="option" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  data: function() {
    return {
      videoOptions: [],
    };
  },
  created: function() {
    this.getVideoInfo();
  },
  methods: {
    getVideoInfo: function() {
      let temp = [];

      const instance = axios.create({
        baseURL: "http://localhost:8080",
        timeout: 1000,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });

      instance
        .get(" /golftok/main?userId=3 ")
        .then(function(response) {
          const videos = response.data.todayPostList;
          console.log("1");
          console.log(videos);
          const resLen = videos.length;
          if (resLen > 0) {
            for (let i = 0; i < resLen; i++) {
              const videoUrl = videos[i].videoRoot;
              console.log(videoUrl);

              const videoObj = {
                autoplay: false,
                controls: true,
                sources: [
                  {
                    src: videoUrl,
                    type: "video/mp4",
                  },
                ],
              };

              temp.push(videoObj);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      this.videoOptions = temp;
      console.log(this.videoOptions);
    },
  },
  components: {
    "video-player": VideoPlayer,
  },
};
</script>

<style></style>
