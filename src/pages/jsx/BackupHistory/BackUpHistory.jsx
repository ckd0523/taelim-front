import { Row, Col, Card, Button } from 'react-bootstrap';
import { Table } from '@/components';
import BackUpTable from './data'; // useBackUpHistory로 변경
import { useState } from 'react';
import { CustomDatePicker } from '@/components';
import Select from 'react-select';

const columns = [
	{ Header: '번호', accessor: 'backUpNo', defaultCanSort: true },
	{ Header: '백업 날짜', accessor: 'backUpDate', defaultCanSort: true },
	{ Header: '백업 범위', accessor: 'backUpScope', defaultCanSort: false },
];

const sizePerPageList = [
	{ text: '5', value: 5 },
	{ text: '10', value: 10 },
	{ text: '25', value: 25 },
	{ text: '100', value: 100 },
];

const BackUpHistory = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const data = BackUpTable();

	return (
		<div>
			<Card>
				<Card.Body>
					<Row>
						<Col lg={3}>
							<label>백업 범위</label>
							<Select
								className="react-select"
								classNamePrefix="react-select"
								options={[
									{ value: 'FULL', label: '전체' },
									{ value: 'PARTIAL', label: '부분' },
								]}
							></Select>
						</Col>

						<Col>
							<Row>
								<label>백업 날짜</label>
								<Col lg={3}>
									<div className="mb-3">
										<CustomDatePicker
											hideAddon={true}
											value={selectedDate}
											onChange={(date) => {
												setSelectedDate(date);
											}}
										/>
									</div>
								</Col>
								~
								<Col lg={3}>
									<div className="mb-3">
										<CustomDatePicker
											hideAddon={true}
											value={selectedDate}
											onChange={(date) => {
												setSelectedDate(date);
											}}
										/>
									</div>
								</Col>
								<Col lg={2}>
									<Button>검색</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				</Card.Body>
			</Card>

			<Row>
				<Col>
					<Card>
						<Card.Body>
							<h1 className="header-title">백업 이력</h1>
							<Table
								columns={columns}
								data={data}
								pageSize={5}
								theadClass="table-light"
								sizePerPageList={sizePerPageList}
								isSortable={true}
								pagination={true}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export { BackUpHistory };
