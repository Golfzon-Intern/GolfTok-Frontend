import http from '@/api/http';

// 게시물 리스트 조회
export function getPosts(pageNum) {
  return http.get('/post/postList', { params: { currentPageNo: pageNum } });
}

// 게시물 상세 조회
export function getPostDetail(postId) {
  return http.get('/post/detail', { params: { postId: postId } });
}

// 나스모 리스트 조회
export function getNasmos() {
  return http.get('/post/nasmoList');
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
