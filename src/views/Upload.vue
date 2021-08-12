<template>
  <div id="upload-view">
    <div class="header-container">
      <AppHeader></AppHeader>
    </div>
    <div class="body-container">
      <!-- <div class="upload-container">
        <div class="upload-title">
          Upload Video
          <div class="upload-sub-title">This video will be published to @{{ this.$store.state.auth.userInfo.userName }}</div>
        </div>
        <div class="upload-contents">
          <div class="upload-operation">
            <div class="upload-video-btn">
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
          <div class="upload-form">
            <div class="upload-cption-container">
              <h3 class="caption-title-container">Caption</h3>
              <div class="caption-text-container">
                <b-form-textarea class="content-input" v-model="newContent" placeholder="문구 입력..." rows="7" no-resize></b-form-textarea>
                <div class="hash-icon">
                  <i class="fas fa-hashtag"></i>
                </div>
              </div>
            </div>
            <div class="upload-location-container"></div>
            <div class="form-bottom-container"></div>
          </div>
        </div>
      </div> -->

      <div class="post-header">
        <h2>동영상 업로드</h2>
        <p>@{{ this.$store.state.auth.userInfo.userName }}님의 골프 영상이 게시됩니다.</p>
      </div>
      <div class="post-body">
        <div class="video-box">
          <div v-if="newFile || newVideoUrl" class="video-player">
            <button class="delete-video-btn" @click="deleteVideo">
              <i class="fas fa-times-circle"></i>
            </button>
            <video :src="this.newVideoUrl || this.newFile" type="video/mp4" autoplay="true" controls="controls"></video>
          </div>
          <button v-else class="video-selector" @click="toggleSelectorVisible">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>업로드할 동영상 선택</p>
            <ul>
              <li>MP4 또는 WebM</li>
              <li>720x1280 해상도 이상</li>
              <li>최대 180초</li>
            </ul>
          </button>
        </div>

        <div class="content-box">
          <b-form-textarea class="content-input" v-model="newContent" placeholder="문구 입력..." rows="7" no-resize></b-form-textarea>
          <b-form-input class="location-input" :type="'search'" v-model="newLocation" placeholder="location search ..." v-on:keyup.enter="toggleLocationVisible"></b-form-input>
          <div class="location-list" v-if="isLocationVisible">
            <b-list-group>
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

          <div class="button-box">
            <button class="cancel-btn" @click="deleteAll">취소</button>
            <button class="post-btn" @click="submitPost" v-bind:disabled="isDisabled">게시</button>
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
    toggleLocationVisible() {
      this.isLocationVisible = !this.isLocationVisible;
    },
    toggleSelectorVisible() {
      this.isSelectorVisible = !this.isSelectorVisible;
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
}

#upload-view .body-container {
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
}

.upload-container {
  max-width: 1200px;
  margin: 0px auto;
  padding-top: 11px;
  box-sizing: inherit;
}

.upload-title {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 3.5rem;
  line-height: 1;
  margin-top: 60px;
}
.upload-sub-title {
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 24px;
  color: #495057;
  margin-top: 2px;
}

.upload-contents {
  display: flex;
  margin-top: 40px;
  box-sizing: inherit;
}

.upload-operation {
  height: 100%;
}

.upload-video-btn {
  cursor: pointer;
  text-align: center;
}

.upload-video-card {
  width: 306px;
  height: 544px;
  background: rgba(22, 24, 35, 0.03);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: 0.15s ease-in-out 0s;
}
.upload-video-card i {
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

.upload-form {
  margin-left: 60px;
  margin-bottom: 111px;
}

.post-header {
  display: flex;
}
.post-header h2 {
  margin: 8px 0;
  font-weight: 600;
  color: #343a40;
}
.post-header p {
  margin: 8px 0;
  color: #495057;
}
.post-body {
  display: flex;
  width: 100%;
  height: 78vh;
  margin: 8px 0;
}
.video-box {
  display: flex;
  width: 30%;
  min-width: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.video-selector {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  border-radius: 3rem;
  border: none;
  color: #868e96;
}
.video-selector i {
  margin-bottom: 1rem;
  font-size: 2.5rem;
}
.video-selector p {
  font-size: 1.4rem;
}
.video-selector ul {
  text-align: left;
}
.video-player {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3rem;
  background-color: #212529;
}
.video-player video {
  width: 26vw;
  min-width: 300px;
}
.delete-video-btn {
  position: absolute;
  left: -20px;
  top: 60px;
  border: none;
  background: rgba(0, 0, 0, 0);
}
.delete-video-btn i {
  font-size: 2rem;
  color: #c92a2a;
}
.content-box {
  width: 65%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
}
.content-input {
  margin-top: 3%;
}
.location-input {
  display: block;
  margin-top: 3%;
}
.location-list {
  margin-top: 4px;
  max-height: 210px;
  margin-bottom: 10px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.button-box {
  position: absolute;
  bottom: 30px;
  display: flex;
  align-self: flex-end;
}
.cancel-btn {
  margin-right: 12px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: #868e96;
}
.cancel-btn:hover {
  color: #495057;
}
.post-btn {
  margin-left: 12px;
  width: 150px;
  height: 50px;
  border-radius: 50px;
  border: none;
  background-color: #5d5fef;
  color: #f8f9fa;
}
.post-btn:disabled {
  background-color: #868e96;
}
.post-btn:enabled:hover {
  background-color: #5557ec;
}
</style>
