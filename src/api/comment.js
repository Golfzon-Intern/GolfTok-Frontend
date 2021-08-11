import axios from 'axios';
import http from '@/api/http';

// 특정 게시물의 부모 댓글 조회
export function getParentComments(targetId) {
  // return http.get('/comment/parentList', { params: { postId: targetId } });
  return axios.get('https://gist.githubusercontent.com/Joie-Kim/c1d53b77f46f555e0cd7b84fe3b5ab11/raw/9710cb73afc6528f9ecf902621ad9a18884c69e1/dummy_parentComments.json', {
    params: { postId: targetId },
  });
}

// 특정 댓글의 자식 댓글 조회
export function getChildComments(targetId) {
  // return http.get('/comment/childrenList', { params: { commentId: targetId } });
  return axios.get('https://gist.githubusercontent.com/dbswl4951/d6f799d15d6ba56178c2af261b080ec7/raw/c7084365d577d6f7445d75c628643e873cf677db/dummy_childrenComments', {
    params: { postId: targetId },
  });
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
