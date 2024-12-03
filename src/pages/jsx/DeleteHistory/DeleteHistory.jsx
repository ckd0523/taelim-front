import { Row, Col, Card, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Table } from './Table';
import { columns } from './ColumnsSet';
import { useState, useEffect } from 'react';
//import { assetDeletes } from './data';
const urlConfig = import.meta.env.VITE_BASIC_URL;
import api from '@/common/api/authAxios';
import { InfoModal } from './DeleteHistoryModal';
import classNames from 'classnames';
import '../MaintainHistory/Searchbar.css';
const DeleteHistory = () => {
	// 데이터 저장
	const [DeleteList, setDeleteList] = useState([]);
	const [originalData, setOriginalData] = useState([]); // 전체 데이터를 저장할 상태

	// 모달관련
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [showSearchForm, setShowSearchForm] = useState(false);
	const [searchAssetCode, setSearchAssetCode] = useState('');
	const [searchAssetName, setSearchAssetName] = useState();
	const [searchDeleteReason, setSearchDeleteReason] = useState();
	const [searchDeleteBy, setSearchDeleteBy] = useState();
	const [searchStartDate, setSearchStartDate] = useState(null);
	const [searchEndDate, setSearchEndDate] = useState(null);
	const [searchKeyword, setSearchKeyword] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();
		const filteredData = originalData.filter((item) => {
			const deleteDate = item.deleteDate ? new Date(item.deleteDate) : null;
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
				(!searchDeleteReason ||
					(item.deleteReason || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchDeleteReason.replace(/\s+/g, '').toLowerCase())) &&
				(!searchDeleteBy ||
					(item.deleteBy || '')
						.replace(/\s+/g, '')
						.toLowerCase()
						.includes(searchDeleteBy.replace(/\s+/g, '').toLowerCase())) &&
				(!searchStart || (deleteDate && deleteDate >= searchStart)) &&
				(!searchEnd || (deleteDate && deleteDate <= searchEnd))
			);
		});

		setDeleteList(filteredData);
		console.log(filteredData);
		setSearchAssetName('');
		setSearchAssetCode('');
		setSearchDeleteReason('');
		setSearchDeleteBy('');
		setSearchStartDate('');
		setSearchEndDate('');
	};

	const handleSearch2 = (e) => {
		e.preventDefault();

		const keyword = (searchKeyword || '').replace(/\s+/g, '').toLowerCase().trim();

		if (!keyword) {
			setDeleteList(originalData);
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

		setDeleteList(filteredData);
		setSearchKeyword('');
	};

	// 백엔드에서 폐기이력 데이터를 불러오는 함수
	useEffect(() => {
		const fetchDeleteHistory = async () => {
			try {
				const response = await api.get(`${urlConfig}/deleteHistory`); // API 호출
				console.log('가져온 데이터:', response.data); // 가져온 데이터 구조 확인
				setDeleteList(response.data); // 가져온 데이터를 상태에 저장
				setOriginalData(response.data); // 검색을 위한 원본 데이터도 저장
			} catch (error) {
				console.error('폐기이력 가져오기 실패:', error);
			}
		};
		fetchDeleteHistory();
	}, []);

	// const handleRowClick = (rowData) => {
	// 	setModalData(rowData);
	// 	setShowModal(true);
	// };

	return (
		<>
			<Row className="pt-3 align-items-center">
				<Col>
					<h4 className="d-flex justify-content-start">폐기이력</h4>
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
											<Form.Label className="form-label">폐기사유</Form.Label>
											<Col lg={12}>
												<Form.Control
													type="text"
													name="deleteReason"
													value={searchDeleteReason || ''}
													onChange={(e) =>
														setSearchDeleteReason(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>
									<Col lg={2}>
										<Form.Group>
											<Form.Label className="form-label">폐기자</Form.Label>
											<Col lg={12}>
												<Form.Control
													type="text"
													name="DeleteBy"
													value={searchDeleteBy || ''}
													onChange={(e) =>
														setSearchDeleteBy(e.target.value)
													}
												/>
											</Col>
										</Form.Group>
									</Col>

									<Col lg={3}>
										<Form.Group as={Row}>
											<Form.Label>폐기일자</Form.Label>
											<Col xs={5} md={5} lg={5}>
												<Form.Control
													type="date"
													value={searchStartDate || ''}
													onChange={(e) =>
														setSearchStartDate(e.target.value)
													}
													className="me-2"
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
											<Col xs={5} md={5} lg={5}>
												<Form.Control
													type="date"
													value={searchEndDate || ''}
													onChange={(e) =>
														setSearchEndDate(e.target.value)
													}
													className="ms-2"
												/>
											</Col>
										</Form.Group>
									</Col>

									{/* <Col
										lg={2}
										className="pt-3 d-flex align-items-center justify-content-end"
									> */}
									<Col className="px-2 pt-3  d-flex justify-content-end" lg={1}>
										<Button variant="dark" type="button" onClick={handleSearch}>
											검색
										</Button>
									</Col>
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
							{DeleteList.length > 0 ? (
								<Table
									columns={columns()}
									data={DeleteList}
									pageSize={10}
									//isExpandable={true}
									isSortable={true}
									pagination={true}
									//isSelectable={true}
									theadClass="table-dark"
									tableClass="border-black"
									searchBoxClass="mb-2"
									onRowClick={() => {}} // onRowClick 이벤트를 빈 함수로 설정하여 무시
									setModalData={setModalData}
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
												<th style={{ color: 'white' }}>폐기일자</th>
												<th style={{ color: 'white' }}>폐기자</th>
												<th style={{ color: 'white' }}>폐기사유</th>
												<th style={{ color: 'white' }}>폐기방법</th>
												<th style={{ color: 'white' }}>폐기위치</th>
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
														폐기이력 데이터가 없습니다.
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
				handleClose={() => setShowModal(false)}
				modalData={modalData}
			/>
		</>
	);
};

export { DeleteHistory };
