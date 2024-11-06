import api from '@/common/api/authAxios';
import { useState, useRef, useEffect } from 'react';
import { Form, FormGroup, Modal, Button, ModalFooter, Alert } from 'react-bootstrap';
import { BsImage } from 'react-icons/bs';
import Swal from 'sweetalert2';
const urlConfig = import.meta.env.VITE_BASIC_URL;
const MaintainDetail = ({ show, selectData, handleClose }) => {
	const [imgPath, setImgPath] = useState();
	const [afterPath, setafterPath] = useState();
	const [files, setFiles] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		repairStartDate: selectData.repairStartDate,
		repairEndDate: selectData.repairEndDate || '',
		repairResult: selectData.repairResult,
		repairStatus: selectData.repairStatus,
		repairFiles: selectData.repairFiles || [],
	});
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	const handleSuccess = () => {
		Swal.fire({
			title: '최종 확인',
			text: '지금까지 작업을 모두 처리하시겠습니까?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#255892a8',
			cancelButtonColor: '#a519198e',
			confirmButtonText: '예',
			cancelButtonText: '아니오',
		}).then(async (result) => {
			if (result.isConfirmed) {
				const completionData = {
					...formData,
					repairStatus: '완료',
					repairEndDate: new Date().toISOString().slice(0, 10),
				};
				await saveComletionData(completionData);
			}
		});
	};
	const imgRef = useRef();
	const afterImgRef = useRef();

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
	const saveComletionData = async (completionData) => {
		try {
			const response = await api.post(
				`${urlConfig}/maintain/update/${selectData.repairNo}`,
				completionData
			);
			if (response.status === 200) {
				Swal.fire({
					icon: 'success',
					title: '작업이 완료되었습니다.',
					text: '유지보수 완료 상태로 저장되었습니다.',
				});
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: error,
				text: '완료 데이터 저장 오류입니다.',
			});
		}
		handleClose();
	};
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
					const response = await api.post(
						`${urlConfig}/maintain/file/upload/${selectData.repairNo}`,
						uploadData
					);
					console.log(response.status);
					if (response.status == 200) {
						const fileName = await response.data;
						updateFileNames.push(fileName);
						console.log(fileName);
					} else {
						Swal.fire({
							icon: 'error',
							title: '파일 수정을 실패하였습니다.',
							text: '파일을 다시 확인해주세요',
						});
						imageUploadSuccess = false;
					}
				}
			} catch (error) {
				imageUploadSuccess = false;
				console.error(error);
			}
		}

		try {
			const response = await api.post(
				`${urlConfig}/maintain/update/${selectData.repairNo}`,
				formData
			);

			if (response.status == 200) {
				Swal.fire({
					icon: 'success',
					title: '유지보수가 성공적으로 수정되었습니다.',
					text: '유지보수 이력 화면으로 이동',
				});
			} else {
				endDateSaveSuccess = false;
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
						<Form.Control type="text" value={selectData.repairBy} readOnly />
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
							type="text"
							readOnly
							name="repairEndDate"
							value={formData.repairEndDate}
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
						!(formData.repairStatus === '완료') && (
							<>
								<div className="me-auto">
									<Button variant="dark" onClick={handleSuccess}>
										완료
									</Button>
								</div>

								<Button
									style={{ background: '#5e83bb', border: 'none' }}
									onClick={handleEditToggle}
								>
									수정
								</Button>
							</>
						)
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
