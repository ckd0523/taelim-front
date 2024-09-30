import { Row, Button, Col } from 'react-bootstrap';

const AssetButtons = ({ handleButtonClick, handleQrClick, handleExcelClick, rowSelect }) => {
	return (
		<Row className="row-cols-auto justify-content-end">
			<Col>
				<Button
					className="btn btn-secondary"
					onClick={() => handleButtonClick('AllUpdate', rowSelect)}
				>
					일괄수정
				</Button>
			</Col>
			<Col>
				<Button
					className="btn btn-danger"
					onClick={() => handleButtonClick('AllDispose', rowSelect)}
				>
					일괄 폐기
				</Button>
			</Col>
			<Col>
				<Button
					className="btn btn-secondary"
					onClick={() => handleButtonClick('AllUpdateDemand', rowSelect)}
				>
					일괄수정요청
				</Button>
			</Col>
			<Col>
				<Button
					className="btn btn-danger"
					onClick={() => handleButtonClick('AllDisposeDemand', rowSelect)}
				>
					일괄 폐기요청
				</Button>
			</Col>
			<Col>
				<Button className="btn btn-info" onClick={handleQrClick}>
					QR출력
				</Button>
			</Col>
			<Col>
				<Button className="btn btn-success" onClick={handleExcelClick}>
					엑셀 출력
				</Button>
			</Col>
		</Row>
	);
};

export { AssetButtons };
