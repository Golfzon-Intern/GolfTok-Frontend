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
            <img :src="result.postThumbnail" alt="thumbnail" />
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
    /* 검색 결과 데이터 받아오는 함수 */
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
      } catch (error) {
        console.log(error);
      }
    },
    /* hover 했을 때, 호출되는 함수 */
    setIsHover(state, index) {
      this.results[index].isHover = state;
    },
    /* 게시물 상세보기 페이지 여는 함수 */
    openPostDetail(postId) {
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
  padding-right: 5%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.search-results-header {
  width: 100%;
  margin-bottom: 20px;
  padding-right: 52px;
  box-sizing: border-box;
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: flex-start;
}

.hash-tag-icon {
  width: 120px;
  height: 120px;
  margin: 0;
  padding: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  border-radius: 2px;
  border: 0.5px solid rgba(18, 18, 18, 0.12);
  background-color: var(--supplement-color);
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
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.4;
  padding-bottom: 4px;
  margin: 0;
}
.search-keyword-container h2 {
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4;
  color: var(--text-sub-color);
  opacity: 0.5;
}

.search-result-body {
  width: 100%;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}

.result-feed-container {
  display: flex;
  flex-wrap: wrap;
}

.result-feed-item {
  position: relative;
  width: 48%;
  min-height: 25vh;
  max-height: 35vh;
  margin-right: 2%;
  margin-bottom: 12px;
  overflow: hidden;
  background-color: rgba(24, 24, 24, 0.9);
}

.result-video-card {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: blueviolet; */
}
.result-video-card img {
  height: 100%;
}

.result-video-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(18, 18, 18, 0.5);
}

.result-info-wrapper {
  margin-right: 24px;
  color: #fff;
  font-size: 1.25rem;
}
.result-info-wrapper i {
  margin-right: 8px;
}
.result-info-wrapper strong {
  font-weight: 500;
}

@media screen and (max-width: 768px) {
  .result-feed-item {
    width: 100%;
    margin-right: 0;
  }
}
</style>
