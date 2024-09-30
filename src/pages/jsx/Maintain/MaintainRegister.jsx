import { Button, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import RepairFileUpload from '@/pages/jsx/Maintain/RepairFileUpload';

const urlConfig = import.meta.env.VITE_BASIC_URL;
const MaintainRegister = ({ assetCode, assetNo }) => {
	const [files, setFiles] = useState([]);
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({
		assetNo: assetNo,
		assetCode: assetCode,
		repairStartDate: new Date().toISOString().slice(0, 10),
		repairEndDate: '',
		repairBy: '',
		repairResult: '',
		repairFiles: [],
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleFileUpload = async (repairNo) => {
		const uploadFileNames = [];
		for (let { file, repairType } of files) {
			const fileFormData = new FormData();
			fileFormData.append('repairNo', repairNo);
			fileFormData.append('file', file);
			fileFormData.append('repairType', repairType);

			console.log('repairNo: ', fileFormData.get('repairNo'));
			console.log('fileFormData: ', fileFormData.get('file'));
			console.log('repairType: ', fileFormData.get('repairType'));

			const fileResponse = await fetch(`${urlConfig}/maintain/file/upload`, {
				method: 'POST',
				body: fileFormData,
			});

			if (fileResponse.ok) {
				const fileName = await fileResponse.text();
				uploadFileNames.push(fileName);
				console.log(fileName);
				alert('파일이 성공적으로 업로드 됨');
			} else {
				alert('파일 업로드 실패');
			}
		}

		// setFormData((prevState) => ({
		// 	...prevState,
		// 	repairFiles: [...prevState.fileName, ...uploadFileNames],
		// }));
		return uploadFileNames;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const maintainResponse = await fetch(`${urlConfig}/maintain/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			console.log('assetNo : ', assetNo);
			console.log('assetCode: ', assetCode);

			if (maintainResponse.ok) {
				const repairNo = await maintainResponse.text();
				console.log('repairNo : ', repairNo);

				// if (files.length > 0) {
				const uploadedFileNames = await handleFileUpload(repairNo);
				setFormData((prevState) => ({
					...prevState,
					repairFiles: [...prevState.fileName, ...uploadedFileNames], // Properly set the file name state
				}));

				console.log('uploadFile1: ' + formData.repairFiles);
				alert('파일이 성공적으로 등록');
				// }

				handleClose();
				window.location.reload();
			} else {
				alert('유지보수 등록 실패');
			}
		} catch (error) {
			console.error('에러발생 : ', error);
			alert('유지보수 등록 중 에러가 발생');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
		// console.log('name: ', name);
		// console.log('value: ', value);
	};
	return (
		<>
			<Button variant="secondary" onClick={handleShow} className="me-2">
				유지보수등록
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>유지보수 등록</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>자산코드</Form.Label>
							<Form.Control value={formData.assetCode} type="text" readOnly />
							<Form.Label>유지보수 담당자</Form.Label>
							<Form.Control value={formData.repairBy} type="text" readOnly />
							<Form.Label>시작일</Form.Label>
							<Form.Control
								name="repairStartDate"
								value={formData.repairStartDate}
								type="text"
								readOnly
							/>
							<Form.Label>완료일</Form.Label>
							<Form.Control
								name="repairEndDate"
								value={formData.repairEndDate}
								onChange={handleChange}
								type="date"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>유지보수 내용</Form.Label>
							<Form.Control
								name="repairResult"
								value={formData.repairResult}
								as="textarea"
								rows={3}
								onChange={handleChange}
							/>
						</Form.Group>
						<RepairFileUpload
							files={files}
							setFiles={setFiles}
							value={formData.repairFiles}
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleSubmit}>
						등록
					</Button>
					<Button variant="primary" onClick={handleClose}>
						취소
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export { MaintainRegister };
