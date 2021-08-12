<template>
  <div class="like-wrapper" :style="boxStyleObj">
    <div class="like-icon" @click="updateLiked" :style="iconStyleObj">
      <div v-if="isLiked">
        <i class="fas fa-heart full-heart" :style="{ color: '#f03e3e', textShadow: '1px 1px 2px #868e96' }"></i>
      </div>
      <div v-else>
        <i v-if="styleType === 2" class="far fa-heart"></i>
        <i v-else class="fas fa-heart full-heart"></i>
      </div>
    </div>
  </div>
</template>

<script>
import * as likeApi from '@/api/like';

export default {
  data() {
    return {
      isLiked: false,
      numOfLike: 0,
      boxStyleObj: {},
      iconStyleObj: {},
    };
  },
  props: {
    targetId: {
      type: Number,
      default: 0,
    },
    targetOrder: {
      type: Number,
      default: 0,
    },
    styleType: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.getLiked();

    switch (this.styleType) {
      case 0: // post-list
        this.boxStyleObj = {
          width: '50px',
          height: '50px',
          marginTop: '8px',
          padding: '11px 0',
          background: '#dee2e6',
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
          bottom: '2px',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          fontSize: '1.25rem',
          textAlign: 'center',
          color: 'black',
        };
        break;
      case 2: // comment
        this.iconStyleObj = {
          fontSize: '1.25rem',
        };
        break;
      default:
    }
  },
  methods: {
    async getLiked() {
      let response = null;

      if (response && this.targetType === 'post') {
        // 게시물 좋아요 수 조회
        response = await likeApi.getPostLike(this.targetId);
      } else {
        // this.targetType === 'comment'
        // 댓글 좋아요 수 조회
        response = await likeApi.getCommentLike(this.targetId);
      }

      // 0: 좋아요 되어있는 상태, 1: 좋아요 안 되어 있는 상태
      if (!response.data.flag) {
        this.isLiked = true;
      } else {
        this.isLiked = false;
      }

      this.numOfLike = response.data.likeCount;
    },
    async updateLiked() {
      let likeCount = this.numOfLike;

      if (likeCount && this.isLiked) {
        // 좋아요 취소
        likeCount -= 1;
        if (likeCount < 0) likeCount = 0;
        this.$emit('updateLiked', false, this.targetOrder);
      } else {
        // 좋아요 추가
        likeCount += 1;
        this.$emit('updateLiked', true, this.targetOrder);
      }

      this.isLiked = !this.isLiked;
      this.numOfLike = likeCount;
    },
  },
};
</script>

<style scoped>
.like-wrapper {
  /* width: 100%;
  text-align: center; */
  font-family: Helvetica, Arial, sans-serif;
}
</style>
