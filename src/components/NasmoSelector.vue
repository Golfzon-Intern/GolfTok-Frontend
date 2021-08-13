<template>
  <div id="nasmo-modal-container">
    <div class="nasmo-modal-wrapper">
      <div class="nasmo-modal-container">
        <div class="nasmo-modal-header">
          <h3 class="nasmo-modal-title">Nasmo videos</h3>
          <button class="nasmo-modal-close-btn" @click="toggleVisible">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="nasmo-modal-body">
          <div class="nasmo-video-list">
            <div class="nasmo-video-item" v-for="(videoItem, index) in videoList" v-bind:key="index">
              <b-form-radio v-model="selectedIndex" :aria-describedby="videoItem" name="some-radios" :value="index" @change="changeSelected(index)" />
              <img v-bind:src="videoItem.nasmoThumbnail" />
            </div>
          </div>
        </div>

        <div class="nasmo-modal-footer">
          <div class="btn-wrapper">
            <button class="another-video-btn" @click="onClickFileBtn">Another video</button>
            <button class="select-video-btn" @click="saveSelected(selectedIndex)">Select</button>
          </div>
        </div>
      </div>
    </div>
    <div class="nasmo-modal-mask"></div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selectedIndex: 0,
    };
  },
  props: {
    // selected: Number,
    videoList: [],
  },
  methods: {
    toggleVisible() {
      this.$emit('toggleVisible');
    },
    onClickFileBtn() {
      this.$emit('onClickFileBtn');
    },
    changeSelected(index) {
      this.selectedIndex = index;
    },
    saveSelected(selectedIndex) {
      this.$emit('saveSelected', selectedIndex);
      this.toggleVisible();
    },
  },
};
</script>

<style>
#nasmo-modal-container {
  position: fixed;
  inset: 0px;
  z-index: 10010;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
}

.nasmo-modal-mask {
  position: absolute;
  z-index: -1;
  inset: 0px;
  background: rgba(0, 0, 0, 0.5);
}

.nasmo-modal-wrapper {
  overflow: hidden;
  display: block;
  position: relative;
  width: 70%;
  height: 80%;
  min-height: 700px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.nasmo-modal-container {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
}

.nasmo-modal-header {
  width: 100%;
  height: 48px;
  font-size: 1.5rem;
  line-height: 32px;
  margin-bottom: 0;
  flex-shrink: 0;
  padding: 0 20px 90px 22px;
  color: #fff;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: relative;
}
.nasmo-modal-header h3 {
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  line-height: 32px;
  flex: 1;
  text-align: center;
  font-weight: bolder;
  color: #000;
}
.nasmo-modal-close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  z-index: 2;
  display: inline-flex;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  background: rgba(22, 24, 35, 0.05);
  padding-top: 6px;
  padding-left: 9px;
}
.nasmo-modal-close-btn i {
  font-size: 1.25rem;
}

.nasmo-modal-body {
  flex: 1;
  width: 100%;
  min-height: 500px;
  height: 60vh;
  max-height: 570px;
  margin: 0 auto;
  padding: 0 48px;
  box-sizing: border-box;
  position: relative;
  overflow: scroll;
}

.nasmo-video-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 12px 0;
  margin-bottom: 12px;
}
.nasmo-video-item {
  display: flex;
  width: 25vw;
  height: auto;
}
.nasmo-video-item img {
  width: 100%;
  height: 100%;
}

.nasmo-modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
}
.nasmo-modal-footer .btn-wrapper {
  position: absolute;
  right: 48px;
  bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nasmo-modal-footer button {
  border: none;
  cursor: pointer;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 700;
}
.another-video-btn {
  right: 20%;
  bottom: 12px;
  font-size: 1rem;
  line-height: 18px;
  color: #161823;
  padding: 0 24px;
  background-color: #fff;
}
.another-video-btn:hover {
  text-decoration: underline;
  color: #fa5252;
}
.select-video-btn {
  right: 10%;
  bottom: 12px;
  width: 200px;
  height: 40px;
  font-size: 1rem;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #fa5252;
  color: #fff;
}
.select-video-btn:hover {
  background-color: #f03e3e;
}
</style>
