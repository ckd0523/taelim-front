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
		repairStatus: '',
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

		formData.repairStatus = '진행중';

		// const updatedFormData = {
		// 	...formData,
		// 	repairStatus: newStatus,
		// };
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
					// repairFiles: [...prevState.fileName, ...uploadedFileNames], // Properly set the file name state
					repairFiles: uploadedFileNames,
					// repairStatus: prevState.repairStatus,
				}));

				const hasBeforeRepair = formData.repairFiles?.some(
					(file) => file.repairType === '보수전'
				);
				const hasAfterRepair = formData.repairFiles?.some(
					(file) => file.repairType === '보수후'
				);
				if (
					formData.repairStartDate &&
					formData.repairEndDate &&
					formData.repairResult
					// hasBeforeRepair &&
					// hasAfterRepair
				) {
					formData.repairStatus = '완료';
					setFormData((prevState) => ({
						...prevState,
						repairStatus: '완료',
					}));
				}
				console.log('repairStatus', formData.repairStatus);
				console.log('uploadFile1: ' + formData.repairFiles);

				// }

				alert('유지보수가 성공적으로 등록되었습니다.');
				handleClose();
				window.location.replace('/jsx/MaintainHist');
			} else {
				alert('유지보수 등록 실패하였습니다.');
			}
		} catch (error) {
			console.error('에러발생 : ', error);
			alert('유지보수 등록 중 에러가 발생하였습니다.');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));

		console.log('name: ', name);
		console.log('value: ', value);

		if (name === 'repairEndDate') {
			const startDate = new Date(formData.repairStartDate);
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
								value={formData.repairEndDate || ''}
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
