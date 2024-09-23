import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';

import { columns as baseColumns } from './ColumnsSet'; // table의 column 설정
import { Table } from './ExpandableTable';
import { SearchForm } from './AssetSearchBar';

import axios from 'axios';
const urlConfig = import.meta.env.VITE_BASIC_URL;

const AssetTable = () => {
	const [data, setData] = useState([]);
	const [UpdateList, setUpdateList] = useState([]);

	// 폐기 모달창 부분
	const [showModal, setShowModal] = useState(false); // 모달창 열기/닫기 상태
	// 모달에서 자산 폐기 요청을 처리할 때 assetCode를 전달하기 위한 상태 추가
	const [selectedAssetCode, setSelectedAssetCode] = useState('');
	// handleShow 수정하여 모달을 열 때 자산 코드를 설정

	// 폐기 관련 state
	const [disposeReason, setDisposeReason] = useState('');
	const [disposeDetail, setDisposeDetail] = useState('');
	const [disposeLocation, setDisposeLocation] = useState('');
	const [disposeMethod, setDisposeMethod] = useState('');
	const [isDisposed, setIsDisposed] = useState(false); // 상태 관리 추가
	const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태

	// 상태 초기화 함수
	const resetForm = () => {
		setDisposeReason('');
		setDisposeDetail('');
		setDisposeLocation('');
		setDisposeMethod('');
	};

	const handleShow = (assetCode) => {
		setSelectedAssetCode(assetCode); // 모달을 열 때 해당 자산 코드를 설정
		setShowModal(true); // 모달을 열기
	};
	const handleClose = () => {
		resetForm();
		setShowModal(false);
	};

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
	const handleDisposeAsset = async (assetCode) => {
		const disposeDto = {
			disposeReason,
			disposeDetail,
			disposeLocation,
			disposeMethod,
		};

		try {
			const response = await axios.post(`${urlConfig}/disposeAsset/${assetCode}`, disposeDto);

			if (response.status === 200) {
				console.log('자산 폐기 성공:', assetCode);
				setUpdateList((prevData) =>
					prevData.filter((item) => item.assetCode !== assetCode)
				);
				resetForm();
				handleClose();
			} else {
				console.error('자산 폐기 실패:', assetCode);
			}
		} catch (error) {
			console.error(`자산 폐기 중 오류 발생: ${assetCode}`, error);
		}
	};

	// 자산 폐기 요청 동작
	const handleDisposeDemand = async (assetCode) => {
		const disposeDto = {
			disposeReason,
			disposeDetail,
			disposeLocation,
			disposeMethod,
		};

		try {
			const response = await axios.post(
				`${urlConfig}/disposeDemand/${assetCode}`,
				disposeDto
			);

			if (response.status === 200) {
				console.log('자산 폐기 요청 성공:', assetCode);
				// UI를 즉시 업데이트
				setUpdateList((prevList) =>
					prevList.map((item) =>
						item.assetCode === assetCode ? { ...item, isDisposed: true } : item
					)
				);
				resetForm();
				handleClose();
			} else {
				console.error('자산 폐기 요청 실패:', assetCode);
			}
		} catch (error) {
			console.error(`자산 폐기 요청 중 오류 발생: ${assetCode}`, error);
		}
	};

	// 폐기 요청 버튼 클릭 핸들러
	const handleRequest = async () => {
		if (isDisposed) {
			setErrorMessage('폐기 요청이 이미 들어간 자산입니다.');
		} else {
			await handleDisposeDemand(selectedAssetCode); // await을 추가하여 비동기 작업 완료 후 상태 업데이트
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
			<PageBreadcrumb title="자산조회부분" subName="UpdateHistory" />

			<div>
				<Card></Card>
				{/* 검색 폼 하위 컴포넌트 */}
				<SearchForm onSearch={handleSearch} />

				<Row>
					<Col xs={12}>
						<Card>
							<Card.Body>
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
													onChange={(e) =>
														setDisposeReason(e.target.value)
													}
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
													onChange={(e) =>
														setDisposeDetail(e.target.value)
													}
												/>
											</Form.Group>
											<Form.Group className="mb-3">
												<Form.Label>폐기 위치</Form.Label>
												<Form.Control
													type="text"
													value={disposeLocation}
													onChange={(e) =>
														setDisposeLocation(e.target.value)
													}
												/>
											</Form.Group>
											<Form.Group>
												<Form.Label>폐기 방법</Form.Label>
												<Form.Control
													type="text"
													value={disposeMethod}
													onChange={(e) =>
														setDisposeMethod(e.target.value)
													}
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
								<RHForm>
									<Card>
										<Card.Body>
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
										</Card.Body>
									</Card>
								</RHForm>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
};

export { AssetTable };
