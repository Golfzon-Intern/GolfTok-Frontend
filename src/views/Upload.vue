<template>
  <div class="uploadView">
    <AppHeader></AppHeader>
    <form @submit="handleFileSave">
      <input id="attachment" type="file" accept="video/*" @change="handleFileChange" />
      <!-- <input id="content" type="text" /> -->
      <textarea id="content" cols="30" rows="10" placeholder="내용을 입력하세요." v-model="newContent"></textarea>
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { storageService } from '@/lib/firebase';
import * as postApi from '@/api/post';

import AppHeader from '@/components/AppHeader.vue';

export default {
  data() {
    return {
      newAttachment: '',
      newAttachmentUrl: '',
      newContent: '',
    };
  },
  methods: {
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
        //console.log(this.newAttachment);
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
  },
  components: {
    AppHeader,
  },
};
</script>

<style>
label {
  color: red;
}
</style>
