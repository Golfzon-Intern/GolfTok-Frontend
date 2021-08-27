<template>
  <div id="upload-view">
    <div class="header-container">
      <AppHeader></AppHeader>
    </div>
    <div class="body-container" @click="toggleLocationVisible(false)">
      <div class="upload-container">
        <div class="upload-title">
          Upload Video
          <div class="upload-sub-title">
            This video will be published to @{{
              this.$store.state.auth.userInfo.userName
            }}
          </div>
        </div>
        <div class="upload-contents">
          <UploadOperation
            :videoFile="newFile"
            :videoUrl="newVideoUrl"
            @clearVideo="deleteVideo"
            @openVideoSelector="toggleSelectorVisible"
          />
          <div class="upload-form-container">
            <UploadForm
              :isListVisible="isLocationVisible"
              :isBtnDisabled="isDisabled"
              @setIsListVisible="toggleLocationVisible"
              @clearContents="deleteAll"
              @submitPost="addPost"
            />
          </div>
        </div>
      </div>
    </div>
    <NasmoSelector
      v-if="isSelectorVisible"
      @closeModal="toggleSelectorVisible"
      @clickFileBtn="openFileSelector"
      @submitSelected="selectNasmo"
    ></NasmoSelector>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { storageService } from "@/lib/firebase";
import * as postApi from "@/api/post";

import AppHeader from "@/components/AppHeader.vue";
import NasmoSelector from "@/components/NasmoSelector.vue";
import UploadOperation from "@/components/UploadOperation.vue";
import UploadForm from "@/components/UploadForm.vue";

const THUMBNAIL_URL =
  "https://firebasestorage.googleapis.com/v0/b/golftok-3275c.appspot.com/o/thumbnails%2Fthumbnail1.png?alt=media&token=693a8a6a-d028-4561-96af-50be2d8b17cc";

export default {
  data() {
    return {
      newFile: "",
      newVideoUrl: "",
      isSelectorVisible: false,
      isLocationVisible: false,
      isDisabled: true,
    };
  },
  methods: {
    /* 나스모 영상 선택하는 함수 */
    selectNasmo(videoRoot) {
      this.newVideoUrl = videoRoot;
      this.toggleDisabled();
    },
    /* 파일 선택창 여는 함수 */
    openFileSelector() {
      // 나스모 선택창 닫고
      this.toggleSelectorVisible();
      // 파일 선택창 열기
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "video/*";
      input.onchange = (event) => {
        this.handleFileChange(event);
      };
      input.click();
    },
    /* 파일 선택창에서 선택한 파일 바꾸는 함수 */
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
        this.toggleDisabled();
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    /* 게시물 업로드 하는 함수 */
    async addPost(newCaption, newClub, newLocation) {
      // 새로고침 방지
      event.preventDefault();
      try {
        // 만약 파일 선택창에서 선택한 파일이 있다면
        if (this.newFile !== "") {
          const storageRef = storageService
            .ref()
            .child(`post-video/${uuidv4()}`);
          const response = await storageRef.putString(this.newFile, "data_url");
          this.newVideoUrl = await response.ref.getDownloadURL();
        }

        // 게시글 obj
        const postObj = {
          postContent: newCaption,
          videoRoot: this.newVideoUrl,
          locations: newLocation,
          postThumbnail: THUMBNAIL_URL,
          golfClub: newClub,
        };

        // 서버로 전달
        const response = await postApi.uploadPost(postObj);

        // 만약 성공하면 (서버로부터 응답 받으면)
        if (response.status === 201) {
          // 마이 페이지로 이동
          this.openProfilePage();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /* 프로필 페이지 여는 함수 */
    openProfilePage() {
      this.$router
        .push({
          name: "Profile",
          params: { userId: this.$store.state.auth.userInfo.userId },
        })
        .catch((error) => {
          this.$router.go(this.$router.currentRoute);
          throw error;
        });
    },
    /* 작성한 모든 내용을 삭제하는 함수 */
    deleteAll() {
      this.newFile = "";
      this.newVideoUrl = "";
      this.toggleDisabled();
    },
    /* 비디오만 삭제하는 함수 */
    deleteVideo() {
      this.newFile = "";
      this.newVideoUrl = "";
      this.toggleDisabled();
    },
    /* 나스모 선택창 보이는 여부 설정하는 함수 */
    toggleSelectorVisible() {
      this.isSelectorVisible = !this.isSelectorVisible;
    },
    /*  위치 검색 결과 리스트 보이는 여부 설정하는 함수 */
    toggleLocationVisible(state) {
      this.isLocationVisible = state;
    },
    /* 게시 버튼 활성화 여부 설정하는 함수 */
    toggleDisabled() {
      this.isDisabled = !this.isDisabled;
    },
  },
  components: {
    AppHeader,
    NasmoSelector,
    UploadOperation,
    UploadForm,
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
  font-weight: 700;
  font-size: 3.5rem;
  line-height: 1;
  margin-top: 3vh;
}
.upload-sub-title {
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.3;
  color: var(--text-sub-color);
  opacity: 0.7;
  margin-top: 8px;
}

.upload-contents {
  display: flex;
  margin-top: 40px;
  box-sizing: inherit;
}

.upload-form-container {
  margin-left: 60px;
  margin-bottom: 111px;
  width: 50vw;
  max-width: 756px;
}

@media screen and (max-width: 768px) {
  #upload-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .upload-container {
    width: 100%;
    max-width: 1200px;
    padding: 8px 12px;
    box-sizing: border-box;
  }

  .upload-title {
    font-weight: 700;
    font-size: 2.5rem;
    line-height: 1;
    margin-top: 1vh;
  }
  .upload-sub-title {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.3;
    color: var(--text-sub-color);
    opacity: 0.7;
    margin-top: 8px;
  }

  .upload-contents {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .upload-form-container {
    width: 100%;
    margin: 0;
    max-width: 1200px;
  }
}
</style>
