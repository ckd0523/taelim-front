import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import api from '@/common/api/authAxios';
import { useAuthContext } from '@/common';
import Swal from 'sweetalert2';
import './li.css';
const API_URL = import.meta.env.VITE_BASIC_URL;

const ActionModal = ({
	show,
	handleClose,
	actionData,
	actionType,
	fetchData,
	setPageIndex,
	pageSize,
}) => {
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
		setAssetLocation('');
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
		Swal.fire({
			title: '확인',
			text: '정말로 이 작업을 진행하시겠습니까?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '예',
			cancelButtonText: '아니오',
		}).then((result) => {
			if (result.isConfirmed) {
				// 사용자가 '예'를 선택한 경우 실행될 코드
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

					Swal.fire({
						icon: 'success',
						title: '성공',
						text: '자산조회 페이지로 이동합니다.',
					});

					// 수정이 완료되면 해당 페이지로 이동
					setPageIndex(0); // 원하는 페이지 번호로 설정 (예: 0은 첫 페이지)
					fetchData(0, pageSize); // 해당 페이지의 데이터를 다시 가져옴
				};

				const handleErrorResponse = (error) => {
					console.error('Error:', error);
					Swal.fire({
						icon: 'error',
						title: '실패',
						text: error.response.data,
					});
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
						console.log('머가 들어있지', updateToSend);
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
			}
		});
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
									<Form.Label className="mb-0">위치</Form.Label>
									<Form.Select
										value={assetLocation}
										onChange={assetLocationChange}
									>
										<option value="">위치를 선택해주세요.</option>
										<option value="MAIN_B1_DOCUMENT_STORAGE">
											본관 지하 문서고
										</option>
										<option value="MAIN_1F">본관 1층</option>
										<option value="MAIN_1F_RECEPTION_ROOM">
											본관 1층 접견실
										</option>
										<option value="MAIN_2F">본관 2층</option>
										<option value="MAIN_2F_PRESIDENT_OFFICE">
											본관 2층 사장실
										</option>
										<option value="MAIN_2F_RESEARCH_OFFICE">
											본관 2층 기술연구소 사무실
										</option>
										<option value="MAIN_2F_CONFERENCE_ROOM">
											본관 2층 대회의실
										</option>
										<option value="MAIN_2F_CEO_OFFICE">
											본관 2층 대표 이사실
										</option>
										<option value="MAIN_3F_STORAGE">본관 3층 창고</option>
										<option value="MDCG">MDCG</option>
										<option value="FACTORY_BUILDING">공장동</option>
									</Form.Select>
								</Form.Group>

								<Form.Group className="mb-1">
									<Form.Label className="mb-0">부서</Form.Label>
									<Form.Select value={department} onChange={departmentChange}>
										<option value="">부서를 선택해주세요.</option>
										<option value="IT_DEPARTMENT">IT부</option>
										<option value="ADMINISTRATIVE_DEPARTMENT">관리부</option>
										<option value="SALES_DEPARTMENT">영업부</option>
										<option value="MARKETING_DEPARTMENT">마케팅부</option>
										<option value="PRODUCTION_DEPARTMENT">생산부</option>
										<option value="OPERATIONS_DEPARTMENT">운영부</option>
										<option value="HUMAN_RESOURCES_DEPARTMENT">인사부</option>
									</Form.Select>
								</Form.Group>

								{/* 추가된 부분: 소유자 입력 필드 */}
								<Form.Group className="mb-1" style={{ position: 'relative' }}>
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
								<Form.Group className="mb-1" style={{ position: 'relative' }}>
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
								<Form.Group className="mb-1" style={{ position: 'relative' }}>
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
										value={disposeLocation}
										onChange={disposeLocationChange}
									/>
								</Form.Group>

								<Form.Group className="mb-1">
									<Form.Label className="mb-0">폐기 방법</Form.Label>
									<Form.Control
										type="text"
										value={disposeMethod}
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
					style={
						actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
							? { background: '#5e83bb', border: 'none' }
							: { background: '#c66464', border: 'none' }
					}
					// variant={
					// 	actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
					// 		? 'primary'
					// 		: 'danger'
					// }
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
