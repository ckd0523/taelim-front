import { Row, Col, Card, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Table } from './Table';
import { columns } from './ColumnsSet';
import { useState, useEffect } from 'react';
import '.././MaintainHistory/Searchbar.css';
import api from '@/common/api/authAxios';
import { InfoModal } from './UpdateHistoryModal';
import classNames from 'classnames';
//import Select from 'react-select';

const urlConfig = import.meta.env.VITE_BASIC_URL;

const UpdateHistory = () => {
	// 데이터 저장
	const [UpdateList, setUpdateList] = useState([]);
	const [originalData, setOriginalData] = useState([]); // 데이터 저장할 위치

	// 모달 관련
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(null);

	const [selectedAssetNo, setSelectedAssetNo] = useState(null); // 선택된 assetNo

	const [showSearchForm, setShowSearchForm] = useState(false);
	const [searchAssetCode, setSearchAssetCode] = useState('');
	const [searchAssetName, setSearchAssetName] = useState('');
	const [searchUpdateReason, setSearchUpdateReason] = useState('');
	const [searchUpdateBy, setSearchUpdateBy] = useState('');
	const [searchStartDate, setSearchStartDate] = useState(null);
	const [searchEndDate, setSearchEndDate] = useState(null);
	const [searchKeyword, setSearchKeyword] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();
		const filteredData = originalData.filter((item) => {
			const updateDate = item.updateDate ? new Date(item.updateDate) : null;
			const searchStart = searchStartDate ? new Date(searchStartDate) : null;
			const searchEnd = searchEndDate ? new Date(searchEndDate) : null;

			return (
				(!searchAssetName ||
					(item.assetName || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchAssetName.replace(/\s+/g, '').toLowerCase())) &&
				(!searchAssetCode ||
					(item.assetCode || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchAssetCode.replace(/\s+/g, '').toLowerCase())) &&
				(!searchUpdateReason ||
					(item.updateReason || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchUpdateReason.replace(/\s+/g, '').toLowerCase())) &&
				(!searchUpdateBy ||
					(item.updateBy || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchUpdateBy.replace(/\s+/g, '').toLowerCase())) &&
				(!searchStart || (updateDate && updateDate >= searchStart)) &&
				(!searchEnd || (updateDate && updateDate <= searchEnd))
			);
		});
		setUpdateList(filteredData);
		console.log(filteredData);
		setSearchAssetName('');
		setSearchAssetCode('');
		setSearchUpdateBy('');
		setSearchUpdateReason('');
		setSearchStartDate('');
		setSearchEndDate('');
	};

	const handleSearch2 = (e) => {
		e.preventDefault();

		const keyword = (searchKeyword || '').replace(/\s+/g, '').toLowerCase().trim();

		if (!keyword) {
			setUpdateList(originalData);
			return;
		}

		const filteredData = originalData.filter((item) => {
			const matchsKeyword = Object.values(item).some(
				(value) =>
					typeof value === 'string' &&
					(value || '').replace(/\s+/g, '').toLowerCase().includes(keyword)
			);
			return matchsKeyword;
		});

		setUpdateList(filteredData);
		setSearchKeyword('');
	};

	// 백엔드에서 수정 이력 데이터를 불러오는 함수
	useEffect(() => {
		const fetchUpdateHistory = async () => {
			try {
				const response = await api.get(`${urlConfig}/updateHistory`); // API 호출
				console.log('가져온 데이터:', response.data); // 가져온 데이터 구조 확인
				setUpdateList(response.data); // 가져온 데이터를 저장
				setOriginalData(response.data); // 검색을 위하 원본 데이터도 저장
			} catch (error) {
				console.log('수정 이력 가져오기 실패 : ', error);
			}
		};
		fetchUpdateHistory();
	}, []);

	// // // Table 에서 해당 번호 눌렀을때, 관련 자산번호 modal창 띄우게 하는 버튼 동작
	// const handleRowClick = (rowData) => {
	// 	console.log('클릭된 행 데이터:', rowData); // 클릭된 행의 데이터
	// 	// 상태 업데이트
	// 	setModalData(rowData);
	// 	setSelectedAssetNo(rowData.assetNo);
	// };

	// 모달 닫기 핸들러에서 상태 초기화
	const handleCloseModal = () => {
		setShowModal(false);
		setModalData(null);
		setSelectedAssetNo(null);
	};
	// 상태가 완전히 업데이트된 후 모달을 열기 위한 useEffect
	useEffect(() => {
		// modalData와 selectedAssetNo가 유효한 상태에서만 모달을 열도록 설정
		if (modalData && selectedAssetNo) {
			setShowModal(true);
		}
	}, [modalData, selectedAssetNo]);

	return (
		<>
			<Row className="pt-3 align-items-center">
				<Col>
					<h4 className="d-flex justify-content-start">수정이력</h4>
				</Col>

				<Col xs="auto" style={{ paddingRight: '0' }}>
					<Button
						className="d-flex align-items-center"
						style={{
							height: '40px',
							background: '#fff',
							border: '#ffff',
							boxShadow: 'none',
							color: '#000000ce',
						}}
						onClick={() => setShowSearchForm((prev) => !prev)}
					>
						{showSearchForm ? (
							<i className="uil-plus font-24 "></i>
						) : (
							<i className="uil-plus font-24 "></i>
						)}
					</Button>
				</Col>

				<Col xs="auto" style={{ paddingLeft: '0' }}>
					<form>
						<fieldset style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type="search"
								placeholder="검색어를 입력하세요."
								style={{
									width: '200px',
									height: '40px',
									float: 'left',
									border: 'none',
								}}
								value={searchKeyword}
								onChange={(e) => setSearchKeyword(e.target.value)}
							/>
							<button
								className="button"
								type="submit"
								style={{
									height: '40px',
									width: '50px',
									float: 'left',
									border: 'none',
								}}
								onClick={handleSearch2}
							>
								<i className="ri-search-line font-22"></i>
							</button>
						</fieldset>
					</form>
				</Col>
			</Row>

			<Card></Card>
			{showSearchForm && (
				<Row className="pt-3 g-0">
					<Col>
						<Card>
							{/* 하단 (padding-bottom)만 0으로 설정 - pb-0 제거 */}
							<Card.Body>
								<Row>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">자산코드</Form.Label>
											<Col lg={12}>
												<Form.Control
													type="text"
													name="assetCode"
													value={searchAssetCode || ''}
													onChange={(e) =>
														setSearchAssetCode(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">자산명</Form.Label>
											<Col lg={12}>
												<Form.Control
													type="text"
													name="assetName"
													value={searchAssetName || ''}
													onChange={(e) =>
														setSearchAssetName(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">수정사유</Form.Label>
											<Col lg={12}>
												<Form.Control
													value={searchUpdateReason || ''} // 현재 선택된 값 설정
													onChange={(e) =>
														setSearchUpdateReason(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">
												수정요청자
											</Form.Label>
											<Col>
												<Form.Control
													type="text"
													name="updateBy"
													value={searchUpdateBy || ''}
													onChange={(e) =>
														setSearchUpdateBy(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>

									{/* <Col lg={3}>
										<Form.Group>
											<Form.Label>수정일자</Form.Label>
											<div className="d-flex align-items-center">
												<Form.Control
													type="date"
													value={searchStartDate || ''}
													onChange={(e) =>
														setSearchStartDate(e.target.value)
													}
												/>
												~
												<Form.Control
													type="date"
													value={searchEndDate || ''}
													onChange={(e) =>
														setSearchEndDate(e.target.value)
													}
												/>
											</div>
										</Form.Group>
									</Col> */}
									<Col lg={4}>
										<Form.Group as={Row}>
											<Form.Label>수정일자</Form.Label>

											<Col xs={5} md={5} lg={4}>
												<Form.Control
													type="date"
													value={searchStartDate || ''}
													onChange={(e) =>
														setSearchStartDate(e.target.value)
													}
													className="me-2" // 오른쪽 여백
												/>
											</Col>
											<Col
												xs={1}
												md={1}
												lg={1}
												className="justify-content-center pt-1 text-center fw-bold"
											>
												~
											</Col>
											<Col xs={5} md={5} lg={4}>
												<Form.Control
													type="date"
													value={searchEndDate || ''}
													onChange={(e) =>
														setSearchEndDate(e.target.value)
													}
													className="ms-2" // 왼쪽 여백
												/>
											</Col>

											<Col lg="auto" className="ms-auto">
												<Button
													variant="dark"
													type="button"
													onClick={handleSearch}
												>
													검색
												</Button>
											</Col>
										</Form.Group>
									</Col>

									{/* <Col className="px-2 pt-3  d-flex justify-content-end" lg={1}>
										<Button variant="dark" type="button" onClick={handleSearch}>
											검색
										</Button>
									</Col> */}
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
			<Row className="pt-3 align-items-center">
				<Col>
					<Card>
						<Card.Body>
							{UpdateList.length > 0 ? (
								<Table
									columns={columns(setModalData, setSelectedAssetNo)}
									data={UpdateList}
									pageSize={10}
									//isExpandable={true}
									isSortable={true}
									pagination={true}
									//isSelectable={true}
									theadClass="table-dark"
									tableClass="border-black"
									searchBoxClass="mb-2"
									onRowClick={() => {}}
									setModalData={setModalData}
									setSelectedAssetNo={setSelectedAssetNo}
									setShowModal={setShowModal}
								/>
							) : (
								<div className="table-responsive">
									<table
										className={classNames('table table-centered react-table')}
									>
										<thead style={{ background: '#313a46' }}>
											<tr>
												<th style={{ color: 'white' }}>번호</th>
												<th style={{ color: 'white' }}>자산코드</th>
												<th style={{ color: 'white' }}>자산명</th>
												<th style={{ color: 'white' }}>수정일자</th>
												<th style={{ color: 'white' }}>수정요청자</th>
												<th style={{ color: 'white' }}>수정사유</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td colSpan="8" className="text-center">
													<div
														className="alert alert-warning"
														role="alert"
													>
														<strong>데이터가 없습니다!</strong>
														<br />
														수정이력 데이터가 없습니다.
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
			{/* Modal */}
			<InfoModal
				show={showModal}
				handleClose={handleCloseModal} // 상태 초기화 포함
				assetNo={selectedAssetNo}
				modalData={modalData} // modalData를 InfoModal로 전달
			/>
		</>
	);
};

export { UpdateHistory };
