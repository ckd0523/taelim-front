import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '@/common/api/authAxios';

const URL = import.meta.env.VITE_BASIC_URL;

const Base64Set = () => {
	const [isBase64Enabled, setIsBase64Enabled] = useState();
	const [isLoading, setIsLoading] = useState(false);

	// 설정값 조회
	const fetchBase64Config = async () => {
		try {
			const response = await api.get(`${URL}/base64Set/findSet`);
			setIsBase64Enabled(response.data.enabled); // 백엔드에서 설정값 반환
		} catch (error) {
			console.error('Error fetching Base64 config:', error);
		}
	};

	const toggleBase64Config = async () => {
		try {
			setIsLoading(true);
			// API 호출 - JSON 형식으로 전송
			await api.put(`${URL}/base64Set/updateSet`, {
				headers: {
					'Content-Type': 'application/json', // JSON 형식으로 요청
				},
			});

			// 상태 업데이트 후
			// setIsBase64Enabled(newState); // 상태를 바로 반영
			fetchBase64Config();
		} catch (error) {
			console.error('Error updating Base64 config:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchBase64Config(); // 컴포넌트 렌더링 시 설정값 불러오기
	}, []);

	return (
		<div>
			<h3>Base64 설정 관리</h3>
			<Form>
				<Form.Group>
					<Form.Check
						type="switch"
						id="base64-switch"
						label={`Base64 ${isBase64Enabled ? '사용 중' : '사용 안 함'}`}
						checked={isBase64Enabled}
						onChange={toggleBase64Config} // 토글 시 설정 변경
						disabled={isLoading} // 로딩 중일 때 비활성화
					/>
				</Form.Group>
			</Form>
			{/* <Button
				variant={isBase64Enabled ? 'danger' : 'success'}
				onClick={toggleBase64Config}
				disabled={isLoading} // 로딩 중일 때 비활성화
			>
				{isBase64Enabled ? 'Base64 비활성화' : 'Base64 활성화'}
			</Button> */}
		</div>
	);
};

export default Base64Set;
