import React, { useState, useEffect } from 'react';
import {
	Table as BootstrapTable,
	Row,
	Col,
	Button,
	Form,
	Modal,
	useAccordionButton,
	Card,
	Accordion,
	Tab,
	Tabs,
} from 'react-bootstrap';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';
import axios from 'axios';
import MaintainRegister from '@/pages/jsx/Maintain';
import './style.css'; // 같은 폴더에서 CSS 파일 import
import {
	getClassificationColumns,
	calculateImportanceScore,
	calculateImportanceRating,
} from './RowDetailColumn';
import { HistoryTableUpdate } from './HistoryTableUpdate';
import { HistoryTableMaintenance } from './HistoryTableMaintenance';
import { HistoryTableInvestigation } from './HistoryTableInvestigation';
import Swal from 'sweetalert2';
import api from '@/common/api/authAxios';
import { useAuthContext } from '@/common';
import EditableCell from './RowDetailsCellContent';
const API_URL = import.meta.env.VITE_BASIC_URL;
const urlConfig = import.meta.env.VITE_BASIC_URL;

const RowDetails = ({
	row,
	assetCode,
	onClose,
	formData: initialFormData,
	fetchData,
	setPageIndex,
	pageSize,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState(initialFormData || {}); // 상위 컴포넌트에서 받은 formData를 상태로 설정
	const [showModal, setShowModal] = useState(false); // 모달 열기/닫기 상태
	const [isLoading, setIsLoading] = useState(true); // 로딩 상태
	const [selectedFile, setSelectedFile] = useState(null);

	const importanceScore = calculateImportanceScore(formData);
	const importanceRating = calculateImportanceRating(importanceScore);
	const classification = formData?.assetClassification;
	const dynamicColumns = React.useMemo(
		() => getClassificationColumns(classification),
		[classification]
	);

	const { user } = useAuthContext();

	// 사람이름들 리스트 가져오기
	//소유자 검색어와 소유자 리스트 상태
	const [members, setMembers] = useState([]); // 공통 멤버 리스트 상태 (소유자, 보안담당자, 사용자)
	const [selectedMemberID, setSelectedMemberID] = useState(''); // 선택된 멤버 ID
	const [selectedMemberName, setSelectedMemberName] = useState(''); // 선택된 멤버 이름
	const [selectedRole, setSelectedRole] = useState(''); // 선택된 역할 ('owner', 'user', 'securityManager')
	const [showMemberModal, setShowMemberModal] = useState(false); // 모달 열림/닫힘 상태

	const [owners, setOwners] = useState([]); // 소유자 리스트
	const [assetOwnerID, setAssetOwnerID] = useState(''); //실제 들어갈 소유자 ID값
	const [assetOwner, setAssetOwner] = useState(''); //보여지는 소유자 이름
	const [showOwnerModal, setShowOwnerModal] = useState(false); // 소유자 선택 모달 상태
	const [selectedOwner, setSelectedOwner] = useState(null); // 선택된 소유자

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
		setSelectedOwner(owner); // 선택된 소유자 저장
		setAssetOwner(owner.fullname); // 선택된 소유자의 이름을 보여주기 위해 설정
		setAssetOwnerID(owner.id); // 실제로 저장될 소유자 ID 설정
		setFormData((prevData) => ({
			...prevData,
			assetOwnerId: owner.id, // 실제 데이터베이스에 저장될 ID
			assetOwner: owner.fullname, // 조회 시 보여줄 이름
		})); // 소유자 이름 설정se
		setOwners([]); // 선택 후 리스트 초기화
		setShowOwnerModal(false); // 모달 닫기
	};

	const [users, setUsers] = useState([]); // 소유자 리스트
	const [assetUserID, setAssetUserID] = useState(''); //실제 들어갈 소유자 ID값
	const [assetUser, setAssetUser] = useState(''); //보여지는 소유자 이름
	const [showUserModal, setShowUserModal] = useState(false); // 소유자 선택 모달 상태
	const [selectedUser, setSelectedUser] = useState(null); // 선택된 소유자

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
			console.error('사용자 검색 중 오류 발생:', error);
		}
	};
	// 소유자 선택 핸들러
	const handleSelectUser = (user) => {
		setSelectedUser(user); // 선택된 소유자 저장
		setAssetUser(user.fullname);
		setAssetUserID(user.id);
		setFormData((prevData) => ({
			...prevData,
			assetUserId: user.id, // or owner.id depending on the backend field requirement
			assetUser: user.fullname,
		})); // 소유자 이름 설정se
		setUsers([]); // 선택 후 리스트 초기화
		setShowUserModal(false); // 모달 닫기
	};

	const [securityManagers, setSecurityManagers] = useState([]);
	const [assetSecurityManagerID, setAssetSecurityManagerID] = useState('');
	const [assetSecurityManager, setAssetSecurityManager] = useState('');
	const [showSecurityManagerModal, setShowSecurityManagerModal] = useState(false); // 소유자 선택 모달 상태
	const [selectedSecurityManager, setSelectedSecurityManager] = useState(null); // 선택된 소유자

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

	const handleSelectSecurityManager = (securityManager) => {
		setSelectedSecurityManager(securityManager);
		setAssetSecurityManager(securityManager.fullname);
		setAssetSecurityManagerID(securityManager.id);
		setFormData((prevData) => ({
			...prevData,
			assetSecurityManagerId: securityManager.id,
			assetSecurityManager: securityManager.fullname,
		}));
		setSecurityManagers([]);
		setShowSecurityManagerModal(false);
	};

	// // 역할에 따라 상태를 설정하는 함수
	// const handleRoleChange = (role, value) => {
	// 	if (role === 'owner') {
	// 		setAssetOwner(value);
	// 	} else if (role === 'user') {
	// 		setAssetUser(value);
	// 	} else if (role === 'securityManager') {
	// 		setAssetSecurityManager(value);
	// 	}
	// };

	// const [assetOwner, setAssetOwner] = useState(''); // 소유자 이름 상태
	// const [assetUser, setAssetUser] = useState(''); // 사용자 이름 상태
	// const [assetSecurityManager, setAssetSecurityManager] = useState(''); // 보안담당자 이름 상태

	//  // 멤버 입력 변경 핸들러 (검색 호출)
	//  const handleMemberChange = (e) => {
	//     handleRoleChange(selectedRole, e.target.value); // 역할별로 입력 상태 반영
	//     if (e.target.value) {
	//         handleMemberSearch(e.target.value); // 검색 호출
	//     } else {
	//         setMembers([]); // 입력이 비었으면 리스트 초기화
	//     }
	// };

	// // 멤버 검색 함수
	// const handleMemberSearch = async (searchTerm) => {
	//     try {
	//         const response = await api.get(`${API_URL}/user/search`, {
	//             params: { name: searchTerm },
	//         });
	//         setMembers(response.data); // 검색 결과 업데이트
	//     } catch (error) {
	//         console.error('멤버 검색 중 오류 발생:', error);
	//     }
	// };

	// // 멤버 선택 핸들러 (모달에서 선택)
	// const handleSelectMember = (member) => {
	//     handleRoleChange(selectedRole, member.fullname); // 선택된 멤버 이름 설정
	//     setSelectedMemberID(member.id); // 선택된 멤버 ID 설정
	//     setMembers([]); // 리스트 초기화
	//     setShowModal(false); // 모달 닫기
	// };

	// // 모달 열기
	// const openModalForRole = (role) => {
	//     setSelectedRole(role); // 역할 설정 (소유자, 사용자, 보안담당자)
	//     setShowModal(true); // 모달 열기
	// };
	// 소유자 입력 변경 핸들러

	// assetCode와 initialFormData가 변경될 때마다 formData를 업데이트
	useEffect(() => {
		console.log('Received assetCode:', assetCode);
		console.log('Received formData:', initialFormData);
		if (assetCode && initialFormData?.assetCode === assetCode) {
			setFormData(initialFormData);
		}
	}, [initialFormData, assetCode]); // assetCode와 initialFormData가 변경될 때만 formData를 다시 설정

	// 수정 버튼 클릭 처리
	const handleEditClick = () => {
		setIsEditing(true);
	};
	// 수정 취소 및 닫기 버튼 처리
	const handleCloseClick = () => {
		setIsEditing(false); // 수정 모드 해제
	};

	const handleNextClick = () => {
		setShowModal(true);
	};

	// 파일 선택 처리
	const handleFileChange = (e, fileType) => {
		const file = e.target.files[0];
		if (file) {
			const fileURL = URL.createObjectURL(file);

			const updatedFiles = [...formData.files];
			const existingFileIndex = updatedFiles.findIndex((f) => f.fileType === fileType);

			const newFile = {
				file,
				fileURL,
				oriFileName: file.name,
				fileType: fileType,
			};

			if (existingFileIndex !== -1) {
				// 이미 존재하는 파일 타입이면 교체
				updatedFiles[existingFileIndex] = newFile;
			} else {
				// 새로운 파일 타입이면 추가
				updatedFiles.push(newFile);
			}

			// formData 업데이트
			setFormData({ ...formData, files: updatedFiles });

			// 이미지 파일이면 화면에 바로 보여주기
			if (fileType === 'PHOTO') {
				setSelectedFile(newFile); // 이미지 상태를 업데이트하여 보여주기
			}
		}
	};

	// formData를 변경하는 함수
	const handleInputChange = (event, key) => {
		const { value } = event.target; // 이벤트 객체에서 value 추출
		setFormData((prevData) => ({
			...prevData,
			[key]: value, // 해당 키의 값을 업데이트
			updateBy: user.id, // 현재 접속자 ID를 updateBy에 저장
		}));
	};
	// 모달 닫기 처리
	const handleModalClose = () => setShowModal(false);

	// 수정  api 받아서 처리
	const handleSubmit = async () => {
		console.log('handleSubmit:', formData); // 상태 확인

		try {
			// 1. 수정 처리 (기존 파일 정보 포함)
			const response = await api.post(`${urlConfig}/asset/update/${formData.assetCode}`, {
				...formData,
				existingFiles: formData.existingFiles, // 기존 파일 정보 추가
			});

			console.log('Update response:', response.data); // 응답 확인

			// 2. 백엔드에서 받은 메시지 처리
			if (response.data.includes('이미 수정이 들어간 자산입니다.')) {
				alert(
					`경고: 자산 수정 요청 처리부터 처리해주세요. 자산 코드: ${formData.assetCode}`
				);
			} else {
				//alert(response.data); // 성공 메시지

				// 3. 새 파일 업로드가 필요할 때만 실행
				if (formData.files && formData.files.length > 0) {
					const fileData = new FormData();

					// 새 파일만 처리
					for (const fileObj of formData.files) {
						if (fileObj.file) {
							fileData.append('files', fileObj.file); // 새 파일 추가
							fileData.append('fileType', fileObj.fileType); // 파일 타입 추가
						}
					}

					// 파일 업로드 API 호출 (새 파일만 처리)
					if (fileData.has('files')) {
						// 파일이 존재하는 경우에만 전송
						const fileResponse = await api.post(
							`${urlConfig}/${formData.assetCode}/files`,
							fileData,
							{ headers: { 'Content-Type': 'multipart/form-data' } }
						);

						console.log('File upload response:', fileResponse.data);

						if (fileResponse.status !== 200) {
							console.error('File upload failed:', fileResponse.data);
							alert(
								`파일 업데이트 중 오류가 발생했습니다. 상태 코드: ${fileResponse.status}`
							);
							return; // 오류 발생 시 더 이상 진행하지 않음
						} else {
							alert('모든 파일이 성공적으로 업로드되었습니다.');
						}
					}
				}

				// 성공 메시지 후 모달 닫기
				setShowModal(false); // 모달 닫기
				setTimeout(() => {
					Swal.fire({
						icon: 'success',
						title: `${formData.assetCode} : 자산이 성공적으로 수정되었습니다`,
					});

					// 수정이 완료되면 해당 페이지로 이동
					setPageIndex(0); // 원하는 페이지 번호로 설정 (예: 0은 첫 페이지)
					fetchData(0, pageSize); // 해당 페이지의 데이터를 다시 가져옴
				}, 500);
			}
		} catch (error) {
			console.error('Error updating asset data:', error.response || error);
			if (error.response) {
				console.error('Response data:', error.response.data);
				alert(`Error: ${error.response.data}`);
			} else {
				console.error('Error message:', error.message);
				alert('자산 수정 요청 중 오류가 발생했습니다.');
			}
		}
	};

	// 수정 요청 api 받아서 처리
	const handleSubmit1 = async () => {
		console.log('handleSubmit1:', formData); // 상태 확인
		try {
			// 1. 수정 요청 처리 (기존 파일 정보 포함)
			const response = await api.post(
				`${urlConfig}/asset/updateDemand/${formData.assetCode}`,
				{
					...formData,
					existingFiles: formData.existingFiles, // 기존 파일 정보 추가
				}
			);

			console.log('UpdateDemand response:', response.data); // 응답 확인

			// 2. 백엔드에서 받은 메시지 처리
			if (response.data.includes('이미 수정 요청이 들어간 자산입니다.')) {
				// 경고 메시지를 띄우기
				alert(`경고: 이미 수정 요청이 들어간 자산입니다. 자산 코드: ${formData.assetCode}`);
			} else {
				// 성공 메시지 띄우기
				//alert(response.data); // 성공 메시지
				Swal.fire({
					icon: 'success',
					title: `${formData.assetCode} : 자산이 성공적으로 수정요청되었습니다`,
				});
				setTimeout(() => {
					// 수정이 완료되면 해당 페이지로 이동
					setPageIndex(0); // 원하는 페이지 번호로 설정 (예: 0은 첫 페이지)
					fetchData(0, pageSize); // 해당 페이지의 데이터를 다시 가져옴
				}, 1500);

				// 3. 새 파일 업로드가 필요할 때만 실행
				if (formData.files && formData.files.length > 0) {
					const fileData = new FormData();

					// 새 파일만 처리
					for (const fileObj of formData.files) {
						if (fileObj.file) {
							fileData.append('files', fileObj.file); // 새 파일 추가
							fileData.append('fileType', fileObj.fileType); // 파일 타입 추가
						}
					}

					// 파일 업로드 API 호출 (새 파일만 처리)
					if (fileData.has('files')) {
						// 파일이 존재하는 경우에만 전송
						const fileResponse = await api.post(
							`${urlConfig}/${formData.assetCode}/files`,
							fileData,
							{ headers: { 'Content-Type': 'multipart/form-data' } }
						);

						console.log('File upload response:', fileResponse.data);

						if (fileResponse.status !== 200) {
							console.error('File upload failed:', fileResponse.data);
							alert(
								`파일 업데이트 중 오류가 발생했습니다. 상태 코드: ${fileResponse.status}`
							);
							return; // 오류 발생 시 더 이상 진행하지 않음
						} else {
							alert('모든 파일이 성공적으로 업로드되었습니다.');
						}
					}
				}

				setShowModal(false); // 모달 닫기
			}
		} catch (error) {
			console.error('Error updating asset data:', error);
			// setErrorMessage('자산 수정 요청 중 오류가 발생했습니다.');
		} finally {
			// 필요에 따라 페이지 새로고침 가능
			// window.location.reload();
		}
	};

	function CustomToggle({ children, eventKey }) {
		const [isOpen, setIsOpen] = useState(false);
		const decoratedOnClick = useAccordionButton(eventKey, () =>
			setIsOpen((prevOpen) => !prevOpen)
		);

		return (
			<button
				className="custom-button fw-bold h4"
				type="button"
				style={{
					width: '100%',
					backgroundColor: 'white',
					textAlign: 'left',
				}}
				onClick={decoratedOnClick}
			>
				{isOpen ? (
					<BsCaretUpFill style={{ paddingRight: '10' }} size="30" color="#2222226b" />
				) : (
					<BsCaretDownFill style={{ paddingRight: '10' }} size="30" color="#2222226b" />
				)}
				{children}
			</button>
		);
	}

	const renderCellContent = (key) => (
		<EditableCell
			keyName={key}
			value={formData[key]}
			isEditing={isEditing}
			handleInputChange={handleInputChange}
			selectedUser={selectedUser}
			selectedOwner={selectedOwner}
			selectedSecurityManager={selectedSecurityManager}
			setShowUserModal={setShowUserModal}
			setShowOwnerModal={setShowOwnerModal}
			setShowSecurityManagerModal={setShowSecurityManagerModal}
		/>
	);
	// // 수정모드 설정
	// if (isEditing) {
	// 	// department select 설정
	// 	if (key === 'department') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="IT부">IT부</option>
	// 				<option value="관리부">관리부</option>
	// 				<option value="영업부">영업부</option>
	// 				<option value="마케팅부">마케팅부</option>
	// 				<option value="생산부">생산부</option>
	// 				<option value="운영부">운영부</option>
	// 				<option value="인사부">인사부</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// assetLocation select 설정
	// 	if (key === 'assetLocation') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="본관 지하 문서고">본관 지하 문서고</option>
	// 				<option value="본관 1층">본관 1층</option>
	// 				<option value="본관 1층 접견실">본관 1층 접견실</option>
	// 				<option value="본관 2층">본관 2층</option>
	// 				<option value="본관 2층 사장실">본관 2층 사장실</option>
	// 				<option value="본관 2층 기술연구소 사무실">
	// 					본관 2층 기술 연구소 사무실
	// 				</option>
	// 				<option value="본관 2층 대회의실">본관 2층 대회의실</option>
	// 				<option value="본관 2층 대표이사실">본관 2층 대표 이사실</option>
	// 				<option value="본관 3층 창고">본관 3층 창고</option>
	// 				<option value="MDCG 천장">MDCG</option>
	// 				<option value="공장동">공장동</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// owenership select 설정
	// 	if (key === 'ownership') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="소유">소유</option>
	// 				<option value="임대">임대</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// useState select 설정
	// 	if (key === 'useStated') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="신규">신규</option>
	// 				<option value="사용중">사용중</option>
	// 				<option value="유지 관리 중 or 보수 작업 중">유지관리 중</option>
	// 				<option value="예비">예비</option>
	// 				<option value="퇴직/폐기">퇴직/폐기</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// operationStatus select 설정
	// 	if (key === 'operationStatus') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="가동중">가동중</option>
	// 				<option value="미가동">미가동</option>
	// 				<option value="고장">고장</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// operationStatus select 설정
	// 	if (key === 'depreciationMethod') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="정률법">정률법</option>
	// 				<option value="정액법">정액법</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// introduceDate 날짜로 설정
	// 	if (
	// 		[
	// 			'introducedDate',
	// 			'maintenancePeriod',
	// 			'purchaseDate',
	// 			'applicationDate',
	// 			'registrationDate',
	// 			'expirationDate',
	// 			'kaitsKeeper',
	// 			'v3OfficeSecurity',
	// 			'appCheckPro',
	// 			'tgate',
	// 		].includes(key)
	// 	) {
	// 		return (
	// 			<Form.Control
	// 				type="date" // 날짜 입력을 위한 date 타입 사용
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)} // onChange 핸들러로 날짜 값 처리
	// 				style={{ textAlign: 'center' }}
	// 			/>
	// 		);
	// 	}
	// 	if (['confidentiality', 'integrity', 'availability'].includes(key)) {
	// 		return (
	// 			<input
	// 				type="number"
	// 				min="1"
	// 				max="3"
	// 				defaultValue={formData[key] || ''} // formData에서 값을 가져옵니다.
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			/>
	// 		);
	// 	}
	// 	if (key === 'screenNumber') {
	// 		return (
	// 			<input
	// 				type="number"
	// 				defaultValue={formData[key] || ''} // formData에서 값을 가져옵니다.
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			/>
	// 		);
	// 	}
	// 	// patentTrademarkStatus select 설정
	// 	if (key === 'documentGrade') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="대외비">대외비</option>
	// 				<option value="내부용">내부용</option>
	// 				<option value="일반">일반</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// patentTrademarkStatus select 설정
	// 	if (key === 'documentType') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="일반문서">일반문서</option>
	// 				<option value="계약 및 법적문서">계약 및 법적문서</option>
	// 				<option value="보고서 및 프레젠테이션">보고서 및 프레젠테이션</option>
	// 				<option value="양식 및 서식">양식 및 서식</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// 특허 칼럼 설정해주기
	// 	// patentTrademarkStatus select 설정
	// 	if (key === 'patentTrademarkStatus') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="PCT_APPLICATION">PCT 출원</option>
	// 				<option value="APPLICATION">출원</option>
	// 				<option value="REGISTERED">등록</option>
	// 				<option value="EXPIRED">만료</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// patentTrademarkStatus select 설정
	// 	if (key === 'countryApplication') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="한국">한국</option>
	// 				<option value="미국">미국</option>
	// 				<option value="일본">일본</option>
	// 				<option value="중국">중국</option>
	// 				<option value="독일">독일</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// patentTrademarkStatus select 설정
	// 	if (key === 'patentClassification') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="NEW_MATERIALS">신소재</option>
	// 				<option value="INCUBATION">인큐베이션</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// patentTrademarkStatus select 설정
	// 	if (key === 'patentItem') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="COMPOSITE_MATERIALS">복합재</option>
	// 				<option value="CORPORATE_VENTURE">사내벤처</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// terminal select 설정
	// 	if (key === 'engineType') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="가솔린">가솔린</option>
	// 				<option value="디젤">디젤</option>
	// 				<option value="하이브리드">하이브리드</option>
	// 				<option value="전기">전기</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// car select 설정
	// 	if (key === 'carType') {
	// 		return (
	// 			<Form.Select
	// 				value={formData[key] || ''}
	// 				onChange={(e) => handleInputChange(e, key)}
	// 				style={{ textAlign: 'center' }}
	// 			>
	// 				<option value="승용차">승용차</option>
	// 				<option value="SUV">SUV</option>
	// 				<option value="트럭">트럭</option>
	// 				<option value="밴">밴</option>
	// 			</Form.Select>
	// 		);
	// 	}
	// 	// 소유자 필드에 대해 수정모드인 경우 별도로 렌더링
	// 	if (key === 'assetUser') {
	// 		return (
	// 			<Form.Group className="mb-1">
	// 				<Form.Control
	// 					type="text"
	// 					value={selectedUser ? selectedUser.fullname : formData.assetUser || ''} // 선택된 소유자의 fullname 또는 기존 값 사용
	// 					disabled // 입력 필드 비활성화
	// 					style={{ textAlign: 'center' }} // 텍스트 가운데 정렬
	// 				/>
	// 				<Button variant="secondary" onClick={() => setShowUserModal(true)}>
	// 					사용자 선택
	// 				</Button>
	// 			</Form.Group>
	// 		);
	// 	}
	// 	// 소유자 필드에 대해 수정모드인 경우 별도로 렌더링
	// 	if (key === 'assetOwner') {
	// 		return (
	// 			<Form.Group className="mb-1">
	// 				<Form.Control
	// 					type="text"
	// 					value={
	// 						selectedOwner ? selectedOwner.fullname : formData.assetOwner || ''
	// 					} // 선택된 소유자의 fullname 또는 기존 값 사용
	// 					disabled // 입력 필드 비활성화
	// 					style={{ textAlign: 'center' }} // 텍스트 가운데 정렬
	// 				/>
	// 				<Button variant="secondary" onClick={() => setShowOwnerModal(true)}>
	// 					소유자 선택
	// 				</Button>
	// 			</Form.Group>
	// 		);
	// 	}
	// 	// 소유자 필드에 대해 수정모드인 경우 별도로 렌더링
	// 	if (key === 'assetSecurityManager') {
	// 		return (
	// 			<Form.Group className="mb-1">
	// 				<Form.Control
	// 					type="text"
	// 					value={
	// 						selectedSecurityManager
	// 							? selectedSecurityManager.fullname
	// 							: formData.assetSecurityManager || ''
	// 					} // 선택된 소유자의 fullname 또는 기존 값 사용
	// 					disabled // 입력 필드 비활성화
	// 					style={{ textAlign: 'center' }} // 텍스트 가운데 정렬
	// 				/>
	// 				<Button
	// 					variant="secondary"
	// 					onClick={() => setShowSecurityManagerModal(true)}
	// 				>
	// 					보안담당자 선택
	// 				</Button>
	// 			</Form.Group>
	// 		);
	// 	}
	// 	// select 외는 text input 설정
	// 	return (
	// 		<Form.Control
	// 			type="text"
	// 			value={formData[key] || ''}
	// 			onChange={(e) => handleInputChange(e, key)}
	// 			style={{ textAlign: 'center' }}
	// 		/>
	// 	);
	// }
	// // 수정 모드가 아닐 때 일반 텍스트 렌더링
	// return formData[key] || 'N/A';

	return (
		<>
			{/* 큰 부모 div */}
			<div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
				{/* 이미지 표시 부분 */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						marginRight: '40px',
					}}
				>
					{formData.files.some((file) => file.fileType === 'PHOTO') ? (
						<img
							src={
								selectedFile
									? selectedFile.fileURL
									: formData.files.find((file) => file.fileType === 'PHOTO')
											.fileURL
							}
							alt={
								selectedFile
									? selectedFile.oriFileName
									: formData.files.find((file) => file.fileType === 'PHOTO')
											.oriFileName
							}
							style={{ width: '350px', height: 'auto' }}
						/>
					) : (
						<div
							style={{
								width: '300px',
								height: 'auto',
								backgroundColor: '#f0f0f0',
								border: '1px dashed #ccc',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								color: '#aaa',
							}}
						>
							<span>이미지가 없습니다</span>
						</div>
					)}

					{/* 수정 모드일 때 파일 입력: 이미지 아래에 위치 */}
					{isEditing && (
						<input
							type="file"
							accept="image/*"
							onChange={(e) => handleFileChange(e, 'PHOTO')} // 이미지 파일 처리
							style={{ marginTop: '10px' }}
						/>
					)}
				</div>

				<div className="scrollable-div" style={{ flex: 1 }}>
					{/* 기본 자산 정보 및 관리 정보 테이블 */}
					<div className="info-section" style={{ flexGrow: 1 }}>
						<h4>기본 자산 정보 및 관리 정보</h4>
						<BootstrapTable
							striped
							bordered
							hover
							className="table-detail"
							style={{ width: '100%' }}
						>
							<thead>
								<tr>
									{/* <th>자산코드</th>
									<th>자산명</th> */}
									<th>자산기준</th>
									<th>제조사</th>
									<th>목적</th>
									<th>부서</th>
									<th>위치</th>
									<th>사용자</th>
									<th>소유자</th>
									<th>보안담당자</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									{/* <td>{formData.assetCode || 'N/A'}</td>
									<td>{formData.assetName || 'N/A'}</td> */}
									<td>{formData.assetBasis || 'N/A'}</td>
									<td>{formData.manufacturingCompany || 'N/A'}</td>
									<td>{formData.purpose || 'N/A'}</td>
									<td>{renderCellContent('department')}</td>
									<td>{renderCellContent('assetLocation')}</td>
									<td>{renderCellContent('assetUser')}</td>
									<td>{renderCellContent('assetOwner')}</td>
									<td>{renderCellContent('assetSecurityManager')}</td>
								</tr>
							</tbody>
						</BootstrapTable>
						<BootstrapTable
							striped
							bordered
							hover
							className="table-detail"
							style={{ width: '100%' }}
						>
							<thead>
								<tr>
									<th>사용상태</th>
									<th>가동여부</th>
									<th>도입일자</th>
									<th style={{ width: '80px' }}>기밀성</th>
									<th style={{ width: '80px' }}>무결성</th>
									<th style={{ width: '80px' }}>가용성</th>
									<th style={{ width: '80px' }}>중요성점수</th>
									<th style={{ width: '80px' }}>중요성등급</th>
									<th>비고</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{renderCellContent('useStated')}</td>
									<td>{renderCellContent('operationStatus')}</td>
									<td>{renderCellContent('introducedDate')}</td>
									<td style={{ width: '80px' }}>
										{renderCellContent('confidentiality')}
									</td>
									<td style={{ width: '80px' }}>
										{renderCellContent('integrity')}
									</td>
									<td style={{ width: '80px' }}>
										{renderCellContent('availability')}
									</td>
									<td style={{ width: '80px' }}>{importanceScore}</td>
									<td style={{ width: '80px' }}>{importanceRating}</td>
									<td>{renderCellContent('note')}</td>
								</tr>
							</tbody>
						</BootstrapTable>

						{/* 재무 및 구매 정보 테이블 */}
						<h4>재무 및 구매 정보</h4>
						<BootstrapTable
							striped
							bordered
							hover
							className="table-detail"
							style={{ width: '100%' }}
						>
							<thead>
								<tr>
									<th>구매비용</th>
									<th>구매날짜</th>
									<th>내용연수</th>
									<th>감가상각방법</th>
									<th>구입처</th>
									<th>구입처 연락처</th>
									<th>취득경로</th>
									<th>유지기간</th>
									<th>잔존가치</th>
									<th>현재가치</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{renderCellContent('purchaseCost')}</td>
									<td>{renderCellContent('purchaseDate')}</td>
									<td>{renderCellContent('usefulLife')}</td>
									<td>{renderCellContent('depreciationMethod')}</td>
									<td>{renderCellContent('purchaseSource')}</td>
									<td>{renderCellContent('contactInformation')}</td>
									<td>{renderCellContent('acquisitionRoute')}</td>
									<td>{renderCellContent('maintenancePeriod')}</td>
									<td>{renderCellContent('residualValue')}</td>
									<td>{renderCellContent('currentValue')}</td>
								</tr>
							</tbody>
						</BootstrapTable>

						{/* classification에 따른 동적 열 테이블 */}
						{dynamicColumns.length > 0 ? (
							<>
								<h4>{formData?.assetClassification}에 따른 칼럼</h4>
								<BootstrapTable
									striped
									bordered
									hover
									className="table-detail"
									style={{ width: '100%' }}
								>
									<thead>
										<tr>
											{formData?.assetClassification === '정보보호시스템' && (
												<>
													<th>서비스범위</th>
												</>
											)}
											{formData?.assetClassification === '응용프로그램' && (
												<>
													<th>서비스범위</th>
													<th>OS</th>
													<th>관련DB</th>
													<th>IP</th>
													<th>화면수</th>
												</>
											)}
											{formData?.assetClassification === '소프트웨어' && (
												<>
													<th>IP</th>
													<th>ID</th>
													<th>PW</th>
													<th>담당업체</th>
													<th>OS</th>
												</>
											)}
											{formData?.assetClassification === '전자정보' && (
												<>
													<th>OS</th>
													<th>시스템</th>
													<th>DB종류</th>
												</>
											)}
											{formData?.assetClassification === '문서' && (
												<>
													<th>문서등급</th>
													<th>문서형태</th>
													<th>문서링크</th>
												</>
											)}
											{formData.assetClassification === '특허 및 상표' && (
												<>
													<th>출원일자</th>
													<th>등록일자</th>
													<th>만료일자</th>
													<th>특허/상표 상태</th>
													<th>출원국가</th>
													<th>특허분류</th>
													<th>특허세목</th>
													<th>출원번호</th>
													<th>발명자</th>
													<th>권리권자</th>
													<th>관련문서</th>
												</>
											)}
											{formData.assetClassification ===
												'IT 장비 - 시스템' && (
												<>
													<th>장비유형</th>
													<th>랙유닛</th>
													<th>전원공급장치</th>
													<th>쿨링시스템</th>
													<th>인터페이스 포트</th>
													<th>폼팩터</th>
													<th>확장슬롯수</th>
													<th>그래픽카드</th>
													<th>포트 구성</th>
													<th>모니터 포함여부</th>
												</>
											)}
											{formData.assetClassification ===
												'IT 장비 – 네트워크' && (
												<>
													<th>장비유형</th>
													<th>포트수</th>
													<th>지원프로토콜</th>
													<th>펌웨어 버전</th>
													<th>네트워크 속도</th>
													<th>서비스범위</th>
												</>
											)}
											{formData.assetClassification === '단말기' && (
												<>
													<th>IP</th>
													<th>제품 시리얼 번호</th>
													<th>OS</th>
													<th>보안관제</th>
													<th>내부정보 유출 방지</th>
													<th>악성코드,랜섬웨어 탐지</th>
													<th>안티랜섬웨어</th>
													<th>NAC agent</th>
												</>
											)}
											{formData.assetClassification === '가구' && (
												<>
													<th>크기</th>
												</>
											)}
											{formData.assetClassification === '기기' && (
												<>
													<th>기기유형</th>
													<th>모델번호</th>
													<th>연결방식</th>
													<th>전원사양</th>
												</>
											)}
											{formData.assetClassification === '차량' && (
												<>
													<th>배기량</th>
													<th>차량의 문 수</th>
													<th>엔진 형식</th>
													<th>차량 종류</th>
													<th>차량 식별번호</th>
													<th>차량 색상</th>
													<th>연식</th>
												</>
											)}
											{formData.assetClassification === '기타' && (
												<>
													<th>기타 세부 설명</th>
													<th>사용 빈도</th>
												</>
											)}
										</tr>
									</thead>
									<tbody>
										<tr>
											{formData?.assetClassification === '정보보호시스템' && (
												<>
													<td>{renderCellContent('serviceScope')}</td>
												</>
											)}
											{formData?.assetClassification === '응용프로그램' && (
												<>
													<td>{renderCellContent('serviceScope')}</td>
													<td>{renderCellContent('os')}</td>
													<td>{renderCellContent('relatedDB')}</td>
													<td>{renderCellContent('ip')}</td>
													<td>{renderCellContent('screenNumber')}</td>
												</>
											)}
											{formData?.assetClassification === '소프트웨어' && (
												<>
													<td>{renderCellContent('ip')}</td>
													<td>{renderCellContent('serverId')}</td>
													<td>{renderCellContent('serverPassword')}</td>
													<td>{renderCellContent('companyManager')}</td>
													<td>{renderCellContent('os')}</td>
												</>
											)}
											{formData?.assetClassification === '전자정보' && (
												<>
													<td>{renderCellContent('os')}</td>
													<td>{renderCellContent('system')}</td>
													<td>{renderCellContent('dbtype')}</td>
												</>
											)}
											{formData?.assetClassification === '문서' && (
												<>
													<td>{renderCellContent('documentGrade')}</td>
													<td>{renderCellContent('documentType')}</td>
													<td>{renderCellContent('documentLink')}</td>
												</>
											)}
											{formData?.assetClassification === '특허 및 상표' && (
												<>
													<td>{renderCellContent('applicationDate')}</td>
													<td>{renderCellContent('registrationDate')}</td>
													<td>{renderCellContent('expirationDate')}</td>
													<td>
														{renderCellContent('patentTrademarkStatus')}
													</td>
													<td>
														{renderCellContent('countryApplication')}
													</td>
													<td>
														{renderCellContent('patentClassification')}
													</td>
													<td>{renderCellContent('patentItem')}</td>
													<td>{renderCellContent('applicationNo')}</td>
													<td>{renderCellContent('inventor')}</td>
													<td>{renderCellContent('assignee')}</td>
													<td>{renderCellContent('relatedDocuments')}</td>
												</>
											)}

											{formData?.assetClassification ===
												'IT 장비 - 시스템' && (
												<>
													<td>{renderCellContent('equipmentType')}</td>
													<td>{renderCellContent('rackUnit')}</td>
													<td>{renderCellContent('powerSupply')}</td>
													<td>{renderCellContent('coolingSystem')}</td>
													<td>{renderCellContent('interfacePorts')}</td>
													<td>{renderCellContent('formFactor')}</td>
													<td>{renderCellContent('expansionSlots')}</td>
													<td>{renderCellContent('graphicsCard')}</td>
													<td>
														{renderCellContent('portConfiguration')}
													</td>
													<td>{renderCellContent('monitorIncluded')}</td>
												</>
											)}
											{formData?.assetClassification ===
												'IT 장비 – 네트워크' && (
												<>
													<td>{renderCellContent('equipmentType')}</td>
													<td>{renderCellContent('numberOfPorts')}</td>
													<td>
														{renderCellContent('supportedProtocols')}
													</td>
													<td>{renderCellContent('firmwareVersion')}</td>
													<td>{renderCellContent('networkSpeed')}</td>
													<td>{renderCellContent('serviceScope')}</td>
												</>
											)}
											{formData?.assetClassification === '단말기' && (
												<>
													<td>{renderCellContent('ip')}</td>
													<td>
														{renderCellContent('productSerialNumber')}
													</td>
													<td>{renderCellContent('os')}</td>
													<td>{renderCellContent('securityControl')}</td>
													<td>{renderCellContent('kaitsKeeper')}</td>
													<td>{renderCellContent('v3OfficeSecurity')}</td>
													<td>{renderCellContent('appCheckPro')}</td>
													<td>{renderCellContent('tgate')}</td>
												</>
											)}
											{formData?.assetClassification === '가구' && (
												<>
													<td>{renderCellContent('furnitureSize')}</td>
												</>
											)}
											{formData?.assetClassification === '기기' && (
												<>
													<td>{renderCellContent('deviceType')}</td>
													<td>{renderCellContent('modelNumber')}</td>
													<td>{renderCellContent('connectionType')}</td>
													<td>
														{renderCellContent('powerSpecifications')}
													</td>
												</>
											)}
											{formData?.assetClassification === '차량' && (
												<>
													<td>{renderCellContent('displacement')}</td>
													<td>{renderCellContent('doorsCount')}</td>
													<td>{renderCellContent('engineType')}</td>
													<td>{renderCellContent('carType')}</td>
													<td>{renderCellContent('identificationNo')}</td>
													<td>{renderCellContent('carColor')}</td>
													<td>{renderCellContent('modelYear')}</td>
												</>
											)}
											{formData?.assetClassification === '기타' && (
												<>
													<td>{renderCellContent('otherDescription')}</td>
													<td>{renderCellContent('usageFrequency')}</td>
												</>
											)}
										</tr>
									</tbody>
								</BootstrapTable>
							</>
						) : (
							<p>데이터를 불러오는 중입니다...</p>
						)}
					</div>
					{/* 모달 */}
					<Modal show={showModal} onHide={handleModalClose}>
						<Modal.Header closeButton>
							<Modal.Title>수정</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group className="mb-3">
									<Form.Label>구분</Form.Label>
									<Form.Control type="text" value="수정" readOnly />
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>수정 사유</Form.Label>
									<Form.Control
										type="text"
										value={formData.updateReason}
										onChange={(e) => handleInputChange(e, 'updateReason')}
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>수정내용</Form.Label>
									<Form.Control
										as="textarea"
										rows={3}
										value={formData.updateDetail}
										onChange={(e) => handleInputChange(e, 'updateDetail')}
									/>
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleModalClose}>
								취소
							</Button>
							{user.role === 'ASSET_MANAGER' && (
								<Button variant="primary" onClick={handleSubmit1}>
									수정 요청
								</Button>
							)}
							{user.role === 'ADMIN' && (
								<Button variant="primary" onClick={handleSubmit}>
									수정
								</Button>
							)}
						</Modal.Footer>
					</Modal>
				</div>
			</div>
			<Card></Card>
			{/* 새로 추가할 div: 테이블 바로 아래에 위치 */}
			<div>
				<div style={{ marginTop: '20px' }}>
					<Tabs defaultActiveKey="attachments" id="uncontrolled-tab-example">
						<Tab eventKey="attachments" title="첨부파일">
							<div
								style={{
									padding: '20px',
									border: '1px solid #ccc',
									display: 'grid',
									gridTemplateColumns: '1fr 1fr',
									gap: '20px',
								}}
							>
								{/* 보증세부사항 */}
								<div>
									<h4 style={{ margin: '0 0 10px' }}>보증세부사항</h4>
									<Form.Control
										type="text"
										value={formData.warrantyDetails || '파일없음'}
										readOnly
										style={{
											border: '1px solid #ccc',
											padding: '10px',
											backgroundColor: '#f9f9f9',
										}}
									/>
								</div>
								{/* 사용자 메뉴얼 */}
								<div>
									<h4 style={{ margin: '0 0 10px' }}>사용자 메뉴얼</h4>
									<Form.Control
										type="text"
										value={formData.attachment || '파일없음'}
										readOnly
										style={{
											border: '1px solid #ccc',
											padding: '10px',
											backgroundColor: '#f9f9f9',
										}}
									/>
								</div>
								{/* 보증세부사항 파일 */}
								<div>
									<h4 style={{ margin: '0 0 10px' }}>보증세부사항 파일</h4>

									{isEditing ? (
										// 수정 모드일 때 파일 업로드 입력 필드 표시
										<div>
											{formData.files &&
											formData.files.some(
												(file) => file.fileType === 'WARRANTY_DETAILS'
											) ? (
												<a
													href={
														formData.files.find(
															(file) =>
																file.fileType === 'WARRANTY_DETAILS'
														).fileURL
													}
													download
													style={{
														display: 'block',
														border: '1px solid #ccc',
														padding: '10px',
														backgroundColor: '#f9f9f9',
														textDecoration: 'none',
														color: '#000',
														cursor: 'pointer',
														borderRadius: '4px',
														width: '100%',
														textAlign: 'left',
													}}
												>
													{
														formData.files.find(
															(file) =>
																file.fileType === 'WARRANTY_DETAILS'
														).oriFileName
													}
												</a>
											) : (
												<div
													style={{
														display: 'block',
														border: '1px solid #ccc',
														padding: '10px',
														backgroundColor: '#f9f9f9',
														color: '#aaa',
														borderRadius: '4px',
														width: '100%',
														textAlign: 'left',
													}}
												>
													파일 없음
												</div>
											)}

											{/* 파일 업로드 입력 */}
											<input
												type="file"
												onChange={(e) =>
													handleFileChange(e, 'WARRANTY_DETAILS')
												} // 보증세부사항 파일 업로드 핸들러 연결
												style={{
													marginTop: '10px',
													padding: '5px',
													border: '1px solid #ccc',
													borderRadius: '4px',
													width: '100%',
													cursor: 'pointer',
												}}
											/>
										</div>
									) : // 읽기 모드일 때 기존 파일 다운로드 또는 "파일 없음" 표시
									formData.files &&
									  formData.files.some(
											(file) => file.fileType === 'WARRANTY_DETAILS'
									  ) ? (
										<a
											href={
												formData.files.find(
													(file) => file.fileType === 'WARRANTY_DETAILS'
												).fileURL
											}
											download
											style={{
												display: 'block',
												border: '1px solid #ccc',
												padding: '10px',
												backgroundColor: '#f9f9f9',
												textDecoration: 'none',
												color: '#000',
												cursor: 'pointer',
												borderRadius: '4px',
												width: '100%',
												textAlign: 'left',
											}}
										>
											{
												formData.files.find(
													(file) => file.fileType === 'WARRANTY_DETAILS'
												).oriFileName
											}
										</a>
									) : (
										<div
											style={{
												display: 'block',
												border: '1px solid #ccc',
												padding: '10px',
												backgroundColor: '#f9f9f9',
												color: '#aaa',
												borderRadius: '4px',
												width: '100%',
												textAlign: 'left',
											}}
										>
											파일 없음
										</div>
									)}
								</div>
								{/* 사용자 메뉴얼 파일 */}
								<div>
									<h4 style={{ margin: '0 0 10px' }}>사용자 메뉴얼 파일</h4>
									{isEditing ? (
										// 수정 모드일 때 파일 업로드 입력 필드 표시
										<div>
											{formData.files &&
											formData.files.some(
												(file) => file.fileType === 'USER_MANUAL'
											) ? (
												<a
													href={
														formData.files.find(
															(file) =>
																file.fileType === 'USER_MANUAL'
														).fileURL
													}
													download
													style={{
														display: 'block',
														border: '1px solid #ccc',
														padding: '10px',
														backgroundColor: '#f9f9f9',
														textDecoration: 'none',
														color: '#000',
														cursor: 'pointer',
														borderRadius: '4px',
														width: '100%',
														textAlign: 'left',
													}}
												>
													{
														formData.files.find(
															(file) =>
																file.fileType === 'USER_MANUAL'
														).oriFileName
													}
												</a>
											) : (
												<div
													style={{
														display: 'block',
														border: '1px solid #ccc',
														padding: '10px',
														backgroundColor: '#f9f9f9',
														color: '#aaa',
														borderRadius: '4px',
														width: '100%',
														textAlign: 'left',
													}}
												>
													파일 없음
												</div>
											)}

											{/* 파일 업로드 입력 */}
											<input
												type="file"
												onChange={(e) => handleFileChange(e, 'USER_MANUAL')} // 보증세부사항 파일 업로드 핸들러 연결
												style={{
													marginTop: '10px',
													padding: '5px',
													border: '1px solid #ccc',
													borderRadius: '4px',
													width: '100%',
													cursor: 'pointer',
												}}
											/>
										</div>
									) : // 읽기 모드일 때 기존 파일 다운로드 또는 "파일 없음" 표시
									formData.files &&
									  formData.files.some(
											(file) => file.fileType === 'USER_MANUAL'
									  ) ? (
										<a
											href={
												formData.files.find(
													(file) => file.fileType === 'USER_MANUAL'
												).fileURL
											}
											download
											style={{
												display: 'block',
												border: '1px solid #ccc',
												padding: '10px',
												backgroundColor: '#f9f9f9',
												textDecoration: 'none',
												color: '#000',
												cursor: 'pointer',
												borderRadius: '4px',
												width: '100%',
												textAlign: 'left',
											}}
										>
											{
												formData.files.find(
													(file) => file.fileType === 'USER_MANUAL'
												).oriFileName
											}
										</a>
									) : (
										<div
											style={{
												display: 'block',
												border: '1px solid #ccc',
												padding: '10px',
												backgroundColor: '#f9f9f9',
												color: '#aaa',
												borderRadius: '4px',
												width: '100%',
												textAlign: 'left',
											}}
										>
											파일 없음
										</div>
									)}
								</div>
							</div>
						</Tab>

						<Tab eventKey="updateHistory" title="수정이력">
							<HistoryTableUpdate updateHistory={formData.updateHistory} />
						</Tab>

						<Tab eventKey="maintenanceHistory" title="유지보수이력">
							{/* 유지보수이력 테이블 */}
							<HistoryTableMaintenance repairHistory={formData.repairHistory} />
						</Tab>

						<Tab eventKey="investigationHistory" title="자산조사이력">
							{/* 자산조사이력 테이블 */}
							<HistoryTableInvestigation surveyHistory={formData.surveyHistory} />
						</Tab>
					</Tabs>
				</div>
			</div>

			<Modal show={showOwnerModal} onHide={() => setShowOwnerModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>소유자 선택</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						type="text"
						placeholder="소유자 이름으로 검색..."
						onChange={assetOwnerChange} // 소유자 검색 핸들러
					/>
					{owners.length > 0 && (
						<div className="owner-list">
							{owners.map((owner) => (
								<Form.Check
									key={owner.id}
									type="radio" // 라디오 버튼으로 선택
									id={`owner-${owner.id}`}
									label={`${owner.fullname} (${owner.department})`}
									name="assetOwner" // 같은 그룹으로 묶기
									onChange={() => setSelectedOwner(owner)} // 선택 시 상태 업데이트
								/>
							))}
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							if (selectedOwner) {
								handleSelectOwner(selectedOwner); // 선택된 소유자를 적용
							}
							setShowOwnerModal(false); // 모달 닫기
						}}
					>
						확인
					</Button>
					<Button variant="secondary" onClick={() => setShowOwnerModal(false)}>
						닫기
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>사용자 선택</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						type="text"
						placeholder="사용자 이름으로 검색..."
						onChange={assetUserChange} // 소유자 검색 핸들러
					/>
					{users.length > 0 && (
						<div className="user-list">
							{users.map((user) => (
								<Form.Check
									key={user.id}
									type="radio" // 라디오 버튼으로 선택
									id={`user-${user.id}`}
									label={`${user.fullname} (${user.department})`}
									name="assetUser" // 같은 그룹으로 묶기
									onChange={() => setSelectedUser(user)} // 선택 시 상태 업데이트
								/>
							))}
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							if (selectedUser) {
								handleSelectUser(selectedUser); // 선택된 소유자를 적용
							}
							setShowUserModal(false); // 모달 닫기
						}}
					>
						확인
					</Button>
					<Button variant="secondary" onClick={() => setShowUserModal(false)}>
						닫기
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showSecurityManagerModal}
				onHide={() => setShowSecurityManagerModal(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>보안담당자 선택</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						type="text"
						placeholder="보안담당자 이름으로 검색..."
						onChange={assetSecurityManagerChange} // 소유자 검색 핸들러
					/>
					{securityManagers.length > 0 && (
						<div className="securityManager-list">
							{securityManagers.map((securityManager) => (
								<Form.Check
									key={securityManager.id}
									type="radio" // 라디오 버튼으로 선택
									id={`securityManager-${securityManager.id}`}
									label={`${securityManager.fullname} (${securityManager.department})`}
									name="assetSecurityManger" // 같은 그룹으로 묶기
									onChange={() => setSelectedSecurityManager(securityManager)} // 선택 시 상태 업데이트
								/>
							))}
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							if (selectedSecurityManager) {
								handleSelectSecurityManager(selectedSecurityManager); // 선택된 소유자를 적용
							}
							setShowSecurityManagerModal(false); // 모달 닫기
						}}
					>
						확인
					</Button>
					<Button variant="secondary" onClick={() => setShowSecurityManagerModal(false)}>
						닫기
					</Button>
				</Modal.Footer>
			</Modal>

			{/* 버튼 */}
			<div>
				<Row className="mt-3">
					<Col className="text-end">
						{isEditing ? (
							<>
								<Button
									variant="primary"
									className="me-2"
									onClick={handleNextClick}
								>
									다음
								</Button>

								<Button variant="danger" onClick={handleCloseClick}>
									닫기1
								</Button>
							</>
						) : (
							<>
								{(user.role === 'ADMIN' || user.role === 'ASSET_MANAGER') && (
									<>
										<Button
											variant="primary"
											className="me-2"
											onClick={handleEditClick}
										>
											수정
										</Button>

										{/* 유지보수 */}
										<MaintainRegister
											assetCode={formData.assetCode}
											assetName={formData.assetName}
											assetNo={formData.assetNo}
										/>
									</>
								)}
								<Button variant="danger" onClick={onClose}>
									닫기
								</Button>
							</>
						)}
					</Col>
				</Row>
			</div>
		</>
	);
};

export default RowDetails;
