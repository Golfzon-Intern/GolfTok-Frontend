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
      const response = await likeApi.getIsLiked(this.postId);

      if (response.data.flag) {
        this.isLiked = true;
      } else {
        this.isLiked = false;
      }

      this.numOfLike = response.data.likeCount;
    },
    async updateLiked() {
      this.isLiked = !this.isLiked;

      const response = await likeApi.updateIsLiked(this.postId, this.postId);
      this.numOfLike = response.data.likeCount;
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
