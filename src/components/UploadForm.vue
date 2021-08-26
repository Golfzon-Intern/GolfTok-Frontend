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
          @keyup.space="handleSpaceKey"
          @keydown.enter="preventTextNewLine"
          style="white-space: nowrap; overflow: hidden;"
        >
          <div v-if="!isInputFocused && !newCaption.length" class="placeholder">
            How was your golf today?
          </div>
        </div>
      </div>
    </div>
    <div class="upload-club-container">
      <h3 class="form-title-container">Club</h3>
      <div class="form-input-container">
        <input class="form-text-editor" @keyup.space="addClubTag" placeholder="What club did you use today?" />
      </div>
      <div class="club-tag-container">
        <div class="club-tags" v-for="(tag, index) of newClubTags" :key="index" @click="deleteClubTag(index)">{{ tag }}</div>
      </div>
    </div>
    <div class="upload-location-container">
      <h3 class="form-title-container">Location</h3>
      <div class="form-input-container">
        <input class="form-text-editor" type="search" v-model="newLocation" @keyup.enter="getLocationInfos()" placeholder="Where did you play golf today?" />
      </div>
      <div class="location-list-wrapper" v-if="isListVisible">
        <div class="location-item-wrapper" v-for="(item, index) of LocationSearchList" :key="index" @click="selectLocation(index)">
          <span class="location-item-title">{{ item.title }}</span>
          <span class="location-item-category">{{ item.category }}</span>
          <p class="location-item-address">{{ item.address }}</p>
        </div>
      </div>
    </div>
    <div class="form-bottom-container">
      <button class="upload-cancle-btn" @click="clearContents">Discard</button>
      <button class="upload-post-btn" @click="submitPost" :disabled="isBtnDisabled">Post</button>
    </div>
  </div>
</template>

<script>
import * as searchApi from '@/api/search';

export default {
  data() {
    return {
      newCaption: '',
      newClubTags: [],
      newLocation: '',
      LocationSearchList: [],
      isHashActive: false,
      isInputFocused: false,
    };
  },
  props: {
    isListVisible: Boolean,
    isBtnDisabled: Boolean,
  },
  watch: {
    isListVisible: 'clearLocationList',
  },
  methods: {
    /* 텍스트 입력 동작 설정 (@input) */
    handleCaptionInput(event) {
      this.newCaption = event.target.outerText;

      if (event.data === '#' && this.isHashActive === false) {
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
                newHTML += "<span class='statement'>" + val + ' ' + '</span>';
              }
            } else newHTML += "<span class='other'>" + val + ' ' + '</span>';
          });
        event.target.innerHTML = newHTML;

        this.setCursorPosition(event);
      }
    },
    /* 스페이스바 누를 때 동작 설정 (@keyup.space) */
    handleSpaceKey(event) {
      this.newCaption = event.target.outerText;

      if (this.isHashActive === true) {
        this.isHashActive = false;

        event.target.innerHTML += "<span class='other'>&nbsp;</span>";

        this.setCursorPosition(event);
      }
    },
    /* 텍스트 입력할 때, 커서 위치 설정하는 함수 */
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
    /* 엔터키 기본 동작인 줄바꿈 막기 (@keyup.enter) */
    preventTextNewLine(event) {
      event.preventDefault();
    },
    /* 텍스트 입력칸 클릭 시, 포커싱하는 함수 */
    setIsInputFocused(state) {
      this.isInputFocused = state;
    },
    /* 클럽 태그 추가하는 함수 */
    addClubTag(event) {
      event.preventDefault();
      let value = event.target.value.trim();

      if (value.length > 0) {
        value = value[0] === '#' ? value : '#' + value;

        this.newClubTags.push(value);

        event.target.value = '';
      }
    },
    /* 클럽 태그 삭제하는 함수 */
    deleteClubTag(id) {
      event.target.remove();
      this.newClubTags = this.newClubTags.filter((tag, index) => id !== index);
    },
    /* 위치 검색 결과 리스트 보이는 여부 설정하는 함수 */
    setIsListVisible(state) {
      this.$emit('setIsListVisible', state);
    },
    /* 위치 검색 결과 정보 받아오는 함수 */
    async getLocationInfos() {
      try {
        const response = await searchApi.getLocation(this.newLocation);
        const data = response.data.items;

        if (data.length) {
          for (const item of data) {
            const locationObj = {
              title: this.setLocationText(item.title),
              category: item.category,
              address: item.roadAddress,
            };
            this.LocationSearchList.push(locationObj);
          }
        }

        this.setIsListVisible(true);
      } catch (error) {
        console.log(error);
      }
    },
    /* 위치 검색 결과 텍스트 설정 함수 (<b></b> 태그 지우기) */
    setLocationText(text) {
      const locReg = /<[b]>|<[\\/][b]>/g;
      const newText = text
        .split(locReg)
        .join(' ')
        .trim();
      return newText;
    },
    /* 위치 선택 함수 */
    selectLocation(selectedIndex) {
      const selected = this.LocationSearchList[selectedIndex].title + ' (' + this.LocationSearchList[selectedIndex].address + ')';

      this.newLocation = selected;
    },
    /* 위치 검색 결과 리스트 초기화 함수 */
    clearLocationList() {
      if (!this.isListVisible) this.LocationSearchList = [];
    },
    /* 작성한 내용 초기화 함수 */
    clearContents() {
      this.newCaption = '';
      this.newLocation = '';

      this.$emit('clearContents');
    },
    /* 작성한 내용 submit 함수 */
    submitPost() {
      const newClubInfo = this.newClubTags.join(' ');
      this.$emit('submitPost', this.newCaption, newClubInfo, this.newLocation);
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
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.125;
  color: inherit;
  cursor: text;
  outline: none;
  /* background-color: aqua; */
}
.placeholder {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1;
  color: var(--text-sub-color);
  opacity: 0.5;
}
[contenteditable='true'] {
  caret-color: var(--accent-main-color);
}
.form-text-editor .statement {
  color: var(--accent-main-color);
}

.upload-club-container {
  outline-style: none;
  position: relative;
  margin-bottom: 24px;
}

.form-input-container input {
  height: 44px;
  border: none;
}
.form-input-container input::placeholder {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1;
  color: var(--text-sub-color);
  opacity: 0.5;
}

.club-tag-container {
  display: flex;
  flex-flow: row wrap;
  min-height: 50px;
}

.club-tags {
  pointer-events: none;
  background-color: var(--supplement-color);
  border-radius: 4px;
  color: var(--accent-main-color);
  padding: 6px;
  margin: 5px;
}

.club-tags::before {
  pointer-events: all;
  display: inline-block;
  content: 'x';
  height: 20px;
  width: 20px;
  margin-right: 6px;
  text-align: center;
  color: var(--accent-main-color);
  background-color: none;
  cursor: pointer;
}

.upload-location-container {
  outline-style: none;
  position: relative;
  margin-bottom: 24px;
  height: 25vh;
}

.location-list-wrapper {
  height: 56%;
  border: 1px solid rgba(22, 24, 35, 0.12);
  border-radius: 2px;
  overflow: scroll;
  overflow-x: hidden;
}

.location-item-wrapper {
  width: 100%;
  height: 55px;
  padding: 4px;
  cursor: pointer;
  border-bottom: 1px solid rgba(22, 24, 35, 0.12);
}

.location-item-title {
  margin-right: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent-main-color);
}
.location-item-category {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--text-sub-color);
}
.location-item-address {
  margin-top: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-sub-color);
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
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.125;
  outline: none;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}
.upload-cancle-btn {
  margin-right: 32px;
  background-color: transparent;
  color: var(--text-sub-color);
}
.upload-post-btn {
  width: 164px;
  height: 44px;
  background-color: var(--accent-main-color);
  color: #fff;
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

@media screen and (max-width: 768px) {
  .upload-form-wrapper {
    margin-top: 24px;
  }

  .form-bottom-container {
    position: relative;
    left: 0;
    margin: 32px 0 16px 0;
    display: flex;
    justify-content: center;
  }
}
</style>
