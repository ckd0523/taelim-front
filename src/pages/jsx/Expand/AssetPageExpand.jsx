import React, { useEffect, useState, useCallback } from 'react';
import { useTable, usePagination } from 'react-table';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { PageBreadcrumb, Form as RHForm } from '@/components';
import axios from 'axios';
import { Pagination } from './PaginationNew';
import { columns as baseColumns } from './ColumnsSet'; // table의 column 설정
import { Table } from './ExpandableTable';
import { SearchForm } from './AssetSearchBar';
import { AssetButtons } from './AssetButton';
import { DisposeModal } from './DisposeModal';
import { ActionModal } from './AllChangeModal';

const urlConfig = import.meta.env.VITE_BASIC_URL;

const AssetPageTest = (props) => {
	const [data, setData] = useState([]); // 서버에서 받아온 데이터
	// 선택된 Row 배열,
	const [rowSelect, setRowSelect] = useState([]); // 선택된 row 배열
	const [actionType, setActionType] = useState(null); // 어떤 액션 타입인지
	const [showActModal, setShowActModal] = useState(false); // 모달창 열기/닫기 상태

	const [pageCount, setPageCount] = useState(0); // 총 페이지 수
	const [pageIndex, setPageIndex] = useState(0); // 현재 페이지 번호
	const [pageSize, setPageSize] = useState(10); // 한 페이지당 항목 수
	const [searchParams, setSearchParams] = useState({
		assetName: '',
		assetLocationString: '',
		assetLocationEnum: '',
		assetUser: '',
		departmentString: '',
		departmentEnum: '',
		introducedDate: '',
	}); // 검색 필터 상태 관리

	// 서버에 데이터 요청
	const fetchData = useCallback(
		async (pageIndex = 0, pageSize = 10) => {
			try {
				const response = await axios.get(`${urlConfig}/getAssetSearch`, {
					params: {
						assetName: searchParams.assetName || null,
						assetLocationString: searchParams.assetLocationString || null,
						assetLocationEnum: searchParams.assetLocationEnum || null,
						assetUser: searchParams.assetUser || null,
						departmentString: searchParams.departmentString || null,
						departmentEnum: searchParams.departmentEnum || null,
						introducedDate: searchParams.introducedDate || null,
						page: pageIndex,
						size: pageSize,
					},
				});

				const result = response.data;
				console.log(result); // 결과를 콘솔에 출력하여 확인

				// 데이터가 있는지 확인 후 업데이트
				if (result && result.content) {
					setData(result.content); // content 배열로 데이터 업데이트
					setPageCount(result.totalPages); // 총 페이지 수 업데이트
				} else {
					setData([]); // 빈 배열로 설정
					setPageCount(0); // 페이지 수 초기화
				}
			} catch (error) {
				console.error('데이터 요청 실패', error); // 에러 출력
			}
		},
		[searchParams]
	); // searchParams가 변경될 때마다 호출

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
	// const {
	// 	getTableProps,
	// 	getTableBodyProps,
	// 	headerGroups,
	// 	page, // 현재 페이지에 대한 row 데이터
	// 	prepareRow,
	// } = useTable(
	// 	{
	// 		columns: props.columns, // props로 받은 columns 사용
	// 		data,
	// 		manualPagination: true,
	// 		pageCount, // 서버로부터 받은 총 페이지 수
	// 	},
	// 	usePagination
	// );
	// 검색 조건을 입력받는 함수
	const handleSearch = (params) => {
		setSearchParams(params);
		setPageIndex(0); // 검색 시 페이지를 0으로 설정
	};

	// useEffect를 통해 pageIndex와 pageSize가 변경될 때 데이터를 다시 요청
	useEffect(() => {
		fetchData(pageIndex, pageSize); // 페이지 인덱스 유지하여 데이터 요청
	}, [fetchData, pageIndex, pageSize]); // searchParams, pageIndex, pageSize 변경 시 데이터 요청

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
						className="btn btn-dark"
						onClick={() => handleShow(row.original.assetCode)} // 모달을 열도록 handleShow 사용 , assetCode 담아서
					>
						<i className="mdi mdi-trash-can-outline" style={{ fontSize: '1.2rem' }}></i>
					</button>
				),
			};
		}
		return column;
	});

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

	return (
		<>
			<div className="pt-3 px-2">
				<h4 className="header-title">자산 조회</h4>
			</div>
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
								data={data}
								pageSize={10}
								isSortable={true}
								isSelectable={true}
								pagination={true}
								theadClass="table-dark"
								searchBoxClass="mb-2"
								isExpandable={true} // 확장 가능
								setRowSelect={setRowSelect}
							/>
							{/* 페이지네이션 */}
							<Pagination
								pageIndex={pageIndex}
								pageCount={pageCount}
								gotoPage={setPageIndex}
								pageSize={pageSize}
								setPageSize={setPageSize}
								sizePerPageList={[10]}
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
