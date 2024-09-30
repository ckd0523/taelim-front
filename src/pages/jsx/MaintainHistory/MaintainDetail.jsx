import { useState, useRef, useEffect } from 'react';
import { Form, FormGroup, Modal, Button } from 'react-bootstrap';
import { BsImage } from 'react-icons/bs';
const urlConfig = import.meta.env.VITE_BASIC_URL;
const MaintainDetail = ({ show, selectData, handleClose }) => {
	const [change, setChange] = useState();
	const [imgPath, setImgPath] = useState();
	const [AfterPath, setAfterPath] = useState();
	const [files, setFiles] = useState([]);
	const imgRef = useRef();
	const afterImgRef = useRef();
	const [repairFiles, setRepairFiles] = useState(selectData.repairFiles || []);

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
			setAfterPath(reader.result);
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
		const uploadData = new FormData();
		if (imgPath) {
			uploadData.append('repairNo', selectData.repairNo);
			uploadData.append('file', imgRef.current.files[0]);
			uploadData.append('repairType', 'BEFORE_REPAIR');
		}
		if (afterImgRef) {
			uploadData.append('repairNo', selectData.repairNo);
			uploadData.append('file', afterImgRef.current.files[0]);
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
				alert('이미지 업로드 실패');
			}
		} catch (error) {
			console.error(error);
		}
		console.log(uploadData);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setChange((prevState) => ({
			...prevState,
			[name]: value,
		}));
		console.log('name: ', name);
		console.log('value: ', value);
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
						<Form.Control type="text" value={selectData.repairStartDate} readOnly />
						<Form.Label className="pt-2">완료일</Form.Label>
						{selectData.repairEndDate === null ? (
							<Form.Control
								type="date"
								name="repairEndDate"
								value={selectData.repairEndDate}
								onChange={handleChange}
							/>
						) : (
							<Form.Control type="text" value={selectData.repairEndDate} readOnly />
						)}
						<Form.Label>유지보수 내용</Form.Label>
						<Form.Control
							as="textarea"
							value={selectData.repairResult}
							rows={3}
							readOnly
						/>
						<Form.Label className="pt-2">유지보수 사진</Form.Label>
						<p>유지보수 전 사진</p>
						{selectData.repairFiles.length > 0 ? (
							<img
								src={selectData.repairFiles[0].fileURL}
								// alt={`유지보수 이미지 ${index}`}
								width="100%"
								className="mb-3"
								id="BEFORE_REPAIR"
							/>
						) : (
							<>
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
								<Button>저장</Button>
							</>
						)}
						<p>유지보수 후 사진</p>
						{selectData.repairFiles.length > 1 ? (
							<img
								src={selectData.repairFiles[1].fileURL}
								width="100%"
								className="mb-3"
							/>
						) : (
							<>
								<FormGroup>
									<Form.Label htmlFor="maintainAfter">
										{AfterPath ? (
											<img width="200" src={AfterPath} />
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
									<Button onClick={saveImages}>저장</Button>
								</FormGroup>
								{/* <RepairFileUpload
									files={files}
									setFiles={setFiles}
									handleFileUplaod={handleFileUpload}
								/> */}
							</>
						)}
					</Form.Group>
				</Modal.Body>
			</Modal>
		</>
	);
};

export { MaintainDetail };
