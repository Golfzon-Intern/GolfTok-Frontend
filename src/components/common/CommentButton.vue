<template>
  <div class="comment-wrapper" :style="boxStyleObj">
    <div class="comment-icon" :style="iconStyleObj">
      <i class="fas fa-comment" :style="{ position: 'relative', bottom: '2px' }"></i>
    </div>
    <strong :style="textStyleObj">{{ numOfComments }}</strong>
  </div>
</template>

<script>
export default {
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
  created() {},
  computed: {
    boxStyleObj() {
      if (this.styleType === 1) {
        return {
          display: 'flex',
          alignItems: 'center',
        };
      } else {
        return {};
      }
    },
    iconStyleObj() {
      if (this.styleType === 0) {
        return {
          width: '50px',
          height: '50px',
          marginTop: '8px',
          paddingTop: '8px',
          fontSize: '1.5rem',
          textAlign: 'center',
          overflow: 'hidden',
          background: '#dee2e6',
          borderRadius: '100%',
        };
      } else if (this.styleType === 1) {
        return {
          width: '32px',
          height: '32px',
          marginRight: '6px',
          fontSize: '1.25rem',
          textAlign: 'center',
          overflow: 'hidden',
          background: '#dee2e6',
          borderRadius: '100%',
        };
      } else if (this.styleType === 2) {
        return {
          fontSize: '1.25rem',
          textAlign: 'center',
        };
      } else {
        return {};
      }
    },
    textStyleObj() {
      if (this.styleType === 0) {
        return {
          width: '100%',
          display: 'inline-block',
          marginTop: '4px',
          fontSize: '0.875rem',
          lineHeight: '17px',
          padding: '0 7px 0 8px',
        };
      } else if (this.styleType === 1) {
        return {};
      } else if (this.styleType === 2) {
        return {
          width: '100%',
          display: 'inline-block',
          marginTop: '4px',
          fontSize: '0.875rem',
          lineHeight: '17px',
          padding: '0 7px 0 8px',
        };
      } else {
        return {};
      }
    },
  },
};
</script>

<style>
.comment-wrapper {
  cursor: pointer;
}
.comment-wrapper strong {
  text-align: center;
  color: #343a40;
  font-weight: 500;
  font-family: Helvetica, Arial, sans-serif;
}
</style>
