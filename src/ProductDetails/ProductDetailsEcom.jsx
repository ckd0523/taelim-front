import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import PageBreadcrumb from '../components/PageBreadcrumb';
import Stocks from './Stocks';

// images
import productImg1 from '@/assets/images/products/product-5.jpg';

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
									<Link to="" className="text-center d-block mb-4">
										<img
											src={productImg1}
											className="img-fluid"
											alt="Product-img"
										/>
									</Link>
								</Col>
								<Col lg={9}>
									<Stocks />
									<Stocks />
									<Stocks />
								</Col>
							</Row>
							<Row>
								<Col lg={3}></Col>
								<Col lg={9}>
									<Stocks />
									<Stocks />
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
