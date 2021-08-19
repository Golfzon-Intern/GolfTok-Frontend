<template>
  <div class="upload-form-wrapper">
    <div class="upload-cption-container">
      <h3 class="form-title-container">Caption</h3>
      <div class="form-input-container">
        <div
          class="form-text-editor"
          contenteditable="true"
          @input="handleCaptionInput"
          @focus="setIsInputFocused(true)"
          @blur="setIsInputFocused(false)"
          @keydown.space="handleSpaceKey"
          @keydown.enter="preventTextNewLine"
          style="white-space: nowrap; overflow: hidden;"
        >
          <div v-if="!isInputFocused && !newCaption.length" class="placeholder">
            How was your golf today?
          </div>
        </div>
        <div class="hash-icon">
          <i class="fas fa-hashtag"></i>
        </div>
      </div>
    </div>
    <div class="upload-club-container">
      <h3 class="form-title-container">Club</h3>
      <div class="form-input-container">
        <input class="form-text-editor" @keydown.space="test" placeholder="What club did you use today?" />
        <div class="hash-icon">
          <i class="fas fa-hashtag"></i>
        </div>
      </div>
      <div class="hashtag-container"></div>
    </div>
    <div class="upload-location-container">
      <h3 class="form-title-container">Location</h3>
      <!-- <b-form-input class="location-input" :type="'search'" v-model="newLocation" placeholder="Search location" v-on:keyup.enter="setIsListVisible(true)"></b-form-input> -->
      <input type="search" v-model="newLocation" @keyup.enter="setIsListVisible(true)" />
      <div class="location-list-wrapper" v-if="isListVisible">
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
      <button class="upload-cancle-btn" @click="clearContents">Discard</button>
      <button class="upload-post-btn" @click="submitPost" :disabled="isBtnDisabled">Post</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCaption: '',
      newClubTags: [],
      newLocation: '',
      isHashActive: false,
      isInputFocused: false,
    };
  },
  props: {
    isListVisible: Boolean,
    isBtnDisabled: Boolean,
  },
  methods: {
    handleCaptionInput(event) {
      this.newCaption = event.target.outerText;

      if (event.data === '#' && this.isHashActive === false) {
        console.log('hash tag!');
        this.isHashActive = true;

        var newHTML = '';
        this.newCaption
          .replace(/[\s]+/g, ' ')
          .trim()
          .split(' ')
          .forEach((val, index, arr) => {
            if (val[0] === '#') {
              // 해시태그를 분리하는 조건
              if (index === arr.length - 1) {
                // 만약 마지막 해시태그라면 공백을 추가하지 않는다. # 뒤에 문자가 올 거기 때문에
                newHTML += "<span class='statement'>" + val + '</span>';
              } else {
                // 이미 # 뒤에 문자가 있는 해시태그는 뒤에 공백을 추가한다.
                newHTML += "<span class='statement'>" + val + '&nbsp;</span>';
              }
            } else newHTML += "<span class='other'>" + val + '&nbsp;</span>';
          });
        event.target.innerHTML = newHTML;

        this.setCursorPosition(event);
      }
    },
    handleSpaceKey(event) {
      this.newCaption = event.target.outerText;
      console.log(event.target.outerText);
      console.log(this.isHashActive);

      if (this.isHashActive === true) {
        this.isHashActive = false;

        event.target.innerHTML += "<span class='other'>&nbsp;</span>";

        this.setCursorPosition(event);
      }
    },
    // 게시글 작성 시, 커서 위치 설정
    setCursorPosition(event) {
      // Set cursor postion to end of text
      var child = event.target.children;
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(child[child.length - 1], 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      event.target.focus();
    },
    preventTextNewLine(event) {
      event.preventDefault();
    },
    // 위치 리스트 보이는 여부 설정
    setIsListVisible(state) {
      this.$emit('setIsListVisible', state);
    },
    // 전체 삭제
    clearContents() {
      this.newCaption = '';
      this.newLocation = '';

      this.$emit('clearContents');
    },
    submitPost() {
      this.$emit('submitPost');
    },
    setIsInputFocused(state) {
      this.isInputFocused = state;
    },
    test(event) {
      event.preventDefault();
      //   let input = document.querySelector('.form-text-editor');
      let container = document.querySelector('.hashtag-container');
      //   let hashtagArray = [];
      //   let t = null;

      if (event.target.value.length > 0) {
        var text = document.createTextNode('#' + event.target.value);
        var p = document.createElement('p');
        container.appendChild(p);
        p.appendChild(text);
        p.classList.add('hashtag');
        this.newClubTags.push(event.target.value);

        event.target.value = '';

        let deleteTags = document.querySelectorAll('.hashtag');

        for (let i = 0; i < deleteTags.length; i++) {
          deleteTags[i].addEventListener('click', () => {
            container.removeChild(deleteTags[i]);
          });
        }
      }
    },
  },
};
</script>

<style>
.upload-cption-container {
  outline-style: none;
  position: relative;
  margin-bottom: 24px;
}

.form-title-container {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 12px;
}

.form-input-container {
  min-height: 44px;
  position: relative;
  /* text-align: center; */
  border: 1px solid rgba(22, 24, 35, 0.12);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.form-text-editor {
  position: relative;
  width: 100%;
  padding: 0px 80px 0px 16px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 18px;
  color: inherit;
  cursor: text;
  outline: none;
  /* background-color: aqua; */
}
.placeholder {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1;
  color: rgba(22, 24, 35, 0.5);
}
[contenteditable='true'] {
  caret-color: #fa5252;
}
.form-text-editor .statement {
  color: #fa5252;
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

.hashtag-container {
  display: flex;
  flex-flow: row wrap;
}

.hashtag {
  pointer-events: none;
  background-color: #242424;
  color: white;
  padding: 6px;
  margin: 5px;
}

.hashtag::before {
  pointer-events: all;
  display: inline-block;
  content: 'x';
  height: 20px;
  width: 20px;
  margin-right: 6px;
  text-align: center;
  color: #ccc;
  background-color: #111;
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
