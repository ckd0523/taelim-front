import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Table, PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { columns } from './ColumnsSet';
import { useState, useEffect } from 'react';
//import { assetDeletes } from './data';
import { InfoModal } from './DeleteHistoryModal';
import axios from 'axios';
const urlConfig = import.meta.env.VITE_BASIC_URL;

import Select from 'react-select';

const DeleteHistory = () => {
	// 데이터 저장
	const [DeleteList, setDeleteList] = useState([]);
	const [originalData, setOriginalData] = useState([]); // 전체 데이터를 저장할 상태
	// 검색을 위한 column 들 설정
	const [assetName, setAssetName] = useState('');
	const [assetCode, setAssetCode] = useState('');
	const [deleteReason, setDeleteReason] = useState('');
	const [deleteBy, setDeleteBy] = useState('');
	const [deleteMethod, setDeleteMethod] = useState('');
	const [deleteLocation, setDeleteLocation] = useState('');
	// 날짜는 아직 못함
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
	// 모달관련
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(null);

	// 백엔드에서 폐기이력 데이터를 불러오는 함수
	useEffect(() => {
		const fetchDeleteHistory = async () => {
			try {
				const response = await axios.get(`${urlConfig}/deleteHistory`); // API 호출
				setDeleteList(response.data); // 가져온 데이터를 상태에 저장
				setOriginalData(response.data); // 검색을 위한 원본 데이터도 저장
			} catch (error) {
				console.error('폐기이력 가져오기 실패:', error);
			}
		};
		fetchDeleteHistory();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'assetCode':
				setAssetCode(value);
				console.log(value);
				break;
			case 'assetName':
				setAssetName(value);
				break;
			case 'deleteReason':
				setDeleteReason(value);
				break;
			case 'deleteBy':
				setDeleteBy(value);
				break;
			case 'deleteMethod':
				setDeleteMethod(value);
				break;
			case 'deleteLocation':
				setDeleteLocation(value);
				break;
			default:
				break;
		}
	};

	const handleRowClick = (rowData) => {
		setModalData(rowData);
		setShowModal(true);
	};

	const handleSearch = () => {
		const filteredData = originalData.filter((assetDeletes) => {
			return (
				(assetName === '' || assetDeletes.assetName.includes(assetName)) &&
				(assetCode === '' || assetDeletes.assetCode.includes(assetCode)) &&
				(deleteReason === '' || assetDeletes.deleteReason.includes(deleteReason)) &&
				(deleteBy === '' || assetDeletes.deleteBy.includes(deleteBy)) &&
				(deleteMethod === '' || assetDeletes.deleteMethod.includes(deleteMethod)) &&
				(deleteLocation === '' || assetDeletes.deleteLocation.includes(deleteLocation)) &&
				(selectedStartDate === null ||
					new Date(assetDeletes.DeleteDate) >= selectedStartDate) &&
				(selectedEndDate === null || new Date(assetDeletes.DeleteDate) <= selectedEndDate)
			);
		});

		setDeleteList(filteredData);
	};

	return (
		<>
			<PageBreadcrumb title="DeleteHistory" subName="DeleteHistory" />

			<Row>
				<Col xs={12}>
					<Card>
						<Card.Body>
							<RHForm onChange={handleChange}>
								<Row>
									<Col xl={3}>
										<label className="form-label">자산명</label> <br />
										<TextInput
											type="text"
											name="assetName"
											containerClass={'mb-3'}
											value={assetName}
											key="text"
											onChange={handleChange}
										/>
									</Col>
									<Col xl={3}>
										<label className="form-label">자산코드</label> <br />
										<TextInput
											type="text"
											name="assetCode"
											containerClass={'mb-3'}
											value={assetCode}
											key="text"
											onChange={handleChange}
										/>
									</Col>
									<Col xl={3}>
										<label className="form-label">폐기사유</label> <br />
										<TextInput
											type="text"
											name="deleteReason"
											containerClass={'mb-3'}
											value={deleteReason}
											key="text"
											onChange={handleChange}
										/>
									</Col>
									<Col xl={3}>
										<label className="form-label">폐기방법</label> <br />
										<TextInput
											type="text"
											name="deleteMethod"
											containerClass={'mb-3'}
											value={deleteMethod}
											key="text"
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col xl={4}>
										<div className="text-lg mt-xl-0 mt-2">
											<label className="form-label">폐기일자</label> <br />
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

									<Col xl={3}>
										<label className="form-label">폐기위치</label> <br />
										<TextInput
											type="text"
											name="selectedRequester"
											containerClass={'mb-3'}
											value={deleteLocation}
											key="text"
											onChange={handleChange}
										/>
									</Col>
									<Col xl={3}>
										<label className="form-label">폐기자</label> <br />
										<TextInput
											type="text"
											name="DeleteBy"
											containerClass={'mb-3'}
											value={deleteBy}
											key="text"
											onChange={handleChange}
										/>
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

							<Row>
								<Table
									columns={columns(setModalData, setShowModal)}
									data={DeleteList}
									pageSize={10}
									//isExpandable={true}
									isSortable={true}
									pagination={true}
									//isSelectable={true}
									theadClass="table-light"
									searchBoxClass="mb-2"
									onRowClick={() => {}} // onRowClick 이벤트를 빈 함수로 설정하여 무시
								/>
							</Row>
							{/* Modal */}
							<InfoModal
								show={showModal}
								handleClose={() => setShowModal(false)}
								modalData={modalData}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export { DeleteHistory };
