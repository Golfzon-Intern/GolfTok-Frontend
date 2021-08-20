<template>
  <div class="search-results-wrapper">
    <header class="search-results-header">
      <span class="hash-tag-icon">
        <i class="fas fa-hashtag"></i>
      </span>
      <div class="search-keyword-container">
        <h1 class="search-keyword-title">#{{ this.keyword }}</h1>
        <h2 class="search-sub-title">Search results for #{{ this.keyword }}</h2>
      </div>
    </header>
    <div class="search-result-body">
      <div class="result-feed-container">
        <div
          class="result-feed-item"
          v-for="(result, index) in results"
          :key="index"
          @mouseenter="setIsHover(true, index)"
          @mouseleave="setIsHover(false, index)"
          @click="openPostDetail(result.postId)"
        >
          <div class="result-video-card">
            <video :src="result.videoRoot" type="video/mp4" preload="metadata" :poster="result.postThumbnail"></video>
          </div>
          <div class="result-video-mask" v-if="result.isHover">
            <div class="result-info-wrapper">
              <i class="fas fa-heart"></i>
              <strong>{{ result.likeCount }}</strong>
            </div>
            <div class="result-info-wrapper">
              <i class="fas fa-comment"></i>
              <strong>{{ result.commentCount }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as searchApi from '@/api/search';

export default {
  data() {
    return {
      results: [],
    };
  },
  props: {
    keyword: String,
  },
  created() {
    this.getResults();
  },
  methods: {
    async getResults() {
      try {
        const response = await searchApi.getSearchResult(this.keyword);
        const data = response.data.postList;

        if (data.length) {
          for (const item of data) {
            const resultObj = {
              ...item,
              isHover: false,
            };

            this.results.push(resultObj);
          }
        }

        console.log(this.results);
      } catch (error) {
        console.log(error);
      }
    },
    setIsHover(state, index) {
      this.results[index].isHover = state;
    },
    openPostDetail(postId) {
      console.log('open');
      if (this.$store.state.auth.userInfo) {
        this.$emit('openPage', postId);
      } else {
        this.$emit('openLoginModal', true);
      }
    },
  },
};
</script>

<style>
.search-results-wrapper {
  padding-right: 48px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.search-results-header {
  margin-bottom: 20px;
  width: 594px;
  box-sizing: border-box;
  padding-right: 52px;
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: flex-start;
}

.hash-tag-icon {
  width: 120px;
  height: 120px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  line-height: 32px;
  border-radius: 2px;
  border: 0.5px solid rgba(18, 18, 18, 0.12);
  background-color: rgb(248, 248, 248);
}
.hash-tag-icon i {
  width: 100%;
  height: 100%;
  font-size: 5rem;
  position: relative;
  top: 16px;
}

.search-keyword-container {
  position: relative;
  top: 10px;
  margin-left: 20px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-keyword-container h1 {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 2rem;
  line-height: 38px;
  padding-bottom: 4px;
  margin: 0;
}
.search-keyword-container h2 {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 22px;
  color: rgba(18, 18, 18, 0.5);
}

.search-result-body {
  width: 650px;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  min-height: 490px;
}

.result-feed-container {
  display: flex;
  flex-wrap: wrap;
}

.result-feed-item {
  width: 300px;
  margin-right: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  float: left;
}

.result-video-card {
  width: 100%;
}
.result-video-card video {
  width: 100%;
}

.result-video-mask {
  position: absolute;
  width: 300px;
  height: 165px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(18, 18, 18, 0.5);
}

.result-info-wrapper {
  margin-right: 24px;
  font-family: Helvetica, Arial, sans-serif;
  color: #fff;
  font-size: 1.25rem;
}
.result-info-wrapper i {
  margin-right: 8px;
}
.result-info-wrapper strong {
  font-weight: 500;
}
</style>
