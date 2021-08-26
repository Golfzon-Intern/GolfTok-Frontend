<template>
  <div class="content-modal-wrapper">
    <div class="content-modal-header">
      <h3 class="content-modal-header-title">Content</h3>
      <button class="content-modal-close-btn" @click="closeModal">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="content-modal-body">
      <div class="content-modal-user-wrapper">
        <span class="golf-grade"
          >등급 - <b>{{ postInfo.userGrade }}</b></span
        >
        <span class="golf-handicap"
          >핸디캡 - <b>{{ postInfo.handicap }}</b></span
        >
        <span class="golf-rolmodel"
          ><b>{{ postInfo.roleModel }}</b
          >처럼 되려고 노력 중</span
        >
      </div>
      <div class="content-modal-video-wrapper">
        <div class="location-info" v-if="postInfo.locations">
          <h4>
            <div class="info-text-decoration">
              <i class="fas fa-map-marker-alt"></i>
              {{ postInfo.locations }}
            </div>
          </h4>
        </div>
        <div class="club-info" v-if="postInfo.golfClub && postInfo.golfClub.length">
          <h4>
            <div class="info-text-decoration">
              <div class="club-info-tags">
                <i class="fas fa-thumbs-up"></i>
                <span v-for="(tag, id) of postInfo.golfClub" :key="id">
                  <a :href="`/search/${tag.substring(1)}`">{{ tag }}</a>
                </span>
              </div>
            </div>
          </h4>
        </div>
        <h1 class="video-meta-title" v-html="postInfo.postContent" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postInfo: Object,
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false);
    },
  },
};
</script>

<style>
.content-modal-container {
  position: absolute;
  bottom: 0;
  left: 1%;
  width: 98%;
  height: 63vh;
  padding: 12px 24px;
  z-index: 50;
  border-radius: 12px 12px 0 0;
  box-shadow: 2px 0px 5px 2px rgba(22, 22, 22, 0.4);
  background-color: var(--background-color);
}

.content-modal-header {
  height: 40px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ced4da;
}

.content-modal-header-title {
  font-size: 1.5rem;
  line-height: 1.3;
  font-weight: bolder;
  color: var(--text-main-color);
}

.content-modal-close-btn {
  width: 32px;
  height: 32px;
  padding-top: 2px;
  padding-left: 9px;
  border-radius: 50%;
  border: none;
  background: rgba(22, 24, 35, 0.05);
  font-size: 1.25rem;
}

.content-modal-user-wrapper {
  margin-bottom: 12px;
}
.content-modal-user-wrapper span {
  padding: 0 8px;
  text-align: center;
  margin-right: 8px;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.8;
  color: var(--text-sub-color);
  border-radius: 5px;
  background-color: var(--accent-sub-color);
}
</style>
