import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { CustomDatePicker, Table } from '@/components';
import { records as data } from '@/pages/jsx/MaintainHistory/data';
import { MaintainDetail } from '@/pages/jsx/MaintainHistory/MaintainDetail';
import { useState } from 'react';

import './Media.css';
const columns = [
	{
		Header: '번호',
		accessor: 'id',
		defaultCanSort: true,
	},
	{
		Header: '자산코드',
		accessor: 'assetCode',
		defaultCanSort: true,
	},
	{
		Header: '자산명',
		accessor: 'assetName',
		defaultCanSort: true,
	},
	{
		Header: '유지보수일자',
		accessor: 'maintainDate',
		defaultCanSort: true,
	},
	{
		Header: '유지보수자',
		accessor: 'maintainBy',
		defaultCanSort: true,
	},
	{
		Header: '상태',
		accessor: 'maintainStatus',
		defaultCanSort: true,
	},
];

const sizePerPageList = [
	{
		text: '5',
		value: 5,
	},
	{
		text: '10',
		value: 10,
	},
];

const MaintainHist = () => {
	const [show, setShow] = useState(false);
	const [selectData, setSelectData] = useState();

	const handleClick = (rowdata) => {
		setSelectData(rowdata);
		setShow(true);
	};
	const handleClose = () => setShow(false);
	return (
		<>
			<Row className="px-3 pt-5 justify-content-center d-flex align-items-center">
				<Col className=" d-flex justify-content-center align-items-center">
					<Card className="card ">
						<Card.Body className="card-body ">
							<Form className="col-md-12 justify-content-center d-flex align-items-center">
								<Row className="justify-content-center col-md-12 d-flex align-items-center">
									<Col xs={12} md={4} lg={2}>
										<Form.Group
											as={Row}
											className="d-flex justify-content-center align-items-center "
										>
											<Form.Label
												htmlFor="assetName"
												column
												xs={12}
												md={12}
												lg={3}
											>
												자산명
											</Form.Label>
											<Col xs={12} md={12} lg={5}>
												<Form.Control
													type="text"
													name="자산명"
													id="assetName"
												/>
											</Col>
										</Form.Group>
									</Col>

									<Col xs={12} md={6} lg={3}>
										<Form.Group
											as={Row}
											className="d-flex justify-content-center align-items-center"
										>
											<Form.Label
												htmlFor="assetCode"
												column
												xs={12}
												md={12}
												lg={2}
											>
												자산코드
											</Form.Label>
											<Col xs={12} md={12} lg={5}>
												<Form.Control
													type="text"
													name="자산코드"
													id="assetCode"
												/>
											</Col>
										</Form.Group>
									</Col>

									<Col xs={12} md={6} lg={3}>
										<Form.Group
											as={Row}
											className="d-flex justify-content-center align-items-center"
										>
											<Form.Label
												htmlFor="maintainBy"
												column
												xs={12}
												md={7}
												lg={3}
											>
												유지보수자
											</Form.Label>
											<Col xs={12} md={7} lg={5}>
												<Form.Control
													type="text"
													name="유지보수자"
													id="maintainBy"
												/>
											</Col>
										</Form.Group>
									</Col>

									<Col
										column
										xs={12}
										md={6}
										lg={3}
										className="d-flex justify-content-center align-items-center"
									>
										<Form.Group
											as={Row}
											className="d-flex justify-content-center  align-items-center"
										>
											<Form.Label column xs={12} md={11} lg={3}>
												유지보수 일자
											</Form.Label>
											<Col xs={5} md={5} lg={4}>
												<CustomDatePicker
													type="date"
													dateFormat="yyyy-MM-dd"
													name="endDate"
													hideAddon={true}
												/>
											</Col>
											<Col xs={1} md={1} lg={1} className="text-center">
												~
											</Col>
											<Col xs={5} md={5} lg={4}>
												<CustomDatePicker
													type="date"
													dateFormat="yyyy-MM-dd"
													name="endDate"
													hideAddon={true}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col className="px-2 d-flex justify-content-center ">
										<Button>검색</Button>
									</Col>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className="justify-content-center align-items-center">
				{/* <h4 className="header-title text-center">유지보수 이력</h4> */}
				<Col className="pt-5 d-flex justify-content-center align-items-center">
					<Card>
						<Card.Body>
							<Table
								theadClass="table-light"
								sizePerPageList={sizePerPageList}
								columns={columns}
								data={data}
								isSortable={true}
								pagination={true}
								pageSize={5}
								onRowClick={handleClick}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{selectData && (
				<MaintainDetail show={show} handleClose={handleClose} selectData={selectData} />
			)}
		</>
	);
};

export { MaintainHist };
