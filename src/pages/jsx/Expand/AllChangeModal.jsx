import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import api from '@/common/api/authAxios';
const API_URL = import.meta.env.VITE_BASIC_URL;

const ActionModal = ({ show, handleClose, actionData, actionType }) => {
	const [department, setDepartment] = useState('');
	const [assetLocation, setAssetLocation] = useState('');
	const [assetSecurityManager, setAssetSecurityManager] = useState('');
	const [assetOwner, setAssetOwner] = useState('');
	const [disposeMethod, setDisposeMethod] = useState('');
	const [disposeLocation, setDisposeLocation] = useState('');
	const [reason, setReason] = useState('');
	const [detail, setDetail] = useState('');

	const departmentChange = (e) => setDepartment(e.target.value);
	const assetLocationChange = (e) => setAssetLocation(e.target.value);
	const assetSecurityManagerChange = (e) => setAssetSecurityManager(e.target.value);
	const assetOwnerChange = (e) => setAssetOwner(e.target.value);
	const disposeMethodChange = (e) => setDisposeMethod(e.target.value);
	const disposeLocationChange = (e) => setDisposeLocation(e.target.value);
	const reasonChange = (e) => setReason(e.target.value);
	const detailChange = (e) => setDetail(e.target.value);

	const handleFormSubmit = () => {
		const updateToSend = {
			assetDtos: actionData,
			department,
			assetLocation,
			assetSecurityManager,
			assetOwner,
			reason,
			detail,
		};

		const disposeToSend = {
			assetDtos: actionData,
			disposeMethod,
			disposeLocation,
			reason,
			detail,
		};

		const handleSuccessResponse = (response) => {
			console.log('Success:', response.data);
			alert(response.data); // 성공 메시지 띄우기
			window.location.reload(); // 2초 뒤 새로고침
		};

		const handleErrorResponse = (error) => {
			console.error('Error:', error);
			alert(error.response.data); // 에러 메시지 띄우기
		};

		switch (actionType) {
			case 'AllUpdate':
				api.post(`${API_URL}/allUpdate`, updateToSend)
					.then(handleSuccessResponse)
					.catch(handleErrorResponse);
				break;
			case 'AllDispose':
				api.post(`${API_URL}/allDelete`, disposeToSend)
					.then(handleSuccessResponse)
					.catch(handleErrorResponse);
				break;
			case 'AllUpdateDemand':
				api.post(`${API_URL}/allUpdateDemand`, updateToSend)
					.then(handleSuccessResponse)
					.catch(handleErrorResponse);
				break;
			case 'AllDisposeDemand':
				api.post(`${API_URL}/allDeleteDemand`, disposeToSend)
					.then(handleSuccessResponse)
					.catch(handleErrorResponse);
				break;
			default:
				console.log('Invalid action type');
		}

		handleClose(); // 모달 닫기
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{actionType === 'AllUpdate' && '일괄 수정'}
					{actionType === 'AllUpdateDemand' && '일괄 수정 요청'}
					{actionType === 'AllDispose' && '일괄 폐기'}
					{actionType === 'AllDisposeDemand' && '일괄 폐기 요청'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>
							<p>
								선택된 데이터: {actionData.map((item) => item.assetCode).join(', ')}
							</p>
							{/* {actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
								? '수정 내용을 입력하세요'
								: '폐기 내용을 입력하세요'} */}
						</Form.Label>

						{(actionType === 'AllUpdate' || actionType === 'AllUpdateDemand') && (
							<>
								<Form.Group className="mb-1">
									<Form.Label className="mb-0">자산소재지</Form.Label>
									<Form.Control
										type="text"
										value={department}
										onChange={departmentChange}
									/>
								</Form.Group>

								<Form.Group className="mb-1">
									<Form.Label className="mb-0">위치</Form.Label>
									<Form.Control
										type="text"
										value={assetLocation}
										onChange={assetLocationChange}
									/>
								</Form.Group>

								<Form.Group className="mb-1">
									<Form.Label className="mb-0">관리자</Form.Label>
									<Form.Control
										type="text"
										value={assetSecurityManager}
										onChange={assetSecurityManagerChange}
									/>
								</Form.Group>

								<Form.Group className="mb-1">
									<Form.Label className="mb-0">소유자</Form.Label>
									<Form.Control
										type="text"
										value={assetOwner}
										onChange={assetOwnerChange}
									/>
								</Form.Group>
							</>
						)}

						{(actionType === 'AllDispose' || actionType === 'AllDisposeDemand') && (
							<>
								<Form.Group className="mb-1">
									<Form.Label className="mb-0">폐기 위치</Form.Label>
									<Form.Control
										type="text"
										value={department}
										onChange={disposeLocationChange}
									/>
								</Form.Group>

								<Form.Group className="mb-1">
									<Form.Label className="mb-0">폐기 방법</Form.Label>
									<Form.Control
										type="text"
										value={assetLocation}
										onChange={disposeMethodChange}
									/>
								</Form.Group>
							</>
						)}

						<Form.Group className="mb-1">
							<Form.Label className="mb-0">사유</Form.Label>
							<Form.Control
								type="text"
								value={reason}
								onChange={reasonChange}
								// placeholder={
								// 	actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
								// 		? '수정 사유'
								// 		: '폐기 사유'
								// }
							/>
						</Form.Group>

						<Form.Group className="mb-1">
							<Form.Label className="mb-0">내용</Form.Label>
							<Form.Control
								type="text"
								value={detail}
								onChange={detailChange}
								// placeholder={
								// 	actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
								// 		? '수정 내용'
								// 		: '폐기 내용'
								// }
							/>
						</Form.Group>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button
					variant={
						actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
							? 'primary'
							: 'danger'
					}
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
export { ActionModal };
