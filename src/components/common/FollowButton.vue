<template>
  <div class="follow-btn-wrapper">
    <button v-if="isFollowing" class="follow-basic-btn" @click="updateFollowing">Following</button>
    <button v-else class="follow-active-btn" @click="updateFollowing">Follow</button>
  </div>
</template>

<script>
import * as followApi from '@/api/follow';

export default {
  data() {
    return {
      isFollowing: false,
    };
  },
  props: {
    targetId: Number,
  },
  created() {
    this.getFollowing();
  },
  methods: {
    async getFollowing() {
      try {
        const response = await followApi.getFollowing(this.targetId);
        this.isFollowing = Boolean(response.data.following);
      } catch (error) {
        console.log(error);
      }
    },
    updateFollowing() {
      try {
        if (this.isFollowing) {
          // 팔로잉 취소
          this.isFollowing = false;
          console.log('delete following');
          followApi.deleteFollowing(this.targetId);
        } else {
          // 팔로잉 추가
          this.isFollowing = true;
          console.log('add following');
          followApi.addFollowing(this.targetId);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.follow-btn-wrapper {
  overflow: hidden;
  /* width: 30%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center; */
}
.follow-btn-wrapper button {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  line-height: 22px;
  min-width: 88px;
  padding: 0 10px;
  height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 4px;
}

.follow-basic-btn {
  background-color: #fff;
  border: 1px solid rgba(22, 24, 35, 0.12);
  color: rgba(22, 24, 35, 0.8);
}
.follow-basic-btn:hover {
  background-color: rgba(22, 24, 35, 0.06);
  border-color: rgba(22, 24, 35, 0.2);
}

.follow-active-btn {
  background: #fff;
  border: 1px solid #f03e3e;
  color: #f03e3e;
}
</style>
