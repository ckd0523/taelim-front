import api from '@/common/api/authAxios';
import { useState, useRef, useEffect } from 'react';
import { Form, FormGroup, Modal, Button, ModalFooter, Alert } from 'react-bootstrap';
import { BsImage } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { useAuthContext } from '@/common';
const urlConfig = import.meta.env.VITE_BASIC_URL;
const MaintainDetail = ({ show, selectData, handleClose }) => {
	// const [change, setChange] = useState(selectData.repairEndDate || '');
	const [imgPath, setImgPath] = useState();
	const [afterPath, setafterPath] = useState();
	const [files, setFiles] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		repairStartDate: selectData.repairStartDate,
		repairEndDate: selectData.repairEndDate || '',
		repairResult: selectData.repairResult,
		repairFiles: selectData.repairFiles || [],
	});
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	const imgRef = useRef();
	const afterImgRef = useRef();
	const { user } = useAuthContext();
	const handleEditToggle = () => {
		setIsEditing(!isEditing);

		if (!isEditing) {
			setImgPath(
				selectData.repairFiles.find((file) => file.repairType === '보수전')?.fileURL || ''
			);
			setafterPath(
				selectData.repairFiles.find((file) => file.repairType === '보수후')?.fileURL || ''
			);
		}
	};
	console.log(user.role);
	const handleFileUpload = (file, repairType) => {
		const updateFiles = [...files, { file, repairType }];
		setFiles(updateFiles);
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
		setShowAlert(false);
		if (name === 'repairEndDate') {
			const startDate = new Date(selectData.repairStartDate);
			const endDate = new Date(value);

			if (endDate < startDate) {
				setAlertMessage('완료일이 시작일 이전일 수는 없습니다.');
				setShowAlert(true);
				setFormData((prevState) => ({
					...prevState,
					repairEndDate: '',
				}));
			}
		}
	};

	const reader = new FileReader();
	const previewImage = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		reader.onloadend = () => {
			setImgPath(reader.result);
			handleFileUpload(file, 'BEFORE_REPAIR');
		};
		reader.readAsDataURL(file);
		console.log(reader);
	};
	const AfterImage = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		reader.onloadend = () => {
			setafterPath(reader.result);
			handleFileUpload(file, 'AFTER_REPAIR');
		};
		reader.readAsDataURL(file);
	};

	useEffect(
		() => () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);
	const saveImages = async () => {
		const updateFileNames = [];

		let imageUploadSuccess = true;
		let endDateSaveSuccess = true;
		for (let { file, repairType } of files) {
			const uploadData = new FormData();
			uploadData.append('file', file);
			uploadData.append('repairNo', selectData.repairNo);
			uploadData.append('repairType', repairType);
			uploadData.append('deleteExisting', 'true');

			try {
				if (uploadData.has('file')) {
					const response = await fetch(
						`${urlConfig}/maintain/file/upload/${selectData.repairNo}`,
						{
							method: 'POST',
							body: uploadData,
						}
					);
					if (response.ok) {
						const fileName = await response.text();
						updateFileNames.push(fileName);
						console.log(fileName);
					} else {
						Swal.fire({
							icon: 'error',
							title: '파일 수정을 실패하였습니다.',
							text: '파일을 다시 확인해주세요',
						});
					}
				}
			} catch (error) {
				imageUploadSuccess = false;
				console.error(error);
			}
		}

		try {
			const response = await api.post('/maintain/update/${selectData.repairNo}', formData);

			if (response.ok) {
				Swal.fire({
					icon: 'success',
					title: '유지보수가 성공적으로 수정되었습니다.',
					text: '유지보수 이력 화면으로 이동',
				});
			}
		} catch (error) {
			endDateSaveSuccess = false;
			console.error(error);
		}
		handleClose();
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>유지보수 상세</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{showAlert && <Alert variant="danger">{alertMessage}</Alert>}
					<Form.Group className="mb-3 pt-2" controlId="exampleForm.ControlInput1">
						<Form.Label>자산코드</Form.Label>
						<Form.Control type="text" value={selectData.assetCode} readOnly />
						<Form.Label className="pt-2">유지보수 담당자</Form.Label>
						<Form.Control type="text" value={selectData.maintainBy} readOnly />
						<Form.Label className="pt-2">시작일</Form.Label>
						<Form.Control
							type={isEditing ? 'date' : 'text'}
							name="repairStartDate"
							onChange={handleInputChange}
							value={formData.repairStartDate}
							readOnly={!isEditing}
						/>
						<Form.Label className="pt-2">완료일</Form.Label>
						<Form.Control
							type={isEditing ? 'date' : 'text'}
							name="repairEndDate"
							value={formData.repairEndDate || ''}
							onChange={handleInputChange}
							readOnly={!isEditing}
						/>
						<Form.Label className="pt-2">유지보수 내용</Form.Label>
						<Form.Control
							as="textarea"
							name="repairResult"
							value={formData.repairResult}
							rows={3}
							onChange={handleInputChange}
							readOnly={!isEditing}
						/>
						<Form.Label className="pt-2">유지보수 사진</Form.Label>
						<p>유지보수 전 사진</p>
						{!isEditing ? (
							selectData.repairFiles &&
							selectData.repairFiles.filter((file) => file.repairType === '보수전')
								.length > 0 ? (
								selectData.repairFiles
									.filter((file) => file.repairType === '보수전')
									.map((file, index) =>
										file.fileURL ? (
											<img
												key={index}
												src={file.fileURL}
												width="100%"
												alt="Before Repair"
											/>
										) : (
											<p key={index}>사진/파일이 없습니다</p>
										)
									)
							) : (
								<p>사진/파일이 없습니다.</p>
							)
						) : (
							<FormGroup>
								<Form.Label htmlFor="maintainBefore">
									{imgPath ? (
										<img width="200" src={imgPath} />
									) : (
										<BsImage size={120} />
									)}
								</Form.Label>
								<Form.Control
									hidden
									ref={imgRef}
									type="file"
									id="maintainBefore"
									accept="image/*"
									onChange={previewImage}
								></Form.Control>
							</FormGroup>
						)}

						<p className="pt-2">유지보수 후 사진</p>
						{!isEditing ? (
							selectData.repairFiles &&
							selectData.repairFiles.filter((file) => file.repairType === '보수후')
								.length > 0 ? (
								selectData.repairFiles
									.filter((file) => file.repairType === '보수후')
									.map((file, index) =>
										file.fileURL ? (
											<img
												key={index}
												src={file.fileURL}
												width="100%"
												alt="After Repair"
											/>
										) : (
											<p key={index}>사진/파일이 없습니다</p>
										)
									)
							) : (
								<p>사진/파일이 없습니다.</p>
							)
						) : (
							<FormGroup>
								<Form.Label htmlFor="maintainAfter">
									{afterPath ? (
										<img width="200" src={afterPath} />
									) : (
										<BsImage size={120} />
									)}
								</Form.Label>
								<Form.Control
									hidden
									ref={afterImgRef}
									type="file"
									id="maintainAfter"
									accept="image/*"
									onChange={AfterImage}
								></Form.Control>
							</FormGroup>
						)}
					</Form.Group>
				</Modal.Body>
				<ModalFooter>
					{isEditing ? (
						<>
							<Button
								style={{ background: '#5e83bb', border: 'none' }}
								onClick={saveImages}
							>
								저장
							</Button>
							<Button
								style={{ background: '#c66464', border: 'none' }}
								onClick={handleEditToggle}
							>
								취소
							</Button>
						</>
					) : (
						user.role === '[ADMIN]' ||
						(user.role === '[ASSET_MANAGER]' && (
							<Button
								style={{ background: '#5e83bb', border: 'none' }}
								onClick={handleEditToggle}
							>
								수정
							</Button>
						))
					)}
					<Button variant="secondary" onClick={handleClose}>
						닫기
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export { MaintainDetail };
