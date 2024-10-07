import { Row, Button, Col } from 'react-bootstrap';

const AssetButtons = ({ onClick }) => {
	return (
		<Row className="row-cols-auto justify-content-end">
			<Col>
				<Button className="btn btn-secondary" onClick={onClick}>
					일괄수정
				</Button>
			</Col>
			<Col>
				<Button className="btn btn-danger">일괄 폐기</Button>
			</Col>
			<Col>
				<Button className="btn btn-info">QR출력</Button>
			</Col>
			<Col>
				<Button className="btn btn-success">엑셀 출력</Button>
			</Col>
		</Row>
	);
};

export { AssetButtons };
