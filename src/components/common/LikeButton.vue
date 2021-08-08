<template>
  <div class="like-wrap" :style="wrapStyleObj">
    <div class="like-icon" @click="updateLiked" :style="iconStyleObj">
      <i v-if="isLiked" class="fas fa-heart full-heart"></i>
      <i v-else class="far fa-heart empty-heart"></i>
    </div>
    <div class="like-text" :style="textStyleObj">
      <p>{{ numOfLike }}</p>
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
      wrapStyleObj: {},
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
    styleType: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.getLiked();

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
        this.wrapStyleObj = {
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

      if (likeCount && this.isLiked) {
        // 좋아요 취소
        likeCount -= 1;
        if (likeCount < 0) likeCount = 0;

        if (this.targetType === 'post') {
          // 게시물 좋아요 삭제
          // await likeApi.deletePostLiked(this.targetId);
          console.log('delete like of post');
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
.like-wrap {
  width: 100%;
  text-align: center;
}
</style>
