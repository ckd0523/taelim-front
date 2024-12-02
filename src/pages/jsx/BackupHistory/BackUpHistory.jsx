import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Table } from '@/components';
import BackUpTable from './data'; // useBackUpHistory로 변경
import { useState } from 'react';
import { CustomDatePicker } from '@/components';
//import Select from 'react-select';
import classNames from 'classnames';
import '../MaintainHistory/Searchbar.css';
import { useEffect } from 'react';

const columns = [
	{ Header: '번호', accessor: 'backUpNo', defaultCanSort: true },
	{ Header: '백업 날짜', accessor: 'backUpDate', defaultCanSort: true },
	//{ Header: '백업 범위', accessor: 'backUpScope', defaultCanSort: false },
];

const BackUpHistory = () => {
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
	const [showSearchForm, setShowSearchForm] = useState(false);
	const [searchData, setSearchData] = useState([]);

	const originalData = BackUpTable();
	console.log("원본 데이터 : " + JSON.stringify(originalData));

	useEffect(() => {
		setSearchData(originalData);
	}, [originalData]);

	//console.log("검색 데이터 : " + searchData);

	const handleSearch = () => {
		const adjustedEndDate = selectedEndDate ? new Date(selectedEndDate.setHours(23, 59, 59, 999)) : null; //시작일과 종료일이 같을 때 검색이 안되는 문제 해결
		const filteredData = originalData.filter((backUpList) => {
			return (
				(selectedStartDate === null ||
					new Date(backUpList.backUpDate) >= selectedStartDate) &&
				(adjustedEndDate === null || new Date(backUpList.backUpDate) <= adjustedEndDate)
			);
		});

		setSearchData(filteredData);
	};

	return (
		<div className="pt-3">
			<Row>
				<Col>
					<div>
						<h4 className="d-flex justify-content-start">백업 이력</h4>
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
							<Card.Body>
								<Form>
									<Row className="align-items-center">
										<Col xs={12} md={12} lg={12}>
											<Form.Group as={Row}>
												<Form.Label>백업 날짜</Form.Label>
												<Col xs={3} md={3} lg={3}>
													<CustomDatePicker
														hideAddon={true}
														dateFormat="yyyy-MM-dd"
														value={selectedStartDate}
														onChange={(date) => {
															setSelectedStartDate(date);
														}}
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
												<Col xs={3} md={3} lg={3}>
													<CustomDatePicker
														hideAddon={true}
														dateFormat="yyyy-MM-dd"
														value={selectedEndDate}
														onChange={(date) => {
															setSelectedEndDate(date);
														}}
													/>
												</Col>
												<Col
													xs={5}
													md={5}
													lg={5}
													className="d-flex align-items-center justify-content-end"
												>
													<Button
														variant="dark"
														type="button"
														onClick={() => {
															handleSearch();
														}}>
														검색
													</Button>
												</Col>
											</Form.Group>
										</Col>
									</Row>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
			<Row className="pt-3">
				<Col>
					<Card>
						<Card.Body>
							{searchData.length > 0 ? (
								<Table
									columns={columns}
									data={searchData}
									pageSize={10}
									theadClass="table-dark"
									isSortable={true}
									pagination={true}
								/>
							) : (
								<div className="table-responsive">
									<table
										className={classNames('table table-centered react-table')}
									>
										<thead style={{ background: '#313a46' }}>
											<tr>
												<th style={{ color: 'white' }}>번호</th>
												<th style={{ color: 'white' }}>백업날짜</th>
												{/* <th style={{ color: 'white' }}>백업범위</th> */}
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
														백업이력 데이터가 없습니다.
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export { BackUpHistory };
