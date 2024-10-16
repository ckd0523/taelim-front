import React, { useEffect, useState, useCallback } from 'react';
import { useTable, usePagination } from 'react-table';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { PageBreadcrumb, Form as RHForm } from '@/components';
import axios from 'axios';
import { Pagination } from './PaginationNew';
import { columns as baseColumns } from './ColumnsSet'; // table의 column 설정
import { Table } from './ExpandableTable';

const urlConfig = import.meta.env.VITE_BASIC_URL;

const AssetPageTest = (props) => {
	const [data, setData] = useState([]); // 서버에서 받아온 데이터
	// 선택된 Row 배열,
	const [rowSelect, setRowSelect] = useState([]); // 선택된 row 배열

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

	// useEffect를 통해 pageIndex와 pageSize가 변경될 때 데이터를 다시 요청
	useEffect(() => {
		fetchData(pageIndex, pageSize); // 페이지 인덱스 유지하여 데이터 요청
	}, [searchParams, pageIndex, pageSize]); // searchParams, pageIndex, pageSize 변경 시 데이터 요청

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
	const handleSearch = (e) => {
		const { name, value } = e.target;
		setSearchParams((prevParams) => ({
			...prevParams,
			[name]: value,
		}));
	};

	// 검색 버튼 클릭 시 검색 실행
	const handleSearchSubmit = () => {
		setPageIndex(0); // 검색 시 첫 페이지로 이동
		fetchData(0, pageSize, searchParams); // 검색 조건으로 데이터 요청
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
	return (
		<>
			<div className="pt-3 px-2">
				<h4 className="header-title">자산 조회</h4>
			</div>
			<div>
				<Card></Card>
				{/* 검색 필터 입력 부분 */}
				<div className="search-filter">
					<input
						type="text"
						name="assetName"
						placeholder="Asset Name"
						value={searchParams.assetName}
						onChange={handleSearch}
					/>
					<input
						type="text"
						name="assetLocationString"
						placeholder="Location"
						value={searchParams.assetLocationString}
						onChange={handleSearch}
					/>
					<input
						type="text"
						name="assetUser"
						placeholder="User"
						value={searchParams.assetUser}
						onChange={handleSearch}
					/>
					<button onClick={handleSearchSubmit}>Search</button>
				</div>

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
						</Card.Body>
					</Card>
				</RHForm>
			</div>

			{/* 페이지네이션 */}
			<Pagination
				pageIndex={pageIndex}
				pageCount={pageCount}
				gotoPage={setPageIndex}
				pageSize={pageSize}
				setPageSize={setPageSize}
				sizePerPageList={[10]}
			/>
		</>
	);
};

export { AssetPageTest };
