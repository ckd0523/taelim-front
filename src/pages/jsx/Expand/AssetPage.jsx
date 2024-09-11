import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useExpanded, usePagination } from 'react-table';
import { Table as BootstrapTable, Row, Col, Accordion, Form, Button } from 'react-bootstrap';
import { PageBreadcrumb } from '@/components';
import axios from 'axios';
import classNames from 'classnames';
import PaginationControls from './PaginationControls'; // 새로운 컴포넌트 임포트
import RowDetails from './RowDetails'; // 새로 추가된 컴포넌트 임포트
import './style.css';

const columns = [
	{ Header: '번호', accessor: 'assetNo' },
	{ Header: '자산기준', accessor: 'assetBasis' },
	{ Header: '자산코드', accessor: 'assetCode' },
	{ Header: '자산명', accessor: 'assetName' },
	{ Header: '자산분류', accessor: 'assetClassification' },
	{ Header: '목적/기능', accessor: 'purpose' },
	{ Header: '자산위치', accessor: 'assetLocation' },
	{ Header: '부서', accessor: 'department' },
	{ Header: '사용자', accessor: 'assetUser' },
	{ Header: '소유자', accessor: 'assetOwner' },
];

const getClassificationColumns = (classification) => {
	switch (classification) {
		case 'INFORMATION_PROTECTION_SYSTEM':
			return [{ title: '서비스범위', data: 'serviceScope' }];

		case 'APPLICATION_PROGRAM':
			return [
				{ title: '서비스범위', data: 'serviceScope' },
				{ title: 'OS', data: 'os' },
				{ title: '관련DB', data: 'relatedDB' },
				{ title: 'IP', data: 'ip' },
				{ title: '화면수', data: 'screenNumber' },
			];

		case 'SOFTWARE':
			return [
				{ title: 'IP', data: 'ip' },
				{ title: 'ID', data: 'serverId' },
				{ title: 'PW', data: 'serverPassword' },
				{ title: '담당업체', data: 'companyManager' },
				{ title: 'OS', data: 'os' },
			];

		case 'ELECTRONIC_INFORMATION':
			return [
				{ title: 'OS', data: 'os' },
				{ title: '시스템', data: 'system' },
				{ title: 'DB종류', data: 'dbtype' },
			];

		case 'DOCUMENT':
			return [
				{ title: '문서등급', data: 'documentGrade' },
				{ title: '문서형태', data: 'documentType' },
				{ title: '문서링크', data: 'documentLink' },
			];

		case 'PATENTS_AND_TRADEMARKS':
			return [
				{ title: '출원일자', data: 'applicationDate' },
				{ title: '등록일자', data: 'registrationDate' },
				{ title: '만료일자', data: 'expirationDate' },
				{ title: '특허/상표 상태', data: 'patentTrademarkStatus' },
				{ title: '출원국가', data: 'countryApplication' },
				{ title: '특허분류', data: 'patentClassification' },
				{ title: '특허세목', data: 'patentItem' },
				{ title: '출원번호', data: 'applicationNo' },
				{ title: '발명자', data: 'inventor' },
				{ title: '권리권자', data: 'assignee' },
				{ title: '관련문서', data: 'relatedDocuments' },
			];

		case 'ITSYSTEM_EQUIPMENT':
			return [
				{ title: '장비유형', data: 'equipmentType' },
				{ title: '랙유닛', data: 'rackUnit' },
				{ title: '전원공급장치', data: 'powerSupply' },
				{ title: '쿨링시스템', data: 'coolingSystem' },
				{ title: '인터페이스 포트', data: 'interfacePorts' },
				{ title: '폼팩터', data: 'formFactor' },
				{ title: '확장슬롯수', data: 'expansionSlots' },
				{ title: '그래픽카드', data: 'graphicsCard' },
				{ title: '포트 구성', data: 'portConfiguration' },
				{ title: '모니터 포함여부', data: 'monitorIncluded' },
			];

		case 'ITNETWORK_EQUIPMENT':
			return [
				{ title: '장비유형', data: 'equipmentType' },
				{ title: '포트수', data: 'numberOfPorts' },
				{ title: '지원프로토콜', data: 'supportedProtocols' },
				{ title: '펌웨어 버전', data: 'firmwareVersion' },
				{ title: '네트워크 속도', data: 'networkSpeed' },
				{ title: '서비스범위', data: 'serviceScope' },
			];

		case 'TERMINAL':
			return [
				{ title: 'IP', data: 'ip' },
				{ title: '제품 시리얼 번호', data: 'productSerialNumber' },
				{ title: 'OS', data: 'os' },
				{ title: '보안관제', data: 'securityControl' },
				{ title: '내부정보 유출 방지', data: 'kaitsKeeper' },
				{ title: '악성코드,랜섬웨어 탐지', data: 'V3OfficeSecurity' },
				{ title: '안티랜섬웨어', data: 'appCheckPro' },
				{ title: 'NAC agent', data: 'tgate' },
			];

		case 'FURNITURE':
			return [{ title: '크기', data: 'furnitureSize' }];

		case 'DEVICES':
			return [
				{ title: '기기유형', data: 'deviceType' },
				{ title: '모델번호', data: 'modelNumber' },
				{ title: '연결방식', data: 'connectionType' },
				{ title: '전원사양', data: 'powerSpecifications' },
			];

		case 'CAR':
			return [
				{ title: '배기량', data: 'displacement' },
				{ title: '차량의 문 수', data: 'doorsCount' },
				{ title: '엔진 형식', data: 'engineType' },
				{ title: '차량 종류', data: 'carType' },
				{ title: '차량 식별번호', data: 'identificationNo' },
				{ title: '차량 색상', data: 'carColor' },
				{ title: '연식', data: 'modelYear' },
			];

		case 'OTHERASSETS':
			return [
				{ title: '기타 세부 설명', data: 'otherDescription' },
				{ title: '사용 빈도', data: 'usageFrequency' },
			];

		default:
			return [];
	}
};

// 중요성 점수를 계산
const calculateImportanceScore = (selectedRowData) => {
	if (selectedRowData) {
		const { confidentiality, integrity, availability } = selectedRowData;
		return (confidentiality || 0) + (integrity || 0) + (availability || 0);
	}
	return 0;
};

// 중요성 등급을 계산
const calculateImportanceRating = (score) => {
	if (score >= 7 && score <= 9) return 'A급';
	if (score >= 5 && score <= 6) return 'B급';
	if (score >= 3 && score <= 4) return 'C급';
	return 'N/A';
};

const AssetPage = () => {
	const [data, setData] = useState([]);
	const [pageSize, setPageSize] = useState(5);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedRowData, setSelectedRowData] = useState(null); // 선택된 행 데이터
	const [pageIndex, setPageIndex] = useState(0); // 현재 페이지 인덱스

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://133.186.153.78/api/assets/approved-not-disposed'
				);
				setData(response.data);
			} catch (error) {
				console.error('데이터를 가져오는 중 오류 발생:', error);
			}
		};
		fetchData();
	}, []);

	const fetchRowData = async (assetCode) => {
		try {
			const response = await axios.get(`http://133.186.153.78/api/asset/${assetCode}`);
			setSelectedRowData(response.data);
		} catch (error) {
			console.error('자산 데이터를 가져오는 중 오류 발생:', error);
		}
	};

	const filteredData = React.useMemo(
		() =>
			data.filter((item) =>
				Object.values(item).some((value) =>
					String(value).toLowerCase().includes(searchTerm.toLowerCase())
				)
			),
		[data, searchTerm]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize: setTablePageSize,
	} = useTable(
		{
			columns,
			data: filteredData,
			initialState: { pageSize },
			pageCount: Math.ceil(filteredData.length / pageSize),
			autoResetPage: false, // 페이지 크기 변경 시 페이지를 0으로 리셋하지 않음
		},
		useSortBy,
		useExpanded,
		usePagination
	);

	// 현재 페이지 인덱스를 직접 관리하는 상태 업데이트
	useEffect(() => {
		gotoPage(pageIndex);
	}, [pageIndex, gotoPage]);

	const handlePageSizeChange = (e) => {
		setPageSize(Number(e.target.value));
		setTablePageSize(Number(e.target.value));
		setPageIndex(0); // 페이지 크기 변경 시 첫 페이지로 리셋
	};

	const importanceScore = calculateImportanceScore(selectedRowData);
	const importanceRating = calculateImportanceRating(importanceScore);
	const classification = selectedRowData?.assetClassification;
	const dynamicColumns = React.useMemo(
		() => getClassificationColumns(classification),
		[classification]
	);

	return (
		<>
			<PageBreadcrumb title="자산목록" subName="Tables" />

			<Row>
				<Col>
					<div
						style={{
							border: '1px solid #000000', // 실선의 색상
							borderRadius: '8px', // 둥근 모서리
							backgroundColor: '#f2f7ff', // 옅은 파란색 배경
							padding: '16px', // 여백 추가
							marginBottom: '20px', // 아래 여백 추가
						}}
					>
						{/* 자산명, 자산위치, 사용자, 부서명 */}
						<Form.Group className="mb-3">
							<Row className="align-items-center">
								<Col md={3} className="d-flex align-items-center">
									<Form.Label htmlFor="assetName" className="me-2 mb-0">
										자산명
									</Form.Label>
									<Form.Control
										id="assetName"
										type="text"
										placeholder="자산명을 입력하세요..."
										value={searchTerm}
										onChange={(event) => setSearchTerm(event.target.value)}
										style={{ width: '40%' }}
									/>
								</Col>

								<Col md={3} className="d-flex align-items-center">
									<Form.Label htmlFor="assetLocation" className="me-2 mb-0">
										자산위치
									</Form.Label>
									<Form.Select id="assetLocation" style={{ width: '40%' }}>
										<option>위치를 선택하세요</option>
										<option value="location1">위치1</option>
										<option value="location2">위치2</option>
									</Form.Select>
								</Col>

								<Col md={3} className="d-flex align-items-center">
									<Form.Label htmlFor="userName" className="me-2 mb-0">
										사용자
									</Form.Label>
									<Form.Control
										id="userName"
										type="text"
										placeholder="사용자명을 입력하세요..."
										style={{ width: '40%' }}
									/>
								</Col>

								<Col md={3} className="d-flex align-items-center">
									<Form.Label htmlFor="departmentName" className="me-2 mb-0">
										부서명
									</Form.Label>
									<Form.Select id="departmentName" style={{ width: '40%' }}>
										<option>부서를 선택하세요</option>
										<option value="dept1">부서1</option>
										<option value="dept2">부서2</option>
									</Form.Select>
								</Col>
							</Row>
						</Form.Group>

						{/* 취득일자 및 가치 */}
						<Form.Group className="mb-3">
							<Row className="align-items-center">
								<Col md={4} className="d-flex align-items-center">
									<Form.Label
										htmlFor="acquisitionStartDate"
										className="me-2 mb-0"
										style={{ width: '40%' }}
									>
										취득일자
									</Form.Label>
									<Form.Control id="acquisitionStartDate" type="date" />
									~
									<Form.Control
										id="acquisitionEndDate"
										type="date"
										className="ms-2"
									/>
								</Col>

								<Col md={4} className="d-flex align-items-center">
									<Form.Label htmlFor="assetValue" className="me-2 mb-0">
										가치
									</Form.Label>
									<Form.Select id="assetValue" style={{ width: '40%' }}>
										<option>가치를 선택하세요</option>
										<option value="high">높음</option>
										<option value="medium">보통</option>
										<option value="low">낮음</option>
									</Form.Select>
								</Col>

								<Col md={4} className="d-flex justify-content-end">
									<Button variant="primary">검색</Button>
								</Col>
							</Row>
						</Form.Group>
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

					{/* 테이블 */}
					<BootstrapTable striped bordered hover {...getTableProps()}>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps(
												column.getSortByToggleProps()
											)}
											className={classNames({
												sorting_desc: column.isSortedDesc,
												sorting_asc: !column.isSortedDesc,
											})}
										>
											{column.render('Header')}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{page.map((row) => {
								prepareRow(row);
								return (
									<React.Fragment key={row.id}>
										<tr
											{...row.getRowProps()}
											onClick={() => {
												row.toggleRowExpanded(!row.isExpanded);
												fetchRowData(row.original.assetCode); // 자산 코드로 데이터 가져오기
											}}
										>
											{row.cells.map((cell) => (
												<td {...cell.getCellProps()}>
													{cell.render('Cell')}
												</td>
											))}
										</tr>

										{/* 행 클릭 시 확장되는 세부 정보 */}
										{row.isExpanded && selectedRowData && (
											<tr>
												<td colSpan={columns.length}>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
														}}
													>
														{/* 이미지 표시 부분 */}
														<div style={{ marginRight: '20px' }}>
															{selectedRowData.files &&
																selectedRowData.files.length >
																	0 && (
																	<img
																		src={
																			selectedRowData.files[0]
																				.fileURL
																		}
																		alt={
																			selectedRowData.files[0]
																				.oriFileName
																		}
																		style={{
																			width: '300px',
																			height: 'auto',
																		}}
																	/>
																)}
														</div>
														{/* 우측의 세부 정보 */}
														<div style={{ flexGrow: 1 }}>
															<RowDetails
																row={row}
																selectedRowData={selectedRowData}
																importanceScore={importanceScore}
																importanceRating={importanceRating}
																dynamicColumns={dynamicColumns}
															/>
														</div>
													</div>
												</td>
											</tr>
										)}
									</React.Fragment>
								);
							})}
						</tbody>
					</BootstrapTable>

					{/* 페이지네이션 및 표시 수 선택 */}
					<PaginationControls
						pageSize={pageSize}
						setPageSize={setTablePageSize}
						pageIndex={pageIndex}
						setPageIndex={setPageIndex}
						canPreviousPage={canPreviousPage}
						canNextPage={canNextPage}
						pageOptions={pageOptions}
						gotoPage={gotoPage}
						previousPage={previousPage}
						nextPage={nextPage}
						pageCount={pageOptions.length}
					/>
				</Col>
			</Row>
		</>
	);
};

export { AssetPage };
