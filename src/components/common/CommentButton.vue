<template>
  <div class="comment-wrapper" :style="boxStyleObj">
    <i class="fas fa-comment" :style="iconStyleObj"></i>
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
    numOfComments: {
      type: Number,
      default: 0,
    },
    styleType: {
      type: Number,
      default: 0,
    },
  },
  created() {
    switch (this.styleType) {
      case 0: // post-list
        this.boxStyleObj = {
          width: '50px',
          height: '50px',
          marginTop: '8px',
          background: '#dee2e6',
          padding: '13px 0',
          borderRadius: '100%',
          cursor: 'pointer',
        };
        this.iconStyleObj = {
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          fontSize: '1.5rem',
          textAlign: 'center',
        };
        break;
      case 1: // post-detail
        this.boxStyleObj = {
          width: '32px',
          height: '32px',
          marginRight: '6px',
          background: '#dee2e6',
          borderRadius: '100%',
          cursor: 'pointer',
        };
        this.iconStyleObj = {
          position: 'relative',
          top: '5px',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          fontSize: '1.25rem',
          textAlign: 'center',
          color: 'black',
        };
        break;
      default:
    }
  },
};
</script>

<style>
.comment-wrapper {
  /* width: 100%;
  text-align: center; */
  font-family: Helvetica, Arial, sans-serif;
}
</style>
