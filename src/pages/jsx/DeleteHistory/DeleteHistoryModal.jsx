import { Row, Col, Card, Button, Modal, Form, FormGroup } from 'react-bootstrap';
import { useState } from 'react';

const InfoModal = ({ show, handleClose, modalData }) => {
	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>폐기 상세 정보</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{modalData && (
					<>
						<Form.Group className="mb-3 pt-2" controlId="exampleForm.ControlInput1">
							<Col lg={12}>
								<Form.Label>자산코드</Form.Label>
								<Form.Control type="text" value={modalData.assetCode} readOnly />
							</Col>
							<Col lg={12}>
								<Form.Label className="pt-2">자산명</Form.Label>
								<Form.Control type="text" value={modalData.assetName} readOnly />
							</Col>

							<Col lg={12}>
								<Form.Label className="pt-2">폐기일자</Form.Label>
								<Form.Control type="text" value={modalData.deleteDate} readOnly />
							</Col>

							<Col lg={12}>
								<Form.Label className="pt-2">폐기사유</Form.Label>
								<Form.Control type="text" value={modalData.deleteReason} readOnly />
							</Col>

							<Col lg={12}>
								<Form.Label className="pt-2">폐기내용</Form.Label>
								<Form.Control type="text" value={modalData.deleteDetail} readOnly />
							</Col>
							<Col lg={12}>
								<Form.Label className="pt-2">폐기방법</Form.Label>
								<Form.Control type="text" value={modalData.deleteMethod} readOnly />
							</Col>

							<Col lg={12}>
								<Form.Label className="pt-2">폐기위치</Form.Label>
								<Form.Control
									type="text"
									value={modalData.deleteLocation}
									readOnly
								/>
							</Col>
							<Col lg={12}>
								<Form.Label className="pt-2">폐기자</Form.Label>
								<Form.Control type="text" value={modalData.deleteBy} readOnly />
							</Col>
						</Form.Group>
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

// const ActionModal = ({ show, handleClose, actionType, handleSubmit }) => {
// 	const [reason, setReason] = useState('');

// 	const handleReasonChange = (e) => setReason(e.target.value);

// 	const handleFormSubmit = () => {
// 		handleSubmit(reason); // 사유를 넘겨주면서 처리
// 		handleClose(); // 모달 닫기
// 	};

// 	return (
// 		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
// 			<Modal.Header closeButton>
// 				<Modal.Title>{actionType === 'approve' ? '승인 사유' : '거절 사유'}</Modal.Title>
// 			</Modal.Header>
// 			<Modal.Body>
// 				<Form>
// 					<Form.Group>
// 						<Form.Label>
// 							{actionType === 'approve'
// 								? '승인 사유를 입력하세요'
// 								: '거절 사유를 입력하세요'}
// 						</Form.Label>
// 						<Form.Control
// 							type="text"
// 							value={reason}
// 							onChange={handleReasonChange}
// 							placeholder={actionType === 'approve' ? '승인 사유' : '거절 사유'}
// 						/>
// 					</Form.Group>
// 				</Form>
// 			</Modal.Body>
// 			<Modal.Footer>
// 				<Button variant="secondary" onClick={handleClose}>
// 					닫기
// 				</Button>
// 				<Button
// 					variant={actionType === 'approve' ? 'primary' : 'danger'}
// 					onClick={handleFormSubmit}
// 				>
// 					처리
// 				</Button>
// 			</Modal.Footer>
// 		</Modal>
// 	);
// };

export { InfoModal };
