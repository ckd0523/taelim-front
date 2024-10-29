import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuthContext } from '@/common';
import Swal from 'sweetalert2';

const DisposeModal = ({
	showModal,
	handleClose,
	selectedAssetCode,
	handleDisposeDemand,
	handleDisposeAsset,
}) => {
	const [disposeReason, setDisposeReason] = useState('');
	const [disposeDetail, setDisposeDetail] = useState('');
	const [disposeLocation, setDisposeLocation] = useState('');
	const [disposeMethod, setDisposeMethod] = useState('');
	const { user } = useAuthContext();

	// 폐기 modal 부분 폼관련 내용 초기화 설정
	const resetForm = () => {
		setDisposeReason('');
		setDisposeDetail('');
		setDisposeLocation('');
		setDisposeMethod('');
	};

	// 관리 담당자 폐기 동작 받음
	const handleRequest = async () => {
		const disposeDto = {
			disposeUser: user.id,
			disposeReason,
			disposeDetail,
			disposeLocation,
			disposeMethod,
		};
		// Swal을 사용하여 사용자에게 확인 메시지 표시
		const result = await Swal.fire({
			title: '확인',
			text: '정말로 이 자산을 폐기요청하시겠습니까?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '예',
			cancelButtonText: '아니오',
		});

		if (result.isConfirmed) {
			// 사용자가 확인했을 경우, 자산 폐기 처리
			await handleDisposeDemand(selectedAssetCode, disposeDto);
			resetForm();
			handleClose();
		}
	};

	/// 자산 관리자 폐기 동작 받음
	const handleDispose = async () => {
		const disposeDto = {
			disposeUser: user.id,
			disposeReason,
			disposeDetail,
			disposeLocation,
			disposeMethod,
		};

		// Swal을 사용하여 사용자에게 확인 메시지 표시
		const result = await Swal.fire({
			title: '확인',
			text: '정말로 이 자산을 폐기하시겠습니까?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '예',
			cancelButtonText: '아니오',
		});

		if (result.isConfirmed) {
			// 사용자가 확인했을 경우, 자산 폐기 처리
			await handleDisposeAsset(selectedAssetCode, disposeDto);
			resetForm();
			handleClose();
		}
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
						<Form.Control
							type="text"
							value={disposeReason}
							onChange={(e) => setDisposeReason(e.target.value)}
						/>
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
				{user.role === 'ASSET_MANAGER' && (
					<Button variant="danger" onClick={handleRequest}>
						폐기요청
					</Button>
				)}
				{user.role === 'ADMIN' && (
					<Button variant="danger" onClick={handleDispose}>
						폐기
					</Button>
				)}
				<Button
					variant="secondary"
					onClick={() => {
						resetForm();
						handleClose();
					}}
				>
					취소
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export { DisposeModal };
