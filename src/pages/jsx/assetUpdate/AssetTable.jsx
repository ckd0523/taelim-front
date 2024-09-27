import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { PageBreadcrumb, Form as RHForm } from '@/components';

import { columns as baseColumns } from './ColumnsSet'; // table의 column 설정
import { Table } from './ExpandableTable';
import { ActionModal } from './AllChangeModal';
import { SearchForm } from './AssetSearchBar';
import { AssetButtons } from './AssetButton';
import { DisposeModal } from './DisposeModal';

import axios from 'axios';

const urlConfig = import.meta.env.VITE_BASIC_URL;

const AssetTable = () => {
	const [data, setData] = useState([]);
	const [UpdateList, setUpdateList] = useState([]);

	// 선택된 Row 배열,
	const [rowSelect, setRowSelect] = useState([]);
	const [actionType, setActionType] = useState(null);
	const [showActModal, setShowActModal] = useState(false);

	const handleOpenModal = (type) => {
		setActionType(type);
		setShowActModal(true);
	};

	// 폐기 모달창 부분
	const [showModal, setShowModal] = useState(false); // 모달창 열기/닫기 상태
	// 모달에서 자산 폐기 요청을 처리할 때 assetCode를 전달하기 위한 상태 추가
	const [selectedAssetCode, setSelectedAssetCode] = useState('');

	// 폐기 관련
	const [isDisposed, setIsDisposed] = useState(false); // 상태 관리 추가
	const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태

	// 폐기 모달창 열기 위한 동작 - assetCode 로 보냄 - 휴지통 클릭 동작
	const handleShow = (assetCode) => {
		setSelectedAssetCode(assetCode); // 모달을 열 때 해당 자산 코드를 설정
		setShowModal(true); // 모달을 열기
	};

	// 폐기 모달창 닫기 위한 동작 - DisposeModal.jsx에서 처리
	const handleClose = () => {
		setShowModal(false);
	};

	// 자산 테이블 List 불러옴
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${urlConfig}/assets/approved-not-disposed`);
				setData(response.data);
				setUpdateList(response.data); // 데이터를 가져온 후 UpdateList를 업데이트
			} catch (error) {
				console.error('데이터를 가져오는 중 오류 발생:', error);
			}
		};
		fetchData();
	}, []);

	// 검색필터 조건
	const handleSearch = ({
		assetCode,
		assetName,
		department,
		assetOwner,
		assetLocation,
		selectedStartDate,
		selectedEndDate,
	}) => {
		const filteredData = data.filter((item) => {
			return (
				(assetCode === '' || (item.assetCode && item.assetCode.includes(assetCode))) &&
				(assetName === '' || (item.assetName && item.assetName.includes(assetName))) &&
				(department === '' || (item.department && item.department.includes(department))) &&
				(assetOwner === '' || (item.assetOwner && item.assetOwner.includes(assetOwner))) &&
				(assetLocation === '' ||
					(item.assetLocation && item.assetLocation.includes(assetLocation))) &&
				(selectedStartDate === null ||
					new Date(item.introducedDate) >= selectedStartDate) &&
				(selectedEndDate === null || new Date(item.introducedDate) <= selectedEndDate)
			);
		});

		setUpdateList(filteredData); // 필터링된 데이터를 UpdateList에 저장
	};

	// 자산 폐기 처리 동작
	const handleDisposeAsset = async (assetCode, disposeDto) => {
		try {
			const response = await axios.post(`${urlConfig}/disposeAsset/${assetCode}`, disposeDto);

			if (response.status === 200) {
				console.log('자산 폐기 성공:', assetCode);
				setUpdateList((prevData) =>
					prevData.filter((item) => item.assetCode !== assetCode)
				);
			} else {
				console.error('자산 폐기 실패:', assetCode);
			}
		} catch (error) {
			console.error(`자산 폐기 중 오류 발생: ${assetCode}`, error);
		}
	};

	// 자산 폐기 요청 동작
	const handleDisposeDemand = async (assetCode, disposeDto) => {
		try {
			const response = await axios.post(
				`${urlConfig}/disposeDemand/${assetCode}`,
				disposeDto
			);

			if (response.status === 200) {
				console.log('자산 폐기 요청 성공:', assetCode);
				setUpdateList((prevList) =>
					prevList.map((item) =>
						item.assetCode === assetCode ? { ...item, isDisposed: true } : item
					)
				);
			} else {
				console.error('자산 폐기 요청 실패:', assetCode);
			}
		} catch (error) {
			console.error(`자산 폐기 요청 중 오류 발생: ${assetCode}`, error);
		}
	};

	// 컬럼에 휴지통 아이콘 handleDisposeAsset 전달
	const columns = baseColumns.map((column) => {
		if (column.Header === 'Action') {
			return {
				...column,
				Cell: ({ row }) => (
					<button
						className="btn btn-danger"
						onClick={() => handleShow(row.original.assetCode)} // 모달을 열도록 handleShow 사용 , assetCode 담아서
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
									<Row className="mb-4">
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
									<Row className="mb-1">
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
										<Button
											variant="secondary"
											onClick={() => handleOpenModal('AllUpdate', rowSelect)}
											style={{ width: '60%' }}
										>
											일괄 수정
										</Button>
									</Col>
									<Col md={1} className="mb-2 text-end">
										<Button
											variant="danger"
											onClick={() => handleOpenModal('AllDispose', rowSelect)}
											style={{ width: '60%' }}
										>
											일괄 폐기
										</Button>
									</Col>
									<Col md={1} className="mb-2 text-end">
										<Button
											variant="secondary"
											onClick={() =>
												handleOpenModal('AllUpdateDemand', rowSelect)
											}
											style={{ width: '60%' }}
										>
											일괄 수정 요청
										</Button>
									</Col>
									<Col md={1} className="mb-2 text-end">
										<Button
											variant="danger"
											onClick={() =>
												handleOpenModal('AllDisposeDemand', rowSelect)
											}
											style={{ width: '60%' }}
										>
											일괄 폐기 요청
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

							{/*폐기 모달창 */}
							<Modal show={showModal} onHide={handleClose}>
								<Modal.Header closeButton>
									<Modal.Title>
										폐기 요청 - 자산 코드: {selectedAssetCode}
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form>
										<Form.Group className="mb-3">
											<Form.Label>구분</Form.Label>
											<Form.Control type="text" value="폐기" readOnly />
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Label>폐기 사유</Form.Label>
											<Form.Select
												value={disposeReason}
												onChange={(e) => setDisposeReason(e.target.value)}
											>
												<option value="">사유를 선택하세요</option>
												<option value="노후화">노후화</option>
												<option value="고장">고장</option>
												<option value="성능저하">성능저하</option>
											</Form.Select>
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Label>폐기 내용</Form.Label>
											<Form.Control
												as="textarea"
												rows={3}
												value={disposeDetail}
												onChange={(e) => setDisposeDetail(e.target.value)}
											/>
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Label>폐기 위치</Form.Label>
											<Form.Control
												type="text"
												value={disposeLocation}
												onChange={(e) => setDisposeLocation(e.target.value)}
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label>폐기 방법</Form.Label>
											<Form.Control
												type="text"
												value={disposeMethod}
												onChange={(e) => setDisposeMethod(e.target.value)}
											/>
										</Form.Group>
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="danger" onClick={handleRequest}>
										폐기요청
									</Button>
									<Button
										variant="danger"
										onClick={() => handleDisposeAsset(selectedAssetCode)}
									>
										폐기
									</Button>
									<Button variant="secondary" onClick={() => handleClose()}>
										취소
									</Button>
								</Modal.Footer>
							</Modal>
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
									setRowSelect={setRowSelect}
								/>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<ActionModal
				show={showActModal}
				handleClose={() => setShowActModal(false)}
				actionType={actionType}
				actionData={rowSelect}
			/>
		</>
	);
};

export { AssetTable };
