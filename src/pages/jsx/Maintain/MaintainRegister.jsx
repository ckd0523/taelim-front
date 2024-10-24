import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';
import RepairFileUpload from '@/pages/jsx/Maintain/RepairFileUpload';
import api from '@/common/api/authAxios';
import { useAuthContext } from '@/common';

const urlConfig = import.meta.env.VITE_BASIC_URL;
const MaintainRegister = ({ assetCode, assetNo }) => {
	const { user } = useAuthContext();
	const [files, setFiles] = useState([]);
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({
		assetNo: assetNo,
		assetCode: assetCode,
		repairStartDate: new Date().toISOString().slice(0, 10),
		repairEndDate: '',
		repairBy: user.id,
		repairResult: '',
		repairStatus: '',
		repairFiles: [],
	});
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

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

			const fileResponse = await api.post('/maintain/file/upload', fileFormData);

			if (fileResponse.status == 200) {
				const fileName = await fileResponse.data;
				uploadFileNames.push(fileName);
				console.log(fileName);
			} else {
				Swal.fire({
					icon: 'error',
					title: '파일 등록에 실패하였습니다.',
					text: '다시 업로드 시도해주세요',
				});
			}
		}

		return uploadFileNames;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		// };
		try {
			const maintainResponse = await api.post('/maintain/register', formData);
			console.log('assetNo : ', assetNo);
			console.log('assetCode: ', assetCode);

			if (maintainResponse.status == 200) {
				const repairNo = await maintainResponse.data;
				console.log('repairNo : ', repairNo);

				// if (files.length > 0) {
				const uploadedFileNames = await handleFileUpload(repairNo);

				setFormData((prevState) => ({
					...prevState,
					repairFiles: uploadedFileNames,
				}));

				console.log('uploadFile1: ' + formData.repairFiles);

				// }

				Swal.fire({
					icon: 'success',
					title: '유지보수가 성공적으로 등록되었습니다.',
					text: '유지보수이력 화면으로 이동',
				});
				handleClose();
				setTimeout(() => {
					window.location.replace('/jsx/MaintainHist');
				}, 1000);
			} else {
				Swal.fire({
					icon: 'error',
					title: '유지보수 등록을 실패하였습니다.',
					text: '항목을 다시 확인해주세요.',
				});
			}
		} catch (error) {
			console.error('에러발생 : ', error);
			Swal.fire({
				icon: 'error',
				title: '에러가 발생하였습니다.',
				text: error,
			});
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
		setShowAlert(false);
		if (name === 'repairEndDate') {
			const startDate = new Date(formData.repairStartDate);
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
	return (
		<>
			<Button
				style={{ background: '#73af82', border: 'none' }}
				variant="success"
				onClick={handleShow}
				className="me-2"
			>
				유지보수등록
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>유지보수 등록</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{showAlert && <Alert variant="danger">{alertMessage}</Alert>}
					<Form>
						<Form.Group controlId="exampleForm.ControlInput1">
							<Form.Label>자산코드</Form.Label>
							<Form.Control
								className="mb-2"
								value={formData.assetCode}
								type="text"
								readOnly
							/>
							<Form.Label>유지보수 담당자</Form.Label>
							<Form.Control className="mb-2" value={user.name} type="text" readOnly />
							<Form.Label>시작일</Form.Label>
							<Form.Control
								className="mb-2"
								name="repairStartDate"
								value={formData.repairStartDate || ''}
								onChange={handleChange}
								type="date"
							/>
							<Form.Label>완료일</Form.Label>
							<Form.Control
								className="mb-2"
								name="repairEndDate"
								value={formData.repairEndDate || ''}
								onChange={handleChange}
								type="date"
							/>
						</Form.Group>
						<Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
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
					<Button
						style={{ background: '#5e83bb', border: 'none' }}
						onClick={handleSubmit}
					>
						등록
					</Button>
					<Button variant="secondary" onClick={handleClose}>
						취소
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export { MaintainRegister };
