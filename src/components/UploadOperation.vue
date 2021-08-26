<template>
  <div class="upload-operation-wrapper">
    <div v-if="videoFile || videoUrl" class="upload-operation">
      <div class="upload-video-card preview">
        <div class="preview-close-btn" @click="clearVideo">
          <i class="fas fa-times-circle"></i>
        </div>
        <video :src="this.videoFile || this.videoUrl" type="video/mp4" autoplay="true" controls="controls"></video>
      </div>
    </div>
    <div v-else class="upload-operation empty">
      <div class="upload-video-btn" @click="openVideoSelector">
        <div class="upload-video-card">
          <i class="fas fa-cloud-upload-alt"></i>
          <h2>Select video to upload</h2>
          <br />
          <ul>
            <li>MP4 or WebM</li>
            <li>1280x720 resolution or heigher</li>
            <li>Up to 180 seconds</li>
          </ul>
        </div>
        <input type="file" name="upload-file-btn" accept="video/mp4,video/x-m4v,video/*" class="upload-btn-input" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoFile: String,
    videoUrl: String,
  },
  methods: {
    /* 비디오 삭제 함수 */
    clearVideo() {
      this.$emit('clearVideo');
    },
    /* 비디오 선택 모달 여는 함수 */
    openVideoSelector() {
      this.$emit('openVideoSelector');
    },
  },
};
</script>

<style>
.upload-operation {
  height: 100%;
}
.upload-operation .preview {
  position: relative;
}
.upload-operation .preview video {
  display: block;
  width: 100%;
  height: 100%;
}
.preview-close-btn {
  position: absolute;
  z-index: 3;
  top: -10px;
  left: -10px;
  /* right: 5px; */
}
.preview-close-btn i {
  font-size: 2rem;
  color: var(--accent-main-color);
}

.upload-video-btn {
  cursor: pointer;
  text-align: center;
}
.upload-video-card {
  width: 25vw;
  max-width: 384px;
  height: 67vh;
  background: rgba(22, 24, 35, 0.03);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  /* transition: 0.15s ease-in-out 0s; */
}
.upload-video-btn .upload-video-card i {
  width: 40px;
  height: 40px;
  font-size: 2.5rem;
  text-align: center;
}
.upload-video-card h2 {
  font-weight: 400;
  font-size: 1.5rem;
  text-align: center;
  color: var(--text-sub-color);
  opacity: 0.4;
  margin-top: 29px;
}
.upload-video-card ul {
  margin: 0px;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: var(--text-sub-color);
  opacity: 0.4;
  text-align: left;
}

.upload-btn-input {
  height: 0px;
  width: 0px;
  opacity: 0;
  position: absolute;
  appearance: none;
  background-color: inherit;
  cursor: default;
  align-items: baseline;
  color: inherit;
  text-overflow: ellipsis;
  white-space: pre;
  text-align: start;
  padding: initial;
  border: initial;
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  .upload-operation {
    width: 100%;
    height: 30vh;
  }

  .upload-video-btn {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .upload-video-card {
    width: 100%;
    height: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgba(22, 24, 35, 0.03);
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
