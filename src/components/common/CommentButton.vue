<template>
  <div class="comment-wrapper" :style="boxStyleObj">
    <div class="comment-icon" :style="iconStyleObj">
      <i class="far fa-comment"></i>
    </div>
    <div class="comment-text" :style="textStyleObj">
      <p>33</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxStyleObj: {},
      iconStyleObj: {},
      textStyleObj: {},
    };
  },
  props: {
    styleType: {
      type: Number,
      default: 0,
    },
  },
  created() {
    switch (this.styleType) {
      case 0: // post-list
        this.iconStyleObj = {
          width: '60px',
          height: '60px',
          marginLeft: '8px',
          fontSize: '1.75rem',
          paddingTop: '0.6rem',
          borderRadius: '60px',
          background: '#dee2e6',
        };
        this.textStyleObj = {
          width: '60px',
          marginLeft: '8px',
          fontSize: '1rem',
        };
        break;
      case 1: // post-detail
        this.boxStyleObj = {
          display: 'flex',
        };
        this.iconStyleObj = {
          width: '40px',
          height: '40px',
          marginRight: '8px',
          fontSize: '1.5rem',
          paddingTop: '0.2rem',
          borderRadius: '40px',
          background: '#dee2e6',
        };
        this.textStyleObj = {
          fontSize: '1rem',
          paddingTop: '0.5rem',
        };
        break;
      default:
    }
  },
};
</script>

<style>
.comment-wrapper {
  width: 100%;
  text-align: center;
}
</style>
