import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import api from '@/common/api/authAxios';
import { useAuthContext } from '@/common';
const API_URL = import.meta.env.VITE_BASIC_URL;

const ActionModal = ({ show, handleClose, actionData, actionType }) => {
	const { user } = useAuthContext();

	const [department, setDepartment] = useState('');
	const [assetLocation, setAssetLocation] = useState('');

	const [disposeMethod, setDisposeMethod] = useState('');
	const [disposeLocation, setDisposeLocation] = useState('');
	const [reason, setReason] = useState('');
	const [detail, setDetail] = useState('');

	const reset = () => {
		setDepartment('');
		setDisposeMethod('');
		setDisposeLocation('');
		setReason('');
		setDetail('');
		setOwners([]);
		setAssetOwnerID('');
		setAssetOwner('');
		setSecurityManagers([]);
		setAssetSecurityManager('');
		setAssetSecurityManagerID('');
		setUsers([]);
		setAssetUser('');
		setAssetUserID('');
	};

	const departmentChange = (e) => setDepartment(e.target.value);
	const assetLocationChange = (e) => setAssetLocation(e.target.value);

	const disposeMethodChange = (e) => setDisposeMethod(e.target.value);
	const disposeLocationChange = (e) => setDisposeLocation(e.target.value);
	const reasonChange = (e) => setReason(e.target.value);
	const detailChange = (e) => setDetail(e.target.value);

	//소유자 검색어와 소유자 리스트 상태
	const [owners, setOwners] = useState([]); // 소유자 리스트
	const [assetOwnerID, setAssetOwnerID] = useState(''); //실제 들어갈 소유자 ID값
	const [assetOwner, setAssetOwner] = useState(''); //보여지는 소유자 이름

	// 소유자 입력 변경 핸들러
	const assetOwnerChange = (e) => {
		setAssetOwner(e.target.value);
		// 소유자 검색어에 따라 소유자 검색
		if (e.target.value) {
			handleOwnerSearch(e.target.value); // 소유자 검색 호출
		} else {
			setOwners([]); // 입력이 비었으면 리스트 초기화
		}
	};

	// 소유자 검색 함수
	const handleOwnerSearch = async (searchTerm) => {
		try {
			const response = await api.get(`${API_URL}/user/search`, {
				params: { name: searchTerm },
			});
			setOwners(response.data); // 소유자 리스트 업데이트
		} catch (error) {
			console.error('소유자 검색 중 오류 발생:', error);
		}
	};
	// 소유자 선택 핸들러
	const handleSelectOwner = (owner) => {
		setAssetOwner(owner.fullname); // 선택된 소유자 이름 설정
		setAssetOwnerID(owner.id);
		setOwners([]); // 선택 후 리스트 초기화
	};

	const [securityManagers, setSecurityManagers] = useState([]);
	const [assetSecurityManager, setAssetSecurityManager] = useState('');
	const [assetSecurityManagerID, setAssetSecurityManagerID] = useState('');

	const assetSecurityManagerChange = (e) => {
		setAssetSecurityManager(e.target.value);
		// 소유자 검색어에 따라 소유자 검색
		if (e.target.value) {
			handleSecurityManagerSearch(e.target.value); // 소유자 검색 호출
		} else {
			setSecurityManagers([]); // 입력이 비었으면 리스트 초기화
		}
	};

	// 소유자 검색 함수
	const handleSecurityManagerSearch = async (searchTerm) => {
		try {
			const response = await api.get(`${API_URL}/user/search`, {
				params: { name: searchTerm },
			});
			setSecurityManagers(response.data); // 소유자 리스트 업데이트
		} catch (error) {
			console.error('소유자 검색 중 오류 발생:', error);
		}
	};
	// 소유자 선택 핸들러
	const handleSelectSecurityManager = (securityManager) => {
		setAssetSecurityManager(securityManager.fullname); // 선택된 소유자 이름 설정
		setAssetSecurityManagerID(securityManager.id);
		setSecurityManagers([]); // 선택 후 리스트 초기화
	};

	const [users, setUsers] = useState([]);
	const [assetUser, setAssetUser] = useState('');
	const [assetUserID, setAssetUserID] = useState('');
	const assetUserChange = (e) => {
		setAssetUser(e.target.value);
		// 소유자 검색어에 따라 소유자 검색
		if (e.target.value) {
			handleUserSearch(e.target.value); // 소유자 검색 호출
		} else {
			setUsers([]); // 입력이 비었으면 리스트 초기화
		}
	};

	// 소유자 검색 함수
	const handleUserSearch = async (searchTerm) => {
		try {
			const response = await api.get(`${API_URL}/user/search`, {
				params: { name: searchTerm },
			});
			setUsers(response.data); // 소유자 리스트 업데이트
		} catch (error) {
			console.error('소유자 검색 중 오류 발생:', error);
		}
	};
	// 소유자 선택 핸들러
	const handleSelectUser = (user) => {
		setAssetUser(user.fullname); // 선택된 소유자 이름 설정
		setAssetUserID(user.id);
		setUsers([]); // 선택 후 리스트 초기화
	};

	const handleModalClose = () => {
		reset(); // 상태 초기화
		handleClose(); // 모달 닫기
	};

	const handleFormSubmit = () => {
		const updateToSend = {
			assetDtos: actionData,
			department,
			assetLocation,
			assetUser: assetUserID,
			assetSecurityManager: assetSecurityManagerID,
			assetOwner: assetOwnerID,
			reason,
			detail,
			demandBy: user.id,
		};

		const disposeToSend = {
			assetDtos: actionData,
			disposeMethod,
			disposeLocation,
			reason,
			detail,
			demandBy: user.id,
		};

		const handleSuccessResponse = (response) => {
			console.log('Success:', response.data);
			alert(response.data); // 성공 메시지 띄우기
			window.location.reload(); // 2초 뒤 새로고침
		};

		const handleErrorResponse = (error) => {
			console.error('Error:', error);
			alert(error.response.data); // 에러 메시지 띄우기
		};

		switch (actionType) {
			case 'AllUpdate':
				api.post(`${API_URL}/allUpdate`, updateToSend)
					.then(handleSuccessResponse)
					.catch(handleErrorResponse);
				break;
			case 'AllDispose':
				api.post(`${API_URL}/allDelete`, disposeToSend)
					.then(handleSuccessResponse)
					.catch(handleErrorResponse);
				break;
			case 'AllUpdateDemand':
				api.post(`${API_URL}/allUpdateDemand`, updateToSend)
					.then(handleSuccessResponse)
					.catch(handleErrorResponse);
				break;
			case 'AllDisposeDemand':
				api.post(`${API_URL}/allDeleteDemand`, disposeToSend)
					.then(handleSuccessResponse)
					.catch(handleErrorResponse);
				break;
			default:
				console.log('Invalid action type');
		}

		reset();
		handleClose(); // 모달 닫기
	};

	return (
		<Modal show={show} onHide={handleModalClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{actionType === 'AllUpdate' && '일괄 수정'}
					{actionType === 'AllUpdateDemand' && '일괄 수정 요청'}
					{actionType === 'AllDispose' && '일괄 폐기'}
					{actionType === 'AllDisposeDemand' && '일괄 폐기 요청'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>
							<p>
								선택된 데이터: {actionData.map((item) => item.assetCode).join(', ')}
							</p>
							{/* {actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
								? '수정 내용을 입력하세요'
								: '폐기 내용을 입력하세요'} */}
						</Form.Label>

						{(actionType === 'AllUpdate' || actionType === 'AllUpdateDemand') && (
							<>
								<Form.Group className="mb-1">
									<Form.Label className="mb-0">자산소재지</Form.Label>
									<Form.Control
										type="text"
										value={department}
										onChange={departmentChange}
									/>
								</Form.Group>

								<Form.Group className="mb-1">
									<Form.Label className="mb-0">위치</Form.Label>
									<Form.Control
										type="text"
										value={assetLocation}
										onChange={assetLocationChange}
									/>
								</Form.Group>

								{/* 추가된 부분: 소유자 입력 필드 */}
								<Form.Group className="mb-1">
									<Form.Label className="mb-0">소유자</Form.Label>
									<Form.Control
										type="text"
										value={assetOwner}
										onChange={assetOwnerChange} // 소유자 변경 핸들러
									/>
									{owners.length > 0 && ( // 소유자 리스트 표시
										<ul className="owner-list">
											{owners.map((owner) => (
												<li
													key={owner.id}
													onClick={() => handleSelectOwner(owner)}
												>
													{owner.fullname} ({owner.department}){' '}
													{/* 소유자 이름과 부서 */}
												</li>
											))}
										</ul>
									)}
								</Form.Group>

								{/* 추가된 부분: 소유자 입력 필드 */}
								<Form.Group className="mb-1">
									<Form.Label className="mb-0">사용자</Form.Label>
									<Form.Control
										type="text"
										value={assetUser}
										onChange={assetUserChange} // 소유자 변경 핸들러
									/>
									{users.length > 0 && ( // 소유자 리스트 표시
										<ul className="owner-list">
											{users.map((user) => (
												<li
													key={user.id}
													onClick={() => handleSelectUser(user)}
												>
													{user.fullname} ({user.department}){' '}
													{/* 소유자 이름과 부서 */}
												</li>
											))}
										</ul>
									)}
								</Form.Group>

								{/* 추가된 부분: 소유자 입력 필드 */}
								<Form.Group className="mb-1">
									<Form.Label className="mb-0">보안담당자</Form.Label>
									<Form.Control
										type="text"
										value={assetSecurityManager}
										onChange={assetSecurityManagerChange} // 소유자 변경 핸들러
									/>
									{securityManagers.length > 0 && ( // 소유자 리스트 표시
										<ul className="owner-list">
											{securityManagers.map((securityManager) => (
												<li
													key={securityManager.id}
													onClick={() =>
														handleSelectSecurityManager(securityManager)
													}
												>
													{securityManager.fullname} (
													{securityManager.department}){' '}
													{/* 소유자 이름과 부서 */}
												</li>
											))}
										</ul>
									)}
								</Form.Group>
							</>
						)}

						{(actionType === 'AllDispose' || actionType === 'AllDisposeDemand') && (
							<>
								<Form.Group className="mb-1">
									<Form.Label className="mb-0">폐기 위치</Form.Label>
									<Form.Control
										type="text"
										value={department}
										onChange={disposeLocationChange}
									/>
								</Form.Group>

								<Form.Group className="mb-1">
									<Form.Label className="mb-0">폐기 방법</Form.Label>
									<Form.Control
										type="text"
										value={assetLocation}
										onChange={disposeMethodChange}
									/>
								</Form.Group>
							</>
						)}

						<Form.Group className="mb-1">
							<Form.Label className="mb-0">사유</Form.Label>
							<Form.Control type="text" value={reason} onChange={reasonChange} />
						</Form.Group>

						<Form.Group className="mb-1">
							<Form.Label className="mb-0">내용</Form.Label>
							<Form.Control type="text" value={detail} onChange={detailChange} />
						</Form.Group>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button
					variant={
						actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
							? 'primary'
							: 'danger'
					}
					onClick={handleFormSubmit}
				>
					처리
				</Button>
				<Button variant="secondary" onClick={handleModalClose}>
					닫기
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export { ActionModal };
