import axios from 'axios';
import { store } from '@/store/index';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 100000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// interceptors: 서버로 요청을 보내기 전, 서버로부터 받은 응답을 코드로 보내기 전에 사용자가 임의의 코드를 넣을 수 있는 기능
instance.interceptors.request.use(function(config) {
  if (store.state.auth.userInfo !== null) {
    config['headers'] = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=utf-8',
      'x-access-token': `Bearer ${store.state.auth.userInfo.accessToken}`,
    };
  }

  return config;
});

export default instance;
