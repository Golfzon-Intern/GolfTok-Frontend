// import axios from 'axios';
import http from '@/api/http';

// 특정 게시물의 부모 댓글 조회
export function getParentComments(targetId) {
  return http.get('/comment/parentList', { params: { postId: targetId } });
}

// 특정 댓글의 자식 댓글 조회
export function getChildComments(targetId) {
  return http.get('/comment/childrenList', { params: { commentId: targetId } });
}

// 댓글 작성
export function addComment(commentObj) {
  return http.post('/comment/input', commentObj);
}

// 댓글 수정
export function updateComment(commentObj) {
  return http.put('/comment/update', commentObj);
}

// 댓글 삭제
export function deleteComment(targetId) {
  return http.delete('/comment/delete', { params: { commentId: targetId } });
}
