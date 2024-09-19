import { Row, Col, Card, Table as BootstrapTable, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import RowDetails from '../assetUpdate/RowDetails';
import './Style.css'; // 같은 폴더에서 CSS 파일 import

const InfoModal = ({ show, handleClose, modalData }) => {
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
				{modalData && (
					<>
						<div className="modal-data-info">
							<p>자산코드: {modalData.assetCode}</p>
							<p>자산명: {modalData.assetName}</p>
							<p>수정요청자: {modalData.updateBy}</p>
							<p>수정사유: {modalData.updateReason}</p>
							<p>수정일자: {modalData.updateDate}</p>
						</div>
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
										<td>{modalData.assetCode || 'N/A'}</td>
										<td>{modalData.assetName || 'N/A'}</td>
										<td>{modalData.assetBasis || 'N/A'}</td>
										<td>{modalData.manufacturingCompany || 'N/A'}</td>
										<td>{modalData.purpose || 'N/A'}</td>
										<td>{modalData.department || 'N/A'}</td>
										<td>{modalData.assetLocation || 'N/A'}</td>
										<td>{modalData.assetUser || 'N/A'}</td>
										<td>{modalData.assetOwner || 'N/A'}</td>
										<td>{modalData.assetSecurityManager || 'N/A'}</td>
										<td>{modalData.useState || 'N/A'}</td>
										<td>{modalData.operationStatus || 'N/A'}</td>
										<td>{modalData.introducedDate || 'N/A'}</td>
										<td>{modalData.confidentiality || 'N/A'}</td>
										<td>{modalData.integrity || 'N/A'}</td>
										<td>{modalData.availability || 'N/A'}</td>
										<td>{modalData.importanceScore}</td>
										<td>{modalData.importanceRating}</td>
										<td>{modalData.note || 'N/A'}</td>
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
										<td>{modalData.purchaseCost}</td>
										<td>{modalData.purchaseDate}</td>
										<td>{modalData.usefulLife}</td>
										<td>{modalData.depreciationMethod}</td>
										<td>{modalData.purchaseSource}</td>
										<td>{modalData.contactInformation}</td>
										<td>{modalData.acquisitionRoute}</td>
										<td>{modalData.maintenancePeriod}</td>
										<td>{modalData.residualValue}</td>
										<td>{modalData.currentValue}</td>
									</tr>
								</tbody>
							</BootstrapTable>
						</div>
					</>
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
