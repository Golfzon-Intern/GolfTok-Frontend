<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Login
            </slot>
            <i class="fas fa-times close-btn" v-on:click="toggleVisible"></i>
          </div>

          <div class="modal-body">
            <p>{{ selectedIndex }}</p>
            <ul class="nasmo-list">
              <li class="nasmo-item" v-for="(value, index) in videoList" v-bind:key="index">
                <b-form-radio v-model="selectedIndex" :aria-describedby="value" name="some-radios" v-bind:value="index" @change="changeSelected(index)" />
                <img v-bind:src="value.nasmoThumbnail" />
              </li>
            </ul>
          </div>

          <div class="modal-footer">
            <button class="file-btn" @click="onClickFileBtn">다른 영상 선택하기</button>
            <button class="select-btn" @click="saveSelected(selectedIndex)">선택 완료</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 70%;
  height: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.close-btn {
  cursor: pointer;
}

.modal-body {
  height: 60vh;
  margin: 20px 0;
  overflow: scroll;
}
.nasmo-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}
.nasmo-list img {
  width: 370px;
  height: 220px;
}
.nasmo-item {
  display: flex;
  gap: 10px;
}

.modal-footer {
  padding: 8px 12px;
}
.file-btn {
  margin-right: 12px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: #868e96;
}
.file-btn:hover {
  color: #495057;
}
.select-btn {
  margin-left: 12px;
  width: 150px;
  height: 50px;
  border-radius: 50px;
  border: none;
  background-color: #5d5fef;
  color: #f8f9fa;
}
.select-btn:hover {
  background-color: #5557ec;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
