import { Row, Col, Form, Button } from 'react-bootstrap';
import { CustomDatePicker } from '@/components';
import { Table3 } from '@/components/table/Table3';
import { MaintainDetail } from '@/pages/jsx/MaintainHistory/MaintainDetail';
import { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 767px) {
		width: 100%;
		margin: 0 auto;
		display: flex;
		font-size: 80%;
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		width: 100%;
		margin: 0 auto;
		display: flex;
	}

	@media (min-width: 1024px) {
		width: 100%;
		margin: 0 auto;
		display: flex;
	}
`;
const StyledCardBody = styled.div`
	flex-grow: 1;
	flex-direction: column;
	justify-content: space-between;
`;
const columns = [
	{
		Header: '번호',
		accessor: 'repairNo',
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
		Header: '시작일자',
		accessor: 'repairStartDate',
		defaultCanSort: true,
	},
	{
		Header: '종료일자',
		accessor: 'repairEndDate',
		defaultCanSort: true,
	},
	{
		Header: '유지보수자',
		accessor: 'repairBy',
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
const urlConfig = import.meta.env.VITE_BASIC_URL;
const MaintainHist = () => {
	const [show, setShow] = useState(false);
	const [selectData, setSelectData] = useState();
	const [data, setData] = useState([]);

	const handleClick = (rowdata) => {
		setSelectData(rowdata);
		setShow(true);
	};
	const handleClose = () => setShow(false);

	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			// redirect: 'follow',
		};
		fetch(`${urlConfig}/maintain/get`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (Array.isArray(result)) {
					console.log(result);
					setData(result);
				} else {
					console.error('error');
					setData([]);
				}
			})
			.catch((error) => console.log('error', error));
	}, []);
	return (
		<>
			<Row className="px-3 pt-5">
				<Col className="d-flex justify-content-center">
					<StyledCard className="px-3 card">
						<StyledCardBody className="card-body ">
							<Form>
								<Row className="align-items-center">
									<Col xs={12} md={4} lg={2}>
										<Form.Group as={Row}>
											<Form.Label htmlFor="assetName" xs={12} md={12} lg={10}>
												자산명
											</Form.Label>
											<Col xs={12} md={12} lg={10}>
												<Form.Control
													type="text"
													name="자산명"
													id="assetName"
												/>
											</Col>
										</Form.Group>
									</Col>

									<Col xs={12} md={6} lg={3}>
										<Form.Group as={Row}>
											<Form.Label htmlFor="assetCode" xs={12} md={12} lg={2}>
												자산코드
											</Form.Label>
											<Col xs={12} md={12} lg={8}>
												<Form.Control
													type="text"
													name="자산코드"
													id="assetCode"
												/>
											</Col>
										</Form.Group>
									</Col>

									<Col xs={12} md={6} lg={3}>
										<Form.Group as={Row}>
											<Form.Label htmlFor="maintainBy" xs={12} md={7} lg={3}>
												유지보수자
											</Form.Label>
											<Col xs={12} md={7} lg={6}>
												<Form.Control
													type="text"
													name="유지보수자"
													id="maintainBy"
												/>
											</Col>
										</Form.Group>
									</Col>

									<Col xs={12} md={6} lg={3}>
										<Form.Group as={Row}>
											<Form.Label xs={12} md={11} lg={5}>
												유지보수 일자
											</Form.Label>
											<Col xs={5} md={5} lg={5.5}>
												<CustomDatePicker
													type="date"
													dateFormat="yyyy-MM-dd"
													name="startDate"
													hideAddon={true}
												/>
											</Col>
											<Col
												xs={1}
												md={1}
												lg={1}
												className="justify-content-center pt-1 text-center fw-bold"
											>
												~
											</Col>
											<Col xs={5} md={5} lg={5.5}>
												<CustomDatePicker
													type="date"
													dateFormat="yyyy-MM-dd"
													name="endDate"
													hideAddon={true}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col className="px-2 pt-3">
										<Button>검색</Button>
									</Col>
								</Row>
							</Form>
						</StyledCardBody>
					</StyledCard>
				</Col>
			</Row>
			<Row className="px-3 pt-5">
				<Col>{/* <MaintainRegister onSubmitSuccess={handleRegisterSubmit} /> */}</Col>
			</Row>
			<Row className="align-items-center">
				{/* <h4 className="header-title text-center">유지보수 이력</h4> */}
				<Col className="pt-5 d-flex justify-content-center align-items-center">
					<StyledCard className="card">
						<StyledCardBody className="card-body">
							<Table3
								theadClass="table-light"
								sizePerPageList={sizePerPageList}
								columns={columns}
								data={data}
								isSortable={true}
								pagination={true}
								pageSize={5}
								onRowClick={handleClick}
							/>
						</StyledCardBody>
					</StyledCard>
				</Col>
			</Row>

			{selectData && (
				<MaintainDetail show={show} handleClose={handleClose} selectData={selectData} />
			)}
		</>
	);
};

export { MaintainHist };
