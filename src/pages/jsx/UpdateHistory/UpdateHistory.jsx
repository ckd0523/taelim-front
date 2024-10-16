import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { PageBreadcrumb, CustomDatePicker, TextInput, Form as RHForm } from '@/components';
import { Table } from './Table';
import { columns } from './ColumnsSet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '.././MaintainHistory/Searchbar.css';

import { InfoModal } from './UpdateHistoryModal';
import { SearchForm } from './UpdateSearchBar';

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

	// 백엔드에서 수정 이력 데이터를 불러오는 함수
	useEffect(() => {
		const fetchUpdateHistory = async () => {
			try {
				const response = await axios.get(`${urlConfig}/updateHistory`); // API 호출
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

	const handleSearch = ({
		assetCode,
		assetName,
		updateReason,
		updateBy,
		selectedStartDate,
		selectedEndDate,
	}) => {
		const filteredData = originalData.filter((assetUpdates) => {
			return (
				(assetCode === '' || assetUpdates.assetCode.includes(assetCode)) &&
				(assetName === '' || assetUpdates.assetName.includes(assetName)) &&
				(updateBy === '' || assetUpdates.updateBy.includes(updateBy)) &&
				(updateReason === '' || assetUpdates.updateReason?.includes(updateReason)) &&
				(selectedStartDate === null ||
					new Date(assetUpdates.UpdateDate) >= selectedStartDate) &&
				(selectedEndDate === null || new Date(assetUpdates.UpdateDate) <= selectedEndDate)
			);
		});
		setUpdateList(filteredData);
	};

	return (
		<>
			<div>
				{/* 검색 폼 하위 컴포넌트 */}
				<SearchForm onSearch={handleSearch} />
				{/* 엑셀 출력 버튼 */}
				<RHForm className="pt-3">
					<Card>
						<Card.Body>
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
								//onRowClick={handleRowClick} // onRowClick 이벤트를 빈 함수로 설정하여 무시
								onRowClick={() => {}}
								setModalData={setModalData}
								setSelectedAssetNo={setSelectedAssetNo}
								setShowModal={setShowModal}
							/>
						</Card.Body>
					</Card>
				</RHForm>
				{/* Modal */}
				<InfoModal
					show={showModal}
					handleClose={handleCloseModal} // 상태 초기화 포함
					assetNo={selectedAssetNo}
					modalData={modalData} // modalData를 InfoModal로 전달
				/>
			</div>
		</>
	);
};

export { UpdateHistory };
