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

	const handleNextClick = () => {
		setShowModal(true);
	};

	// 수정 취소 및 닫기 버튼 처리
	const handleCloseClick = () => {
		setIsEditing(false); // 수정 모드 해제
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
		}));
	};
	// 모달 닫기 처리
	const handleModalClose = () => setShowModal(false);

	// 수정  api 받아서 처리
	const handleSubmit = async () => {
		console.log('handleSubmit:', formData); // 상태 확인

		try {
			// 1. 수정 처리 (기존 파일 정보 포함)
			const response = await axios.post(`${urlConfig}/asset/update/${formData.assetCode}`, {
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
						const fileResponse = await axios.post(
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
			const response = await axios.post(
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
						const fileResponse = await axios.post(
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

	const renderCellContent = (key) => {
		// 수정모드 설정
		if (isEditing) {
			// department select 설정
			if (key === 'department') {
				return (
					<Form.Select
						value={formData[key] || ''}
						onChange={(e) => handleInputChange(e, key)}
					>
						<option value="IT부">IT부</option>
						<option value="관리부">관리부</option>
						<option value="영업부">영업부</option>
						<option value="마케팅부">마케팅부</option>
						<option value="생산부">생산부</option>
						<option value="운영부">운영부</option>
						<option value="인사부">인사부</option>
					</Form.Select>
				);
			}
			// assetLocation select 설정
			if (key === 'assetLocation') {
				return (
					<Form.Select
						value={formData[key] || ''}
						onChange={(e) => handleInputChange(e, key)}
					>
						<option value="본관 지하 문서고">본관 지하 문서고</option>
						<option value="본관 1층">본관 1층</option>
						<option value="본관 1층 접견실">본관 1층 접견실</option>
						<option value="본관 2층">본관 2층</option>
						<option value="본관 2층 사장실">본관 2층 사장실</option>
						<option value="본관 2층 기술연구소 사무실">
							본관 2층 기술 연구소 사무실
						</option>
						<option value="본관 2층 대회의실">본관 2층 대회의실</option>
						<option value="본관 2층 대표이사실">본관 2층 대표 이사실</option>
						<option value="본관 3층 창고">본관 3층 창고</option>
						<option value="MDCG 천장">MDCG</option>
						<option value="공장동">공장동</option>
					</Form.Select>
				);
			}
			// owenership select 설정
			if (key === 'ownership') {
				return (
					<Form.Select
						value={formData[key] || ''}
						onChange={(e) => handleInputChange(e, key)}
					>
						<option value="소유">소유</option>
						<option value="임대">임대</option>
					</Form.Select>
				);
			}
			// useState select 설정
			if (key === 'usestate') {
				return (
					<Form.Select
						value={formData[key] || ''}
						onChange={(e) => handleInputChange(e, key)}
					>
						<option value="신규">신규</option>
						<option value="사용중">사용중</option>
						<option value="유지 관리 중 or 보수 작업 중">유지관리 중</option>
						<option value="예비">예비</option>
						<option value="퇴직/폐기">퇴직/폐기</option>
					</Form.Select>
				);
			}
			// operationStatus select 설정
			if (key === 'operationStatus') {
				return (
					<Form.Select
						value={formData[key] || ''}
						onChange={(e) => handleInputChange(e, key)}
					>
						<option value="가동중">가동중</option>
						<option value="미가동">미가동</option>
						<option value="고장">고장</option>
					</Form.Select>
				);
			}
			// introduceDate 날짜로 설정
			if (key === 'introducedDate') {
				return (
					<Form.Control
						type="date" // 날짜 입력을 위한 date 타입 사용
						value={formData[key] || ''}
						onChange={(e) => handleInputChange(e, key)} // onChange 핸들러로 날짜 값 처리
					/>
				);
			}

			// select 외는 text input 설정
			return (
				<Form.Control
					type="text"
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
				/>
			);
		}
		// 수정 모드가 아닐 때 일반 텍스트 렌더링
		return formData[key] || 'N/A';
	};

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
									<td>{renderCellContent('usestate')}</td>
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
											{dynamicColumns.map((col) => (
												<th key={col.title}>{col.title}</th>
											))}
										</tr>
									</thead>
									<tbody>
										<tr>
											{dynamicColumns.map((col) => (
												<td key={col.title}>
													{isEditing ? (
														<Form.Control
															type="text"
															value={formData[col.data] || ''}
															onChange={(e) =>
																handleInputChange(e, col.data)
															}
														/>
													) : (
														formData[col.data] || 'N/A'
													)}
												</td>
											))}
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
							<Modal.Title>수정 요청</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group className="mb-3">
									<Form.Label>구분</Form.Label>
									<Form.Control type="text" value="수정" readOnly />
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>수정사유</Form.Label>
									<Form.Select
										value={formData.updateReason}
										onChange={(e) => handleInputChange(e, 'updateReason')}
									>
										<option value="사유 1">사유 1</option>
										<option value="사유 2">사유 2</option>
										<option value="사유 3">사유 3</option>
									</Form.Select>
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
							<Button variant="primary" onClick={handleSubmit1}>
								수정 요청
							</Button>
							<Button variant="primary" onClick={handleSubmit}>
								수정
							</Button>
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
