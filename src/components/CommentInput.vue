<template>
  <div class="comment-input-wrapper">
    <div class="comment-text-input" :style="boxStyleObj">
      <div v-if="replyTo.userName" class="comment-to">Reply to @{{ this.replyTo.userName }} :</div>
      <input ref="inputRef" type="text" v-model="newText" placeholder="Add comment..." @keyup.enter="submitText" @focus="setIsFocus" @blur="setIsFocus" />
    </div>
    <div class="comment-post-btn">
      <button @click="submitText">Post</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newText: '',
      isFocus: false,
    };
  },
  props: {
    replyTo: {},
  },
  updated() {
    if (this.replyTo.userName) this.$refs.inputRef.focus();
  },
  computed: {
    boxStyleObj() {
      if (this.isFocus) {
        return {
          border: '1px solid #ced4da',
          borderRadius: '8px',
        };
      } else {
        return {};
      }
    },
    isChild() {
      if (this.replyTo) {
        return this.replyTo.group;
      } else {
        return false;
      }
    },
  },
  methods: {
    submitText() {
      if (this.newText.length) {
        this.$emit('submitComment', this.newText, this.isChild);
        this.clearText();
      }
    },
    clearText() {
      this.newText = '';
    },
    setIsFocus() {
      this.isFocus = !this.isFocus;
    },
  },
};
</script>

<style>
.comment-input-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  margin-bottom: -5px;
  font-family: Helvetica, Arial, sans-serif;
}

.comment-text-input {
  position: relative;
  width: 80%;
  height: 45px;
  box-sizing: border-box;
  background: #e9ecef;
  border: 1px solid transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding-left: 8px;
}
.comment-text-input input {
  padding: 0 8px;
  border: none;
  background: none;
  /* width: 100%; */
  flex: 1 1 auto;
  height: 100%;
  caret-color: #fa5252;
}
.comment-text-input input:focus {
  outline: none;
  /* border: 1px solid #ced4da;
  border-radius: 8px; */
}

.comment-post-btn {
  width: 20%;
  height: 45px;
}
.comment-post-btn button {
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  font-size: 0.875rem;
  color: #212529;
  opacity: 0.5;
}
</style>
