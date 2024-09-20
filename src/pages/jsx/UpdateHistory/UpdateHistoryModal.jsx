import { Row, Col, Card, Table as BootstrapTable, Button, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css'; // 같은 폴더에서 CSS 파일 import

const InfoModal = ({ show, handleClose, modalData, assetNo }) => {
	const [assetInfo, setAssetInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (assetNo) {
			// assetNo  유효할 때만 fetchRowData 호출
			const fetchRowData = async () => {
				console.log('정상적인 assetNo : ', assetNo);
				setIsLoading(true); // 데이터 요청 시작부분

				try {
					const response = await axios.get(`http://localhost:8080/list/${assetNo}`);
					console.log(`불러온 데이터 : `, response.data);

					const lowestAsset = response.data.reduce((prev, current) => {
						return prev.assetNo < current.assetNo ? prev : current;
					});

					setAssetInfo(lowestAsset); // 선택한 데이터 설정
				} catch (error) {
					console.error(`Error 데이터 : `, error);
				} finally {
					setIsLoading(false); // 데이터 요청완료
				}
			};

			fetchRowData(); // assetNo  유효할 때만 fetchRowData 호출
		}
	}, [assetNo]); // assetNo  변경될 때만 호출

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			scrollable={scroll}
			className="custom-modal" // 모달 전체에 스타일 적용
		>
			<Modal.Header closeButton>
				<Modal.Title>수정 상세 정보</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{isLoading ? (
					<p>로딩 중...</p> // 로딩 중 표시
				) : (
					assetInfo && (
						<>
							{/* <div className="modal-data-info">
								<p>자산코드: {modalData.assetCode}</p>
								<p>자산명: {modalData.assetName}</p>
								<p>수정요청자: {modalData.updateBy}</p>
								<p>수정사유: {modalData.updateReason}</p>
								<p>수정일자: {modalData.updateDate}</p>
							</div> */}
							<div className="info-section">
								<h2>변경 전</h2>
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
											<td>{assetInfo.importanceScore}</td>
											<td>{assetInfo.importanceRating}</td>
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
};

const ActionModal = ({ show, handleClose, actionType, handleSubmit }) => {
	const [reason, setReason] = useState('');

	const handleReasonChange = (e) => setReason(e.target.value);

	const handleFormSubmit = () => {
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
				<Button variant="secondary" onClick={handleClose}>
					닫기
				</Button>
				<Button
					variant={actionType === 'approve' ? 'primary' : 'danger'}
					onClick={handleFormSubmit}
				>
					처리
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export { InfoModal, ActionModal };
