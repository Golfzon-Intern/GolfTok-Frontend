import * as authApi from '@/api/auth';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { ...user } : null;

// type of userInfo = {
//   accessToken,
//   userName,
//   userId,
// }

export default {
  namespaced: true,
  state: {
    userInfo: initialState,
  },
  mutations: {
    // user 정보를 state에 저장하는 함수
    setUserInfo(state, userData) {
      state.userInfo = userData;
      console.log(state.userInfo);
    },
  },
  actions: {
    async login(context, { userId, password }) {
      try {
        // 서버로 로그인 요청 보내고
        const response = await authApi.login(userId, password);

        // 만약 성공하면 (서버로부터 응답 받으면)
        if (response.status === 200) {
          // 로컬 스토리지에 유저 정보(id, token) 저장하고, mutation 호출
          localStorage.setItem('user', JSON.stringify(response.data));
          context.commit('setUserInfo', response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
