import http from '@/api/http';

export function getPost(pageNum) {
  return http.get('/post/postList', { params: { pageNum: pageNum } });
}

export function uploadPost(post) {
  return http.post('/golftok/uploadPost', post);
}
