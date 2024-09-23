import { Row, Button, Col } from 'react-bootstrap';

const DeleteButton = ({ onClick }) => {
	return (
		<Row className="row-cols-auto justify-content-end">
			<Col>
				<Button className="btn btn-success" onClick={onClick}>
					엑셀 출력
				</Button>
			</Col>
		</Row>
	);
};

export { DeleteButton };
