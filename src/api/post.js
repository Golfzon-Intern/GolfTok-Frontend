// import axios from 'axios';
import http from '@/api/http';

// 게시물 리스트 조회
export function getPosts(pageNum) {
  return http.get('/post/postList', { params: { currentPageNo: pageNum } });
  // return axios.get('https://gist.githubusercontent.com/Joie-Kim/90aae4738bc252787db51929fdc43a53/raw/63fa12e3e43e6cdce94717196228d8d8ca409def/dummy_videoList.json', {
  //   params: { currentPageNo: pageNum },
  // });
}

// 팔로잉 계정 게시물 리스트 조회
export function getFowPosts(pageNum) {
  return http.get('/user/followingPost', { params: { currentPageNo: pageNum } });
  // return axios.get('https://gist.githubusercontent.com/Joie-Kim/90aae4738bc252787db51929fdc43a53/raw/63fa12e3e43e6cdce94717196228d8d8ca409def/dummy_videoList.json', {
  //   params: { currentPageNo: pageNum },
  // });
}

// 게시물 상세 조회
export function getPostDetail(postId, type) {
  return http.get('/post/detail', { params: { postId: postId, type: type } });
  // return axios.get('https://gist.githubusercontent.com/Joie-Kim/21e1a33796ce9997fce3e54763a458b4/raw/4d75d294b65ec498814fee0a8235abcbe7693045/dummy_postdetail.json', {
  //   params: { postId: postId, type: type },
  // });
}

// 나스모 리스트 조회
export function getNasmos() {
  return http.get('/post/nasmoList');
  // return axios.get('https://gist.githubusercontent.com/Joie-Kim/cc0fe278057a4bd487205e9b5fa42b29/raw/a78222878a5c335442ff7cea886e099ecd0daacf/dummy_nasmoList.json');
}

// 게시물 업로드
export function uploadPost(post) {
  return http.post('/post/insert', post);
}

// 게시물 수정
export function updatePost(post) {
  return http.put('/post/update', post);
}

// 게시물 삭제
export function deletePost(postId) {
  return http.delete('/post/delete', { params: { postId: postId } });
}
