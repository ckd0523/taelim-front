import { Row, Col, Card } from 'react-bootstrap';
import Stocks from './Stocks';

// images
import productImg1 from '@/assets/images/products/product-5.jpg';

const ProductDetailsEcom = () => {
	return (
		<>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Row>
								<Col lg={12}>
									<Stocks />
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
