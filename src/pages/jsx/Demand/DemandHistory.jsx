import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { Table } from './Table';
import { columns } from './ColumnsSet';
import { useState, useEffect } from 'react';
import { InfoModal, ActionModal, ProcessModal } from './DemandModal';
import axios from 'axios';
import '../MaintainHistory/Searchbar.css';
import Swal from 'sweetalert2';

const urlConfig = import.meta.env.VITE_BASIC_URL;

import Select from 'react-select';

const DemandHistory = () => {
	const [showSearchForm, setShowSearchForm] = useState(false);
	const [demands, setDemands] = useState([]);
	const [demandsList, setDemandsList] = useState([]);
	const [selectedOrderType, setSelectedOrderType] = useState('');
	const [selectedRequester, setSelectedRequester] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [showActModal, setShowActModal] = useState(false);
	const [actionData, setActionData] = useState([]); // ActionModal로 보낼 데이터
	const [actionType, setActionType] = useState(null);
	const [rowSelect, setRowSelect] = useState([]);
	//미확인 자산 처리 모달
	const [process, setProcess] = useState(false);
	//alert
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${urlConfig}/DemandHistory`);
				setDemands(response.data);
			} catch (error) {
				console.error('데이터를 가져오는 중 오류 발생:', error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		setDemandsList(demands);
	}, [demands]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${urlConfig}/DemandHistory`);
				setDemands(response.data);
			} catch (error) {
				console.error('데이터를 가져오는 중 오류 발생:', error);
			}
		};

		// process가 false로 바뀔 때 데이터를 다시 불러옴
		if (!process || !showActModal || !showModal) {
			fetchData();
		}
	}, [process, showActModal, showModal]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${urlConfig}/DemandHistory`);
				setDemands(response.data);
			} catch (error) {
				console.error('데이터를 가져오는 중 오류 발생:', error);
			}
		};

		// process가 false로 바뀔 때 데이터를 다시 불러옴
		if (!showActModal) {
			fetchData();
		}
	}, [showActModal]);

	const processOpenModal = () => {
		const fetchRowData = async () => {
			try {
				const response = await axios.get(`${urlConfig}/DemandList`);
				const responseData = response.data;

				// 데이터를 불러온 후 첫 번째 데이터를 기준으로 modalType 설정
				if (responseData.length > 0) {
					setProcess(true);
				} else {
					setAlertMessage('미처리된 자산이 없습니다.');
					setShowAlert(true);
					setTimeout(() => {
						setShowAlert(false);
					}, 3000);
				}
				console.log('미확인 요청 자산 리스트: ', responseData);
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};
		fetchRowData();
	};

	const handleOpenModal = (type, rowSelect) => {
		console.log(rowSelect);
		if (rowSelect.length === 0) {
			setAlertMessage('데이터를 선택을 해주세요.');
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 3000);
		} else {
			setActionType(type);
			setActionData(rowSelect); // rowData 또는 선택한 데이터를 설정
			setShowActModal(true);
		}
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

	const handleRowClick = (rowSelect) => {
		setModalData(rowSelect);
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
			<Row className="pt-3 align-items-center">
				<Col>
					<h4 className="d-flex justify-content-start">요청 내역</h4>
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
												<label className="form-label">요청일자</label>{' '}
												<br />
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
													<Col
														lg={1}
														className="d-flex justify-content-center pt-1 text-center fw-bold"
													>
														~
													</Col>
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
											lg={2}
											className="d-flex align-items-center justify-content-end"
										>
											<div className="text-lg mt-xl-0 mt-2">
												<Button
													variant="dark"
													type="button"
													onClick={() => {
														handleSearch();
													}}
												>
													검색
												</Button>
											</div>
										</Col>
									</Row>
								</RHForm>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
			<Row className="pt-3">
				<Col xs={12}>
					<Row className="align-items-center justify-content-between">
						<Col className="flex-grow-1">
							{showAlert && (
								<Alert
									variant="danger"
									className="mb-0 text-center d-flex align-items-center justify-content-center"
									style={{ height: '100%' }}
								>
									{alertMessage}
								</Alert>
							)}
						</Col>

						<Col xs="auto">
							<Button
								style={{ background: '#73af82', border: 'none' }}
								variant="success"
								onClick={() => processOpenModal()}
							>
								미처리 자산 처리
							</Button>
						</Col>

						<Col xs="auto">
							<Button
								style={{ background: '#5e83bb', border: 'none' }}
								onClick={() => handleOpenModal('approve', rowSelect)}
							>
								승인
							</Button>
						</Col>

						<Col xs="auto">
							<Button
								style={{ background: '#c66464', border: 'none' }}
								onClick={() => handleOpenModal('reject', rowSelect)}
							>
								거절
							</Button>
						</Col>
					</Row>
					<Card></Card>
					<Card>
						<Card.Body>
							<Row>
								<Table
									columns={columns()}
									data={demandsList}
									pageSize={10}
									//isExpandable={true}
									isSortable={true}
									pagination={true}
									isSelectable={true}
									initialState={{ hiddenColumns: ['demandNo', 'assetNo'] }} // id 열을 숨김
									theadClass="table-dark"
									tableClass="border-black"
									searchBoxClass="mb-2"
									setRowSelect={setRowSelect}
									setModalData={setModalData}
									setShowModal={setShowModal}
								/>
							</Row>
							{/* Modal */}
							<InfoModal
								show={showModal}
								handleClose={() => setShowModal(false)}
								modalData={modalData}
							/>
							<ProcessModal
								show={process}
								handleClose={() => {
									setProcess(false);
								}}
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
