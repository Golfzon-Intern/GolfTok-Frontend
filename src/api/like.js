import http from '@/api/http';

// 특정 게시물 좋아요 여부 조회
export function getIsLiked(postId) {
  return http.get('/like/post', { params: { postId: postId } });
}

// 특정 게시물 좋아요 여부 수정
export function updateIsLiked(postId) {
  return http.put('/like/post', { postId: postId });
}
