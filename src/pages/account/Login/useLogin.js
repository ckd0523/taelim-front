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
		() => (location.state && location.state.from ? location.state.from.pathname : '/'),
		[location.state]
	);

	console.log(location.state);
	console.log(location.state && location.state.from);


	const login = async (values) => {
		setLoading(true);
		try {
			const res = await authApi.login(values);
			if (res) {
				console.log(res);
				localStorage.setItem('accessToken', res.accessToken);
				// 세션에 사용자 정보를 저장
				saveSession({ email: "dfd" }); // 필요한 정보로 조정 가능
				//console.log(res.user);
				console.log(localStorage.getItem('accessToken'));
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
