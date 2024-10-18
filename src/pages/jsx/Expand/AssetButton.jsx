import { Row, Button, Col } from 'react-bootstrap';

const AssetButtons = ({ handleButtonClick, handleQrClick, handleExcelClick, rowSelect }) => {
	return (
		<Row className="row-cols-auto justify-content-end">
			<Col>
				<Button
					style={{ background: '#5e83bb' }}
					onClick={() => handleButtonClick('AllUpdate', rowSelect)}
				>
					일괄수정
				</Button>
			</Col>
			<Col>
				<Button
					style={{ background: '#c66464' }}
					variant="danger"
					onClick={() => handleButtonClick('AllDispose', rowSelect)}
				>
					일괄 폐기
				</Button>
			</Col>
			<Col>
				<Button
					style={{ background: '#5e83bb' }}
					onClick={() => handleButtonClick('AllUpdateDemand', rowSelect)}
				>
					일괄 수정요청
				</Button>
			</Col>
			<Col>
				<Button
					style={{ background: '#c66464' }}
					variant="danger"
					onClick={() => handleButtonClick('AllDisposeDemand', rowSelect)}
				>
					일괄 폐기요청
				</Button>
			</Col>
			<Col>
				<Button variant="dark" onClick={() => handleQrClick(rowSelect)}>
					QR출력
				</Button>
			</Col>
			<Col>
				<Button
					style={{ background: '#73af82' }}
					variant="success"
					onClick={handleExcelClick}
				>
					엑셀 출력
				</Button>
			</Col>
		</Row>
	);
};

export { AssetButtons };
