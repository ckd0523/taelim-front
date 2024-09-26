import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASIC_URL;

const ActionModal = ({ show, handleClose, actionData, actionType }) => {
	const [department, setDepartment] = useState('');
	const [assetLocation, setAssetLocation] = useState('');
	const [assetSecurityManager, setAssetSecurityManager] = useState('');
	const [assetOwner, setAssetOwner] = useState('');
	const [reason, setReason] = useState('');
	const [detail, setDetail] = useState('');

	const departmentChange = (e) => setDepartment(e.target.value);
	const assetLocationChange = (e) => setAssetLocation(e.target.value);
	const assetSecurityManagerChange = (e) => setAssetSecurityManager(e.target.value);
	const assetOwnerChange = (e) => setAssetOwner(e.target.value);
	const reasonChange = (e) => setReason(e.target.value);
	const detailChange = (e) => setDetail(e.target.value);

	const handleFormSubmit = () => {
		for (const item of actionData) {
			const assetNo = item.assetNo;
			const updateToSend = {
				assetDto: item,
				assetNo,
				department,
				assetLocation,
				assetSecurityManager,
				assetOwner,
				reason,
				detail,
			};

			const disposeToSend = {
				assetNo: item.assetNo,
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
						.post(`${API_URL}/AlldeleteAction`, disposeToSend)
						.then((response) => {
							console.log('Delete successful:', response.data);
						})
						.catch((error) => {
							console.error('Delete error:', error);
						});
					break;
			}
		}
		handleClose(); // 모달 닫기
		window.location.reload();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{actionType === 'AllUpdate' ? '일괄 수정' : '일괄 폐기'}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>
							<p>
								선택된 데이터: {actionData.map((item) => item.assetCode).join(', ')}
							</p>
							{actionType === 'AllUpdate'
								? '수정 내용을 입력하세요'
								: '폐기 내용을 입력하세요'}
						</Form.Label>
						{actionType === 'AllUpdate' && (
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
						<Form.Control
							type="text"
							value={reason}
							onChange={reasonChange}
							placeholder={actionType === 'AllUpdate' ? '수정 사유' : '폐기 사유'}
						/>
						<Form.Control
							type="text"
							value={detail}
							onChange={detailChange}
							placeholder={actionType === 'AllUpdate' ? '수정 내용' : '폐기 내용'}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant={actionType === 'AllUpdate' ? 'primary' : 'danger'}
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
