import { authApi } from '@/common/api';
import { useAuthContext, useNotificationContext } from '@/common/context';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export const loginFormSchema = yup.object({
	email: yup.string().email('Please enter valid email').required('Please enter email'),
	password: yup.string().required('Please enter password'),
});

export default function useLogin() {
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const { isAuthenticated, saveSession } = useAuthContext();
	const { showNotification } = useNotificationContext();

	const redirectUrl = useMemo(
		() => (location.state && location.state.from ? location.state.from.pathname : '/jsx/Dashboard'),
		[location.state]
	);

	//console.log("useLogin1 : " + location.state);
	//console.log("useLogin2 : " + location.state && location.state.from);


	const login = async (values) => {
		setLoading(true);
		try {
			const res = await authApi.login(values);
			if (res) {
				console.log("useLogin1 : " + JSON.stringify(res));
				localStorage.setItem('accessToken', res.accessToken);
				// 세션에 사용자 정보를 저장
				saveSession(res); // 필요한 정보로 조정 가능
				console.log("useLogin2 : " + res.email);
				console.log("useLogin3 : " + res.name);
				console.log("useLogin4 : " + res.role);
				//localStorage.setItem('email', res.email);
				//localStorage.setItem('name', res.name);
				//localStorage.setItem('role', res.role.slice(1, -1));
				//console.log("useLogin3 : " + localStorage.getItem('accessToken'));
				//console.log(JSON.stringify(localStorage.getItem('accessToken')));
				navigate(redirectUrl);
			}
		} catch (error) {
			showNotification({ message: error.toString(), type: 'error' });
		} finally {
			setLoading(false);
		}
	};

	return { loading, login, redirectUrl, isAuthenticated };
}
