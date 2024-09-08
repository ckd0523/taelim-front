import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Table, PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { columns } from './ColumnsSet';
import { useState } from 'react';
import { assetDeletes } from './data';
import { InfoModal } from './DeleteHistoryModal';

import Select from 'react-select';

const DeleteHistory = () => {
	const [DeleteList, setDeleteList] = useState(assetDeletes);
	const [AssetName, setAssetName] = useState('');
	const [AssetCode, setAssetCode] = useState('');
	const [DeleteReason, setDeleteReason] = useState('');
	const [DeleteBy, setDeleteBy] = useState('');
	const [DeleteMethod, setDeleteMethod] = useState('');
	const [DeleteLocation, setDeleteLocation] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'AssetCode':
				setAssetCode(value);
				console.log(value);
				break;
			case 'AssetName':
				setAssetName(value);
				break;
			case 'DeleteReason':
				setDeleteReason(value);
				break;
			case 'DeleteBy':
				setDeleteBy(value);
				break;
			case 'DeleteMethod':
				setDeleteMethod(value);
				break;
			case 'DeleteLocation':
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
		const filteredData = assetDeletes.filter((assetDeletes) => {
			return (
				(AssetName === '' || assetDeletes.AssetName.includes(AssetName)) &&
				(AssetCode === '' || assetDeletes.AssetCode.includes(AssetCode)) &&
				(DeleteReason === '' || assetDeletes.DeleteReason.includes(DeleteReason)) &&
				(DeleteBy === '' || assetDeletes.DeleteBy.includes(DeleteBy)) &&
				(DeleteMethod === '' || assetDeletes.DeleteMethod.includes(DeleteMethod)) &&
				(DeleteLocation === '' || assetDeletes.DeleteLocation.includes(DeleteLocation)) &&
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
											name="AssetName"
											containerClass={'mb-3'}
											value={AssetName}
											key="text"
											onChange={handleChange}
										/>
									</Col>
									<Col xl={3}>
										<label className="form-label">자산코드</label> <br />
										<TextInput
											type="text"
											name="AssetCode"
											containerClass={'mb-3'}
											value={AssetCode}
											key="text"
											onChange={handleChange}
										/>
									</Col>
									<Col xl={3}>
										<label className="form-label">폐기사유</label> <br />
										<TextInput
											type="text"
											name="DeleteReason"
											containerClass={'mb-3'}
											value={DeleteReason}
											key="text"
											onChange={handleChange}
										/>
									</Col>
									<Col xl={3}>
										<label className="form-label">폐기방법</label> <br />
										<TextInput
											type="text"
											name="DeleteMethod"
											containerClass={'mb-3'}
											value={DeleteMethod}
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
											value={DeleteLocation}
											key="text"
											onChange={DeleteLocation}
										/>
									</Col>
									<Col xl={3}>
										<label className="form-label">폐기자</label> <br />
										<TextInput
											type="text"
											name="DeleteBy"
											containerClass={'mb-3'}
											value={DeleteBy}
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
