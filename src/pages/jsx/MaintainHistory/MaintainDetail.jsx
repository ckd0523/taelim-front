import { Form, Modal } from 'react-bootstrap';
import { Input } from 'react-bootstrap-typeahead';
import { BsImage } from 'react-icons/bs';
const MaintainDetail = ({ show, selectData, handleClose }) => {
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>유지보수 상세</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>자산코드</Form.Label>
							<Form.Control type="text" value={selectData.assetCode} readOnly />
							<Form.Label>유지보수 담당자</Form.Label>
							<Form.Control type="text" value={selectData.maintainBy} readOnly />
							<Form.Label>시작일</Form.Label>
							<Form.Control type="text" value={selectData.startDay} readOnly />
							<Form.Label>완료일</Form.Label>
							<Form.Control type="date" value={selectData.endDay} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>유지보수 내용</Form.Label>
							<Form.Control
								as="textarea"
								value={selectData.maintainContent}
								rows={3}
							/>
						</Form.Group>
						<Form.Group>
							<p>유지보수 전 사진</p>
							<Form.Label htmlFor="maintainBefore">
								{/* {imgPath ? (
                                    <img width="200" src={imgPath} />
                                ) : (
                                    <BsImage size={120} />
                                )} */}
								<BsImage size={120} />
							</Form.Label>
							<Input
								hidden
								// ref={imgRef}
								type="file"
								id="maintainBefore"
								accept="image/*"
								// onChange={previewImage}
							></Input>
						</Form.Group>
						<Form.Group>
							<p>유지보수 후 사진</p>
							<Form.Label htmlFor="maintainAfter">
								{/* {AfterPath ? (
                                    <img width="200" src={AfterPath} />
                                ) : (
                                    <BsImage size={120} />
                                )} */}
								<BsImage size={120} />
							</Form.Label>
							<Input
								hidden
								// ref={imgRef}
								type="file"
								id="maintainAfter"
								accept="image/*"
								// onChange={AfterImage}
							></Input>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export { MaintainDetail };
