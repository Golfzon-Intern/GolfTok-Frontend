import axios from 'axios';
import http from '@/api/http';

// 키워드 검색
export function getSearchResult(keyword) {
  return http.get('/post/search', { params: { keyword: keyword } });
  // return axios.get('https://gist.githubusercontent.com/dbswl4951/8eb63f3dbc2fabc2135fdbeae33df56e/raw/de4bcdc1d1b94c69b49eece2bb89033d707bdb26/dummy_search', { params: { keyword: keyword } });
}

// 위치 검색
export function getLocation(keyword) {
  console.log(keyword);

  return axios({
    url: '/v1/search/local.json',
    method: 'get',
    headers: {
      'X-Naver-Client-Id': process.env.VUE_APP_NAVER_SEARCH_CLIENT,
      'X-Naver-Client-Secret': process.env.VUE_APP_NAVER_SEARCH_SECRET,
    },
    params: {
      query: keyword,
      display: 5,
      sort: 'random',
    },
  });
}
