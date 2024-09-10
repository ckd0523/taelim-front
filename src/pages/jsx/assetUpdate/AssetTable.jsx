import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { columns } from './ColumnsSet'; // table의 column 설정
import { Table } from './ExpandableTable';

const AssetTable = () => {
	const [data, setData] = useState([]);
	const [UpdateList, setUpdateList] = useState([]);
	const [assetCode, setAssetCode] = useState('');
	const [assetName, setAssetName] = useState('');
	const [department, setDepartment] = useState('');
	const [assetOwner, setAssetOwner] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null); // 이건 아직 안됨
	const [selectedEndDate, setSelectedEndDate] = useState(null); //  이건 아직 안됨

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://133.186.153.78:8080/assets/approved-not-disposed'
				);
				setData(response.data);
				setUpdateList(response.data); // 데이터를 가져온 후 UpdateList를 업데이트
			} catch (error) {
				console.error('데이터를 가져오는 중 오류 발생:', error);
			}
		};
		fetchData();
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
			case 'department':
				setDepartment(value);
				break;
			case 'assetOwner':
				setAssetOwner(value);
				break;
			default:
				break;
		}
	};

	const handleSearch = () => {
		const filteredData = data.filter((item) => {
			return (
				(assetCode === '' || (item.assetCode && item.assetCode.includes(assetCode))) &&
				(assetName === '' || (item.assetName && item.assetName.includes(assetName))) &&
				(department === '' || (item.department && item.department.includes(department))) &&
				(assetOwner === '' || (item.assetOwner && item.assetOwner.includes(assetOwner))) &&
				(selectedStartDate === null || new Date(item.updateDate) >= selectedStartDate) &&
				(selectedEndDate === null || new Date(item.updateDate) <= selectedEndDate)
			);
		});

		setUpdateList(filteredData); // 필터링된 데이터를 UpdateList에 저장
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
											name="assetCode"
											containerClass={'mb-3'}
											value={assetCode}
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
											onChange={handleFormChange}
										/>
									</Col>
									<Col xl={2}>
										<label className="form-label">부서</label> <br />
										<TextInput
											type="text"
											name="department"
											containerClass={'mb-3'}
											value={department}
											onChange={handleFormChange}
										/>
									</Col>
									<Col xl={2}>
										<label className="form-label">사용자</label> <br />
										<TextInput
											type="text"
											name="assetOwner"
											containerClass={'mb-3'}
											value={assetOwner}
											onChange={handleFormChange}
										/>
									</Col>
									<Col xl={4}>
										<div className="text-lg mt-xl-0 mt-2">
											<label className="form-label">취득일자</label> <br />
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

export { AssetTable };
