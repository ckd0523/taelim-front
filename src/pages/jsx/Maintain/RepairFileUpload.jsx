import { Form } from 'react-bootstrap';
import { BsImage } from 'react-icons/bs';
import { Input } from 'react-bootstrap-typeahead';
import { useState, useRef } from 'react';
const RepairFileUpload = () => {
	const [imgFile, setImgFile] = useState();

	const [afterImg, setAfterImg] = useState();
	const [imgPath, setImgPath] = useState();
	const [AfterPath, setAfterPath] = useState();
	const imgRef = useRef();
	const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 2;

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
	return (
		<Form>
			<Form.Group>
				<p>유지보수 전 사진</p>
				<Form.Label htmlFor="maintainBefore">
					{imgPath ? <img width="200" src={imgPath} /> : <BsImage size={120} />}
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
					{AfterPath ? <img width="200" src={AfterPath} /> : <BsImage size={120} />}
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
	);
};

export default RepairFileUpload;
