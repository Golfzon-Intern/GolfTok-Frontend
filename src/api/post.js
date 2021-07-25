import http from '@/api/http';

export function uploadPost(post) {
  return http.post('/golftok/uploadPost', post);
}
