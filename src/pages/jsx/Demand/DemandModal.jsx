import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASIC_URL;

const InfoModal = ({ show, handleClose, modalData }) => {
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
		window.location.reload();
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
				<Button
					variant={actionType === 'approve' ? 'primary' : 'danger'}
					onClick={handleFormSubmit}
				>
					처리
				</Button>
				<Button variant="secondary" onClick={handleClose}>
					닫기
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export { InfoModal, ActionModal };
