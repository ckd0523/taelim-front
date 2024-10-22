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
import { ModalBasicInfo } from './ModalBasicInfo';
import { ModalModifiedInfo } from './ModalModifiedInfo';
import {
	getClassificationColumns,
	calculateImportanceScore,
	calculateImportanceRating,
} from './UpdateHistoryColumn';

const API_URL = import.meta.env.VITE_BASIC_URL;
const urlConfig = import.meta.env.VITE_BASIC_URL;

const InfoModal = ({ show, handleClose, modalData }) => {
	const [reason, setReason] = useState('');
	const [assetInfo, setAssetInfo] = useState(null); // 변경 전 정보
	const [modifiedAssetInfo, setModifiedAssetInfo] = useState(null); // 변경 후 정보
	const [isLoading, setIsLoading] = useState(true);

	const handleReasonChange = (e) => setReason(e.target.value);

	// 변경 전 , 변경 후 테이블 색깔 비교
	const getCellClassName = (originalValue, newValue) => {
		return originalValue !== newValue ? 'text-danger' : '';
	};

	const importanceScore = calculateImportanceScore(assetInfo);
	const importanceRating = calculateImportanceRating(importanceScore);

	const modifiedImportanceScore = calculateImportanceScore(modifiedAssetInfo);
	const modifiedImportanceRating = calculateImportanceRating(modifiedImportanceScore);

	const classification = assetInfo?.assetClassification;
	const dynamicColumns = React.useMemo(
		() => getClassificationColumns(classification),
		[classification]
	);

	// 데이터 불러오기 (update 시)
	useEffect(() => {
		if (modalData && modalData.demandType === 'update') {
			const fetchRowData = async () => {
				setIsLoading(true);
				console.log('dddd', modalData);
				try {
					const response = await axios.get(`${urlConfig}/list1/${modalData.assetNo}`);
					const [lowestAsset, modifiedAsset] = response.data;
					setAssetInfo(lowestAsset); // 변경 전 데이터 설정
					setModifiedAssetInfo(modifiedAsset); // 변경 후 데이터 설정
				} catch (error) {
					console.error('Error fetching data:', error);
				} finally {
					setIsLoading(false);
				}
			};

			fetchRowData();
		}
	}, [modalData]);

	const handleFormSubmit = (actionType) => {
		const dataToSend = {
			demandAction: modalData,
			reason,
			actionType,
		};
		axios
			.post(`${API_URL}/updateAction`, dataToSend)
			.then((response) => {
				console.log('Update successful:', response.data);
			})
			.catch((error) => {
				console.error('Error:', error.message);
			});
		setReason('');
		handleClose();
	};

	const handleFormSubmit2 = (actionType) => {
		const dataToSend = {
			demandAction: modalData,
			reason,
			actionType,
		};
		axios
			.post(`${API_URL}/deleteAction`, dataToSend)
			.then((response) => {
				console.log('Update successful:', response.data);
			})
			.catch((error) => {
				console.error('Error:', error.message);
			});
		setReason('');
		handleClose();
	};

	const isUnconfirmed = modalData?.demandStatus === 'UNCONFIRMED';

	if (modalData && modalData.demandType === 'update') {
		return (
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				scrollable={true} // scrollable의 기본값이 'false'이므로 true로 변경
				className="update-modal" // 모달 전체에 스타일 적용
			>
				<Modal.Header closeButton>
					<Modal.Title>수정 요청 상세 정보</Modal.Title>
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
													<Form.Label>요청일자</Form.Label>
													<Form.Control
														type="text"
														value={modalData.demandDate}
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
														value={
															modalData.demandStatus === 'UNCONFIRMED'
																? '미처리'
																: modalData.demandStatus ===
																    'APPROVE'
																  ? '승인'
																  : modalData.demandStatus ===
																      'REFUSAL'
																    ? '거절'
																    : modalData.demandStatus // 다른 상태일 경우 원래 값 유지
														}
														readOnly
													/>
												</Col>
												{!isUnconfirmed && (
													<Col lg={6}>
														<Form.Label className="pt-2">
															처리사유
														</Form.Label>
														<Form.Control
															type="text"
															value={modalData.comment}
															readOnly
														/>
													</Col>
												)}
											</Row>
										</Form.Group>
										<div className="info-update-container">
											<ModalBasicInfo
												assetInfo={assetInfo}
												modifiedAssetInfo={modifiedAssetInfo}
												dynamicColumns={dynamicColumns}
												importanceScore={importanceScore}
												modifiedImportanceScore={modifiedImportanceScore}
												importanceRating={importanceRating}
												modifiedImportanceRating={modifiedImportanceRating}
											/>
											<ModalModifiedInfo
												assetInfo={assetInfo}
												modifiedAssetInfo={modifiedAssetInfo}
												dynamicColumns={dynamicColumns}
												importanceScore={importanceScore}
												modifiedImportanceScore={modifiedImportanceScore}
												importanceRating={importanceRating}
												modifiedImportanceRating={modifiedImportanceRating}
											/>
										</div>
									</>
								)}

								{/* assetInfo 관련 정보 */}
							</>
						)
					)}
				</Modal.Body>
				<Modal.Footer>
					{isUnconfirmed && (
						<>
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
							<Button
								style={{ background: '#5e83bb', border: 'none' }}
								onClick={() => handleFormSubmit('approve')}
							>
								승인
							</Button>
							<Button
								style={{ background: '#c66464', border: 'none' }}
								onClick={() => handleFormSubmit('reject')}
							>
								거절
							</Button>
						</>
					)}
					<Button variant="secondary" onClick={handleClose}>
						닫기
					</Button>
				</Modal.Footer>
			</Modal>
		);
	} else {
		return (
			<Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>폐기 요청 상세 정보</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{modalData && (
						<>
							<Form.Group className="mb-3 pt-2" controlId="exampleForm.ControlInput1">
								<Col lg={12}>
									<Form.Label>자산코드</Form.Label>
									<Form.Control
										type="text"
										value={modalData.assetCode}
										readOnly
									/>
								</Col>
								<Col lg={12}>
									<Form.Label className="pt-2">자산명</Form.Label>
									<Form.Control
										type="text"
										value={modalData.assetName}
										readOnly
									/>
								</Col>
								<Col lg={12}>
									<Form.Label className="pt-2">상태</Form.Label>
									<Form.Control
										type="text"
										value={
											modalData.demandStatus === 'UNCONFIRMED'
												? '미처리'
												: modalData.demandStatus === 'APPROVE'
												  ? '승인'
												  : modalData.demandStatus === 'REFUSAL'
												    ? '거절'
												    : modalData.demandStatus // 다른 상태일 경우 원래 값 유지
										}
										readOnly
									/>
								</Col>
								{!isUnconfirmed && (
									<Col lg={12}>
										<Form.Label className="pt-2">처리사유</Form.Label>
										<Form.Control
											type="text"
											value={modalData.comment}
											readOnly
										/>
									</Col>
								)}

								<Col lg={12}>
									<Form.Label className="pt-2">폐기일자</Form.Label>
									<Form.Control
										type="text"
										value={modalData.demandDate}
										readOnly
									/>
								</Col>

								<Col lg={12}>
									<Form.Label className="pt-2">폐기사유</Form.Label>
									<Form.Control
										type="text"
										value={modalData.demandReason}
										readOnly
									/>
								</Col>

								<Col lg={12}>
									<Form.Label className="pt-2">폐기내용</Form.Label>
									<Form.Control
										type="text"
										value={modalData.demandDetail}
										readOnly
									/>
								</Col>
								<Col lg={12}>
									<Form.Label className="pt-2">폐기방법</Form.Label>
									<Form.Control
										type="text"
										value={modalData.disposeMethod}
										readOnly
									/>
								</Col>

								<Col lg={12}>
									<Form.Label className="pt-2">폐기위치</Form.Label>
									<Form.Control
										type="text"
										value={modalData.disposeLocation}
										readOnly
									/>
								</Col>
								<Col lg={12}>
									<Form.Label className="pt-2">폐기자</Form.Label>
									<Form.Control type="text" value={modalData.demandBy} readOnly />
								</Col>
							</Form.Group>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					{isUnconfirmed && (
						<>
							<Col lg={8}>
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
								onClick={() => handleFormSubmit2('approve')}
							>
								승인
							</Button>
							<Button
								style={{ background: '#c66464', border: 'none' }}
								onClick={() => handleFormSubmit2('reject')}
							>
								거절
							</Button>
						</>
					)}
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
			Swal.fire({
				icon: 'success',
				title: '미확인 자산 처리 완료.',
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
			backdrop="static"
			keyboard={false}
			scrollable={true} // scrollable의 기본값이 'false'이므로 true로 변경
			className="update-modal" // 모달 전체에 스타일 적용
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
						<Form.Group className="mb-3 pt-2" controlId="exampleForm.ControlInput1">
							<Row>
								<Col lg={6}>
									<Form.Label>요청번호</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.demandNo}
										readOnly
									/>
								</Col>
								<Col lg={6}>
									<Form.Label>요청일자</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.demandDate}
										readOnly
									/>
								</Col>
							</Row>
							<Row>
								<Col lg={6}>
									<Form.Label className="pt-2">요청자</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.demandBy}
										readOnly
									/>
								</Col>

								<Col lg={6}>
									<Form.Label className="pt-2">상태</Form.Label>
									<Form.Control
										type="text"
										value={
											demandHistoryDto.demandStatus === 'UNCONFIRMED'
												? '미처리'
												: demandHistoryDto.demandStatus === 'APPROVE'
												  ? '승인'
												  : demandHistoryDto.demandStatus === 'REFUSAL'
												    ? '거절'
												    : demandHistoryDto.demandStatus // 다른 상태일 경우 원래 값 유지
										}
										readOnly
									/>
								</Col>
							</Row>
						</Form.Group>

						<div className="info-update-container">
							<ModalBasicInfo
								assetInfo={assetInfo}
								modifiedAssetInfo={modifiedAssetInfo}
								dynamicColumns={dynamicColumns}
								importanceScore={importanceScore}
								modifiedImportanceScore={modifiedImportanceScore}
								importanceRating={importanceRating}
								modifiedImportanceRating={modifiedImportanceRating}
							/>
							<ModalModifiedInfo
								assetInfo={assetInfo}
								modifiedAssetInfo={modifiedAssetInfo}
								dynamicColumns={dynamicColumns}
								importanceScore={importanceScore}
								modifiedImportanceScore={modifiedImportanceScore}
								importanceRating={importanceRating}
								modifiedImportanceRating={modifiedImportanceRating}
							/>
						</div>
					</div>
				)}

				{modalType === 'deleteModal' && (
					<div>
						<h2>삭제 요청</h2>

						<Form.Group className="mb-3 pt-2" controlId="exampleForm.ControlInput1">
							<Row>
								<Col lg={6}>
									<Form.Label>자산코드</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.assetCode}
										readOnly
									/>
								</Col>
								<Col lg={6}>
									<Form.Label>자산명</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.assetName}
										readOnly
									/>
								</Col>
							</Row>
							<Row>
								<Col lg={6}>
									<Form.Label className="pt-2">상태</Form.Label>
									<Form.Control
										type="text"
										value={
											demandHistoryDto.demandStatus === 'UNCONFIRMED'
												? '미처리'
												: demandHistoryDto.demandStatus === 'APPROVE'
												  ? '승인'
												  : demandHistoryDto.demandStatus === 'REFUSAL'
												    ? '거절'
												    : demandHistoryDto.demandStatus // 다른 상태일 경우 원래 값 유지
										}
										readOnly
									/>
								</Col>

								<Col lg={6}>
									<Form.Label className="pt-2">폐기일자</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.demandDate}
										readOnly
									/>
								</Col>
							</Row>
							<Row>
								<Col lg={6}>
									<Form.Label className="pt-2">폐기사유</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.demandReason}
										readOnly
									/>
								</Col>

								<Col lg={6}>
									<Form.Label className="pt-2">폐기내용</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.demandDetail}
										readOnly
									/>
								</Col>
							</Row>
							<Row>
								<Col lg={6}>
									<Form.Label className="pt-2">폐기방법</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.disposeMethod}
										readOnly
									/>
								</Col>

								<Col lg={6}>
									<Form.Label className="pt-2">폐기위치</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.disposeLocation}
										readOnly
									/>
								</Col>
							</Row>
							<Row>
								<Col lg={6}>
									<Form.Label className="pt-2">폐기자</Form.Label>
									<Form.Control
										type="text"
										value={demandHistoryDto.demandBy}
										readOnly
									/>
								</Col>
							</Row>
						</Form.Group>
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

export { InfoModal, ProcessModal, ActionModal };
