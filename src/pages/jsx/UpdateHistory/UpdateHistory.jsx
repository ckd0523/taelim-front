import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Table, PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { columns } from './ColumnsSet';
import { useState } from 'react';
import { assetUpdates } from './data';
import { InfoModal } from './UpdateHistoryModal';
import axios from 'axios';

import Select from 'react-select';
import { useEffect } from 'react';

const UpdateHistory = () => {
	// 데이터 저장
	const [UpdateList, setUpdateList] = useState([]);
	const [originalData, setOriginalData] = useState([]); // 데이터 저장할 위치

	// 검색을 위한 column 들 재설정
	const [assetName, setAssetName] = useState('');
	const [assetCode, setAssetCode] = useState('');
	const [updateReason, setUpdateReason] = useState('');
	const [updateBy, setUpdateBy] = useState('');
	// 날짜 아직 미정
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
	// 모달 관련
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(null);

	const [selectedAssetNo, setSelectedAssetNo] = useState(null); // 선택된 assetNo

	// 백엔드에서 수정 이력 데이터를 불러오는 함수
	useEffect(() => {
		const fetchUpdateHistory = async () => {
			try {
				const response = await axios.get('http://localhost:8080/updateHistory'); // API 호출
				setUpdateList(response.data); // 가져온 데이터를 저장
				setOriginalData(response.data); // 검색을 위하 원본 데이터도 저장
			} catch (error) {
				console.log('수정 이력 가져오기 실패 : ', error);
			}
		};
		fetchUpdateHistory();
	}, []);

	const handleFormChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'assetCode':
				setAssetCode(value);
				break;
			case 'assetName':
				setAssetName(value);
				break;
			case 'updateReason':
				setUpdateReason(value);
				break;
			case 'updateBy':
				setUpdateBy(value);
				break;
			default:
				break;
		}
	};

	const handleRowClick = (rowData) => {
		setSelectedAssetNo(rowData.assetNo); // assetNo 설정
		setShowModal(true);
	};

	useEffect(() => {
		if (selectedAssetNo) {
		}
	}, [selectedAssetNo]);

	const handleSearch = () => {
		const filteredData = originalData.filter((assetUpdates) => {
			return (
				(assetCode === '' || assetUpdates.assetCode.includes(assetCode)) &&
				(assetName === '' || assetUpdates.assetName.includes(assetName)) &&
				(updateBy === '' || assetUpdates.updateBy.includes(updateBy)) &&
				(updateReason === '' || assetUpdates.updateReason.includes(updateReason)) &&
				(selectedStartDate === null ||
					new Date(assetUpdates.UpdateDate) >= selectedStartDate) &&
				(selectedEndDate === null || new Date(assetUpdates.UpdateDate) <= selectedEndDate)
			);
		});

		setUpdateList(filteredData);
	};

	return (
		<>
			<PageBreadcrumb title="UpdateHistory" subName="UpdateHistory" />

			<Row>
				<Col xs={12}>
					<Card>
						<Card.Body>
							<RHForm onChange={handleFormChange}>
								<Row className="mb-2">
									<Col xl={2}>
										<label className="form-label">자산코드</label> <br />
										<TextInput
											type="text"
											name="assetCode"
											containerClass={'mb-3'}
											value={assetCode}
											key="text"
											onChange={handleFormChange}
										/>
									</Col>
									<Col xl={2}>
										<label className="form-label">자산명</label> <br />
										<TextInput
											type="text"
											name="assetName"
											containerClass={'mb-3'}
											value={assetName}
											key="text"
											onChange={handleFormChange}
										/>
									</Col>
									<Col xl={2}>
										<label className="form-label">수정사유</label> <br />
										<TextInput
											type="text"
											name="updateReason"
											containerClass={'mb-3'}
											value={updateReason}
											key="text"
											onChange={handleFormChange}
										/>
									</Col>
									<Col xl={2}>
										<label className="form-label">수정요청자</label> <br />
										<TextInput
											type="text"
											name="updateBy"
											containerClass={'mb-3'}
											value={updateBy}
											key="text"
											onChange={handleFormChange}
										/>
									</Col>

									<Col xl={4}>
										<div className="text-lg mt-xl-0 mt-2">
											<label className="form-label">수정일자</label> <br />
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
									<Col xl={10}></Col>
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
									columns={columns(setModalData, setShowModal, setAssetCode)}
									data={UpdateList}
									pageSize={10}
									//isExpandable={true}
									isSortable={true}
									pagination={true}
									//isSelectable={true}
									theadClass="table-light"
									searchBoxClass="mb-2"
									onRowClick={handleRowClick} // onRowClick 이벤트를 빈 함수로 설정하여 무시
								/>
							</Row>
							{/* Modal */}
							<InfoModal
								show={showModal}
								handleClose={() => setShowModal(false)}
								assetNo={selectedAssetNo}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export { UpdateHistory };
