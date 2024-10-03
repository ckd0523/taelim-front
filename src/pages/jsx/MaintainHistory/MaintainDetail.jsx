import { useState, useRef, useEffect } from 'react';
import { Form, FormGroup, Modal, Button, ModalFooter } from 'react-bootstrap';
import { BsImage } from 'react-icons/bs';
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));

		if (name === 'repairEndDate') {
			const startDate = new Date(selectData.repairStartDate);
			const endDate = new Date(value);

			if (endDate < startDate) {
				alert('완료일은 시작일보다 이전일 수 없습니다.');
				setFormData((prevState) => ({
					...prevState,
					repairEndDate: '',
				}));
			}
		}
	};
	const previewImage = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();

		reader.onloadend = () => {
			setImgPath(reader.result);
		};
		reader.readAsDataURL(file);
		console.log(reader);
	};
	const AfterImage = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;
		const reader = new FileReader();

		reader.onloadend = () => {
			setafterPath(reader.result);
		};
		reader.readAsDataURL(file);
	};
	// const handleImageChange = (e, type) => {
	// 	const file = e.target.files[0];
	// 	if (!file) return;

	// 	const reader = new FileReader();
	// 	reader.onloadend = () => {
	// 		if (type === 'BEFORE_REPAIR') {
	// 			setImgPath(reader.path);
	// 		} else {
	// 			setAfterPath(reader.result);
	// 		}
	// 	};
	// 	reader.readAsDataURL(file);
	// };

	useEffect(
		() => () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);
	const saveImages = async () => {
		// const updateFileNames = [];
		// for(let {file, repairType} of files) {

		// }
		const uploadData = new FormData();
		let imageUploadSuccess = true;
		let endDateSaveSuccess = true;
		if (imgRef.current.files[0]) {
			uploadData.append('file', imgRef.current.files[0]);
			uploadData.append('repairNo', selectData.repairNo);

			uploadData.append('repairType', 'BEFORE_REPAIR');
		}
		if (afterImgRef.current.files[0]) {
			uploadData.append('file', afterImgRef.current.files[0]);
			uploadData.append('repairNo', selectData.repairNo);
			uploadData.append('repairType', 'AFTER_REPAIR');
		}
		try {
			const response = await fetch(
				`${urlConfig}/maintain/file/upload/${selectData.repairNo}`,
				{
					method: 'POST',
					body: uploadData,
				}
			);
			if (response.ok) {
				alert('이미지 업로드 성공');
				handleClose();
			} else {
				imageUploadSuccess = false;
				alert('이미지 업로드 실패');
			}
		} catch (error) {
			imageUploadSuccess = false;
			console.error(error);
		}

		try {
			const response = await fetch(`${urlConfig}/maintain/update/${selectData.repairNo}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert('수정 성공');
				handleClose();
				window.location.reload();
			} else {
				endDateSaveSuccess = false;
				alert('수정 실패');
			}
		} catch (error) {
			endDateSaveSuccess = false;
			console.error(error);
		}

		if (imageUploadSuccess || endDateSaveSuccess) {
			alert('저장성공');
			handleClose();
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>유지보수 상세</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
							selectData.repairFiles
								.filter((file) => file.repairType === '보수전')
								.map((file, index) => {
									return (
										<img
											key={index}
											src={file.fileURL}
											width="100%"
											alt="Before Repair"
										/>
									);
								})
						) : (
							<FormGroup>
								<Form.Label htmlFor="maintainBefore">
									{imgPath ? (
										<img width="200" src={imgPath} />
									) : (
										<img width="200" setImgPath={imgPath} />
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
							selectData.repairFiles
								.filter((file) => file.repairType === '보수후')
								.map((file, index) => {
									return (
										<img
											key={index}
											src={file.fileURL}
											width="100%"
											alt="After Repair"
										/>
									);
								})
						) : (
							<FormGroup>
								<Form.Label htmlFor="maintainAfter">
									{afterPath ? (
										<img width="200" src={afterPath} />
									) : (
										<img width="200" setafterPath={afterPath} />
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
							<Button variant="primary" onClick={saveImages}>
								저장
							</Button>
							<Button variant="secondary" onClick={handleEditToggle}>
								취소
							</Button>
						</>
					) : (
						<Button variant="secondary" onClick={handleEditToggle}>
							수정
						</Button>
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
