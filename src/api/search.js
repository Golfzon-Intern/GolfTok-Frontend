// import axios from 'axios';
import http from '@/api/http';

export function getSearchResult(keyword) {
  return http.get('/search', { params: { keyword: keyword } });
  //   return axios.get('https://gist.githubusercontent.com/dbswl4951/8eb63f3dbc2fabc2135fdbeae33df56e/raw/de4bcdc1d1b94c69b49eece2bb89033d707bdb26/dummy_search', { params: { keyword: keyword } });
}
