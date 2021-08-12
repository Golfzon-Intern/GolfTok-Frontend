// import axios from 'axios';
import http from '@/api/http';

// 추천 계정 5개 조회
export function getRecFriendShort() {
  return http.get('/user/recommend/fiveFollowing');
  // return axios.get('https://gist.githubusercontent.com/dbswl4951/59fd231006dcd836947133bd064d0e71/raw/89884ca33069ca8b4b6ac86b0fd0b0244b596afe/dummy_recommendList_five');
}

// 팔로잉 계정 5개 조회
export function getFowFriendShort() {
  return http.get('/user/fiveMyFollowing');
  // return axios.get('https://gist.githubusercontent.com/dbswl4951/4cc3db811b59f662b2737264e4fa55a3/raw/5609249e5e63c5b1ebfa38dfead3bfb5c1d04316/dummy_followingList_five');
}
