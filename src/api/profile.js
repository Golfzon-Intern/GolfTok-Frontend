// import axios from 'axios';
import http from '@/api/http';

// 사용자 정보 조회
export function getProfileInfo(flag, userId) {
  if (flag) {
    // 자기 자신의 데이터 조회
    return http.get('/user/info');
    // return axios.get('https://gist.githubusercontent.com/dbswl4951/720c9dc09b654f0359f2fc198a8304f0/raw/072e130b8743212ac7eb0fb87e79efa5cb16df92/dummy_user_info');
  } else {
    // 다른 사람 데이터 조회
    return http.get('/user/info', { params: { userId: userId } });
    // return axios.get('https://gist.githubusercontent.com/dbswl4951/720c9dc09b654f0359f2fc198a8304f0/raw/072e130b8743212ac7eb0fb87e79efa5cb16df92/dummy_user_info', { params: { userId: userId } });
  }
}

// 사용자가 업로드한 게시물 조회
export function getProfilePost(flag, userId) {
  if (flag) {
    // 자기 자신의 데이터 조회
    return http.get('/user/posts');
    // return axios.get('https://gist.githubusercontent.com/dbswl4951/4fb11f91992951a186744351c3c39c86/raw/aae2ede56fd672ecb1e3d80307f6c763a4b166dc/dummy_profile_posts');
  } else {
    // 다른 사람 데이터 조회
    return http.get('/user/posts', { params: { userId: userId } });
    // return axios.get('https://gist.githubusercontent.com/dbswl4951/4fb11f91992951a186744351c3c39c86/raw/aae2ede56fd672ecb1e3d80307f6c763a4b166dc/dummy_profile_posts', { params: { userId: userId } });
  }
}
