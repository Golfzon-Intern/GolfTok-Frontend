import http from '@/api/http';

export function login(userId, password) {
  return http.post('/user/login', { userName: userId, userPassword: password });
}
