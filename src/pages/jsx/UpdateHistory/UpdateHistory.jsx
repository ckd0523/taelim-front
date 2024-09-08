import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Table, PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { columns } from './ColumnsSet';
import { useState } from 'react';
import { assetUpdates } from './data';
import { InfoModal } from './UpdateHistoryModal';

import Select from 'react-select';

const UpdateHistory = () => {
	const [UpdateList, setUpdateList] = useState(assetUpdates);
	const [AssetCode, setAssetCode] = useState('');
	const [UpdateReason, setUpdateReason] = useState('');
	const [AssetName, setAssetName] = useState('');
	const [UpdateBy, setUpdateBy] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(null);

	const handleFormChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'AssetCode':
				setAssetCode(value);
				break;
			case 'AssetName':
				setAssetName(value);
				break;
			case 'UpdateReason':
				setUpdateReason(value);
				break;
			case 'UpdateBy':
				setUpdateBy(value);
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
		const filteredData = assetUpdates.filter((assetUpdates) => {
			return (
				(AssetCode === '' || assetUpdates.AssetCode.includes(AssetCode)) &&
				(AssetName === '' || assetUpdates.AssetName.includes(AssetName)) &&
				(UpdateBy === '' || assetUpdates.UpdateBy.includes(UpdateBy)) &&
				(UpdateReason === '' || assetUpdates.UpdateReason.includes(UpdateReason)) &&
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
											name="AssetCode"
											containerClass={'mb-3'}
											value={AssetCode}
											key="text"
											onChange={handleFormChange}
										/>
									</Col>
									<Col xl={2}>
										<label className="form-label">자산명</label> <br />
										<TextInput
											type="text"
											name="AssetName"
											containerClass={'mb-3'}
											value={AssetName}
											key="text"
											onChange={handleFormChange}
										/>
									</Col>
									<Col xl={2}>
										<label className="form-label">수정사유</label> <br />
										<TextInput
											type="text"
											name="UpdateReason"
											containerClass={'mb-3'}
											value={UpdateReason}
											key="text"
											onChange={handleFormChange}
										/>
									</Col>
									<Col xl={2}>
										<label className="form-label">수정요청자</label> <br />
										<TextInput
											type="text"
											name="UpdateBy"
											containerClass={'mb-3'}
											value={UpdateBy}
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
									columns={columns(setModalData, setShowModal)}
									data={UpdateList}
									pageSize={10}
									//isExpandable={true}
									isSortable={true}
									pagination={true}
									//isSelectable={true}
									theadClass="table-light"
									searchBoxClass="mb-2"
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

export { UpdateHistory };
