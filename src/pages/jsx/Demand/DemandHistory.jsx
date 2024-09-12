import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { Table } from './Table';
import { columns } from './ColumnsSet';
import { useState } from 'react';
import { demands } from './data';
import { InfoModal, ActionModal } from './DemandModal';

import Select from 'react-select';

const DemandHistory = () => {
	const [demandsList, setDemandsList] = useState(demands);
	const [selectedOrderType, setSelectedOrderType] = useState('');
	const [selectedRequester, setSelectedRequester] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [showActModal, setShowActModal] = useState(false);
	const [actionData, setActionData] = useState(null); // ActionModal로 보낼 데이터
	const [actionType, setActionType] = useState(null);

	const handleOpenModal = (type, rowData) => {
		setActionType(type);
		setActionData(rowData); // rowData 또는 선택한 데이터를 설정
		setShowActModal(true);
	};

	const handleModalSubmit = (reason) => {
		if (actionType === 'approve') {
			// 승인 처리 로직
			console.log('승인 사유:', reason);
		} else if (actionType === 'reject') {
			// 거절 처리 로직
			console.log('거절 사유:', reason);
		}
		setShowActModal(false);
	};

	const handleChange = (e) => {
		setSelectedRequester(e.target.value);
	};

	const handleRowClick = (rowData) => {
		setModalData(rowData);
		setShowModal(true);
	};

	const handleSearch = () => {
		const filteredData = demands.filter((demands) => {
			return (
				(selectedOrderType === '' || demands.demandType.includes(selectedOrderType)) &&
				(selectedRequester === '' || demands.demandBy.includes(selectedRequester)) &&
				(selectedStatus === '' || demands.demandStatus.includes(selectedStatus)) &&
				(selectedStartDate === null || new Date(demands.demandDate) >= selectedStartDate) &&
				(selectedEndDate === null || new Date(demands.demandDate) <= selectedEndDate)
			);
		});
		console.log(selectedOrderType);
		setDemandsList(filteredData);
	};

	return (
		<>
			<PageBreadcrumb title="Demand" subName="Demand" />

			<Row>
				<Col xs={12}>
					<Card>
						<Card.Body>
							<RHForm onChange={handleChange}>
								<Row className="mb-2">
									<Col xl={2}>
										<label className="form-label">요청구분</label> <br />
										<Select
											className="react-select"
											classNamePrefix="react-select"
											options={[
												{ value: '', label: '전체' },
												{ value: 'update', label: '수정' },
												{ value: 'delete', label: '폐기' },
												{ value: 'AllUpdate', label: '일괄수정' },
												{ value: 'AllDelete', label: '일괄폐기' },
											]}
											onChange={(selected) =>
												setSelectedOrderType(selected?.value || '')
											}
										></Select>
									</Col>
									<Col xl={2}>
										<label className="form-label">요청자</label> <br />
										<TextInput
											type="text"
											name="selectedRequester"
											containerClass={'mb-3'}
											value={selectedRequester}
											key="text"
											onChange={handleChange}
										/>
									</Col>
									<Col xl={2}>
										<label className="form-label">처리여부</label> <br />
										<Select
											className="react-select"
											classNamePrefix="react-select"
											options={[
												{ value: '', label: '전체' },
												{ value: 'UNCONFIRMED', label: '미확인' },
												{ value: 'Processing', label: '처리중' },
												{ value: 'APPROVE', label: '승인' },
												{ value: 'REFUSAL', label: '거절' },
											]}
											onChange={(selected) =>
												setSelectedStatus(selected?.value || '')
											}
										></Select>
									</Col>

									<Col xl={4}>
										<div className="text-lg mt-xl-0 mt-2">
											<label className="form-label">요청일자</label> <br />
											<Row>
												<Col>
													<CustomDatePicker
														hideAddon={true}
														dateFormat="yyyy-MM-dd"
														value={selectedStartDate}
														onChange={(date) => {
															setSelectedStartDate(date);
														}}
													/>
												</Col>
												~
												<Col>
													<CustomDatePicker
														hideAddon={true}
														dateFormat="yyyy-MM-dd"
														value={selectedEndDate}
														onChange={(date) => {
															setSelectedEndDate(date);
														}}
													/>
												</Col>
											</Row>
										</div>
									</Col>
									<Col
										xl={2}
										className="d-flex align-items-center justify-content-end"
									>
										<Button
											variant="primary"
											type="button"
											onClick={() => {
												handleSearch();
											}}
										>
											검색
										</Button>
									</Col>
								</Row>
							</RHForm>
							<Row className="g-0">
								<Col className="d-flex align-items-center justify-content-end mb-2">
									<Button
										variant="secondary"
										onClick={() => handleOpenModal('approve')}
										className="me-2"
									>
										승인
									</Button>
									<Button
										variant="danger"
										onClick={() => handleOpenModal('reject')}
									>
										거절
									</Button>
								</Col>
							</Row>
							<Row>
								<Table
									columns={columns(setModalData, setShowModal)}
									data={demandsList}
									pageSize={10}
									isExpandable={true}
									isSortable={true}
									pagination={true}
									isSelectable={true}
									initialState={{ hiddenColumns: ['demandNo'] }} // id 열을 숨김
									theadClass="table-info"
									tableClass="border-black"
									searchBoxClass="mb-2"
								/>
							</Row>
							{/* Modal */}
							<InfoModal
								show={showModal}
								handleClose={() => setShowModal(false)}
								modalData={modalData}
							/>
							<ActionModal
								show={showActModal}
								handleClose={() => setShowActModal(false)}
								actionType={actionType}
								actionData={actionData} // ActionModal로 데이터 전달
								handleSubmit={handleModalSubmit}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export { DemandHistory };
