import { Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { Table } from './Table';
import { columns } from './ColumnsSet';
import { useState, useEffect } from 'react';
import { InfoModal, ActionModal, ProcessModal } from './DemandModal';
//import axios from 'axios';
import '../MaintainHistory/Searchbar.css';
import Swal from 'sweetalert2';
import api from '@/common/api/authAxios';

const urlConfig = import.meta.env.VITE_BASIC_URL;

import Select from 'react-select';

const DemandHistory = () => {
	const [demands, setDemands] = useState([]);
	const [demandsList, setDemandsList] = useState([]);

	const [showSearchForm, setShowSearchForm] = useState(false);

	const [selectedOrderType, setSelectedOrderType] = useState('');
	const [selectedRequester, setSelectedRequester] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);

	// 검색 조건 만들기
	const [searchAssetCode, setSearchAssetCode] = useState('');
	const [searchAssetName, setSearchAssetName] = useState('');
	const [searchDemandBy, setSearchDemandBy] = useState('');
	const [searchDemandType, setSearchDemandType] = useState('');
	const [searchDemandStatus, setSearchDemandStatus] = useState('');
	const [searchDemandReason, setSearchDemandReason] = useState('');
	const [searchDemandDetail, setSearchDemandDetail] = useState('');
	const [searchCommnet, setSearchComment] = useState('');
	const [searchStartDate, setSearchStartDate] = useState(null);
	const [searchEndDate, setSearchEndDate] = useState(null);
	const [searchKeyword, setSearchKeyword] = useState('');

	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(null);

	const [showActModal, setShowActModal] = useState(false);
	const [actionData, setActionData] = useState([]);
	const [actionType, setActionType] = useState(null);

	const [rowSelect, setRowSelect] = useState([]);
	//미확인 자산 처리 모달
	const [process, setProcess] = useState(false);
	//alert
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	//요청 리스트 가져오는 axios
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`${urlConfig}/DemandHistory`);
				console.log(response);
				setDemands(response.data);
			} catch (error) {
				console.error('데이터를 가져오는 중 오류 발생:', error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`${urlConfig}/DemandHistory`);
				setDemands(response.data);
			} catch (error) {
				console.error('데이터를 가져오는 중 오류 발생:', error);
			}
		};

		if (!process && !showActModal && !showModal) {
			// 약간의 지연을 주어 상태가 업데이트될 시간을 확보
			setTimeout(fetchData, 10);
		}
	}, [process, showActModal, showModal]);

	useEffect(() => {
		setDemandsList(demands);
	}, [demands]);

	// 미처리 자산 여는 모달
	const processOpenModal = () => {
		const fetchRowData = async () => {
			try {
				const response = await api.get(`${urlConfig}/DemandList`);
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

	// 승인 거절 모달 여는 함수
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

	// 셀렉트 박스 변경 리스너
	const handleChange = (e) => {
		setSelectedRequester(e.target.value);
	};

	//검색 함수
	const handleSearch = (e) => {
		e.preventDefault();
		const filteredData = demands.filter((demands) => {
			const demandDate = demands.demandDate ? new Date(demands.demandDate) : null;
			const searchStart = searchStartDate ? new Date(searchStartDate) : null;
			const searchEnd = searchEndDate ? new Date(searchEndDate) : null;

			return (
				(!searchAssetName ||
					(demands.assetName || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchAssetName.replace(/\s+/g, '').toLowerCase())) &&
				(!searchAssetCode ||
					(demands.assetCode || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchAssetCode.replace(/\s+/g, '').toLowerCase())) &&
				(!searchDemandBy ||
					(demands.demandBy || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchDemandBy.replace(/\s+/g, '').toLowerCase())) &&
				(!searchDemandReason ||
					(demands.demandReason || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchDemandReason.replace(/\s+/g, '').toLowerCase())) &&
				(!searchDemandDetail ||
					(demands.demandDetail || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchDemandDetail.replace(/\s+/g, '').toLowerCase())) &&
				(!searchCommnet ||
					(demands.comment || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchCommnet.replace(/\s+/g, '').toLowerCase())) &&
				(!searchStart || (demandDate && demandDate >= searchStart)) &&
				(!searchEnd || (demandDate && demandDate <= searchEnd)) &&
				// 요청구분에 대한 필터링 추가
				(!searchDemandType || demands.demandType === searchDemandType) &&
				(!searchDemandStatus || demands.demandStatus === searchDemandStatus)
			);
		});
		console.log(selectedOrderType);
		setDemandsList(filteredData);
		setSearchAssetCode('');
		setSearchAssetName('');
		setSearchDemandBy('');
		setSearchDemandType(null);
		setSearchDemandStatus(null);
		setSearchDemandReason('');
		setSearchDemandDetail('');
		setSearchComment('');
		setSearchStartDate('');
		setSearchEndDate('');
	};

	const handleSearch2 = (e) => {
		e.preventDefault();

		const keyword = (searchKeyword || '').replace(/\s+/g, '').toLowerCase().trim();

		if (!keyword) {
			setDemandsList(demands);
			return;
		}
		const filteredData = demands.filter((item) => {
			const matchsKeyword = Object.values(item).some(
				(value) =>
					typeof value === 'string' &&
					(value || '').replace(/\s+/g, '').toLowerCase().includes(keyword)
			);
			return matchsKeyword;
		});

		setDemandsList(filteredData);
		setSearchKeyword('');
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
								placeholder="검색어를 입력하세요."
								style={{
									width: '200px',
									height: '40px',
									float: 'left',
									border: 'none',
								}}
								value={searchKeyword}
								onChange={(e) => setSearchKeyword(e.target.value)}
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
								onClick={handleSearch2}
							>
								<i className="ri-search-line font-22"></i>
							</button>
						</fieldset>
					</form>
				</Col>
			</Row>

			<Card></Card>
			{showSearchForm && (
				<Row className="pt-3 g-0">
					<Col>
						<Card>
							<Card.Body>
								<Row>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">자산코드</Form.Label>
											<Col lg={12}>
												<Form.Control
													type="text"
													name="assetCode"
													value={searchAssetCode || ''}
													onChange={(e) =>
														setSearchAssetCode(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">자산명</Form.Label>
											<Col lg={12}>
												<Form.Control
													type="text"
													name="assetName"
													value={searchAssetName || ''}
													onChange={(e) =>
														setSearchAssetName(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">요청자</Form.Label>
											<Col lg={12}>
												<Form.Control
													type="text"
													name="demandBy"
													value={searchDemandBy || ''}
													onChange={(e) =>
														setSearchDemandBy(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col lg={3}>
										<Form.Group>
											<Form.Label className="form-label">요청구분</Form.Label>
											<Select
												className="react-select"
												classNamePrefix="react-select"
												options={[
													{ value: '', label: '전체' },
													{ value: 'update', label: '수정요청' },
													{ value: 'delete', label: '폐기요청' },
												]}
												value={{
													value: searchDemandType,
													label: searchDemandType
														? searchDemandType === 'update'
															? '수정요청'
															: '폐기요청'
														: '전체',
												}} // 선택된 값에 맞는 라벨 표시
												onChange={(selected) =>
													setSearchDemandType(selected?.value || '')
												} // 'update', 'delete', '전체' 값을 searchDemandType에 설정
											></Select>
										</Form.Group>
									</Col>
									<Col lg={3}>
										<Form.Group>
											<Form.Label className="form-label">요청상태</Form.Label>
											<Select
												className="react-select"
												classNamePrefix="react-select"
												options={[
													{ value: '', label: '전체' },
													{ value: 'UNCONFIRMED', label: '미처리' },
													{ value: 'APPROVE', label: '승인' },
													{ value: 'REFUSAL', label: '거절' },
												]}
												value={{
													value: searchDemandStatus,
													label: searchDemandStatus
														? searchDemandStatus === 'UNCONFIRMED'
															? '미처리'
															: searchDemandStatus === 'APPROVE'
															  ? '승인'
															  : searchDemandStatus === 'REFUSAL'
															    ? '거절'
															    : '' // 기본값이 없을 때 처리
														: '전체', // searchDemandStatus가 없으면 '전체'
												}}
												onChange={(selected) =>
													setSearchDemandStatus(selected?.value || '')
												}
											></Select>
										</Form.Group>
									</Col>
								</Row>
								<Card></Card>
								<Row>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">요청사유</Form.Label>
											<Col lg={12}>
												<Form.Control
													type="text"
													name="demandReason "
													value={searchDemandReason || ''}
													onChange={(e) =>
														setSearchDemandReason(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">요청내용</Form.Label>
											<Col lg={12}>
												<Form.Control
													type="text"
													name="demandDetail "
													value={searchDemandDetail || ''}
													onChange={(e) =>
														setSearchDemandDetail(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">처리사유</Form.Label>
											<Col lg={12}>
												<Form.Control
													type="text"
													name="comment"
													value={searchCommnet || ''}
													onChange={(e) =>
														setSearchComment(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col lg={6}>
										<Form.Group as={Row}>
											<Form.Label>요청일자</Form.Label>

											<Col xs={5} md={5} lg={4}>
												<Form.Control
													type="date"
													value={searchStartDate || ''}
													onChange={(e) =>
														setSearchStartDate(e.target.value)
													}
													className="me-2" // 오른쪽 여백
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
											<Col xs={5} md={5} lg={4}>
												<Form.Control
													type="date"
													value={searchEndDate || ''}
													onChange={(e) =>
														setSearchEndDate(e.target.value)
													}
													className="ms-2" // 왼쪽 여백
												/>
											</Col>
											<Col lg="auto" className="ms-auto">
												<Button
													variant="dark"
													type="button"
													onClick={handleSearch}
												>
													검색
												</Button>
											</Col>
										</Form.Group>
									</Col>
								</Row>
								{/* <RHForm onChange={handleChange}>
									<Row className="mb-2">
										<Col lg={2} xs={4}>
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
										<Col lg={2} xs={4}>
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
										<Col lg={2} xs={4}>
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

										<Col lg={4} xs={12}>
											<div className="text-lg mt-xl-0 mt-2">
												<label className="form-label">요청일자</label>{' '}
												<br />
												<Row>
													<Col lg={5} xs={5}>
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
														lg={2}
														xs={2}
														className="d-flex justify-content-center pt-1 text-center fw-bold"
													>
														~
													</Col>
													<Col lg={5} xs={5}>
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
											xs={12}
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
								</RHForm> */}
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
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export { DemandHistory };
