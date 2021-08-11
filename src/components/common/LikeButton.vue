<template>
  <div class="like-wrapper" :style="boxStyleObj">
    <div class="like-icon" @click="updateLiked" :style="iconStyleObj">
      <i class="fas fa-heart full-heart" :style="[isLiked ? { color: '#f03e3e', textShadow: '1px 1px 2px #868e96' } : { color: 'inherit' }]"></i>
      <!-- <i v-else class="far fa-heart empty-heart"></i> -->
    </div>
    <!-- <strong :style="textStyleObj">{{ numOfLike }}</strong> -->
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
      textStyleObj: {},
    };
  },
  props: {
    targetType: {
      type: String,
      default: 'post',
    },
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
          marginTop: '8px',
          background: '#dee2e6',
          padding: '11px 0',
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
        //   marginTop: '20px',
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
          paddingTop: '0.25rem',
          borderRadius: '40px',
          background: '#dee2e6',
        };
        this.textStyleObj = {
          fontSize: '1rem',
          paddingTop: '0.5rem',
        };
        break;
      case 2: // comment
        this.iconStyleObj = {
          fontSize: '1.25rem',
        };
        this.textStyleObj = {
          fontSize: '0.75rem',
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
      console.log('btn:' + likeCount);

      if (likeCount && this.isLiked) {
        // 좋아요 취소
        likeCount -= 1;
        if (likeCount < 0) likeCount = 0;

        if (this.targetType === 'post') {
          // 게시물 좋아요 삭제
          // await likeApi.deletePostLiked(this.targetId);
          console.log('delete like of post');
          this.$emit('updateLiked', false, this.targetOrder);
        } else {
          // this.targetType === 'comment'
          // 댓글 좋아요 삭제
          // await likeApi.deleteCommentLiked(this.targetId);
          console.log('delete like of comment');
        }
      } else {
        // 좋아요 추가
        likeCount += 1;

        if (this.targetType === 'post') {
          // 게시물 좋아요 추가
          // await likeApi.addPostLiked(this.targetId);
          console.log('add like of post');
          this.$emit('updateLiked', true, this.targetOrder);
        } else {
          // this.targetType === 'comment'
          // 댓글 좋아요 추가
          // await likeApi.addCommentLike(this.targetId);
          console.log('add like of comment');
        }
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
