// import axios from 'axios';
import http from '@/api/http';

// 특정 게시물의 댓글 수 조회
export function getNumOfComments(targetId) {
  return http.get('/comment/count', { params: { postId: targetId } });
  // return axios.get('https://gist.githubusercontent.com/Joie-Kim/ce7be6b7726c13640d6fc4daf949023d/raw/2179792fb4473902aec8f91254f8efa275ec0176/dummy_numOfCommnets.json', {
  //   params: { postId: targetId },
  // });
}

// 특정 게시물의 부모 댓글 조회
export function getParentComments(targetId) {
  return http.get('/comment/parentList', { params: { postId: targetId } });
  // return axios.get('https://gist.githubusercontent.com/dbswl4951/2724e88a0bef61621959bb69c66a668a/raw/ff3b23c05c54cd56f0551c7f7ba5b2753321352a/dummy_parentComments', {
  //   params: { postId: targetId },
  // });
}

// 특정 댓글의 자식 댓글 조회
export function getChildComments(targetId) {
  return http.get('/comment/childrenList', { params: { commentId: targetId } });
  // return axios.get('https://gist.githubusercontent.com/dbswl4951/d6f799d15d6ba56178c2af261b080ec7/raw/c7084365d577d6f7445d75c628643e873cf677db/dummy_childrenComments', {
  //   params: { commentId: targetId },
  // });
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
