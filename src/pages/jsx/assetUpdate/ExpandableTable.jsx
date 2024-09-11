import React, { useRef, useEffect, forwardRef, useState } from 'react';
import {
	useTable,
	useSortBy,
	usePagination,
	useRowSelect,
	useGlobalFilter,
	useAsyncDebounce,
	useExpanded,
} from 'react-table';
import classNames from 'classnames';
import axios from 'axios';
import { Pagination } from '@/components';
import Stocks from './Stocks';
import RowDetails from './RowDetails';

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<div className={classNames(searchBoxClass)}>
			<span className="d-flex align-items-center">
				Search :
				<input
					value={value || ''}
					onChange={(e) => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
					placeholder={`${count} records...`}
					className="form-control w-auto ms-1"
				/>
			</span>
		</div>
	);
};

const getClassificationColumns = (classification) => {
	switch (classification) {
		case 'INFORMATION_PROTECTION_SYSTEM':
			return [{ title: '서비스범위', data: 'serviceScope' }];

		case 'APPLICATION_PROGRAM':
			return [
				{ title: '서비스범위', data: 'serviceScope' },
				{ title: 'OS', data: 'os' },
				{ title: '관련DB', data: 'relatedDB' },
				{ title: 'IP', data: 'ip' },
				{ title: '화면수', data: 'screenNumber' },
			];

		case 'SOFTWARE':
			return [
				{ title: 'IP', data: 'ip' },
				{ title: 'ID', data: 'serverId' },
				{ title: 'PW', data: 'serverPassword' },
				{ title: '담당업체', data: 'companyManager' },
				{ title: 'OS', data: 'os' },
			];

		case 'ELECTRONIC_INFORMATION':
			return [
				{ title: 'OS', data: 'os' },
				{ title: '시스템', data: 'system' },
				{ title: 'DB종류', data: 'dbtype' },
			];

		case 'DOCUMENT':
			return [
				{ title: '문서등급', data: 'documentGrade' },
				{ title: '문서형태', data: 'documentType' },
				{ title: '문서링크', data: 'documentLink' },
			];

		case 'PATENTS_AND_TRADEMARKS':
			return [
				{ title: '출원일자', data: 'applicationDate' },
				{ title: '등록일자', data: 'registrationDate' },
				{ title: '만료일자', data: 'expirationDate' },
				{ title: '특허/상표 상태', data: 'patentTrademarkStatus' },
				{ title: '출원국가', data: 'countryApplication' },
				{ title: '특허분류', data: 'patentClassification' },
				{ title: '특허세목', data: 'patentItem' },
				{ title: '출원번호', data: 'applicationNo' },
				{ title: '발명자', data: 'inventor' },
				{ title: '권리권자', data: 'assignee' },
				{ title: '관련문서', data: 'relatedDocuments' },
			];

		case 'ITSYSTEM_EQUIPMENT':
			return [
				{ title: '장비유형', data: 'equipmentType' },
				{ title: '랙유닛', data: 'rackUnit' },
				{ title: '전원공급장치', data: 'powerSupply' },
				{ title: '쿨링시스템', data: 'coolingSystem' },
				{ title: '인터페이스 포트', data: 'interfacePorts' },
				{ title: '폼팩터', data: 'formFactor' },
				{ title: '확장슬롯수', data: 'expansionSlots' },
				{ title: '그래픽카드', data: 'graphicsCard' },
				{ title: '포트 구성', data: 'portConfiguration' },
				{ title: '모니터 포함여부', data: 'monitorIncluded' },
			];

		case 'ITNETWORK_EQUIPMENT':
			return [
				{ title: '장비유형', data: 'equipmentType' },
				{ title: '포트수', data: 'numberOfPorts' },
				{ title: '지원프로토콜', data: 'supportedProtocols' },
				{ title: '펌웨어 버전', data: 'firmwareVersion' },
				{ title: '네트워크 속도', data: 'networkSpeed' },
				{ title: '서비스범위', data: 'serviceScope' },
			];

		case 'TERMINAL':
			return [
				{ title: 'IP', data: 'ip' },
				{ title: '제품 시리얼 번호', data: 'productSerialNumber' },
				{ title: 'OS', data: 'os' },
				{ title: '보안관제', data: 'securityControl' },
				{ title: '내부정보 유출 방지', data: 'kaitsKeeper' },
				{ title: '악성코드,랜섬웨어 탐지', data: 'V3OfficeSecurity' },
				{ title: '안티랜섬웨어', data: 'appCheckPro' },
				{ title: 'NAC agent', data: 'tgate' },
			];

		case 'FURNITURE':
			return [{ title: '크기', data: 'furnitureSize' }];

		case 'DEVICES':
			return [
				{ title: '기기유형', data: 'deviceType' },
				{ title: '모델번호', data: 'modelNumber' },
				{ title: '연결방식', data: 'connectionType' },
				{ title: '전원사양', data: 'powerSpecifications' },
			];

		case 'CAR':
			return [
				{ title: '배기량', data: 'displacement' },
				{ title: '차량의 문 수', data: 'doorsCount' },
				{ title: '엔진 형식', data: 'engineType' },
				{ title: '차량 종류', data: 'carType' },
				{ title: '차량 식별번호', data: 'identificationNo' },
				{ title: '차량 색상', data: 'carColor' },
				{ title: '연식', data: 'modelYear' },
			];

		case 'OTHERASSETS':
			return [
				{ title: '기타 세부 설명', data: 'otherDescription' },
				{ title: '사용 빈도', data: 'usageFrequency' },
			];

		default:
			return [];
	}
};
// 중요성 점수를 계산
const calculateImportanceScore = (selectedRowData) => {
	if (selectedRowData) {
		const { confidentiality, integrity, availability } = selectedRowData;
		return (confidentiality || 0) + (integrity || 0) + (availability || 0);
	}
	return 0;
};

// 중요성 등급을 계산
const calculateImportanceRating = (score) => {
	if (score >= 7 && score <= 9) return 'A급';
	if (score >= 5 && score <= 6) return 'B급';
	if (score >= 3 && score <= 4) return 'C급';
	return 'N/A';
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<div className="form-check">
			<input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
			<label htmlFor="form-check-input" className="form-check-label"></label>
		</div>
	);
});

const Table = (props) => {
	const isSearchable = props['isSearchable'] || false;
	const isSortable = props['isSortable'] || false;
	const pagination = props['pagination'] || false;
	const isSelectable = props['isSelectable'] || false;
	const isExpandable = props['isExpandable'] || false;
	const sizePerPageList = props['sizePerPageList'] || [];
	const [selectedRowData, setSelectedRowData] = useState(null); // 선택된 행 데이터

	const importanceScore = calculateImportanceScore(selectedRowData);
	const importanceRating = calculateImportanceRating(importanceScore);
	const classification = selectedRowData?.assetClassification;
	const dynamicColumns = React.useMemo(
		() => getClassificationColumns(classification),
		[classification]
	);

	const fetchRowData = async (assetCode) => {
		try {
			const response = await axios.get(`http://133.186.153.78/api/asset/${assetCode}`);
			setSelectedRowData(response.data);
		} catch (error) {
			console.error('자산 데이터를 가져오는 중 오류 발생:', error);
		}
	};

	let otherProps = {};

	if (isSearchable) {
		otherProps['useGlobalFilter'] = useGlobalFilter;
	}
	if (isSortable) {
		otherProps['useSortBy'] = useSortBy;
	}
	if (isExpandable) {
		otherProps['useExpanded'] = useExpanded; // 확장 훅 추가
	}
	if (pagination) {
		otherProps['usePagination'] = usePagination;
	}
	if (isSelectable) {
		otherProps['useRowSelect'] = useRowSelect;
	}

	const dataTable = useTable(
		{
			columns: props.columns,
			data: props['data'],
			initialState: { pageSize: props['pageSize'] || 10 },
		},

		otherProps['useGlobalFilter'] || (() => {}),
		otherProps['useSortBy'] || (() => {}),
		otherProps['useExpanded'] || (() => {}),
		otherProps['usePagination'] || (() => {}),
		otherProps['useRowSelect'] || (() => {}),

		(hooks) => {
			isSelectable &&
				hooks.visibleColumns.push((columns) => [
					{
						id: 'selection',
						Header: ({ getToggleAllPageRowsSelectedProps }) => (
							<div>
								<IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
							</div>
						),
						Cell: ({ row }) => (
							<div>
								<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
							</div>
						),
					},
					...columns,
				]);

			isExpandable &&
				hooks.visibleColumns.push((columns) => [
					{
						id: 'expander',
						Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
							<span {...getToggleAllRowsExpandedProps()}>
								{isAllRowsExpanded ? (
									<i className={`ri-arrow-up-s-fill`} />
								) : (
									<i className={`ri-arrow-down-s-fill`} />
								)}
							</span>
						),
						Cell: ({ row }) => (
							<span
								{...row.getToggleRowExpandedProps({
									style: {
										paddingLeft: `${row.depth * 2}rem`,
									},
								})}
							>
								{row.isExpanded ? (
									<i className={`ri-arrow-up-s-fill`} />
								) : (
									<i className={`ri-arrow-down-s-fill`} />
								)}
							</span>
						),
					},
					...columns,
				]);
		}
	);

	const rows = pagination ? dataTable.page : dataTable.rows;

	return (
		<>
			{isSearchable && (
				<GlobalFilter
					preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
					globalFilter={dataTable.state.globalFilter}
					setGlobalFilter={dataTable.setGlobalFilter}
					searchBoxClass={props['searchBoxClass']}
				/>
			)}

			<div className="table-responsive">
				<table
					{...dataTable.getTableProps()}
					className={classNames('table table-centered react-table', props['tableClass'])}
				>
					<thead className={props['theadClass']}>
						{dataTable.headerGroups.map((headerGroup, index) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={index}>
								{headerGroup.headers.map((column, index) => (
									<th
										{...column.getHeaderProps(
											column.defaultCanSort && column.getSortByToggleProps()
										)}
										className={classNames({
											sorting_desc: column.isSortedDesc === true,
											sorting_asc: column.isSortedDesc === false,
											sortable: column.defaultCanSort === true,
										})}
										key={index}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...dataTable.getTableBodyProps()}>
						{(rows || []).map((row, index) => {
							dataTable.prepareRow(row);
							return (
								<React.Fragment key={index}>
									<tr {...row.getRowProps()}>
										{row.cells.map((cell) => (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										))}
									</tr>
									{/* 확장된 내용 렌더링 */}
									{row.isExpanded && isExpandable && (
										<tr>
											<td colSpan={dataTable.headerGroups[0].headers.length}>
												{/* 확장된 내용 */}
												<div>
													<RowDetails
														row={row}
														selectedRowData={selectedRowData}
														importanceScore={importanceScore}
														importanceRating={importanceRating}
														dynamicColumns={dynamicColumns}
													/>
													{/* <Stocks /> */}
												</div>
											</td>
										</tr>
									)}
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</div>

			{pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />}
		</>
	);
};

export { Table };
