<template>
  <div class="like-wrap">
    <div class="like-btn" @click="updateLiked">
      <i v-if="isLiked" class="fas fa-heart full-heart"></i>
      <i v-else class="far fa-heart empty-heart"></i>
    </div>
    <p>{{ numOfLike }}</p>
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
  props: {
    postId: {
      type: Number,
      default: 0,
    },
    // likeOfPost: {
    //   type: Number,
    //   default: 0,
    // }
  },
  created() {
    this.getLiked();
  },
  methods: {
    async getLiked() {
      const response = await likeApi.getPostLike(this.postId);

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

        console.log(await likeApi.deletePostLiked(this.postId));
      } else {
        // 좋아요 추가
        likeCount += 1;

        const likeObj = {
          postId: this.postId,
          likeCount: likeCount,
        };

        console.log(await likeApi.addPostLiked(likeObj));
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
  margin-right: 20px;
  text-align: center;
}
.like-wrap i {
  margin: 0 4px;
  font-size: 1.75rem;
}
.like-wrap p {
  width: 100%;
}
</style>
