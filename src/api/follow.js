// import axios from 'axios';
import http from '@/api/http';

export function getFollowing(targetId) {
  return http.get('/user/following', { params: { friendId: targetId } });
  // return axios.get('https://gist.githubusercontent.com/Joie-Kim/566e03c8b5e451c1895074ff0a200f1a/raw/9ceea4e07461a2ed286c46a208d3a8d86ee0c321/dummy_getFollowing.json', {
  //   params: { friendId: targetId },
  // });
}

export function addFollowing(targetId) {
  return http.post('/user/following', { friendId: targetId });
}

export function deleteFollowing(targetId) {
  return http.delete('/user/following', { params: { friendId: targetId } });
}
