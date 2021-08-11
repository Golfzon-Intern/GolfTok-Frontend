<template>
  <div class="comment-wrapper" :style="boxStyleObj">
    <i class="fas fa-comment" :style="iconStyleObj"></i>
    <!-- <strong :style="textStyleObj">{{ numOfComments }}</strong> -->
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
          marginTop: '8px',
          background: '#dee2e6',
          padding: '13px 0',
          borderRadius: '100%',
          cursor: 'pointer',
          width: '50px',
          height: '50px',
        };
        this.iconStyleObj = {
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          fontSize: '1.5rem',
          textAlign: 'center',
        };
        // this.textStyleObj = {
        //   width: '100%',
        //   display: 'inline-block',
        //   textAlign: 'center',
        //   marginTop: '12px',
        //   color: 'rgba(22, 24, 35, 0.75)',
        //   fontWeight: '600',
        //   fontSize: '0.875rem',
        //   lineHeight: '17px',
        //   padding: '0px 7px 0px 8px',
        // };
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
  /* width: 100%;
  text-align: center; */
  font-family: Helvetica, Arial, sans-serif;
}
</style>
