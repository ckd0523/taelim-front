import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Card, Row, Col } from 'react-bootstrap'; // React-Bootstrap에서 필요한 컴포넌트 가져오기
import api from '@/common/api/authAxios'; // API 호출을 위한 커스텀 axios 인스턴스 가져오기
import Swal from 'sweetalert2';

const URL = import.meta.env.VITE_BASIC_URL; // 환경 변수에서 API URL 가져오기

const QrPrinterComponent = () => {
	const [printers, setPrinters] = useState([]);
	const [editIp, setEditIp] = useState('');
	const [selectedPrinter, setSelectedPrinter] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [newPrinter, setNewPrinter] = useState({ printerName: '', printerIp: '' });
	const [showAddPrinterModal, setShowAddPrinterModal] = useState(false);

	const fetchPrinters = async () => {
		try {
			const response = await api.get(`${URL}/printers/AllPrinters`);
			console.log('조회', response.data);
			setPrinters(response.data);
		} catch (error) {
			console.error('Error fetching printers', error);
			Swal.fire({
				icon: 'error',
				title: '네트워크 오류',
			})
		}
	};

	const updatePrinterIp = async () => {
		if (!selectedPrinter || !editIp) return;
		try {
			const response = await api.put(`${URL}/printers/UpdatePrinter`, {
				qrPrinterNo: selectedPrinter.qrPrinterNo,
				printerIp: editIp,
			});
			console.log('Updated Printer:', response.data);
			fetchPrinters();
			setShowEditModal(false);
		} catch (error) {
			console.error('Error updating printer IP:', error);
			Swal.fire({
				icon: 'error',
				title: '네트워크 오류',
			})
		}
	};

	const addPrinter = async () => {
		try {
			const response = await api.post(`${URL}/printers/AddPrinter`, newPrinter);
			console.log('Added Printer:', response.data);
			fetchPrinters();
			setShowAddPrinterModal(false);
			setNewPrinter({ printerName: '', printerIp: '' });
		} catch (error) {
			console.error('Error adding printer', error);
			Swal.fire({
				icon: 'error',
				title: '네트워크 오류',
			})
		}
	};

	const selectPrinter = async (printerId) => {
		try {
			await api.put(`${URL}/printers/${printerId}/select`);
			fetchPrinters();
		} catch (error) {
			console.error('Error selecting printer:', error);
			Swal.fire({
				icon: 'error',
				title: '네트워크 오류',
			})
		}
	};

	const deletePrinter = async (printerId) => {
		Swal.fire({
			icon: 'question',
			title: '삭제하시겠습니까?',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '예',
			cancelButtonText: '아니오',
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await api.delete(`${URL}/printers/${printerId}/delete`);
					fetchPrinters();
				} catch (error) {
					console.error("Error deleting printer:", error);
					Swal.fire({
						icon: 'error',
						title: '네트워크 오류',
					})
				}
			}
		});
	};

	useEffect(() => {
		fetchPrinters();
	}, []);

	return (
		<div>
			<h3>프린터 목록</h3>
			<Button
				variant="success"
				onClick={() => setShowAddPrinterModal(true)}
				style={{ display: printers.length >= 2 ? 'none' : 'inline-block' }}
			>
				프린터 추가
			</Button>

			<Row>
				{printers.map((printer) => (
					<Col key={printer.qrPrinterNo} md={6} className="mb-4">
						<Card>
							<Card.Body>
								<Card.Title>{printer.printerName}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									{printer.printerIp}
								</Card.Subtitle>
								{/* 현재 선택된 프린터 표시 */}
								<Form.Check
									type="radio"
									label="현재 프린터로 설정"
									checked={printer.isSelected === true}
									onChange={() => selectPrinter(printer.qrPrinterNo)}
								/>
								<div className='d-flex justify-content-between'>
									<Button
										onClick={() => {
											setSelectedPrinter(printer);
											setEditIp(printer.printerIp);
											setShowEditModal(true);
										}}
										className="mt-2"
										variant="info"
									>
										IP 수정
									</Button>
									<Button
										onClick={() => {
											deletePrinter(printer.qrPrinterNo);
										}}
										className="mt-2"
										variant="danger"
									>
										삭제
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>

			{/* IP 수정 모달 */}
			<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>IP 수정</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>프린터 이름</Form.Label>
							<Form.Control
								type="text"
								value={selectedPrinter ? selectedPrinter.printerName : ''}
								disabled
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>현재 IP 주소</Form.Label>
							<Form.Control
								type="text"
								value={selectedPrinter ? selectedPrinter.printerIp : ''}
								disabled
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>새 IP 주소</Form.Label>
							<Form.Control
								type="text"
								value={editIp}
								onChange={(e) => setEditIp(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowEditModal(false)}>
						취소
					</Button>
					<Button variant="primary" onClick={updatePrinterIp} disabled={!editIp}>
						수정
					</Button>
				</Modal.Footer>
			</Modal>

			{/* 프린터 추가 모달 */}
			<Modal show={showAddPrinterModal} onHide={() => setShowAddPrinterModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>프린터 추가</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>프린터 이름</Form.Label>
							<Form.Control
								type="text"
								value={newPrinter.printerName}
								onChange={(e) =>
									setNewPrinter({ ...newPrinter, printerName: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>프린터 IP 주소</Form.Label>
							<Form.Control
								type="text"
								value={newPrinter.printerIp}
								onChange={(e) =>
									setNewPrinter({ ...newPrinter, printerIp: e.target.value })
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowAddPrinterModal(false)}>
						취소
					</Button>
					<Button variant="primary" onClick={addPrinter}>
						추가
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default QrPrinterComponent;
