import {
	Row,
	Col,
	Card,
	Button,
	Modal,
	Form,
	FormGroup,
	Table as BootstrapTable,
} from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Style.css'; // 같은 폴더에서 CSS 파일 import
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_BASIC_URL;
const urlConfig = import.meta.env.VITE_BASIC_URL;

const InfoModal = ({ show, handleClose, modalData }) => {
	if (modalData && modalData.demandType === 'update') {
		const [assetInfo, setAssetInfo] = useState(null); // 변경 전 정보
		const [modifiedAssetInfo, setModifiedAssetInfo] = useState(null); // 변경 후 정보

		// 변경 전 , 변경 후 테이블 색깔 비교
		const getCellClassName = (originalValue, newValue) => {
			return originalValue !== newValue ? 'text-danger' : '';
		};

		const [isLoading, setIsLoading] = useState(true);

		const importanceScore = calculateImportanceScore(assetInfo);
		const importanceRating = calculateImportanceRating(importanceScore);

		const modifiedImportanceScore = calculateImportanceScore(modifiedAssetInfo);
		const modifiedImportanceRating = calculateImportanceRating(modifiedImportanceScore);

		const classification = assetInfo?.assetClassification;
		const dynamicColumns = React.useMemo(
			() => getClassificationColumns(classification),
			[classification]
		);
		useEffect(() => {
			// assetNo  유효할 때만 fetchRowData 호출
			const fetchRowData = async () => {
				setIsLoading(true); // 데이터 요청 시작부분

				try {
					const response = await axios.get(
						`${urlConfig}/updateDetail/${modalData.assetNo}`
					);
					console.log(`불러온 데이터 : `, response.data);

					const [lowestAsset, modifiedAsset] = response.data;

					// 두 개의 자산 정보를 각각 "변경 전"과 "변경 후"로 설정
					setAssetInfo(lowestAsset); // 변경 전 데이터 설정
					setModifiedAssetInfo(modifiedAsset); // 변경 후 데이터 설정

					console.log('변경 전 자산 정보: ', lowestAsset);
					console.log('변경 후 자산 정보: ', modifiedAsset);
				} catch (error) {
					console.error(`Error 데이터 : `, error);
				} finally {
					setIsLoading(false); // 데이터 요청완료
				}
			};

			fetchRowData(); // assetNo  유효할 때만 fetchRowData 호출
		}, [modalData.assetNo]); // assetNo  변경될 때만 호출

		return (
			<Modal
				show={show}
				onHide={handleClose}
				scrollable={true}
				size="xl"
				backdrop="static"
				keyboard={false}
				className="custom-modal" // 모달 전체에 스타일 적용
			>
				<Modal.Header closeButton>
					<Modal.Title>요청 상세 정보</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{isLoading ? (
						<p>로딩 중...</p> // 로딩 중 표시
					) : (
						assetInfo &&
						modalData && (
							<>
								{/* modalData 관련 정보 */}
								{modalData && (
									<>
										<Form.Group
											className="mb-3 pt-2"
											controlId="exampleForm.ControlInput1"
										>
											<Row>
												<Col lg={6}>
													<Form.Label>요청번호</Form.Label>
													<Form.Control
														type="text"
														value={modalData.demandNo}
														readOnly
													/>
												</Col>
												<Col lg={6}>
													<Form.Label>요청구분</Form.Label>
													<Form.Control
														type="text"
														value={modalData.demandType}
														readOnly
													/>
												</Col>
											</Row>
											<Row>
												<Col lg={6}>
													<Form.Label className="pt-2">요청자</Form.Label>
													<Form.Control
														type="text"
														value={modalData.demandBy}
														readOnly
													/>
												</Col>

												<Col lg={6}>
													<Form.Label className="pt-2">상태</Form.Label>
													<Form.Control
														type="text"
														value={modalData.demandStatus}
														readOnly
													/>
												</Col>
											</Row>
											<Row>
												<Col lg={6}>
													<Form.Label className="pt-2">
														요청일자
													</Form.Label>
													<Form.Control
														type="text"
														value={modalData.demandDate}
														readOnly
													/>
												</Col>
											</Row>
										</Form.Group>
									</>
								)}

								{/* assetInfo 관련 정보 */}
								<div className="info-section">
									<h2>변경 전 : {assetInfo.assetNo}</h2>
									<h4>기본 자산 정보 및 관리 정보</h4>
									<BootstrapTable striped bordered hover className="table-detail">
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
												<td>{assetInfo.assetCode || 'N/A'}</td>
												<td>{assetInfo.assetName || 'N/A'}</td>
												<td>{assetInfo.assetBasis || 'N/A'}</td>
												<td>{assetInfo.manufacturingCompany || 'N/A'}</td>
												<td>{assetInfo.purpose || 'N/A'}</td>
												<td>{assetInfo.department || 'N/A'}</td>
												<td>{assetInfo.assetLocation || 'N/A'}</td>
												<td>{assetInfo.assetUser || 'N/A'}</td>
												<td>{assetInfo.assetOwner || 'N/A'}</td>
												<td>{assetInfo.assetSecurityManager || 'N/A'}</td>
												<td>{assetInfo.useState || 'N/A'}</td>
												<td>{assetInfo.operationStatus || 'N/A'}</td>
												<td>{assetInfo.introducedDate || 'N/A'}</td>
												<td>{assetInfo.confidentiality || 'N/A'}</td>
												<td>{assetInfo.integrity || 'N/A'}</td>
												<td>{assetInfo.availability || 'N/A'}</td>
												<td>{importanceScore}</td>
												<td>{importanceRating}</td>
												<td>{assetInfo.note || 'N/A'}</td>
											</tr>
										</tbody>
									</BootstrapTable>

									<h4>재무 및 구매 정보</h4>
									<BootstrapTable striped bordered hover className="table-detail">
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
												<td>{assetInfo.purchaseCost}</td>
												<td>{assetInfo.purchaseDate}</td>
												<td>{assetInfo.usefulLife}</td>
												<td>{assetInfo.depreciationMethod}</td>
												<td>{assetInfo.purchaseSource}</td>
												<td>{assetInfo.contactInformation}</td>
												<td>{assetInfo.acquisitionRoute}</td>
												<td>{assetInfo.maintenancePeriod}</td>
												<td>{assetInfo.residualValue}</td>
												<td>{assetInfo.currentValue}</td>
											</tr>
										</tbody>
									</BootstrapTable>

									{/* classification에 따른 동적 열 테이블 */}
									{dynamicColumns.length > 0 && (
										<>
											<h4>{assetInfo?.assetClassification}에 따른 칼럼</h4>
											<BootstrapTable
												striped
												bordered
												hover
												className="table-detail"
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
																{assetInfo[col.data] || 'N/A'}
															</td>
														))}
													</tr>
												</tbody>
											</BootstrapTable>
										</>
									)}
								</div>

								{/* assetInfo 관련 정보 */}
								<div className="info-section">
									<h2>변경 후 : {modifiedAssetInfo.assetNo}</h2>
									<h4>기본 자산 정보 및 관리 정보</h4>
									<BootstrapTable striped bordered hover className="table-detail">
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
												<td>{modifiedAssetInfo.assetCode || 'N/A'}</td>
												<td>{modifiedAssetInfo.assetName || 'N/A'}</td>
												<td>{modifiedAssetInfo.assetBasis || 'N/A'}</td>
												<td>
													{modifiedAssetInfo.manufacturingCompany ||
														'N/A'}
												</td>
												<td>{modifiedAssetInfo.purpose || 'N/A'}</td>
												<td>{modifiedAssetInfo.department || 'N/A'}</td>
												<td>{modifiedAssetInfo.assetLocation || 'N/A'}</td>
												<td>{modifiedAssetInfo.assetUser || 'N/A'}</td>
												<td>{modifiedAssetInfo.assetOwner || 'N/A'}</td>
												<td>
													{modifiedAssetInfo.assetSecurityManager ||
														'N/A'}
												</td>
												<td>{modifiedAssetInfo.useState || 'N/A'}</td>
												<td>
													{modifiedAssetInfo.operationStatus || 'N/A'}
												</td>
												<td>{modifiedAssetInfo.introducedDate || 'N/A'}</td>
												<td>
													{modifiedAssetInfo.confidentiality || 'N/A'}
												</td>
												<td>{modifiedAssetInfo.integrity || 'N/A'}</td>
												<td>{modifiedAssetInfo.availability || 'N/A'}</td>
												<td>{modifiedImportanceScore}</td>
												<td>{modifiedImportanceRating}</td>
												<td>{modifiedAssetInfo.note || 'N/A'}</td>
											</tr>
										</tbody>
									</BootstrapTable>

									<h4>재무 및 구매 정보</h4>
									<BootstrapTable striped bordered hover className="table-detail">
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
												<td>{modifiedAssetInfo.purchaseCost}</td>
												<td>{modifiedAssetInfo.purchaseDate}</td>
												<td>{modifiedAssetInfo.usefulLife}</td>
												<td>{modifiedAssetInfo.depreciationMethod}</td>
												<td>{modifiedAssetInfo.purchaseSource}</td>
												<td>{modifiedAssetInfo.contactInformation}</td>
												<td>{modifiedAssetInfo.acquisitionRoute}</td>
												<td>{modifiedAssetInfo.maintenancePeriod}</td>
												<td>{modifiedAssetInfo.residualValue}</td>
												<td>{modifiedAssetInfo.currentValue}</td>
											</tr>
										</tbody>
									</BootstrapTable>

									{/* classification에 따른 동적 열 테이블 */}
									{dynamicColumns.length > 0 && (
										<>
											<h4>
												{modifiedAssetInfo?.assetClassification}에 따른 칼럼
											</h4>
											<BootstrapTable
												striped
												bordered
												hover
												className="table-detail"
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
																{modifiedAssetInfo[col.data] ||
																	'N/A'}
															</td>
														))}
													</tr>
												</tbody>
											</BootstrapTable>
										</>
									)}
								</div>
							</>
						)
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						닫기
					</Button>
				</Modal.Footer>
			</Modal>
		);
	} else {
		return (
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>요청 상세 정보</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{modalData && (
						<div>
							<p>요청구분: {modalData.demandNo}</p>
							<p>요청구분: {modalData.demandType}</p>
							<p>요청일자: {modalData.demandDate}</p>
							<p>요청자: {modalData.demandBy}</p>
							<p>상태: {modalData.demandStatus}</p>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						닫기
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
};

const ProcessModal = ({ show, handleClose }) => {
	const [demandList, setDemandList] = useState([]);
	const [demandList1, setDemandList1] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [modalType, setModalType] = useState('');
	const modalContentRef = useRef(null);
	// 사유 적기
	const [reason, setReason] = useState('');
	const handleReasonChange = (e) => setReason(e.target.value);

	//수정 모달
	const [assetInfo, setAssetInfo] = useState(null); // 변경 전 정보
	const [modifiedAssetInfo, setModifiedAssetInfo] = useState(null); // 변경 후 정보

	const importanceScore = calculateImportanceScore(assetInfo);
	const importanceRating = calculateImportanceRating(importanceScore);

	const modifiedImportanceScore = calculateImportanceScore(modifiedAssetInfo);
	const modifiedImportanceRating = calculateImportanceRating(modifiedImportanceScore);

	const classification = assetInfo?.assetClassification;
	const dynamicColumns = React.useMemo(
		() => getClassificationColumns(classification),
		[classification]
	);

	// 미확인 자산 리스트 불러오는 함수
	useEffect(() => {
		if (show) {
			const fetchRowData = async () => {
				setIsLoading(true); // 데이터 요청 시작

				try {
					const response = await axios.get(`${urlConfig}/DemandList`);
					const responseData = response.data;
					setDemandList(responseData);

					// 데이터를 불러온 후 첫 번째 데이터를 기준으로 modalType 설정
					if (responseData.length > 0) {
						const firstDemandType = responseData[0].demandHistoryDto.demandType;
						setModalType(determineModalType(firstDemandType)); // 첫 번째 데이터의 demandType으로 modalType 결정
						if (responseData[0].demandHistoryDto.demandType == 'update') {
							const [lowestAsset, modifiedAsset] = responseData[0].assetDto;
							// 두 개의 자산 정보를 각각 "변경 전"과 "변경 후"로 설정
							setAssetInfo(lowestAsset); // 변경 전 데이터 설정
							setModifiedAssetInfo(modifiedAsset); // 변경 후 데이터 설정
						}
					}

					console.log('미확인 요청 자산 리스트: ', responseData);
				} catch (error) {
					console.error('Error fetching data: ', error);
				} finally {
					setIsLoading(false); // 데이터 요청 완료
				}
			};

			fetchRowData();
		}
	}, [show]);

	// 다음 데이터로 이동
	const handleNext = (actionType) => {
		SaveDemandList(actionType);

		const nextIndex = currentIndex + 1;
		if (demandList.length != nextIndex) {
			Swal.fire({
				icon: 'success',
				title: demandList.length + '중 ' + nextIndex + '개 처리',
				text: '계속 진행해주세요.',
			});
		} else {
			alert('미확인 자산 처리가 완료 되었습니다.');
			Swal.fire({
				icon: 'success',
				title: '미확인 자산 처리가 완료 되었습니다.',
				text: '요청 내역 페이지로 이동합니다.',
			});
		}

		if (nextIndex < demandList.length) {
			setCurrentIndex(nextIndex);
			setModalType(determineModalType(demandList[nextIndex].demandHistoryDto.demandType)); // 다음 데이터에 따라 모달 타입 결정
			if (demandList[nextIndex].demandHistoryDto.demandType == 'update') {
				const [lowestAsset, modifiedAsset] = demandList[nextIndex].assetDto;
				// 두 개의 자산 정보를 각각 "변경 전"과 "변경 후"로 설정
				setAssetInfo(lowestAsset); // 변경 전 데이터 설정
				setModifiedAssetInfo(modifiedAsset); // 변경 후 데이터 설정
			}

			// 모달 내부 스크롤 초기화
			if (modalContentRef.current) {
				modalContentRef.current.scrollTop = 0; // 모달 내부 스크롤을 맨 위로 이동
			}
			// 사유 초기화
			setReason('');
		} else {
			// 사유 초기화
			setReason('');
			//console.log('보내는 List', demandList1);
			//handleFormSubmit();
		}
	};

	// demandList1가 완전히 업데이트되면 handleFormSubmit 호출
	useEffect(() => {
		// demandList1가 demandList와 길이가 같으면 모든 항목이 처리된 상태
		if (demandList.length) {
			if (demandList1.length === demandList.length) {
				console.log('보내는 List', demandList1);
				handleFormSubmit();
			}
		}
	}, [demandList1, demandList]);

	const SaveDemandList = (actionType) => {
		const newAction = {
			demandAction: demandList[currentIndex].demandHistoryDto,
			reason,
			actionType,
		};
		console.log('dsad', newAction);
		// 배열에 새 사유 추가
		setDemandList1((DemandList1) => [...DemandList1, newAction]);
	};

	const handleFormSubmit = () => {
		axios
			.post(`${API_URL}/demandAction`, demandList1)
			.then((response) => {
				console.log('Action successful:', response.data);
			})
			.catch((error) => {
				console.error('Update error:', error);
			})
			.finally(() => {
				handleCloseWithReset();
			});
	};

	// handleClose에 currentIndex 초기화 로직 추가
	const handleCloseWithReset = () => {
		setCurrentIndex(0); // Index 초기화
		setReason('');
		setDemandList1([]);
		handleClose(); // 모달 닫기
	};

	// 데이터에 따라 모달 타입 결정
	const determineModalType = (demandType) => {
		if (demandType === 'update') {
			return 'updateModal';
		} else if (demandType === 'delete') {
			return 'deleteModal';
		} else {
			return 'defaultModal';
		}
	};

	if (isLoading) {
		return <div></div>;
	}

	const currentData = demandList[currentIndex];
	if (!currentData) {
		return <div>미처리 자산이 없습니다.</div>; // currentData가 없는 경우를 대비한 처리
	}

	const { demandHistoryDto, assetDto } = currentData;

	return (
		<Modal
			show={show}
			onHide={handleCloseWithReset}
			scrollable={true}
			backdrop="static"
			size="xl"
			keyboard={false}
			className="custom-modal"
		>
			<Modal.Header closeButton>
				<Modal.Title>
					미처리 자산 처리 ({currentIndex + 1}/{demandList.length})
				</Modal.Title>
			</Modal.Header>
			<Modal.Body ref={modalContentRef}>
				{modalType === 'updateModal' && assetInfo && (
					<div>
						<h2>수정 요청</h2>
						<p>요청번호: {demandHistoryDto.demandNo}</p>
						<p>요청구분: {demandHistoryDto.demandType}</p>
						<p>자산코드: {demandHistoryDto.assetCode}</p>
						{/* assetInfo 관련 정보 */}

						<div className="info-section">
							<h2>변경 전 : {assetInfo.assetNo}</h2>
							<h4>기본 자산 정보 및 관리 정보</h4>
							<BootstrapTable striped bordered hover className="table-detail">
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
										<td>{assetInfo.assetCode || 'N/A'}</td>
										<td>{assetInfo.assetName || 'N/A'}</td>
										<td>{assetInfo.assetBasis || 'N/A'}</td>
										<td>{assetInfo.manufacturingCompany || 'N/A'}</td>
										<td>{assetInfo.purpose || 'N/A'}</td>
										<td>{assetInfo.department || 'N/A'}</td>
										<td>{assetInfo.assetLocation || 'N/A'}</td>
										<td>{assetInfo.assetUser || 'N/A'}</td>
										<td>{assetInfo.assetOwner || 'N/A'}</td>
										<td>{assetInfo.assetSecurityManager || 'N/A'}</td>
										<td>{assetInfo.useState || 'N/A'}</td>
										<td>{assetInfo.operationStatus || 'N/A'}</td>
										<td>{assetInfo.introducedDate || 'N/A'}</td>
										<td>{assetInfo.confidentiality || 'N/A'}</td>
										<td>{assetInfo.integrity || 'N/A'}</td>
										<td>{assetInfo.availability || 'N/A'}</td>
										<td>{importanceScore}</td>
										<td>{importanceRating}</td>
										<td>{assetInfo.note || 'N/A'}</td>
									</tr>
								</tbody>
							</BootstrapTable>

							<h4>재무 및 구매 정보</h4>
							<BootstrapTable striped bordered hover className="table-detail">
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
										<td>{assetInfo.purchaseCost}</td>
										<td>{assetInfo.purchaseDate}</td>
										<td>{assetInfo.usefulLife}</td>
										<td>{assetInfo.depreciationMethod}</td>
										<td>{assetInfo.purchaseSource}</td>
										<td>{assetInfo.contactInformation}</td>
										<td>{assetInfo.acquisitionRoute}</td>
										<td>{assetInfo.maintenancePeriod}</td>
										<td>{assetInfo.residualValue}</td>
										<td>{assetInfo.currentValue}</td>
									</tr>
								</tbody>
							</BootstrapTable>

							{/* classification에 따른 동적 열 테이블 */}
							{dynamicColumns.length > 0 && (
								<>
									<h4>{assetInfo?.assetClassification}에 따른 칼럼</h4>
									<BootstrapTable striped bordered hover className="table-detail">
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
														{assetInfo[col.data] || 'N/A'}
													</td>
												))}
											</tr>
										</tbody>
									</BootstrapTable>
								</>
							)}
						</div>

						{/* assetInfo 관련 정보 */}
						<div className="info-section">
							<h2>변경 후 : {modifiedAssetInfo.assetNo}</h2>
							<h4>기본 자산 정보 및 관리 정보</h4>
							<BootstrapTable striped bordered hover className="table-detail">
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
										<td>{modifiedAssetInfo.assetCode || 'N/A'}</td>
										<td>{modifiedAssetInfo.assetName || 'N/A'}</td>
										<td>{modifiedAssetInfo.assetBasis || 'N/A'}</td>
										<td>{modifiedAssetInfo.manufacturingCompany || 'N/A'}</td>
										<td>{modifiedAssetInfo.purpose || 'N/A'}</td>
										<td>{modifiedAssetInfo.department || 'N/A'}</td>
										<td>{modifiedAssetInfo.assetLocation || 'N/A'}</td>
										<td>{modifiedAssetInfo.assetUser || 'N/A'}</td>
										<td>{modifiedAssetInfo.assetOwner || 'N/A'}</td>
										<td>{modifiedAssetInfo.assetSecurityManager || 'N/A'}</td>
										<td>{modifiedAssetInfo.useState || 'N/A'}</td>
										<td>{modifiedAssetInfo.operationStatus || 'N/A'}</td>
										<td>{modifiedAssetInfo.introducedDate || 'N/A'}</td>
										<td>{modifiedAssetInfo.confidentiality || 'N/A'}</td>
										<td>{modifiedAssetInfo.integrity || 'N/A'}</td>
										<td>{modifiedAssetInfo.availability || 'N/A'}</td>
										<td>{modifiedImportanceScore}</td>
										<td>{modifiedImportanceRating}</td>
										<td>{modifiedAssetInfo.note || 'N/A'}</td>
									</tr>
								</tbody>
							</BootstrapTable>

							<h4>재무 및 구매 정보</h4>
							<BootstrapTable striped bordered hover className="table-detail">
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
										<td>{modifiedAssetInfo.purchaseCost}</td>
										<td>{modifiedAssetInfo.purchaseDate}</td>
										<td>{modifiedAssetInfo.usefulLife}</td>
										<td>{modifiedAssetInfo.depreciationMethod}</td>
										<td>{modifiedAssetInfo.purchaseSource}</td>
										<td>{modifiedAssetInfo.contactInformation}</td>
										<td>{modifiedAssetInfo.acquisitionRoute}</td>
										<td>{modifiedAssetInfo.maintenancePeriod}</td>
										<td>{modifiedAssetInfo.residualValue}</td>
										<td>{modifiedAssetInfo.currentValue}</td>
									</tr>
								</tbody>
							</BootstrapTable>

							{/* classification에 따른 동적 열 테이블 */}
							{dynamicColumns.length > 0 && (
								<>
									<h4>{modifiedAssetInfo?.assetClassification}에 따른 칼럼</h4>
									<BootstrapTable striped bordered hover className="table-detail">
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
														{modifiedAssetInfo[col.data] || 'N/A'}
													</td>
												))}
											</tr>
										</tbody>
									</BootstrapTable>
								</>
							)}
						</div>
					</div>
				)}

				{modalType === 'deleteModal' && (
					<div>
						<h2>삭제 요청</h2>
						<p>요청번호: {demandHistoryDto.demandNo}</p>
						<p>요청구분: {demandHistoryDto.demandType}</p>
						<p>자산코드: {demandHistoryDto.assetCode}</p>
					</div>
				)}
				{modalType === 'defaultModal' && (
					<div>
						<h2>기본 요청</h2>
						<p>요청번호: {demandHistoryDto.demandNo}</p>
						<p>요청구분: {demandHistoryDto.demandType}</p>
						<p>자산코드: {demandHistoryDto.assetCode}</p>
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Col lg={12}>
					<Form>
						<Form.Group>
							<Form.Control
								type="text"
								value={reason}
								onChange={handleReasonChange}
								placeholder={'사유'}
								size="lg"
							/>
						</Form.Group>
					</Form>
				</Col>
				<Button
					style={{ background: '#5e83bb', border: 'none' }}
					onClick={() => handleNext('approve')}
				>
					승인
				</Button>
				<Button
					style={{ background: '#c66464', border: 'none' }}
					onClick={() => handleNext('reject')}
				>
					거절
				</Button>
				<Button variant="secondary" onClick={() => handleNext('hold')}>
					보류
				</Button>
				<Button variant="dark" onClick={handleCloseWithReset}>
					닫기
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

const ActionModal = ({ show, handleClose, actionData, actionType, handleSubmit }) => {
	const [reason, setReason] = useState('');

	const handleReasonChange = (e) => setReason(e.target.value);

	const handleFormSubmit = () => {
		for (const item of actionData) {
			const dataToSend = {
				demandAction: item, // 각 항목의 데이터
				reason,
				actionType,
			};

			switch (item.demandType) {
				case 'update':
				case 'allUpdateDemand':
					axios
						.post(`${API_URL}/updateAction`, dataToSend)
						.then((response) => {
							console.log('Update successful:', response.data);
						})
						.catch((error) => {
							console.error('Update error:', error);
						});
					break;

				case 'delete':
				case 'allDisposeDemand':
					axios
						.post(`${API_URL}/deleteAction`, dataToSend)
						.then((response) => {
							console.log('Delete successful:', response.data);
						})
						.catch((error) => {
							console.error('Delete error:', error);
						});
					break;

				default:
					console.error('Unknown demand type:', item.demandType);
			}
		}
		handleSubmit(reason); // 사유를 넘겨주면서 처리
		handleClose(); // 모달 닫기
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{actionType === 'approve' ? '승인 사유' : '거절 사유'}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>
							<p>
								선택된 데이터: {actionData.map((item) => item.assetNo).join(', ')}
							</p>
							{actionType === 'approve'
								? '승인 사유를 입력하세요'
								: '거절 사유를 입력하세요'}
						</Form.Label>
						<Form.Control
							type="text"
							value={reason}
							onChange={handleReasonChange}
							placeholder={actionType === 'approve' ? '승인 사유' : '거절 사유'}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				{actionType === 'approve' ? (
					<Button
						style={{ background: '#5e83bb', border: 'none' }}
						onClick={handleFormSubmit}
					>
						승인
					</Button>
				) : (
					<Button
						style={{ background: '#c66464', border: 'none' }}
						onClick={handleFormSubmit}
					>
						거절
					</Button>
				)}

				<Button variant="secondary" onClick={handleClose}>
					닫기
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

// 자산 분류에 따른 동적 열 정의 함수
const getClassificationColumns = (classification) => {
	switch (classification) {
		case 'INFORMATION_PROTECTION_SYSTEM':
			return [{ title: '서비스범위', data: 'serviceScope' }];

		case 'APPLICATION_PROGRAM':
			return [
				{ title: '서비스범위', data: 'serviceScope' },
				{ title: 'OS', data: 'os' },
				{ title: '관련DB', data: 'relatedDB' },
				{ title: 'IP', data: 'ip' },
				{ title: '화면수', data: 'screenNumber' },
			];

		case '소프트웨어':
			return [
				{ title: 'IP', data: 'ip' },
				{ title: 'ID', data: 'serverId' },
				{ title: 'PW', data: 'serverPassword' },
				{ title: '담당업체', data: 'companyManager' },
				{ title: 'OS', data: 'os' },
			];

		case 'ELECTRONIC_INFORMATION':
			return [
				{ title: 'OS', data: 'os' },
				{ title: '시스템', data: 'system' },
				{ title: 'DB종류', data: 'dbtype' },
			];

		case 'DOCUMENT':
			return [
				{ title: '문서등급', data: 'documentGrade' },
				{ title: '문서형태', data: 'documentType' },
				{ title: '문서링크', data: 'documentLink' },
			];

		case 'PATENTS_AND_TRADEMARKS':
			return [
				{ title: '출원일자', data: 'applicationDate' },
				{ title: '등록일자', data: 'registrationDate' },
				{ title: '만료일자', data: 'expirationDate' },
				{ title: '특허/상표 상태', data: 'patentTrademarkStatus' },
				{ title: '출원국가', data: 'countryApplication' },
				{ title: '특허분류', data: 'patentClassification' },
				{ title: '특허세목', data: 'patentItem' },
				{ title: '출원번호', data: 'applicationNo' },
				{ title: '발명자', data: 'inventor' },
				{ title: '권리권자', data: 'assignee' },
				{ title: '관련문서', data: 'relatedDocuments' },
			];

		case 'ITSYSTEM_EQUIPMENT':
			return [
				{ title: '장비유형', data: 'equipmentType' },
				{ title: '랙유닛', data: 'rackUnit' },
				{ title: '전원공급장치', data: 'powerSupply' },
				{ title: '쿨링시스템', data: 'coolingSystem' },
				{ title: '인터페이스 포트', data: 'interfacePorts' },
				{ title: '폼팩터', data: 'formFactor' },
				{ title: '확장슬롯수', data: 'expansionSlots' },
				{ title: '그래픽카드', data: 'graphicsCard' },
				{ title: '포트 구성', data: 'portConfiguration' },
				{ title: '모니터 포함여부', data: 'monitorIncluded' },
			];

		case 'ITNETWORK_EQUIPMENT':
			return [
				{ title: '장비유형', data: 'equipmentType' },
				{ title: '포트수', data: 'numberOfPorts' },
				{ title: '지원프로토콜', data: 'supportedProtocols' },
				{ title: '펌웨어 버전', data: 'firmwareVersion' },
				{ title: '네트워크 속도', data: 'networkSpeed' },
				{ title: '서비스범위', data: 'serviceScope' },
			];

		case 'TERMINAL':
			return [
				{ title: 'IP', data: 'ip' },
				{ title: '제품 시리얼 번호', data: 'productSerialNumber' },
				{ title: 'OS', data: 'os' },
				{ title: '보안관제', data: 'securityControl' },
				{ title: '내부정보 유출 방지', data: 'kaitsKeeper' },
				{ title: '악성코드,랜섬웨어 탐지', data: 'V3OfficeSecurity' },
				{ title: '안티랜섬웨어', data: 'appCheckPro' },
				{ title: 'NAC agent', data: 'tgate' },
			];

		case '가구':
			return [{ title: '크기', data: 'furnitureSize' }];

		case 'DEVICES':
			return [
				{ title: '기기유형', data: 'deviceType' },
				{ title: '모델번호', data: 'modelNumber' },
				{ title: '연결방식', data: 'connectionType' },
				{ title: '전원사양', data: 'powerSpecifications' },
			];

		case 'CAR':
			return [
				{ title: '배기량', data: 'displacement' },
				{ title: '차량의 문 수', data: 'doorsCount' },
				{ title: '엔진 형식', data: 'engineType' },
				{ title: '차량 종류', data: 'carType' },
				{ title: '차량 식별번호', data: 'identificationNo' },
				{ title: '차량 색상', data: 'carColor' },
				{ title: '연식', data: 'modelYear' },
			];

		case 'OTHERASSETS':
			return [
				{ title: '기타 세부 설명', data: 'otherDescription' },
				{ title: '사용 빈도', data: 'usageFrequency' },
			];

		default:
			return [];
	}
};

// 중요성 점수를 계산
const calculateImportanceScore = (assetInfo) => {
	if (assetInfo) {
		const { confidentiality, integrity, availability } = assetInfo;
		return (confidentiality || 0) + (integrity || 0) + (availability || 0);
	}
	return 0;
};

// 중요성 등급을 계산
const calculateImportanceRating = (score) => {
	if (score >= 7 && score <= 9) return 'A급';
	if (score >= 5 && score <= 6) return 'B급';
	if (score >= 3 && score <= 4) return 'C급';
	return 'N/A';
};

export { InfoModal, ProcessModal, ActionModal };
