// import axios from 'axios';
import http from '@/api/http';

// 특정 게시물 좋아요 여부 조회
export function getPostLike(targetId) {
  return http.get('/like/post', { params: { postId: targetId } });
  // return axios.get('https://gist.githubusercontent.com/Joie-Kim/184928b11f72cea1bdf4388afae13087/raw/66a9f6c63456b0798ff75db89600706ec91a6c3c/dummy_like.json', { params: { postId: targetId } });
}

// 특정 게시물 좋아요 추가
export function addPostLiked(targetId) {
  return http.post('/like/post', { postId: targetId });
}

// 특정 게시물 좋아요 삭제
export function deletePostLiked(targetId) {
  return http.delete('/like/post', { params: { postId: targetId } });
}

// 특정 댓글 좋아요 여부 조회
export function getCommentLike(targetId) {
  return http.get('/like/post', { params: { postId: targetId } });
  // return axios.get('https://gist.githubusercontent.com/Joie-Kim/184928b11f72cea1bdf4388afae13087/raw/66a9f6c63456b0798ff75db89600706ec91a6c3c/dummy_like.json', { params: { commentId: targetId } });
}

// 특정 댓글 좋아요 추가
export function addCommentLike(targetId) {
  return http.post('/like/post', { commentId: targetId });
}

// 특정 댓글 좋아요 삭제
export function deleteCommentLiked(targetId) {
  return http.delete('/like/post', { params: { commentId: targetId } });
}
