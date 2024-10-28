import { Row, Col, Form, Button, Card, CardBody } from 'react-bootstrap';
import { CustomDatePicker } from '@/components';
import { Table3 } from '@/components/table/Table3';
import { MaintainDetail } from '@/pages/jsx/MaintainHistory/MaintainDetail';
import { useState } from 'react';
import { useEffect } from 'react';
import './Searchbar.css';
import api from '@/common/api/authAxios';
import classNames from 'classnames';
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
		accessor: 'repairStatus',
		defaultCanSort: true,
		// Cell: ({ row }) => {
		// 	const { repairStartDate, repairEndDate, repairResult, repairFiles } = row.original;
		// 	row.repairStatus = '진행중';
		// 	const hasBeforeRepair = repairFiles?.some((file) => file.repairType === '보수전');
		// 	const hasAfterRepair = repairFiles?.some((file) => file.repairType === '보수후');
		// 	if (
		// 		repairStartDate &&
		// 		repairEndDate &&
		// 		repairResult &&
		// 		hasBeforeRepair &&
		// 		hasAfterRepair
		// 	) {
		// 		row.repairStatus = '완료';
		// 	}
		// 	return row.repairStatus;
		// },
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
	const [showSearchForm, setShowSearchForm] = useState(false);
	const [show, setShow] = useState(false);
	const [selectData, setSelectData] = useState();
	const [searchData, setSearchData] = useState([]); // 필터할 테이블 데이터
	const [data, setData] = useState([]); //기존 테이블 데이터
	const [searchAssetName, setSearchAssetName] = useState();
	const [searchAssetCode, setSearchAssetCode] = useState();
	const [searchMaintainBy, setSearchMaintainBy] = useState();
	const [searchStartDate, setSearchStartDate] = useState();
	const [searchEndDate, setSearchEndDate] = useState();

	const handleSearch = (e) => {
		const filteredData = data.filter((item) => {
			return (
				(!searchAssetName ||
					item.assetName.toUpperCase().includes(searchAssetName.toUpperCase())) &&
				(!searchAssetCode ||
					item.assetCode.toUpperCase().includes(searchAssetCode.toUpperCase())) &&
				(!searchMaintainBy ||
					item.maintainBy.toUpperCase().includes(searchMaintainBy.toUpperCase())) &&
				(!searchStartDate || new Date(item.repairStartDate) >= searchStartDate) &&
				(!searchEndDate || new Date(item.repairEndDate) <= searchEndDate)
			);
		});
		setSearchData(filteredData);
		console.log(filteredData);
		setSearchAssetName('');
		setSearchAssetCode('');
		setSearchMaintainBy('');
		setSearchStartDate('');
		setSearchEndDate('');
	};
	const handleClick = (rowdata) => {
		setSelectData(rowdata);
		setShow(true);
	};
	const handleClose = () => {
		setShow(false);
		setSelectData('');
	};

	useEffect(() => {
		const requestOptions = async () => {
			try {
				const response = await api.get('/maintain/get');
				if (Array.isArray(response.data)) {
					console.log(response.data);
					setData(response.data);
					setSearchData(response.data);
				} else {
					console.error('error');
					setData([]);
					setSearchData([]);
				}
			} catch (error) {
				console.log('error', error);
			}
		};
		requestOptions();
	}, []);

	useEffect(() => {
		const requestOptions = async () => {
			try {
				const response = await api.get('/maintain/get');
				if (Array.isArray(response.data)) {
					console.log(response.data);
					setData(response.data);
					setSearchData(response.data);
				} else {
					console.error('error');
					setData([]);
					setSearchData([]);
				}
			} catch (error) {
				console.log('error', error);
			}
		};
		requestOptions();
	}, [show]);
	return (
		<>
			<Row className="pt-3 align-items-center">
				<Col>
					<div>
						<h4 className="d-flex justify-content-start">유지보수 이력</h4>
					</div>
				</Col>
				<Col xs="auto" style={{ paddingRight: '0' }}>
					<Button
						className="d-flex align-items-center"
						style={{
							height: '40px',
							background: '#fff',
							border: '#ffff',
							boxShadow: 'none',
							color: '#000000ce',
						}}
						onClick={() => setShowSearchForm((prev) => !prev)}
					>
						{showSearchForm ? (
							<i className="uil-plus font-24 "></i>
						) : (
							<i className="uil-plus font-24 "></i>
						)}
					</Button>
				</Col>
				<Col xs="auto" style={{ paddingLeft: '0' }}>
					<form>
						<fieldset style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type="search"
								style={{
									width: '200px',
									height: '40px',
									float: 'left',
									border: 'none',
								}}
							/>
							<button
								className="button"
								type="submit"
								style={{
									height: '40px',
									width: '50px',
									float: 'left',
									border: 'none',
								}}
								onClick={() => handleSearch()}
							>
								<i className="ri-search-line font-22"></i>
							</button>
						</fieldset>
					</form>
				</Col>
			</Row>

			{showSearchForm && (
				<Row className="pt-3">
					<Col>
						<Card>
							<CardBody>
								<Form>
									<Row className="align-items-center">
										<Col xs={12} md={4} lg={2}>
											<Form.Group as={Row}>
												<Form.Label
													htmlFor="assetName"
													xs={12}
													md={12}
													lg={10}
												>
													자산명
												</Form.Label>
												<Col xs={12} md={12} lg={10}>
													<Form.Control
														type="text"
														id="assetName"
														value={searchAssetName}
														onChange={(e) =>
															setSearchAssetName(e.target.value)
														}
													/>
												</Col>
											</Form.Group>
										</Col>
										<Col xs={12} md={6} lg={3}>
											<Form.Group as={Row}>
												<Form.Label
													htmlFor="assetCode"
													xs={12}
													md={12}
													lg={2}
												>
													자산코드
												</Form.Label>
												<Col xs={12} md={12} lg={8}>
													<Form.Control
														type="text"
														id="assetCode"
														value={searchAssetCode}
														onChange={(e) =>
															setSearchAssetCode(e.target.value)
														}
													/>
												</Col>
											</Form.Group>
										</Col>
										<Col xs={12} md={6} lg={3}>
											<Form.Group as={Row}>
												<Form.Label
													htmlFor="repairBy"
													xs={12}
													md={7}
													lg={3}
												>
													유지보수자
												</Form.Label>
												<Col xs={12} md={7} lg={6}>
													<Form.Control
														type="text"
														id="repairBy"
														value={searchMaintainBy}
														onChange={(e) =>
															setSearchMaintainBy(e.target.value)
														}
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
														value={searchStartDate}
														onChange={(s) =>
															setSearchStartDate(s || '')
														}
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
														value={searchEndDate}
														onChange={(s) => setSearchEndDate(s || '')}
													/>
												</Col>
											</Form.Group>
										</Col>
										<Col className="px-2 pt-3">
											<Button
												variant="dark"
												type="button"
												onClick={handleSearch}
											>
												검색
											</Button>
										</Col>
									</Row>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}

			<Row className="pt-3 align-items-center">
				<Col>
					<Card className="card">
						<CardBody className="card-body">
							{searchData.length > 0 ? (
								<Table3
									theadClass="table-dark"
									tableClass="border-black"
									sizePerPageList={sizePerPageList}
									columns={columns}
									data={searchData}
									isSortable={true}
									pagination={true}
									pageSize={5}
									onRowClick={handleClick}
								/>
							) : (
								<div className="table-responsive">
									<table
										className={classNames('table table-centered react-table')}
									>
										<thead style={{ background: '#313a46' }}>
											<tr>
												<th style={{ color: 'white' }}>번호</th>
												<th style={{ color: 'white' }}>자산코드</th>
												<th style={{ color: 'white' }}>자산명</th>
												<th style={{ color: 'white' }}>시작일자</th>
												<th style={{ color: 'white' }}>종료일자</th>
												<th style={{ color: 'white' }}>유지보수자</th>
												<th style={{ color: 'white' }}>상태</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td colSpan="8" className="text-center">
													<div
														className="alert alert-warning"
														role="alert"
													>
														<strong>데이터가 없습니다!</strong>
														<br />
														유지보수이력 데이터가 없습니다.
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							)}
						</CardBody>
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
