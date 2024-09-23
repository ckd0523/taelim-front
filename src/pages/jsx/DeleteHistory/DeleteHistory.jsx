import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Table, PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { columns } from './ColumnsSet';
import { useState, useEffect } from 'react';
//import { assetDeletes } from './data';
import axios from 'axios';

import { InfoModal } from './DeleteHistoryModal';
import { SearchForm } from './DeleteSearchBar';
import { DeleteButton } from './DeleteButton';
// import Select from 'react-select';

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
				const response = await axios.get('http://localhost:8080/deleteHistory'); // API 호출
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
		const filteredData = originalData.filter((assetDeletes) => {
			return (
				(assetName === '' || assetDeletes.assetName.includes(assetName)) &&
				(assetCode === '' || assetDeletes.assetCode.includes(assetCode)) &&
				(deleteReason === '' || assetDeletes.deleteReason.includes(deleteReason)) &&
				(deleteBy === '' || assetDeletes.deleteBy.includes(deleteBy)) &&
				(deleteMethod === '' || assetDeletes.deleteMethod.includes(deleteMethod)) &&
				(deleteLocation === '' || assetDeletes.deleteLocation.includes(deleteLocation)) &&
				(selectedStartDate === null ||
					new Date(assetDeletes.DeleteDate) >= selectedStartDate) &&
				(selectedEndDate === null || new Date(assetDeletes.DeleteDate) <= selectedEndDate)
			);
		});

		setDeleteList(filteredData);
	};

	return (
		<>
			<PageBreadcrumb title="폐기 이력" subName="DeleteHistory" />
			<div>
				<Card></Card>
				{/* 검색 폼 하위 컴포넌트 */}
				<SearchForm onSearch={handleSearch} />

				{/* 엑셀 출력 버튼 */}
				<DeleteButton />

				<Card></Card>
				<RHForm>
					<Card>
						<Card.Body>
							<Table
								columns={columns(setModalData, setShowModal)}
								data={DeleteList}
								pageSize={10}
								//isExpandable={true}
								isSortable={true}
								pagination={true}
								//isSelectable={true}
								theadClass="table-light"
								searchBoxClass="mb-2"
								onRowClick={() => {}} // onRowClick 이벤트를 빈 함수로 설정하여 무시
							/>
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
