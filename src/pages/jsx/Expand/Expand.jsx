import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Table, PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { columns } from './ColumnsSet';
import { useState } from 'react';
import { assetUpdates } from './data';
import { InfoModal } from './UpdateHistoryModal';

import Select from 'react-select';

const Expand = () => {
	const [UpdateList, setUpdateList] = useState(assetUpdates);
	const [AssetCode, setAssetCode] = useState('');
	const [UpdateReason, setUpdateReason] = useState('');
	const [AssetName, setAssetName] = useState('');
	const [UpdateBy, setUpdateBy] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);
	const [expandedRow, setExpandedRow] = useState(null); // 클릭된 행 상태

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

	const handleRowClick = (rowId) => {
		setExpandedRow(expandedRow === rowId ? null : rowId); // 같은 행 클릭 시 닫기
		console.log('123');
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
									columns={columns(handleRowClick)}
									data={UpdateList.map((row) => ({
										...row,
										isExpanded: expandedRow === row.UpdateNo, // 확장 여부 추가
									}))}
									pageSize={10}
									isSortable={true}
									pagination={true}
									theadClass="table-light"
									searchBoxClass="mb-2"
									rowRenderer={(row) => (
										<>
											<tr key={row.UpdateNo}>
												{/* 기본 데이터 행 */}
												<td>{row.UpdateNo}</td>
												<td>{row.AssetCode}</td>
												<td>{row.AssetName}</td>
												<td>{row.UpdateDate}</td>
												<td>{row.UpdateBy}</td>
												<td>{row.UpdateReason}</td>
											</tr>

											{/* 확장된 내용이 있으면 그 아래에 추가적으로 렌더링 */}
											{row.isExpanded && (
												<tr>
													<td colSpan={6}>
														<div>
															<p>AssetCode: {row.AssetCode}</p>
															<p>수정일자: {row.UpdateDate}</p>
															<p>수정요청자: {row.UpdateBy}</p>
															<p>수정사유: {row.UpdateReason}</p>
														</div>
													</td>
												</tr>
											)}
										</>
									)}
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
