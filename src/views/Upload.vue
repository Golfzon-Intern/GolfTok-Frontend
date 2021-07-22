<template>
  <div class="uploadView">
    <form @submit="handleFileSave">
      <input
        id="attachment"
        type="file"
        accept="video/*"
        @change="handleFileChange"
      />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { storageService } from '../lib/firebase';

export default {
  data() {
    return {
      newAttachment: '',
      newAttachmentUrl: '',
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

      if (this.newAttachment !== '') {
        const storageRef = storageService.ref().child(`post-video/${uuidv4()}`);
        const response = await storageRef.putString(
          this.newAttachment,
          'data_url'
        );
        this.newAttachmentUrl = await response.ref.getDownloadURL();
      }

      const postObj = {
        postContent: '',
        videoRoot: this.newAttachmentUrl,
        locations: '',
      };

      console.log(postObj);
      console.log(this.$http);

      this.$http
        .post('/golftok/uploadPost', postObj)
        .then((res) => {
          console.log(res);
          this.newAttachment = '';
          this.newAttachmentUrl = '';
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
label {
  color: red;
}
</style>
