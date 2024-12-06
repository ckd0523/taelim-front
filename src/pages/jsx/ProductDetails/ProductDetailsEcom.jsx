import { Row, Col, Card } from 'react-bootstrap';
import Stocks from './Stocks';
import Test from './Test';

const ProductDetailsEcom = () => {
	return (
		<>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Row>
								<Col lg={12}>
									<Test />
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export { ProductDetailsEcom };
