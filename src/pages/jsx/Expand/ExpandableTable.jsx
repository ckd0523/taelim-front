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
//import { Pagination } from '@/components';
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
	// 선택된 Row SetState 해주는 곳
	const setRowSelect = props['setRowSelect'] || [];
	const fetchData = props['fetchData']; // 데이터를 새로 고치는 함수
	const setPageIndex = props['setPageIndex'];
	const pageSize = props['pageSize'];

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

	// 일괄때문에 추가 부분
	const {
		selectedFlatRows,
		state: { selectedRowIds },
		// ...other destructured values
	} = dataTable;

	useEffect(() => {
		//	console.log('Selected row IDs:', selectedRowIds);
		console.log(
			'selectedFlatRows[].original',
			selectedFlatRows.map((d) => d.original)
		);
		const Rows = selectedFlatRows.map((d) => d.original);
		setRowSelect(Rows);
	}, [selectedRowIds]);

	const rows = pagination ? dataTable.page : dataTable.rows;

	return (
		<>
			{/* 검색 필터 */}
			{isSearchable && (
				<GlobalFilter
					preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
					globalFilter={dataTable.state.globalFilter}
					setGlobalFilter={dataTable.setGlobalFilter}
					searchBoxClass={props['searchBoxClass']}
				/>
			)}

			{/* 테이블 */}
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
												<div className="expanded-content">
													<RowDetails
														// row={row}
														// assetCode={row.original.assetCode}
														assetCode={row.original.assetCode} // assetCode 전달
														formData={row.original} // 전체 데이터를 formData로 전달
														onClose={() => row.toggleRowExpanded(false)} // onClose에 행 확장 상태 닫기 핸들러 추가
														fetchData={fetchData} // 데이터를 새로 고치는 함수
														setPageIndex={setPageIndex} // 페이지 인덱스 업데이트 함수 전달
														pageSize={pageSize}
													/>
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

			{/* {pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />} */}
		</>
	);
};

export { Table };
