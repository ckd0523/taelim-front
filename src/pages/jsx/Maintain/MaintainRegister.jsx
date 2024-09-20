import { Button, Form, Modal } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { BsImage } from 'react-icons/bs';
import { Input } from 'react-bootstrap-typeahead';

const urlConfig = import.meta.env.VITE_BASIC_URL;
const MaintainRegister = () => {
	const [show, setShow] = useState(false);

	const [imgFile, setImgFile] = useState();

	const [file, files] = useState([]);
	const [afterImg, setAfterImg] = useState();
	const [imgPath, setImgPath] = useState();
	const [AfterPath, setAfterPath] = useState();
	const imgRef = useRef();
	const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 2;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const previewImage = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		if (e.target.files) {
			reader.readAsDataURL(e.target.files[0]);
			setImgFile(e.target.files[0]);
		}

		reader.onloadend = () => {
			setImgPath(reader.result);
		};

		console.log(reader);
	};
	const AfterImage = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		if (e.target.files) {
			reader.readAsDataURL(e.target.files[0]);
			setAfterImg(e.target.files[0]);
		}

		reader.onloadend = () => {
			setAfterPath(reader.result);
		};
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

			if (maintainResponse.ok) {
				const assetNo = await maintainResponse.text();
				alert('유지보수가 성공적으로 등록');

				if (files.length > 0) {
					for (let { file, fileType } of files) {
						const fileFormData = new FormData();
						fileFormData.append('assetNo', assetNo);
						fileFormData.append('file', file[0]);
						fileFormData.append('fileType', fileType);
						// console.log(fileFormData.assetNo);
						console.log('fileFormData:', fileFormData.get('file'));
						console.log('assetNo:', fileFormData.get('assetNo'));
						console.log('fileType:', fileFormData.get('fileType'));

						const fileResponse = await fetch(
							'http://localhost:8080/asset/file/upload',
							{
								method: 'POST',
								body: fileFormData,
							}
						);

						if (fileResponse.ok) {
							alert('파일이 성공적으로 업로드됨');
						} else {
							alert('파일 업로드 실패');
						}
					}
				}
			} else {
				alert('자산 등록 실패');
			}
		} catch (error) {
			console.error('에러발생 : ', error);
			alert('자산 등록 중 에러가 발생');
		}
	};
	return (
		<div>
			<Button variant="primary" onClick={handleShow}>
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
							<Form.Control type="text" readOnly />
							<Form.Label>유지보수 담당자</Form.Label>
							<Form.Control type="text" readOnly />
							<Form.Label>시작일</Form.Label>
							<Form.Control type="text" readOnly />
							<Form.Label>완료일</Form.Label>
							<Form.Control type="date" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>유지보수 내용</Form.Label>
							<Form.Control as="textarea" rows={3} />
						</Form.Group>
						<Form.Group>
							<p>유지보수 전 사진</p>
							<Form.Label htmlFor="maintainBefore">
								{imgPath ? (
									<img width="200" src={imgPath} />
								) : (
									<BsImage size={120} />
								)}
							</Form.Label>
							<Input
								hidden
								ref={imgRef}
								type="file"
								id="maintainBefore"
								accept="image/*"
								onChange={previewImage}
							></Input>
						</Form.Group>
						<Form.Group>
							<p>유지보수 후 사진</p>
							<Form.Label htmlFor="maintainAfter">
								{AfterPath ? (
									<img width="200" src={AfterPath} />
								) : (
									<BsImage size={120} />
								)}
							</Form.Label>
							<Input
								hidden
								ref={imgRef}
								type="file"
								id="maintainAfter"
								accept="image/*"
								onChange={AfterImage}
							></Input>
						</Form.Group>
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
		</div>
	);
};

export { MaintainRegister };
