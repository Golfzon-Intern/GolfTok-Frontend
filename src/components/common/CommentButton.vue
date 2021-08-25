<template>
  <div class="comment-wrapper" :style="boxStyleObj">
    <div class="comment-icon" :style="iconStyleObj">
      <i class="fas fa-comment" :style="{ position: 'relative', bottom: '2px' }"></i>
    </div>
    <strong :style="textStyleObj">{{ this.numOfComments }}</strong>
  </div>
</template>

<script>
import * as commentApi from '@/api/comment';

export default {
  data() {
    return {
      numOfComments: 0,
    };
  },
  props: {
    targetId: {
      type: Number,
      default: 0,
    },
    updateState: {
      type: Number,
      default: null,
    },
    styleType: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.getNumOfComments();
  },
  watch: {
    updateState: 'setNumOfComments',
  },
  methods: {
    async getNumOfComments() {
      try {
        const response = await commentApi.getNumOfComments(this.targetId);
        this.numOfComments = response.data.commentCount !== null ? response.data.commentCount : 0;
      } catch (error) {
        console.log(error);
      }
    },
    setNumOfComments() {
      if (this.updateState !== null) {
        if (this.updateState) {
          this.numOfComments += 1;
        } else {
          this.numOfComments -= 1;
        }
      }
    },
  },
  computed: {
    boxStyleObj() {
      if (this.styleType === 0) {
        return {
          flexDirection: 'column',
        };
      } else if (this.styleType === 1) {
        return {
          flexDirection: 'row',
        };
      } else if (this.styleType === 2) {
        return {
          flexDirection: 'column',
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
          paddingTop: '4px',
          fontSize: '1.5rem',
          textAlign: 'center',
          overflow: 'hidden',
          background: '#f1f1f1',
          borderRadius: '100%',
        };
      } else if (this.styleType === 1) {
        return {
          width: '32px',
          height: '32px',
          paddingTop: '4px',
          marginRight: '6px',
          fontSize: '1.25rem',
          textAlign: 'center',
          overflow: 'hidden',
          background: '#f1f1f1',
          borderRadius: '100%',
        };
      } else if (this.styleType === 2) {
        return {
          width: '32px',
          height: '32px',
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
  display: flex;
  align-items: center;
  cursor: pointer;
}
.comment-wrapper strong {
  text-align: center;
  color: var(--text-main-color);
  font-weight: 500;
}

.comment-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
