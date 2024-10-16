import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DisposeModal = ({
	showModal,
	handleClose,
	selectedAssetCode,
	handleDisposeDemand,
	handleDisposeAsset,
	isDisposed,
	setErrorMessage,
}) => {
	const [disposeReason, setDisposeReason] = useState('');
	const [disposeDetail, setDisposeDetail] = useState('');
	const [disposeLocation, setDisposeLocation] = useState('');
	const [disposeMethod, setDisposeMethod] = useState('');

	// 폐기 modal 부분 폼관련 내용 초기화 설정
	const resetForm = () => {
		setDisposeReason('');
		setDisposeDetail('');
		setDisposeLocation('');
		setDisposeMethod('');
	};

	// 관리 담당자 폐기 동작 받음
	const handleRequest = async () => {
		if (isDisposed) {
			setErrorMessage('폐기 요청이 이미 들어간 자산입니다.');
		} else {
			await handleDisposeDemand(selectedAssetCode, {
				disposeReason,
				disposeDetail,
				disposeLocation,
				disposeMethod,
			});
			resetForm();
			handleClose();
		}
	};

	// 자산 관리자 폐기 동작 받음
	const handleDispose = async () => {
		await handleDisposeAsset(selectedAssetCode, {
			disposeReason,
			disposeDetail,
			disposeLocation,
			disposeMethod,
		});
		resetForm();
		handleClose();
	};
	return (
		<Modal show={showModal} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>폐기 요청 - 자산 코드: {selectedAssetCode}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>구분</Form.Label>
						<Form.Control type="text" value="폐기" readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>폐기 사유</Form.Label>
						<Form.Select
							value={disposeReason}
							onChange={(e) => setDisposeReason(e.target.value)}
						>
							<option value="">사유를 선택하세요</option>
							<option value="노후화">노후화</option>
							<option value="고장">고장</option>
							<option value="성능저하">성능저하</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>폐기 내용</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							value={disposeDetail}
							onChange={(e) => setDisposeDetail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>폐기 위치</Form.Label>
						<Form.Control
							type="text"
							value={disposeLocation}
							onChange={(e) => setDisposeLocation(e.target.value)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>폐기 방법</Form.Label>
						<Form.Control
							type="text"
							value={disposeMethod}
							onChange={(e) => setDisposeMethod(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button style={{ background: '#c66464' }} variant="danger" onClick={handleRequest}>
					폐기요청
				</Button>
				<Button
					style={{ background: '#c66464' }}
					variant="danger"
					onClick={() => handleDispose(selectedAssetCode)}
				>
					폐기
				</Button>
				<Button style={{ background: '#5e83bb' }} variant="secondary" onClick={handleClose}>
					취소
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export { DisposeModal };
