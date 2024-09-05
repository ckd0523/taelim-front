import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Stocks from './Stocks';

// images
import productImg1 from '@/assets/images/products/product-5.jpg';
import Tabs from './Tab';

const ProductDetailsEcom = () => {
	return (
		<>
			<PageBreadcrumb title="QR 조회 화면" subName="E-Commerce" />

			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Row>
								<Col lg={3}>
									<img
										src={productImg1}
										className="img-fluid"
										alt="Product-img"
									/>
								</Col>
								<Col lg={9}>
									<Stocks />
								</Col>
							</Row>
							<Row>
								<Tabs />
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export { ProductDetailsEcom };
