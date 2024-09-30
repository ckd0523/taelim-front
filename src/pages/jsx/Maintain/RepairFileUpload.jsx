import { Form } from 'react-bootstrap';
import { BsImage } from 'react-icons/bs';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
const RepairFileUpload = ({ files = [], setFiles, formData, handleFileUplaod }) => {
	handleFileUplaod = (file, repairType) => {
		const updateFiles = [...files, { file, repairType }];
		setFiles(updateFiles);
	};
	console.log(formData);

	const previewImage = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();

		reader.onloadend = () => {
			setImgPath(reader.result);
			handleFileUplaod(file, 'BEFORE_REPAIR');
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
			handleFileUplaod(file, 'AFTER_REPAIR');
		};
		reader.readAsDataURL(file);
	};

	useEffect(
		() => () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);
	const [imgPath, setImgPath] = useState();
	const [AfterPath, setAfterPath] = useState();
	const imgRef = useRef();
	const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 2;

	return (
		<div>
			<Form.Group>
				<p>유지보수 전 사진</p>
				<Form.Label htmlFor="maintainBefore">
					{imgPath ? <img width="200" src={imgPath} /> : <BsImage size={120} />}
				</Form.Label>
				<Form.Control
					hidden
					ref={imgRef}
					type="file"
					id="maintainBefore"
					accept="image/*"
					onChange={previewImage}
				></Form.Control>
				<p>유지보수 후 사진</p>
				<Form.Label htmlFor="maintainAfter">
					{AfterPath ? <img width="200" src={AfterPath} /> : <BsImage size={120} />}
				</Form.Label>
				<Form.Control
					hidden
					ref={imgRef}
					type="file"
					id="maintainAfter"
					accept="image/*"
					onChange={AfterImage}
				></Form.Control>
			</Form.Group>
		</div>
	);
};

export default RepairFileUpload;
