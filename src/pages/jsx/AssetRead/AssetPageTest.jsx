import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { PageBreadcrumb, Form as RHForm } from '@/components';

import { columns as baseColumns } from './ColumnsSet'; // table의 column 설정
import { Table } from './ExpandableTable';
import { SearchForm } from './AssetSearchBar';
import { AssetButtons } from './AssetButton';
import { DisposeModal } from './DisposeModal';
import { ActionModal } from './AllChangeModal';

import axios from 'axios';

const urlConfig = import.meta.env.VITE_BASIC_URL;

const AssetPageTest = () => {
	const [data, setData] = useState([]);
	const [UpdateList, setUpdateList] = useState([]);

	// 선택된 Row 배열,
	const [rowSelect, setRowSelect] = useState([]); // 선택된 row 배열
	const [actionType, setActionType] = useState(null); // 어떤 액션 타입인지
	const [showActModal, setShowActModal] = useState(false); // 모달창 열기/닫기 상태

	const handleOpenModal = (type) => {
		if (rowSelect.length === 0) {
			alert('데이터를 선택을 해주세요');
		} else {
			setActionType(type); // 액션 타입 설정
			setShowActModal(true); // 모달창 열기
		}
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

	const QRPrint = (rowSelect) => {
		const assetNoList = [];
		for (const row of rowSelect) {
			assetNoList.push(row.assetNo);
		}
		console.log('큐알', rowSelect);
		console.log('큐알', assetNoList);

		const fetchData = async () => {
			try {
				axios
					.post(`${urlConfig}/generateQRCode`, assetNoList)
					.then((response) => {
						console.log('Update successful:', response.data);
					})
					.catch((error) => {
						console.error('Update error:', error);
					});
			} catch (error) {
				console.error('데이터를 가져오는 중 오류 발생:', error);
			}
		};
		fetchData();
	};

	// 자산 테이블 List 불러옴
	useEffect(() => {
		const fetchData = async () => {
			try {
				// 페이지 처리 없이 모든 데이터 가져오기
				const response = await axios.get(`${urlConfig}/assets/test`);
				setData(response.data); // 가져온 데이터 설정
				setUpdateList(response.data); // 업데이트 리스트 설정
			} catch (error) {
				console.error('데이터를 가져오는 중 오류 발생:', error); // 오류 처리
			}
		};
		fetchData(); // 데이터 가져오기 함수 호출
	}, []); // 의존성 배열을 비워 모든 데이터 가져오도록 설정

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
			<PageBreadcrumb title="자산조회" subName="자산조회" />

			<div>
				<Card></Card>
				{/* 검색 폼 하위 컴포넌트 */}
				<SearchForm onSearch={handleSearch} />

				{/*각종 버튼들*/}
				<AssetButtons
					rowSelect={rowSelect} // 선택된 row 데이터 전달
					handleButtonClick={handleOpenModal} // 공통 핸들러 전달
					handleQrClick={QRPrint}
					handleExcelClick={() => console.log('엑셀 출력 클릭')}
				/>

				<Card></Card>

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
								setRowSelect={setRowSelect}
							/>
						</Card.Body>
					</Card>
				</RHForm>
			</div>
			{/*폐기 모달창 */}
			<DisposeModal
				showModal={showModal}
				handleClose={handleClose}
				selectedAssetCode={selectedAssetCode}
				handleDisposeDemand={handleDisposeDemand}
				handleDisposeAsset={handleDisposeAsset}
				isDisposed={isDisposed}
				setErrorMessage={setErrorMessage}
			/>
			{/*일괄 관련 모달창 */}
			<ActionModal
				show={showActModal}
				handleClose={() => setShowActModal(false)}
				actionType={actionType}
				actionData={rowSelect}
			/>
		</>
	);
};

export { AssetPageTest };
