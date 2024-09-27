import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

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

		switch (actionType) {
			case 'AllUpdate':
				axios
					.post(`${API_URL}/allUpdate`, updateToSend)
					.then((response) => {
						console.log('Update successful:', response.data);
					})
					.catch((error) => {
						console.error('Update error:', error);
					});
				break;
			case 'AllDispose':
				axios
					.post(`${API_URL}/allDelete`, disposeToSend)
					.then((response) => {
						console.log('Delete successful:', response.data);
					})
					.catch((error) => {
						console.error('Delete error:', error);
					});
				break;
			case 'AllUpdateDemand':
				axios
					.post(`${API_URL}/allUpdateDemand`, updateToSend)
					.then((response) => {
						console.log('Delete successful:', response.data);
					})
					.catch((error) => {
						console.error('Delete error:', error);
					});
				break;
			case 'AllDisposeDemand':
				axios
					.post(`${API_URL}/allDeleteDemand`, disposeToSend)
					.then((response) => {
						console.log('Delete successful:', response.data);
					})
					.catch((error) => {
						console.error('Delete error:', error);
					});
				break;
		}

		handleClose(); // 모달 닫기
		window.location.reload();
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
							{actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
								? '수정 내용을 입력하세요'
								: '폐기 내용을 입력하세요'}
						</Form.Label>
						{(actionType === 'AllUpdate' || actionType === 'AllUpdateDemand') && (
							<>
								<Form.Control
									type="text"
									value={department}
									onChange={departmentChange}
									placeholder={'자산소재지'}
								/>
								<Form.Control
									type="text"
									value={assetLocation}
									onChange={assetLocationChange}
									placeholder={'위치'}
								/>
								<Form.Control
									type="text"
									value={assetSecurityManager}
									onChange={assetSecurityManagerChange}
									placeholder={'관리자'}
								/>
								<Form.Control
									type="text"
									value={assetOwner}
									onChange={assetOwnerChange}
									placeholder={'소유자'}
								/>
							</>
						)}
						{(actionType === 'AllDispose' || actionType === 'AllDisposeDemand') && (
							<>
								<Form.Control
									type="text"
									value={department}
									onChange={disposeLocationChange}
									placeholder={'폐기위치'}
								/>
								<Form.Control
									type="text"
									value={assetLocation}
									onChange={disposeMethodChange}
									placeholder={'폐기방법'}
								/>
							</>
						)}
						<Form.Control
							type="text"
							value={reason}
							onChange={reasonChange}
							placeholder={
								actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
									? '수정 사유'
									: '폐기 사유'
							}
						/>
						<Form.Control
							type="text"
							value={detail}
							onChange={detailChange}
							placeholder={
								actionType === 'AllUpdate' || actionType === 'AllUpdateDemand'
									? '수정 내용'
									: '폐기 내용'
							}
						/>
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
