<template>
  <button class="login-btn" :style="styleObj" @mouseenter="setIsHover(true)" @mouseleave="setIsHover(false)" @click="clickButton">Log in</button>
</template>

<script>
export default {
  data() {
    return {
      buttonColor: {
        fullBackd: '#f03e3e',
        fullBackdHover: '#e03131',
        fullBorder: 'none',
        fullText: '#fff',
        emptyBackd: '#fff',
        emptyBackdHover: '#fff5f5',
        emptyBorder: '1px solid #f03e3e',
        emptyText: '#f03e3e',
      },
      buttonSize: {
        smallWidth: '100px',
        smallHeight: '36px',
        largeWidth: '300px',
        largeHeight: '40px',
      },
      isHover: false,
    };
  },
  props: {
    styleType: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    /* hover 여부 설정하는 함수 */
    setIsHover(state) {
      this.isHover = state;
    },
    /* click 했을 때, 호출되는 함수 */
    clickButton() {
      this.$emit('clickButton');
    },
  },
  computed: {
    styleObj() {
      let colorType = '';
      let sizeType = '';
      let state = '';

      if (this.styleType === 0) {
        colorType = 'full';
        sizeType = 'small';
      } else if (this.styleType === 1) {
        colorType = 'empty';
        sizeType = 'large';
      } else if (this.styleType === 2) {
        colorType = 'full';
        sizeType = 'large';
      }

      if (this.isHover) state = 'Hover';

      return {
        width: this.buttonSize[sizeType + 'Width'],
        height: this.buttonSize[sizeType + 'Height'],
        background: this.buttonColor[colorType + 'Backd' + state],
        border: this.buttonColor[colorType + 'Border'],
        color: this.buttonColor[colorType + 'Text'],
      };
    },
  },
};
</script>

<style>
.login-btn {
  font-weight: 700;
  height: 40px;
  font-size: 1rem;
  line-height: 1.4;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
