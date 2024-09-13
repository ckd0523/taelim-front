import { Row, Col, Card, Form, FormGroup, Button } from 'react-bootstrap';
import { CustomDatePicker, Table } from '@/components';
import { records as data } from '@/pages/jsx/MaintainHistory/data';
import { MaintainDetail } from '@/pages/jsx/MaintainHistory/MaintainDetail';
import { useState } from 'react';
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
			<Row>
				<Col style={{ paddingTop: 100, paddingLeft: 100, paddingRight: 100 }}>
					<Card>
						<Card.Body>
							<Form>
								<Row className="g-0">
									<Col sm={2}>
										<Form.Group as={Row}>
											<Form.Label htmlFor="assetName" column sm={2}>
												자산명
											</Form.Label>
											<Col sm={5}>
												<Form.Control
													type="text"
													name="자산명"
													id="assetName"
												/>
											</Col>
										</Form.Group>
									</Col>

									<Col sm={3}>
										<Form.Group as={Row}>
											<Form.Label htmlFor="assetCode" column sm={2}>
												자산코드
											</Form.Label>
											<Col sm={5}>
												<Form.Control
													type="text"
													name="자산코드"
													id="assetCode"
												/>
											</Col>
										</Form.Group>
									</Col>

									<Col sm={3}>
										<Form.Group as={Row}>
											<Form.Label htmlFor="maintainBy" column sm={2}>
												유지보수자
											</Form.Label>
											<Col sm={5}>
												<Form.Control
													type="text"
													name="유지보수자"
													id="maintainBy"
												/>
											</Col>
										</Form.Group>
									</Col>

									<Col sm={3}>
										<Form.Group as={Row} className="align-items-center">
											<Form.Label column sm={3}>
												유지보수 일자
											</Form.Label>
											<Col sm={4}>
												{/* <Form.Control
													type="date"
													name="유지보수일자"
													id="startDate"
												/> */}
												<CustomDatePicker
													type="date"
													dateFormat="yyyy-MM-dd"
													name="endDate"
													hideAddon={true}
												/>
											</Col>
											<Col sm={1} className="text-center">
												~
											</Col>
											<Col sm={4}>
												{/* <Form.Control
													type="date"
													name="유지보수일자"
													id="endDate"
												/> */}
												<CustomDatePicker
													type="date"
													dateFormat="yyyy-MM-dd"
													name="endDate"
													hideAddon={true}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col style={{ paddingLeft: 20 }}>
										<Button>검색</Button>
									</Col>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col style={{ padding: 100 }}>
					<h4 className="header-title text-center">유지보수 이력</h4>
					<Card>
						<Card.Body>
							<Table
								theadClass="table-light"
								className="table-centered mb-0"
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
