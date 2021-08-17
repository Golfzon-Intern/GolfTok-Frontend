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
    <strong :style="textStyleObj">{{ this.numOfLike }}</strong>
  </div>
</template>

<script>
import * as likeApi from '@/api/like';

export default {
  data() {
    return {
      isLiked: false,
      numOfLike: 0,
    };
  },
  // props: {
  // targetType: {
  //   type: String,
  //   default: '',
  // },
  // targetId: {
  //   type: Number,
  //   default: 0,
  // },
  // styleType: {
  //   type: Number,
  //   default: 0,
  // },
  // },
  props: {
    targetType: String,
    targetId: Number,
    styleType: Number,
  },
  created() {
    this.getLiked();
    console.log(this.targetType + this.styleType + this.targetId);
  },
  methods: {
    async getLiked() {
      try {
        let response = null;

        if (this.targetType === 'post') {
          // 게시물 좋아요 수 조회
          response = await likeApi.getPostLike(this.targetId);
          console.log(this.targetType);
          console.log(this.targetId);
          console.log(response);
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

        this.numOfLike = response.data.likeCount !== null ? response.data.likeCount : 0;
      } catch (error) {
        console.log(error);
      }
    },
    async updateLiked() {
      try {
        let likeCount = this.numOfLike;

        if (this.isLiked) {
          // 좋아요 취소
          likeCount -= 1;
          if (likeCount < 0) likeCount = 0;
          if (this.targetType === 'post') {
            // 게시물 좋아요 삭제
            await likeApi.deletePostLiked(this.targetId);
            console.log('delete like of post');
          } else {
            // this.targetType === 'comment'
            // 댓글 좋아요 삭제
            await likeApi.deleteCommentLiked(this.targetId);
            console.log('delete like of comment');
          }
        } else {
          // 좋아요 추가
          likeCount += 1;
          if (this.targetType === 'post') {
            // 게시물 좋아요 추가
            await likeApi.addPostLiked(this.targetId);
            console.log('add like of post');
          } else {
            // this.targetType === 'comment'
            // 댓글 좋아요 추가
            await likeApi.addCommentLike(this.targetId);
            console.log('add like of comment');
          }
        }

        this.isLiked = !this.isLiked;
        this.numOfLike = likeCount;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    boxStyleObj() {
      if (this.styleType === 1) {
        return {
          display: 'flex',
          alignItems: 'center',
        };
      } else if (this.styleType === 2) {
        return {
          display: 'flex',
          flexDirection: 'column',
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

<style scoped>
.like-wrapper {
  cursor: pointer;
}
.like-wrapper strong {
  text-align: center;
  color: #343a40;
  font-weight: 500;
  font-family: Helvetica, Arial, sans-serif;
}
</style>
