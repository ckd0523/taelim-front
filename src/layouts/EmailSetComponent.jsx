import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import api from '@/common/api/authAxios';

const URL = import.meta.env.VITE_BASIC_URL;

const EmailSetComponent = () => {
	const [emailSets, setEmailSets] = useState([]);
	const [editEmail, setEditEmail] = useState('');
	const [editName, setEditName] = useState('');
	const [selectedEmailSet, setSelectedEmailSet] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [newEmailSet, setNewEmailSet] = useState({ setName: '', setEmail: '' });
	const [showAddEmailSetModal, setShowAddEmailSetModal] = useState(false);

	// EmailSet 조회
	const fetchEmailSets = async () => {
		try {
			const response = await api.get(`${URL}/emailSets/AllEmailSets`);
			console.log('EmailSets 조회:', response.data);
			setEmailSets(response.data);
		} catch (error) {
			console.error('Error fetching EmailSets', error);
		}
	};

	// EmailSet 추가
	const addEmailSet = async () => {
		try {
			const response = await api.post(`${URL}/emailSets/AddEmailSet`, newEmailSet);
			console.log('Added EmailSet:', response.data);
			fetchEmailSets();
			setShowAddEmailSetModal(false);
			setNewEmailSet({ setName: '', setEmail: '' });
		} catch (error) {
			console.error('Error adding EmailSet:', error);
		}
	};

	// EmailSet 수정
	const updateEmailSet = async () => {
		if (!selectedEmailSet || !editEmail || !editName) return;
		try {
			const response = await api.put(`${URL}/emailSets/UpdateEmailSet`, {
				emailSetNo: selectedEmailSet.emailSetNo,
				setEmail: editEmail,
				setName: editName,
			});
			console.log('Updated EmailSet:', response.data);
			fetchEmailSets();
			setShowEditModal(false);
		} catch (error) {
			console.error('Error updating EmailSet:', error);
		}
	};

	// 선택된 EmailSet 설정
	const selectEmailSet = async (emailSetNo) => {
		try {
			await api.put(`${URL}/emailSets/${emailSetNo}/select`);
			fetchEmailSets();
		} catch (error) {
			console.error('Error selecting EmailSet:', error);
		}
	};

	useEffect(() => {
		fetchEmailSets();
	}, []);

	return (
		<div>
			<h3>Email 설정 목록</h3>
			<Button
				variant="success"
				onClick={() => setShowAddEmailSetModal(true)}
				style={{ display: emailSets.length >= 5 ? 'none' : 'inline-block' }}
			>
				Email 설정 추가
			</Button>

			<Row>
				{emailSets.map((emailSet) => (
					<Col key={emailSet.emailSetNo} md={6} className="mb-4">
						<Card>
							<Card.Body>
								<Card.Title>{emailSet.setName}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									{emailSet.setEmail}
								</Card.Subtitle>
								<Form.Check
									type="radio"
									label="기본 설정으로 선택"
									checked={emailSet.isSelected}
									onChange={() => selectEmailSet(emailSet.emailSetNo)}
								/>
								<Button
									onClick={() => {
										setSelectedEmailSet(emailSet);
										setEditEmail(emailSet.setEmail);
										setEditName(emailSet.setName);
										setShowEditModal(true);
									}}
									className="mt-2"
									variant="info"
								>
									수정
								</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>

			{/* EmailSet 수정 모달 */}
			<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Email 설정 수정</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>설정 이름</Form.Label>
							<Form.Control
								type="text"
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>이메일 주소</Form.Label>
							<Form.Control
								type="email"
								value={editEmail}
								onChange={(e) => setEditEmail(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowEditModal(false)}>
						취소
					</Button>
					<Button variant="primary" onClick={updateEmailSet}>
						저장
					</Button>
				</Modal.Footer>
			</Modal>

			{/* EmailSet 추가 모달 */}
			<Modal show={showAddEmailSetModal} onHide={() => setShowAddEmailSetModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Email 설정 추가</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>설정 이름</Form.Label>
							<Form.Control
								type="text"
								value={newEmailSet.setName}
								onChange={(e) =>
									setNewEmailSet({ ...newEmailSet, setName: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>이메일 주소</Form.Label>
							<Form.Control
								type="email"
								value={newEmailSet.setEmail}
								onChange={(e) =>
									setNewEmailSet({ ...newEmailSet, setEmail: e.target.value })
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowAddEmailSetModal(false)}>
						취소
					</Button>
					<Button variant="primary" onClick={addEmailSet}>
						추가
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default EmailSetComponent;
