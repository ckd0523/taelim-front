import HttpClient from '../helpers/httpClient';
import axios from 'axios';
import api from './authAxios'

const URL = import.meta.env.VITE_BASIC_URL;

function AuthService() {
  return {
    login: async (values) => {
      try {
        //console.log("여기로 오지?");
        const response = await api.post(`${URL}/login`, values);
        console.log(response.data);
        return response.data;
      } catch (error) {
        // 에러 처리
        if (error.response && error.response.data) {
          throw new Error(error.response.data.message || 'Login failed');
        }
        throw new Error('Login failed');
      }
    },
  };
}

export default AuthService();
