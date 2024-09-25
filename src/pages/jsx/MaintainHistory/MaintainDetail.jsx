import { useRef } from 'react';
import { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Input } from 'react-bootstrap-typeahead';
import { BsImage } from 'react-icons/bs';
const MaintainDetail = ({ show, selectData, handleClose }) => {
	const [formData, setFormData] = useState();
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
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
					<Form>
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
								<Form.Control
									type="text"
									value={selectData.repairEndDate}
									readOnly
								/>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>유지보수 내용</Form.Label>
							<Form.Control
								as="textarea"
								value={selectData.repairResult}
								rows={3}
								readOnly
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export { MaintainDetail };
