//import HttpClient from '../helpers/httpClient';
import axios from 'axios';
import api from './authAxios'

const URL = import.meta.env.VITE_BASIC_URL;

function AuthService() {
  return {
    login: async (values) => {
      try {
        //console.log("설마 여기로?");
        const response = await api.post(`${URL}/login`, values);
        console.log("auth1 : " + response.data);
        return response.data;
      } catch (error) {
        // 에러 처리
        if (error.response && error.response.data) {
          throw new Error(error.response.data.message || 'Login failed');
        }
        throw new Error('Login failed');
      }
    },
    logout: async () => {
      try {
        console.log("여기로 오잖아 임마 : " + URL);
        await axios.post(`${URL}/logout`);
        console.log('로그아웃 성공');
      } catch (error) {
        console.log("로그아웃 실패 : " + error);
      }
    }
  };
}

export default AuthService();
