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
      axios
        .get(
          "https://gist.githubusercontent.com/Joie-Kim/90f0e1e50cfa339db6397efe147dce72/raw/419f130d2b101af4613001869e4204d08e2d0b16/sampleVideo.json"
        )
        .then(function(response) {
          const videos = response.data.videos;
          const resLen = videos.length;
          if (resLen > 0) {
            for (let i = 0; i < resLen; i++) {
              const videoUrl = videos[i].sources[0];

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
    },
  },
  components: {
    "video-player": VideoPlayer,
  },
};
</script>

<style></style>
