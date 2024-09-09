import { Row, Col, Card, Button } from 'react-bootstrap';
import { PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { columns } from './ColumnsSet';
import { useState } from 'react';
import { assetUpdates } from './data';
import { Table } from './ExpandableTable';

const Expand = () => {
	const [UpdateList, setUpdateList] = useState(assetUpdates);
	const [AssetCode, setAssetCode] = useState('');
	const [UpdateReason, setUpdateReason] = useState('');
	const [AssetName, setAssetName] = useState('');
	const [UpdateBy, setUpdateBy] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);

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
									{/* 검색 필터 */}
									<Col xl={2}>
										<label className="form-label">자산코드</label> <br />
										<TextInput
											type="text"
											name="AssetCode"
											containerClass={'mb-3'}
											value={AssetCode}
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
														onChange={(date) =>
															setSelectedStartDate(date)
														}
													/>
												</Col>
												~
												<Col>
													<CustomDatePicker
														hideAddon={true}
														dateFormat="yyyy-MM-dd"
														value={selectedEndDate}
														onChange={(date) =>
															setSelectedEndDate(date)
														}
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
											onClick={handleSearch}
										>
											검색
										</Button>
									</Col>
								</Row>
							</RHForm>

							<Row>
								<Table
									columns={columns}
									data={UpdateList}
									pageSize={10}
									isSortable={true}
									pagination={true}
									theadClass="table-light"
									searchBoxClass="mb-2"
									isExpandable={true} // 확장 가능
								/>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export { Expand };
