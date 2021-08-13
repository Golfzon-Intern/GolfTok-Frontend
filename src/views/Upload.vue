<template>
  <div id="upload-view">
    <div class="header-container">
      <AppHeader></AppHeader>
    </div>
    <div class="body-container" @click="toggleLocationVisible(false)">
      <div class="upload-container">
        <div class="upload-title">
          Upload Video
          <div class="upload-sub-title">This video will be published to @{{ this.$store.state.auth.userInfo.userName }}</div>
        </div>
        <div class="upload-contents">
          <div v-if="newFile || newVideoUrl" class="upload-operation">
            <div class="upload-video-card preview">
              <div class="preview-close-btn" @click="deleteVideo">
                <i class="fas fa-times-circle"></i>
              </div>
              <video :src="this.newVideoUrl || this.newFile" type="video/mp4" autoplay="true" controls="controls"></video>
            </div>
          </div>
          <div v-else class="upload-operation empty">
            <div class="upload-video-btn" @click="toggleSelectorVisible">
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
          <div class="upload-form-container">
            <div class="upload-cption-container">
              <h3 class="form-title-container">Caption</h3>
              <div class="caption-text-container">
                <b-form-textarea class="caption-input" v-model="newContent" rows="5" no-resize></b-form-textarea>
                <div class="hash-icon">
                  <i class="fas fa-hashtag"></i>
                </div>
              </div>
            </div>
            <div class="upload-location-container">
              <h3 class="form-title-container">Location</h3>
              <b-form-input class="location-input" :type="'search'" v-model="newLocation" placeholder="Search location" v-on:keyup.enter="toggleLocationVisible(true)"></b-form-input>
              <div class="location-list-wrapper" v-if="isLocationVisible">
                <b-list-group class="location-result-list">
                  <b-list-group-item button>Button item</b-list-group-item>
                  <b-list-group-item button>I am a button</b-list-group-item>
                  <b-list-group-item button disabled>Disabled button</b-list-group-item>
                  <b-list-group-item button>This is a button too</b-list-group-item>
                  <b-list-group-item button>Button item</b-list-group-item>
                  <b-list-group-item button>I am a button</b-list-group-item>
                  <b-list-group-item button disabled>Disabled button</b-list-group-item>
                  <b-list-group-item button>This is a button too</b-list-group-item>
                </b-list-group>
              </div>
            </div>
            <div class="form-bottom-container">
              <button class="upload-cancle-btn" @click="deleteAll">Discard</button>
              <button class="upload-post-btn" @click="submitPost" :disabled="isDisabled">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NasmoSelector
      v-if="isSelectorVisible"
      @close="isSelectorVisible = false"
      v-bind:isVisible="isSelectorVisible"
      v-bind:videoList="nasmoList"
      v-on:toggleVisible="toggleSelectorVisible"
      v-on:onClickFileBtn="openFileSelector"
      v-on:saveSelected="selectNasmo"
    ></NasmoSelector>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { storageService } from '@/lib/firebase';
import * as postApi from '@/api/post';

import AppHeader from '@/components/common/AppHeader.vue';
import NasmoSelector from '@/components/NasmoSelector.vue';
// import VideoPlayer from '@/components/common/VideoPlayer.vue';

const THUMBNAIL_URL = 'https://firebasestorage.googleapis.com/v0/b/golftok-3275c.appspot.com/o/thumbnails%2Fthumbnail1.png?alt=media&token=693a8a6a-d028-4561-96af-50be2d8b17cc';

export default {
  data() {
    return {
      nasmoList: [],
      newFile: '',
      newVideoUrl: '',
      // newVideoIndex: 0,
      newContent: '',
      newLocation: '',
      videoOptions: {},
      isLocationVisible: false,
      isSelectorVisible: false,
      isDisabled: true,
    };
  },
  created() {
    this.getNasmoList();
  },
  methods: {
    // 나스모 영상 서버로부터 받아옴 (나스모 선택창에 props로 전달)
    async getNasmoList() {
      try {
        const response = await postApi.getNasmos();
        const videos = response.data.nasmoList;

        this.nasmoList = videos;
      } catch (error) {
        console.log(error);
      }
    },
    selectNasmo(index) {
      this.newVideoUrl = this.nasmoList[index].videoRoot;
      // this.newVideoIndex = index;

      this.setVideoOptions(this.newVideoUrl);
      this.toggleDisabled();
    },
    // 파일 선택창 열기
    openFileSelector() {
      // 나스모 선택창 닫고
      this.toggleSelectorVisible();

      // 파일 선택창 열기
      let input = document.createElement('input');
      input.type = 'file';
      input.accept = 'video/*';
      input.onchange = (event) => {
        // you can use this method to get file and perform respective operations
        this.handleFileChange(event);
      };
      input.click();
    },
    // 파일 선택창에서 선택한 파일 바꾸기
    handleFileChange(event) {
      const {
        target: { files },
      } = event;
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;

        this.newFile = result;

        this.setVideoOptions(this.newFile);
        this.toggleDisabled();
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    setVideoOptions(videoRoot) {
      this.videoOptions = {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: videoRoot,
            type: 'video/mp4',
          },
        ],
      };
    },
    // 게시물 업로드 하기
    async submitPost(evnet) {
      // 새로고침 방지
      evnet.preventDefault();
      console.log('submitPost');
      try {
        // 만약 파일 선택창에서 선택한 파일이 있다면
        if (this.newFile !== '') {
          const storageRef = storageService.ref().child(`post-video/${uuidv4()}`);
          const response = await storageRef.putString(this.newFile, 'data_url');
          this.newVideoUrl = await response.ref.getDownloadURL();
        }

        // 게시글 obj
        const postObj = {
          postContent: this.newContent,
          videoRoot: this.newVideoUrl,
          locations: '',
          postThumbnail: THUMBNAIL_URL,
        };

        console.log(postObj);

        // 서버로 전달
        const response = await postApi.uploadPost(postObj);

        // 만약 성공하면 (서버로부터 응답 받으면)
        if (response.status === 201) {
          // 마이 페이지로 이동. 일단 메인 페이지로 이동하도록 함
          this.$router.push('/');
        }

        this.deleteAll();
      } catch (error) {
        console.log(error);
      }
    },
    deleteAll() {
      this.newFile = '';
      this.newVideoUrl = '';
      this.newContent = '';
      this.newLocation = '';
      this.toggleDisabled();
    },
    deleteVideo() {
      this.newFile = '';
      this.newVideoUrl = '';
      this.toggleDisabled();
    },
    toggleLocationVisible(state) {
      this.isLocationVisible = state;
    },
    toggleSelectorVisible() {
      this.isSelectorVisible = !this.isSelectorVisible;
      console.log('click');
    },
    toggleDisabled() {
      this.isDisabled = !this.isDisabled;
    },
  },
  components: {
    AppHeader,
    NasmoSelector,
    // VideoPlayer,
  },
};
</script>

<style>
#upload-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  overflow: hidden;
}

.upload-container {
  max-width: 1200px;
  margin: 0px auto;
  padding-top: 11px;
  box-sizing: border-box;
}

.upload-title {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 3.5rem;
  line-height: 1;
  margin-top: 3vh;
}
.upload-sub-title {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: rgb(138, 139, 145);
  margin-top: 8px;
}

.upload-contents {
  display: flex;
  margin-top: 40px;
  box-sizing: inherit;
}

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
  color: #fa5252;
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
  transition: 0.15s ease-in-out 0s;
}
.upload-video-btn .upload-video-card i {
  width: 40px;
  height: 40px;
  font-size: 2.5rem;
  text-align: center;
}
.upload-video-card h2 {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: rgba(22, 24, 35, 0.34);
  margin-top: 29px;
}
.upload-video-card ul {
  margin: 0px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: rgba(22, 24, 35, 0.34);
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

.upload-form-container {
  margin-left: 60px;
  margin-bottom: 111px;
  width: 50vw;
  max-width: 756px;
}

.upload-cption-container {
  outline-style: none;
  position: relative;
  margin-bottom: 24px;
}
.form-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 12px;
}
.caption-text-container {
  min-height: 44px;
  position: relative;
  text-align: center;
  border: 1px solid rgba(22, 24, 35, 0.12);
  border-radius: 2px;
}
.hash-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  margin-left: 8px;
  text-align: center;
  cursor: pointer;
}

.upload-location-container {
  outline-style: none;
  position: relative;
  margin-bottom: 24px;
}

.location-input {
  min-height: 44px;
  position: relative;
  text-align: left;
  border: 1px solid rgba(22, 24, 35, 0.12);
  border-radius: 2px;
}
.location-list-wrapper {
  height: 165px;
  border: 1px solid rgba(22, 24, 35, 0.12);
  border-radius: 2px;
}
.location-result-list {
  max-height: 160px;
  overflow: scroll;
}

.form-bottom-container {
  position: absolute;
  bottom: 5%;
  right: 8%;
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
.form-bottom-container button {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  outline: none;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}
.upload-cancle-btn {
  margin-right: 32px;
  background-color: transparent;
  color: rgb(22, 24, 35);
}
.upload-post-btn {
  width: 164px;
  height: 44px;
  background-color: #fa5252;
  color: rgb(255, 255, 255);
  cursor: pointer;
}
.upload-post-btn:disabled {
  background: rgba(22, 24, 35, 0.06);
  color: rgba(22, 24, 35, 0.34);
  cursor: not-allowed;
}
.upload-post-btn:hover {
  background: #f03e3e;
}
</style>
