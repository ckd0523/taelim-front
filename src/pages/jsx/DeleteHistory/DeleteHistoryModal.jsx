import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

const InfoModal = ({ show, handleClose, modalData }) => {
	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>요청 상세 정보</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{modalData && (
					<div>
						<p>자산코드: {modalData.AssetCode}</p>
						<p>자산명: {modalData.AssetName}</p>
						<p>폐기일자: {modalData.DeleteDate}</p>
						<p>폐기사유: {modalData.DeleteReason}</p>
						<p>폐기방법: {modalData.DeleteMethod}</p>
						<p>폐기위치: {modalData.DeleteLocation}</p>
						<p>폐기자: {modalData.DeleteBy}</p>
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

const ActionModal = ({ show, handleClose, actionType, handleSubmit }) => {
	const [reason, setReason] = useState('');

	const handleReasonChange = (e) => setReason(e.target.value);

	const handleFormSubmit = () => {
		handleSubmit(reason); // 사유를 넘겨주면서 처리
		handleClose(); // 모달 닫기
	};

	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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