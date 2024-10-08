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
import { UpdateHistoryTable } from './UpdateHistoryTable';
import { MaintenanceHistoryTable } from './MaintenanceHistoryTable';
import { InvestigationHistoryTable } from './InvestigationHistoryTable';

const urlConfig = import.meta.env.VITE_BASIC_URL;

const RowDetails = ({ row, assetCode, onClose, formData: initialFormData }) => {
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
	// 파일 선택 처리
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const fileURL = URL.createObjectURL(file);
			setSelectedFile({ file, fileURL, oriFileName: file.name, fileType: 'PHOTO' });

			// formData의 files 배열 업데이트
			const updatedFiles = [...formData.files];
			const existingPhotoIndex = updatedFiles.findIndex((f) => f.fileType === 'PHOTO');

			if (existingPhotoIndex !== -1) {
				// 기존 이미지가 있는 경우, 해당 이미지를 새 이미지로 교체
				updatedFiles[existingPhotoIndex] = {
					file,
					fileURL,
					oriFileName: file.name,
					fileType: 'PHOTO',
				};
			} else {
				// 기존 이미지가 없는 경우, 새 이미지를 추가
				updatedFiles.push({
					file,
					fileURL,
					oriFileName: file.name,
					fileType: 'PHOTO',
				});
			}

			// formData 업데이트
			setFormData({ ...formData, files: updatedFiles });
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
		const formDataToSend = new FormData(); // 새로운 FormData 객체 생성

		// 기존 formData의 값들을 FormData에 추가
		for (const key in formData) {
			if (formData.hasOwnProperty(key)) {
				formDataToSend.append(key, formData[key]); // 일반 데이터 추가
			}
		}

		// 파일 배열이 비어있지 않은 경우에만 추가
		if (formData.files && formData.files.length > 0) {
			formData.files.forEach((file) => {
				formDataToSend.append('files', file.file); // 파일 객체 추가
			});
		} else {
			console.error('No files to send.');
		}

		console.log('handleSubmit:', formDataToSend); // 상태 확인

		try {
			// 1. 자산 수정 요청 처리
			const response = await axios.post(
				`${urlConfig}/asset/update/${formData.assetCode}`,
				formDataToSend, // FormData 전송
				{
					headers: {
						'Content-Type': 'multipart/form-data', // 멀티파트 폼 데이터로 설정
					},
				}
			);

			// 백엔드에서 받은 메시지 처리
			if (response.data.includes('이미 수정 요청이 들어간 자산입니다.')) {
				// 경고 메시지를 띄우기
				alert(
					`경고: 자산 수정 요청 처리부터 처리해주세요. 자산 코드: ${formData.assetCode}`
				);
				return; // 수정을 중단합니다.
			} else {
				// 성공 메시지 띄우기
				alert(response.data); // 성공 메시지
			}

			// 2. 파일 업데이트 요청 처리
			const fileResponse = await axios.post(
				`${urlConfig}/asset/${formData.assetCode}/files`, // 파일 업데이트 API 호출
				formDataToSend, // 같은 FormData 사용
				{
					headers: {
						'Content-Type': 'multipart/form-data', // 멀티파트 폼 데이터로 설정
					},
				}
			);

			// 파일 업데이트 성공 메시지
			alert(fileResponse.data); // 파일 업데이트 결과 메시지
			setShowModal(false); // 모달 닫기
		} catch (error) {
			console.error('Error updating asset data:', error);
			alert('자산 수정 또는 파일 업데이트 중 오류가 발생했습니다.');
		} finally {
			// 필요에 따라 페이지 새로고침 가능
			window.location.reload();
		}
	};

	const handleSubmit1 = async () => {
		console.log('handleSubmit1:', formData); // 상태 확인
		try {
			// 수정 요청 처리
			const response = await axios.post(
				`${urlConfig}/asset/updateDemand/${formData.assetCode}`,
				formData
			);

			// 백엔드에서 받은 메시지 처리
			if (response.data.includes('이미 수정 요청이 들어간 자산입니다.')) {
				// 경고 메시지를 띄우기
				alert(`경고: 이미 수정 요청이 들어간 자산입니다. 자산 코드: ${formData.assetCode}`);
			} else {
				// 성공 메시지 띄우기
				alert(response.data); // 성공 메시지
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
			if (key === 'useState') {
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
			<div
				style={{
					padding: '20px',
					display: 'flex',
					alignItems: 'flex-start',
				}}
			>
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
						{/* 이미지 표시 로직 */}
						{formData.files &&
						formData.files.length > 0 &&
						formData.files.some((file) => file.fileType === 'PHOTO') ? (
							<img
								src={
									selectedFile
										? selectedFile.fileURL // 수정 모드에서 선택된 파일 미리보기
										: formData.files.find((file) => file.fileType === 'PHOTO')
												.fileURL
								}
								alt={
									selectedFile
										? selectedFile.oriFileName // 수정 모드에서 선택된 파일 이름
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
									backgroundColor: '#f0f0f0', // 배경색
									border: '1px dashed #ccc', // 경계선
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									color: '#aaa', // 텍스트 색상
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
								onChange={handleFileChange}
								style={{ marginTop: '10px' }}
							/>
						)}
					</div>

					<div style={{ flex: 1 }}>
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
										<th>자산코드</th>
										<th>자산명</th>
										<th>자산기준</th>
										<th>제조사</th>
										<th>목적</th>
										<th>부서</th>
										<th>위치</th>
										<th>사용자</th>
										<th>소유자</th>
										<th>보안담당자</th>
										<th>사용상태</th>
										<th>가동여부</th>
										<th>도입일자</th>
										<th>기밀성</th>
										<th>무결성</th>
										<th>가용성</th>
										<th>중요성점수</th>
										<th>중요성등급</th>
										<th>비고</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{formData.assetCode || 'N/A'}</td>
										<td>{formData.assetName || 'N/A'}</td>
										<td>{formData.assetBasis || 'N/A'}</td>
										<td>{formData.manufacturingCompany || 'N/A'}</td>
										<td>{formData.purpose || 'N/A'}</td>
										<td>{renderCellContent('department')}</td>
										<td>{renderCellContent('assetLocation')}</td>
										<td>{renderCellContent('assetUser')}</td>
										<td>{renderCellContent('assetOwner')}</td>
										<td>{renderCellContent('assetSecurityManager')}</td>
										<td>{renderCellContent('useState')}</td>
										<td>{renderCellContent('operationStatus')}</td>
										<td>{renderCellContent('introducedDate')}</td>
										<td>{renderCellContent('confidentiality')}</td>
										<td>{renderCellContent('integrity')}</td>
										<td>{renderCellContent('availability')}</td>
										<td>{importanceScore}</td>
										<td>{importanceRating}</td>
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
						{/* 새로 추가할 div: 테이블 바로 아래에 위치 */}
						<div>
							<div style={{ marginTop: '20px' }}>
								<Tabs defaultActiveKey="attachments" id="uncontrolled-tab-example">
									<Tab eventKey="attachments" title="첨부파일">
										<div
											style={{
												padding: '20px',
												border: '2px solid #000',
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
												<h4 style={{ margin: '0 0 10px' }}>
													사용자 메뉴얼
												</h4>
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
												<h4 style={{ margin: '0 0 10px' }}>
													보증세부사항 파일
												</h4>
												{formData.files &&
												formData.files.length > 0 &&
												formData.files.some(
													(file) => file.fileType === 'WARRANTY_DETAILS'
												) ? (
													<a
														href={
															formData.files.find(
																(file) =>
																	file.fileType ===
																	'WARRANTY_DETAILS'
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
																	file.fileType ===
																	'WARRANTY_DETAILS'
															).oriFileName
														}{' '}
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
												<h4 style={{ margin: '0 0 10px' }}>
													사용자 메뉴얼 파일
												</h4>
												{formData.files &&
												formData.files.length > 0 &&
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
														}{' '}
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
										<UpdateHistoryTable
											updateHistory={formData.updateHistory}
										/>
									</Tab>

									<Tab eventKey="maintenanceHistory" title="유지보수이력">
										{/* 유지보수이력 테이블 */}
										<MaintenanceHistoryTable
											repairHistory={formData.repairHistory}
										/>
									</Tab>

									<Tab eventKey="investigationHistory" title="자산조사이력">
										{/* 자산조사이력 테이블 */}
										<InvestigationHistoryTable
											surveyHistory={formData.surveyHistory}
										/>
									</Tab>
								</Tabs>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* 버튼 */}
			<Row className="mt-3">
				<Col className="text-end">
					{isEditing ? (
						<>
							<Button variant="primary" className="me-2" onClick={handleNextClick}>
								다음
							</Button>
						</>
					) : (
						<>
							<Button variant="primary" className="me-2" onClick={handleEditClick}>
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
				</Col>
			</Row>
		</>
	);
};

export default RowDetails;
