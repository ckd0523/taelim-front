import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { columns as baseColumns } from './ColumnsSet'; // table의 column 설정
import { Table } from './ExpandableTable';

const AssetTable = () => {
	const [data, setData] = useState([]);
	const [UpdateList, setUpdateList] = useState([]);
	const [assetCode, setAssetCode] = useState('');
	const [assetName, setAssetName] = useState('');
	const [department, setDepartment] = useState('');
	const [assetOwner, setAssetOwner] = useState('');
	const [assetLocation, setAssetLocation] = useState('');
	const [introducedDate, setIntroduceDate] = useState('');
	const [selectedStartDate, setSelectedStartDate] = useState(null); // 이건 아직 안됨
	const [selectedEndDate, setSelectedEndDate] = useState(null); //  이건 아직 안됨

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8080/assets/approved-not-disposed'
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
			case 'assetLocation':
				setAssetLocation(value);
			case 'introducedDate':
				setIntroduceDate(value);
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
				(assetLocation === '' ||
					(item.assetLocation && item.assetLocation.includes(assetLocation))) &&
				(selectedStartDate === null || new Date(item.updateDate) >= selectedStartDate) &&
				(selectedEndDate === null || new Date(item.updateDate) <= selectedEndDate)
			);
		});

		setUpdateList(filteredData); // 필터링된 데이터를 UpdateList에 저장
	};

	// 자산 폐기 처리 동작
	const handleDisposeAsset = async (assetCode) => {
		try {
			// API 요청 보내기
			const response = await fetch(`http://localhost:8080/dispose/${assetCode}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			// 성공 여부 확인
			if (response.ok) {
				// 요청이 성공하면 처리할 로직 (예: 테이블에서 해당 행 제거 또는 성공 메시지 출력)
				console.log('자산이 성공적으로 폐기되었습니다:', assetCode);
			} else {
				console.error(`자산 폐기 실패: ${assetCode}`);
			}
		} catch (error) {
			// 오류 처리
			console.error(`자산 폐기 중 오류 발생: ${assetCode}:`, error);
		}
	};

	// 컬럼 설정에 handleDisposeAsset 전달
	const columns = baseColumns.map((column) => {
		if (column.Header === 'Action') {
			return {
				...column,
				Cell: ({ row }) => (
					<button
						className="btn btn-danger"
						onClick={() => handleDisposeAsset(row.original.assetCode)}
					>
						<i className="mdi mdi-trash-can-outline" style={{ fontSize: '1.2rem' }}></i>
					</button>
				),
			};
		}
		return column;
	});
	return (
		<>
			<PageBreadcrumb title="UpdateHistory" subName="UpdateHistory" />

			<Row>
				<Col xs={12}>
					<Card>
						<Card.Body>
							<div
								style={{
									border: '1px solid #000000', // 실선의 색상
									borderRadius: '8px', // 둥근 모서리
									backgroundColor: '#f2f7ff', // 옅은 파란색 배경
									padding: '16px', // 여백 추가
									marginBottom: '20px', // 아래 여백 추가
								}}
							>
								<RHForm onChange={handleFormChange}>
									<Row className="mb-3">
										{/* 검색 필터 상단 */}
										<Col md={3} className="d-flex align-items-center">
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<Form.Label
													className="me-2 mb-0"
													style={{ width: '40%' }}
												>
													자산명
												</Form.Label>
												<Form.Control
													name="assetName"
													type="text"
													placeholder="자산명을 입력하세요..."
													value={assetName}
													onChange={handleFormChange}
												/>
											</div>
										</Col>
										<Col md={3} className="d-flex align-items-center">
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<Form.Label
													className="me-2 mb-0"
													style={{ width: '40%' }}
												>
													자산위치
												</Form.Label>
												<Form.Control
													name="assetLocation"
													type="text"
													placeholder="자산위치를 입력하세요..."
													value={assetLocation}
													onChange={handleFormChange}
												/>
											</div>
										</Col>
										<Col md={3} className="d-flex align-items-center">
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<Form.Label
													className="me-2 mb-0"
													style={{ width: '40%' }}
												>
													사용자
												</Form.Label>
												<Form.Control
													name="assetOwner"
													type="text"
													placeholder="사용자를 입력하세요..."
													value={assetOwner}
													onChange={handleFormChange}
												/>
											</div>
										</Col>
										<Col md={3} className="d-flex align-items-center">
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<Form.Label
													className="me-2 mb-0"
													style={{ width: '40%' }}
												>
													부서
												</Form.Label>
												<Form.Control
													name="department"
													type="text"
													placeholder="부서를 입력하세요..."
													value={department}
													onChange={handleFormChange}
												/>
											</div>
										</Col>
									</Row>
									<Row className="mb-3">
										{/* 검색 필터 하단 */}
										<Col md={4} className="d-flex align-items-center">
											<Form.Label
												htmlFor="acquisitionStartDate"
												className="me-2 mb-0"
												style={{ width: '40%' }}
											>
												취득일자
											</Form.Label>
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
										</Col>
										<Col md={8} className="d-flex justify-content-end">
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
							</div>
							{/* 버튼 4개 추가 */}
							<Form.Group className="mb-3">
								<Row className="d-flex justify-content-end">
									<Col md={1} className="mb-2 text-end">
										<Button variant="secondary" style={{ width: '60%' }}>
											일괄 수정
										</Button>
									</Col>
									<Col md={1} className="mb-2 text-end">
										<Button variant="danger" style={{ width: '60%' }}>
											일괄 폐기
										</Button>
									</Col>
									<Col md={1} className="mb-2 text-end">
										<Button variant="info" style={{ width: '50%' }}>
											QR
										</Button>
									</Col>
									<Col md={1} className="mb-2 text-end">
										<Button variant="success" style={{ width: '60%' }}>
											엑셀 출력
										</Button>
									</Col>
								</Row>
							</Form.Group>
							<Row>
								<Table
									columns={columns}
									data={UpdateList}
									pageSize={10}
									isSortable={true}
									isSelectable={true}
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
