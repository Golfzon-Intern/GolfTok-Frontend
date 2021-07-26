import http from '@/api/http';

export function getPost() {
  return http.get('/golftok/main');
}

export function uploadPost(post) {
  return http.post('/golftok/uploadPost', post);
}
