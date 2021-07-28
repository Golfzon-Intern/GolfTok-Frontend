<template>
  <!-- <div class="uploadView">
    <AppHeader></AppHeader>
    <form @submit="handleFileSave">
      <input id="attachment" type="file" accept="video/*" @change="handleFileChange" /> -->
  <!-- <input id="content" type="text" /> -->
  <!-- <textarea id="content" cols="30" rows="10" placeholder="내용을 입력하세요." v-model="newContent"></textarea>
      <input type="submit" />
    </form>
  </div> -->
  <div id="upload-view">
    <AppHeader></AppHeader>
    <div class="post-box">
      <div class="post-header">
        <h2>동영상 업로드</h2>
        <p>@{{ this.$store.state.auth.userInfo.userName }}님의 골프 영상이 게시됩니다.</p>
      </div>
      <div class="post-body">
        <div class="video-box">
          <div v-if="newAttachment" class="video-player">
            <video :src="this.newAttachment" type="video/mp4" autoplay="true" controls="controls"></video>
          </div>
          <button v-else class="video-selector" @click="openUploaderModal">
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
          <!-- <textarea name="content" id="content-input" cols="100" rows="7"></textarea> -->
          <b-form-textarea class="content-input" v-model="newContent" placeholder="문구 입력..." rows="7" no-resize></b-form-textarea>
          <!-- <input type="text" class="location-input" placeholder="location search ..." style="width: 50%" /> -->
          <b-form-input class="location-input" :type="'search'" v-model="newLocation" placeholder="location search ..." v-on:keyup.enter="setIsSelectorVisible"></b-form-input>
          <div class="location-list" v-if="isSelectorVisible">
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
            <!-- <button>Cancle</button> -->
            <!-- <button>Upload</button> -->
            <button class="cancle-btn">Cancle</button>
            <button class="post-btn">Post</button>
            <!-- <b-button pill>Button</b-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { storageService } from '@/lib/firebase';
import * as postApi from '@/api/post';

import AppHeader from '@/components/AppHeader.vue';
// import VideoPlayer from '@/components/common/VideoPlayer.vue';

export default {
  data() {
    return {
      newAttachment: '',
      newAttachmentUrl: '',
      newContent: '',
      newLocation: '',
      isSelectorVisible: false,
    };
  },
  methods: {
    openUploaderModal() {
      let input = document.createElement('input');
      input.type = 'file';
      input.onchange = (event) => {
        // you can use this method to get file and perform respective operations
        let files = Array.from(input.files);
        console.log(files);
        this.handleFileChange(event);
      };
      input.click();
    },
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

        this.newAttachment = result;
        console.log(result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    async handleFileSave(evnet) {
      evnet.preventDefault();
      console.log('handleFileSave');

      try {
        if (this.newAttachment !== '') {
          const storageRef = storageService.ref().child(`post-video/${uuidv4()}`);
          const response = await storageRef.putString(this.newAttachment, 'data_url');
          this.newAttachmentUrl = await response.ref.getDownloadURL();
        }

        const postObj = {
          postContent: this.newContent,
          videoRoot: this.newAttachmentUrl,
          locations: '',
        };

        console.log(postObj);

        const response = await postApi.uploadPost(postObj);
        console.log(response);
        // 만약 성공하면 (서버로부터 응답 받으면)

        this.newAttachment = '';
        this.newAttachmentUrl = '';
        this.newContent = '';
      } catch (error) {
        console.log(error);
      }
    },
    setIsSelectorVisible() {
      this.isSelectorVisible = !this.isSelectorVisible;
    },
  },
  components: {
    AppHeader,
    // VideoPlayer,
  },
};
</script>

<style>
#upload-view {
  padding: 5px;
  font-family: 'Nunito', sans-serif;
}
.post-box {
  position: relative;
  left: 4rem;
  width: 90%;
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
  background-color: #212529;
}
.video-player video {
  width: 26vw;
  min-width: 300px;
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
.cancle-btn {
  margin-right: 12px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: #868e96;
}
.cancle-btn:hover {
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
.post-btn:hover {
  background-color: #5557ec;
}
</style>
