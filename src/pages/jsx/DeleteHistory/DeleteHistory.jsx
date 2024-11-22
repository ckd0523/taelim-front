import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { Table } from './Table';
import { columns } from './ColumnsSet';
import { useState, useEffect } from 'react';
//import { assetDeletes } from './data';
const urlConfig = import.meta.env.VITE_BASIC_URL;
import api from '@/common/api/authAxios';
import { InfoModal } from './DeleteHistoryModal';
import { SearchForm } from './DeleteSearchBar';
import classNames from 'classnames';

const DeleteHistory = () => {
	// 데이터 저장
	const [DeleteList, setDeleteList] = useState([]);
	const [originalData, setOriginalData] = useState([]); // 전체 데이터를 저장할 상태

	// 모달관련
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState(null);

	// 백엔드에서 폐기이력 데이터를 불러오는 함수
	useEffect(() => {
		const fetchDeleteHistory = async () => {
			try {
				const response = await api.get(`${urlConfig}/deleteHistory`); // API 호출
				setDeleteList(response.data); // 가져온 데이터를 상태에 저장
				setOriginalData(response.data); // 검색을 위한 원본 데이터도 저장
			} catch (error) {
				console.error('폐기이력 가져오기 실패:', error);
			}
		};
		fetchDeleteHistory();
	}, []);

	const handleRowClick = (rowData) => {
		setModalData(rowData);
		setShowModal(true);
	};

	const handleSearch = ({
		assetCode,
		assetName,
		deleteReason,
		deleteBy,
		deleteMethod,
		deleteLocation,
		selectedStartDate,
		selectedEndDate,
	}) => {
		// selectedEndDate의 시간을 해당 날짜의 마지막 시간으로 설정
		const adjustedEndDate = selectedEndDate
			? new Date(selectedEndDate.setHours(23, 59, 59, 999))
			: null;

		const filteredData = originalData.filter((assetDeletes) => {
			return (
				(assetName === '' || assetDeletes.assetName.includes(assetName)) &&
				(assetCode === '' || assetDeletes.assetCode.includes(assetCode)) &&
				(deleteReason === '' || assetDeletes.deleteReason.includes(deleteReason)) &&
				(deleteBy === '' || assetDeletes.deleteBy.includes(deleteBy)) &&
				(deleteMethod === '' || assetDeletes.deleteMethod.includes(deleteMethod)) &&
				(deleteLocation === '' || assetDeletes.deleteLocation.includes(deleteLocation)) &&
				(selectedStartDate === null ||
					new Date(assetDeletes.deleteDate) >= selectedStartDate) &&
				(adjustedEndDate === null || new Date(assetDeletes.deleteDate) <= adjustedEndDate)
			);
		});
		setDeleteList(filteredData);
	};

	return (
		<>
			<div>
				<Card></Card>
				{/* 검색 폼 하위 컴포넌트 */}
				<SearchForm onSearch={handleSearch} />

				<RHForm className="pt-3">
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
				</RHForm>
				{/* Modal */}
				<InfoModal
					show={showModal}
					handleClose={() => setShowModal(false)}
					modalData={modalData}
				/>
			</div>
		</>
	);
};

export { DeleteHistory };
