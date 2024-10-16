import axios from 'axios';

const URL = import.meta.env.VITE_BASIC_URL;

const api = axios.create({
  baseURL: `${URL}`,
  withCredentials: true, // 쿠키를 요청에 포함하도록 설정
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 오류가 발생했을 때 처리
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  console.log(originalRequest);
  console.log("에러 : " + error.response.status);
  console.log("에러2 : " + JSON.stringify(error.config));
  console.log("에러3 : " + JSON.stringify(error.response));
  console.log(originalRequest._retry);
  //originalRequest._retry = false;

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    // 요청이 이미 재시도된 경우가 아니라면
    originalRequest._retry = true;

    const errorMessage = error.response.data; // 응답 메시지 가져오기
    console.log(errorMessage);

    // 리프레시 토큰으로 새로운 액세스 토큰 요청
    if (errorMessage === "Access token is invalid") {
      console.log("여기 안와??1");

      try {
        console.log("여기 안와??2");

        const response = await axios.post(`${URL}/refresh`, {}, { withCredentials: true })
          .then(response => {
            console.log("리프레시 토큰 전송 성공", response.data);
          })
          .catch(error => {
            console.log("리프레시 토큰 전송 실패", error)
          });
        console.log("여기 안와??3");

        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;

          // 새로운 액세스 토큰을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', newAccessToken);

          // 실패했던 원래 요청의 Authorization 헤더에 새로운 액세스 토큰을 설정
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // 원래 요청을 다시 실행
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.log("뭐지 진짜 : " + refreshError.response.data);
        // 리프레시 토큰도 만료된 경우
        if (refreshError.response && refreshError.response.data === "Refresh token is invalid") {
          console.error('Refresh token expired1, redirecting to login.');
          alert("tlqkf");
          //window.location.href = '/account/login';  // 로그인 페이지로 리다이렉트
          localStorage.clear();
        } else {
          // 다른 오류가 발생한 경우
          return Promise.reject(refreshError);
        }
      }
    } else if (errorMessage === "Refresh token is invalid") {
      // 리프레시 토큰 만료 오류 처리
      console.error('Refresh token is expired2, redirecting to login.');
      window.location.href = '/account/login';  // 로그인 페이지로 리다이렉트
    }
  }

  return Promise.reject(error);
});

export default api;
