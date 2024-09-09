import { Row, Col, Tab, Nav, Table } from 'react-bootstrap'; // Table 컴포넌트를 추가로 임포트합니다.
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const Tabs = () => {
	const tabContents = [
		{
			id: '1',
			title: '수정내역',
			tableData: [
				{ id: 1, name: 'Item 1', description: 'Description 1' },
				{ id: 2, name: 'Item 2', description: 'Description 2' },
			],
		},
		{
			id: '2',
			title: '유지보수이력',
			tableData: [
				{ id: 1, name: 'Item 3', description: 'Description 3' },
				{ id: 2, name: 'Item 4', description: 'Description 4' },
			],
		},
		{
			id: '3',
			title: '자산조사이력',
			tableData: [
				{ id: 1, name: 'Item 5', description: 'Description 5' },
				{ id: 2, name: 'Item 6', description: 'Description 6' },
			],
		},
	];

	return (
		<>
			<Tab.Container defaultActiveKey="Profile">
				<Nav variant="tabs">
					{tabContents.map((tab, index) => {
						return (
							<Nav.Item key={index.toString()}>
								<Nav.Link as={Link} to="" eventKey={tab.title}>
									<i
										className={classnames(
											// icon 관련 코드를 제거하거나 추가 필요
											'd-md-none',
											'd-block',
											'me-1'
										)}
									></i>
									<span className="d-none d-md-block">{tab.title}</span>
								</Nav.Link>
							</Nav.Item>
						);
					})}
				</Nav>

				<Tab.Content>
					{tabContents.map((tab, index) => {
						return (
							<Tab.Pane eventKey={tab.title} id={tab.id} key={index.toString()}>
								<Row>
									<Col sm="12">
										<p className="mt-3">{tab.text}</p>
										{/* 테이블 추가 부분 */}
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>ID</th>
													<th>Name</th>
													<th>Description</th>
												</tr>
											</thead>
											<tbody>
												{tab.tableData &&
													tab.tableData.map((item) => (
														<tr key={item.id}>
															<td>{item.id}</td>
															<td>{item.name}</td>
															<td>{item.description}</td>
														</tr>
													))}
											</tbody>
										</Table>
									</Col>
								</Row>
							</Tab.Pane>
						);
					})}
				</Tab.Content>
			</Tab.Container>
		</>
	);
};
export default Tabs;
