import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

const QuickAccess = ({ quickAccessFiles }) => {
	// location 속성이 있는 파일만 필터링
	const filesWithLocation = quickAccessFiles.filter((file) => file.location);

	return (
		<div className="mt-3">
			{/* location 속성이 있는 파일이 있는지 체크 */}
			{filesWithLocation.length > 0 ? (
				<Row className="mx-n1 g-0">
					{filesWithLocation.map((f, index) => {
						return (
							<Col key={index.toString()} xxl={3} lg={6}>
								<Card className="m-1 shadow-none border">
									<div className="p-2">
										<Row>
											<Col className="col-auto">
												<div className="avatar-sm">
													<span className="avatar-title bg-light text-secondary rounded">
														<i className={f.icon}></i>
													</span>
												</div>
											</Col>
											<Col className="ps-0">
												<Link
													to={f.location}
													className="text-muted fw-bold"
												>
													{f.name}
												</Link>
												<p className="mb-0 font-13">{f.size}</p>
											</Col>
										</Row>
									</div>
								</Card>
							</Col>
						);
					})}
				</Row>
			) : (
				<div
					style={{
						width: '100%',
						height: 'auto',
						backgroundColor: '#f0f0f0',
						border: '1px dashed #ccc',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						color: '#aaa',
						padding: '10px',
						marginTop: '10px',
					}}
				>
					<span>파일이 없습니다</span>
				</div>
			)}
		</div>
	);
};

export default QuickAccess;
